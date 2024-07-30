import {json, LoaderFunctionArgs} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/.server/admin/constants/navigation.constant';
import {commitSession, getSession} from '~/.server/admin/utils/session.util';

export async function adminAuthLoader({request}: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: EAdminNavigation.dashboard,
  });

  const session = await getSession(request.headers.get('cookie'));
  const error = session.get(authenticator.sessionErrorKey);
  return json<{ error?: { message: string } }>({error}, {
    headers: {
      'Set-Cookie': await commitSession(session)
    }
  });
}