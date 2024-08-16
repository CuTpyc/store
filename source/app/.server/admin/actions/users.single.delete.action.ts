import {redirect} from '@remix-run/node';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';

export type AdminUsersSingleDeleteActionArgs = {
  id: string;
}

export async function adminUsersSingleDeleteAction({id}: AdminUsersSingleDeleteActionArgs) {

  // update user
  await prisma.user.update({
    where: {id: Number(id)},
    data: {
      deletedAt: new Date()
    }
  });

  // redirect to user page
  return redirect(`${EAdminNavigation.users}/${id}`);
}
