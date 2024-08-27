import { LoaderFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';

import { $Enums } from '@prisma/client';

export async function loader({request, params}: LoaderFunctionArgs) {
  const userAdmin = await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  if(userAdmin?.role === $Enums.AdminRole.STUFF) {
    return redirect(EAdminNavigation.dashboard)
  }
  return {}
}
