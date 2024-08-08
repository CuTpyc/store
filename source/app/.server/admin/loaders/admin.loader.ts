// admin.loader.ts
import { json, LoaderFunctionArgs } from '@remix-run/node';
import { authenticator } from '~/.server/admin/services/auth.service';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';
import { userMapper } from '~/.server/admin/mappers/user.mapper';
import { prisma } from '~/.server/shared/utils/prisma.util';

export async function adminLoader({ request }: LoaderFunctionArgs) {
  if (request.url.includes(EAdminNavigation.authLogin)) {
    return json({ user: null });
  }

  const { id } = await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  const user = await prisma.user.findUnique({ where: { id, deletedAt: null } });

  if (!user) {
    return await authenticator.logout(request, {
      redirectTo: EAdminNavigation.authLogin,
    });
  }

  return json({ user: userMapper(user) });
}
