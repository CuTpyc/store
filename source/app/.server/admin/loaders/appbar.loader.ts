import {json, LoaderFunctionArgs} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';

export async function appBar({request}: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  return user;
}
