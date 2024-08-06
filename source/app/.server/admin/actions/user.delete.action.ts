import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { prisma } from "~/.server/shared/utils/prisma.util";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";

export async function deleteSingleUser (request, params){
    const now = new Date();
    const hr = now.getHours();
    console.log(hr)
    const id = Number(params.id);
    await prisma.user.update(
        { 
            where: { id }, 
            data: {
                deletedAt: now,
            } });
    return redirect(EAdminNavigation.users);
    // await prisma.user.update({ where: { id } });
    // return redirect(EAdminNavigation.users);
  };