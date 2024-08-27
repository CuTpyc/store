import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {validationError} from 'remix-validated-form';
import {prisma} from '~/.server/shared/services/prisma.service';
import {newFormValidator} from '~/admin/components/customers/addresses/NewForm/NewForm.validator';
import { $Enums } from '@prisma/client';

export async function action({request, params}: ActionFunctionArgs) {
  const userAdmin = await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  if(userAdmin?.role === $Enums.AdminRole.STUFF) {
    return redirect(EAdminNavigation.dashboard)
  }
  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.customers);
  }

  // get customer
  const customer = await prisma.customer.findFirst({
    where: {id: Number(id)}
  });

  // if not exist
  if (!customer) {
    return redirect(EAdminNavigation.customers);
  }


  // validate form data
  const data = await newFormValidator.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }

  const {address} = data.data;

  // create new Address
  await prisma.customerAddress.create({
    data: {
      ...address,
      customerId: customer.id,
    }
  });

  return redirect(`${EAdminNavigation.customers}/${customer.id}`);
}
