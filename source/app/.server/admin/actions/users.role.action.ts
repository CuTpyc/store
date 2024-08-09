import { $Enums } from "@prisma/client";
import { validationError } from "remix-validated-form";
import { usersRoleFormValidator } from "~/admin/components/UsersSingle/UsersRoleForm.validator";

import { prisma } from "~/.server/shared/utils/prisma.util";
import { Params, redirect } from "@remix-run/react";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";

export async function chengeUserRole (
  formData: FormData, user: { id: number; fullName: string | null; email: string; password: string; role: $Enums.AdminRole; createdAt: Date; updatedAt: Date; deletedAt: Date | null; }, params: Params<string>
){
      const id = Number(params.id);
      const roleData = await usersRoleFormValidator.validate(formData);
      if (roleData.error) {
        return validationError(roleData.error);
      };

      await prisma.user.update({
        where: { id: user.id },
        data: {
          role: roleData.data.role as $Enums.AdminRole,
        },
      });


  return redirect(`${EAdminNavigation.users}/${user.id}`);
}
