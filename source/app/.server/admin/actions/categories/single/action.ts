import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator, getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import { $Enums } from '@prisma/client';
import { hasAdminRoleOrRedirect } from '~/.server/admin/utils/auth.util';

export async function action({request, params}: ActionFunctionArgs) {
  const authUser = await getAuthUser(request);
  hasAdminRoleOrRedirect(authUser);

  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.categories);
  }

  // get category
  const category = await prisma.category.findFirst({
    where: {id: Number(id)}
  });

  // if not exist
  if (!category) {
    return redirect(EAdminNavigation.categories);
  }

  // update category
  await prisma.category.update({
    where: {id: Number(id)},
    data: {
      deletedAt: new Date()
    }
  });

  // redirect to user page
  return redirect(`${EAdminNavigation.categories}`);
}
