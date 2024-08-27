import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import { $Enums } from '@prisma/client';

export async function action({request, params}: ActionFunctionArgs) {
  const userAdmin = await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  if(userAdmin?.role === $Enums.AdminRole.STUFF) {
    return redirect(EAdminNavigation.dashboard)
  }

  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.customers);
  }

  // get customer
  const customer = await prisma.customer.findFirst({
    where: {id: Number(id)}
  });

  // if not exist
  if (!customer) {
    return redirect(EAdminNavigation.customers);
  }

  // update customer
  await prisma.customer.update({
    where: {id: Number(id)},
    data: {
      deletedAt: new Date()
    }
  });

  // redirect to user page
  return redirect(`${EAdminNavigation.customers}`);
}
