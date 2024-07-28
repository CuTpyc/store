import { json, LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "../services/auth.service";
import { EAdminNavigation } from "../constant/navigation.constant";

export async function adminDashboardLoader({ request }: LoaderFunctionArgs) {
    const user = await authenticator.isAuthenticated(request, {
      failureRedirect: EAdminNavigation.authLogin,
    });
    return json({user});
  };