import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator, getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {validationError} from 'remix-validated-form';
import {prisma} from '~/.server/shared/services/prisma.service';
import {newFormValidator} from '~/admin/components/customers/addresses/NewForm/NewForm.validator';
import { $Enums } from '@prisma/client';
import { hasAdminRoleOrRedirect } from '~/.server/admin/utils/auth.util';

export async function action({request, params}: ActionFunctionArgs) {
  const authUser = await getAuthUser(request);
  hasAdminRoleOrRedirect(authUser);

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
