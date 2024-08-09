import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { prisma } from "~/.server/shared/utils/prisma.util";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";

export async function deleteSingleUser (id: string){

    await prisma.user.update(
        {
            where: { id: Number(id) },
            data: {
                deletedAt: new Date(),
            } });
    return redirect(EAdminNavigation.users);
  };
