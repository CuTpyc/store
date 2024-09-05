import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator, getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {validationError} from 'remix-validated-form';
import {prisma} from '~/.server/shared/services/prisma.service';
import {hashPassword} from '~/.server/shared/utils/auth.util';
import {newFormValidator} from '~/admin/components/customers/NewForm/NewForm.validator';
import { $Enums } from '@prisma/client';
import { hasAdminRoleOrRedirect } from '~/.server/admin/utils/auth.util';
import i18nServer from '~/.server/admin/services/i18next.service';

export async function action({request}: ActionFunctionArgs) {
  const authUser = await getAuthUser(request);
  hasAdminRoleOrRedirect(authUser);
  let t = await i18nServer.getFixedT(request);
  // validate form data
  const data = await newFormValidator.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }

  const {email, password, lastName, firstName, phone, address} = data.data;

  // check unique email
  const customerError = t("customer.action.new.error")
  const exist = await prisma.customer.findFirst({where: {email}});
  if (exist) {
    return validationError({
      fieldErrors: {
        email: customerError
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
