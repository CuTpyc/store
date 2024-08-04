import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { prisma } from "~/.server/shared/utils/prisma.util";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";

export const action = async ({ request, params }: ActionFunctionArgs) => {

  const id = Number(params.id);
  await prisma.user.delete({ where: { id } });
  return redirect(EAdminNavigation.users);
};