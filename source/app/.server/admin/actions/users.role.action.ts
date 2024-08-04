import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/.server/admin/services/auth.service";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { validationError } from "remix-validated-form";
import { prisma } from "~/.server/shared/utils/prisma.util";
import { $Enums } from "@prisma/client";
import { usersRoleFormValidator } from "~/admin/components/UsersSingle/UsersRoleForm.validator";

enum EActionType {
  updateRole = "updateRole",
  deleteUser = "deleteUser",
}

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
  const actionType = formData.get("actionType");

  switch (actionType) {
    case EActionType.updateRole:
      const roleData = await usersRoleFormValidator.validate(formData);
      if (roleData.error) {
        return validationError(roleData.error);
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          role: roleData.data.role as $Enums.AdminRole,
        },
      });
      break;

    case EActionType.deleteUser:
      await prisma.user.delete({
        where: { id: user.id },
      });
      break;

    default:
      return redirect(EAdminNavigation.users);
  }

  return redirect(`${EAdminNavigation.users}/${user.id}`);
}
