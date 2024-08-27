import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {validationError} from 'remix-validated-form';
import {prisma} from '~/.server/shared/services/prisma.service';
import {hashPassword} from '~/.server/shared/utils/auth.util';
import {newFormValidator} from '~/admin/components/customers/NewForm/NewForm.validator';
import { $Enums } from '@prisma/client';

export async function action({request}: ActionFunctionArgs) {
  const userAdmin = await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  if(userAdmin?.role === $Enums.AdminRole.STUFF) {
    return redirect(EAdminNavigation.dashboard)
  }

  // validate form data
  const data = await newFormValidator.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }

  const {email, password, lastName, firstName, phone, address} = data.data;

  // check unique email
  const exist = await prisma.customer.findFirst({where: {email}});
  if (exist) {
    return validationError({
      fieldErrors: {
        email: 'Customer already exists'
      }
    });
  }

  // create new Customer
  const newCustomer = await prisma.customer.create({
    data: {
      email,
      password: await hashPassword(password),
      firstName,
      lastName,
      phone,
    }
  });

  // create new Address
  await prisma.customerAddress.create({
    data: {
      ...address,
      customerId: newCustomer.id,
    }
  });

  return redirect(`${EAdminNavigation.customers}/${newCustomer.id}`);
}
