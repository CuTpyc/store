import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { authenticator } from '~/.server/admin/services/auth.service';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';
import { validationError } from 'remix-validated-form';
import { prisma } from '~/.server/shared/utils/prisma.util';
import { usersRoleFormValidator } from '~/admin/components/UsersSingle/UsersRoleForm.validator';
import { $Enums } from '@prisma/client';

export async function adminUsersRoleAction({
  request,
  params,
}: ActionFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  const { id } = params;
  if (!id) {
    return redirect(EAdminNavigation.users);
  }

  // get user
  const user = await prisma.user.findFirst({
    where: { id: Number(id) },
  });

  // if not exist
  if (!user) {
    return redirect(EAdminNavigation.users);
  }

  const formData = await request.formData();

  // validate form data
  const data = await usersRoleFormValidator.validate(formData);

  if (data.error) {
    return validationError(data.error);
  }

  const { role } = data.data;

  // update user
  await prisma.user.update({
    where: { id: user.id },
    data: {
      role: role as $Enums.AdminRole,
    },
  });

  // redirect to user page
  return redirect(`${EAdminNavigation.users}/${user.id}`);
}
