import { ActionFunctionArgs } from "@remix-run/node";
import { ADMIN_AUTH_STRATEGY, authenticator } from "../services/auth.service";
import { EAdminNavigation } from "../constant/navigation.constant";

export async function adminAuthAction({ request }: ActionFunctionArgs) {
    return await authenticator.authenticate(ADMIN_AUTH_STRATEGY, request, {
      successRedirect: EAdminNavigation.dashboard,
      failureRedirect: EAdminNavigation.authLogin,
    });
};