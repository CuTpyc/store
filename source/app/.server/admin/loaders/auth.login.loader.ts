import { json, LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "../services/auth.service";
import { EAdminNavigation } from "../constant/navigation.constant";
import { commitSession, getSession } from "../utils/session.util";

 export async function adminAuthLoader({ request }: LoaderFunctionArgs) {
    await authenticator.isAuthenticated(request, {
      successRedirect: EAdminNavigation.dashboard,
    });
    const session = await getSession(request.headers.get("cookie"));
    const error = session.get(authenticator.sessionErrorKey);
    return json({ error }, {
      headers:{
        'Set-Cookie': await commitSession(session) // You must commit the session whenever you read a flash
      }
    });
  };
