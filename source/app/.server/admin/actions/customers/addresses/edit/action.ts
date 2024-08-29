import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator, getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {validationError} from 'remix-validated-form';
import {prisma} from '~/.server/shared/services/prisma.service';
import {EAdminCustomerAction, FORM_ACTION_FIELD} from '~/admin/constants/action.constant';
import {deleteAddress} from '~/.server/admin/actions/customers/addresses/edit/delete-address';
import {editAddress} from '~/.server/admin/actions/customers/addresses/edit/edit-address';
import { $Enums } from '@prisma/client';
import { hasAdminRoleOrRedirect } from '~/.server/admin/utils/auth.util';

export async function action({request, params}: ActionFunctionArgs) {
  const authUser = await getAuthUser(request);
  hasAdminRoleOrRedirect(authUser);

  const {id, addressId} = params;
  if (!id || !addressId) {
    return redirect(EAdminNavigation.customers);
  }

  // get customer address
  const customerAddress = await prisma.customerAddress.findFirst({
    where: {id: Number(addressId), customerId: Number(id)}
  });

  // if not exist
  if (!customerAddress) {
    return redirect(EAdminNavigation.customers);
  }

  const formData = await request.formData();
  switch (formData.get(FORM_ACTION_FIELD)) {
    case EAdminCustomerAction.deleteAddress:
      return deleteAddress({customerAddress});
    case EAdminCustomerAction.editAddress:
      return editAddress({customerAddress, formData});
  }

  return validationError({
    fieldErrors: {
      [FORM_ACTION_FIELD]: 'Invalid action'
    }
  });

}
