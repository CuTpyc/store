import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator, getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import {EAdminUserAction, FORM_ACTION_FIELD} from '~/admin/constants/action.constant';
import {adminUsersSingleRoleAction} from '~/.server/admin/actions/users.single.role.action';
import {validationError} from 'remix-validated-form';
import {adminUsersSingleDeleteAction} from '~/.server/admin/actions/users.single.delete.action';
import { $Enums } from '@prisma/client';
import { hasAdminRoleOrRedirect } from '../utils/auth.util';

export async function adminUsersSingleAction({request, params}: ActionFunctionArgs) {
  const authUser = await getAuthUser(request);
  hasAdminRoleOrRedirect(authUser);

  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.users);
  }

  // get user
  const user = await prisma.user.findFirst({
    where: {id: Number(id)}
  });

  // if not exist
  if (!user) {
    return redirect(EAdminNavigation.users);
  }

  const formData = await request.formData();
  switch (formData.get(FORM_ACTION_FIELD)) {
    case EAdminUserAction.updateRole:
      return adminUsersSingleRoleAction({id, formData});
    case EAdminUserAction.deleteUser:
      return adminUsersSingleDeleteAction({id});
  }

  return validationError({
    fieldErrors: {
      [FORM_ACTION_FIELD]: 'Invalid action'
    }
  });
}
