import { ActionFunctionArgs, json } from "@remix-run/node";
import { ADMIN_AUTH_STRATEGY, authenticator } from "../services/auth.service";
import { EAdminNavigation } from "../constant/navigation.constant";
import { AuthorizationError } from "remix-auth";

export async function adminAuthAction({ request }: ActionFunctionArgs) {
  try {
    return await authenticator.authenticate(ADMIN_AUTH_STRATEGY, request, {
      successRedirect: EAdminNavigation.dashboard,
      throwOnError: true,
    });
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }
    if (error instanceof AuthorizationError) {
      return json({
        error: {
          message: error.message
        }
      })
    }
    return json({
      error: {
        message: "Unknown error"
      }
    })
  }
}