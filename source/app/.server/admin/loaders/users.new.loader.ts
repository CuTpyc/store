import { $Enums } from "@prisma/client";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { prisma } from "~/.server/shared/services/prisma.service";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { userMapper } from "../mappers/user.mapper";
import { authenticator } from "../services/auth.service";

export async function adminUsersNewLoader({request, params}: LoaderFunctionArgs) {
  const userAdmin = await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  if(userAdmin?.role === $Enums.AdminRole.STUFF) {
    return redirect(EAdminNavigation.dashboard)
  }
  return {}
}
