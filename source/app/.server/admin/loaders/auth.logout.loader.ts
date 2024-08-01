import {LoaderFunctionArgs} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';

export async function adminAuthLogoutLoader({request}: LoaderFunctionArgs) {
  return await authenticator.logout(request, {
    redirectTo: EAdminNavigation.authLogin,
  });
}
