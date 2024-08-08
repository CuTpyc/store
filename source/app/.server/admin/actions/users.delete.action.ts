import { ActionFunctionArgs, json, redirect } from '@remix-run/node';
import { authenticator } from '~/.server/admin/services/auth.service';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';
import { prisma } from '~/.server/shared/utils/prisma.util';
import { userDeleteValidator } from '../../../admin/components/UsersSingle/UserDelete.validator';

export async function adminUsersDeleteAction({
  request,
  params,
}: ActionFunctionArgs) {
  try {
    await authenticator.isAuthenticated(request, {
      failureRedirect: EAdminNavigation.authLogin,
    });

    const { id } = params;
    if (!id) {
      throw new Error('User ID is missing');
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const validation = userDeleteValidator.safeParse(user);
    if (!validation.success) {
      throw new Error(validation.error.issues[0].message);
    }

    await prisma.user.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });

    return redirect(EAdminNavigation.users);
  } catch (error) {
    return json({ error: error.message }, { status: 400 });
  }
}
