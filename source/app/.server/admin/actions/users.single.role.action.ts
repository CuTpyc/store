import {redirect} from '@remix-run/node';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {validationError} from 'remix-validated-form';
import {prisma} from '~/.server/shared/services/prisma.service';
import {usersRoleFormValidator} from '~/admin/components/UsersSingle/UsersRoleForm.validator';
import {$Enums} from '@prisma/client';

export type AdminUsersSingleRoleActionArgs = {
  formData: FormData;
  id: string;
}

export async function adminUsersSingleRoleAction({id, formData}: AdminUsersSingleRoleActionArgs) {
  // validate form data
  const data = await usersRoleFormValidator.validate(
    formData
  );

  if (data.error) {
    return validationError(data.error);
  }

  const {role} = data.data;

  // update user
  await prisma.user.update({
    where: {id: Number(id)},
    data: {
      role: role as $Enums.AdminRole
    }
  });

  // redirect to user page
  return redirect(`${EAdminNavigation.users}/${id}`);
}
