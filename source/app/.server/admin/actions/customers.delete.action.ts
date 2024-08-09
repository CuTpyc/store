import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { prisma } from '../../shared/utils/prisma.util';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';
import { authenticator } from '../services/auth.service';

export const customersDeleteAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {

  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  const { id } = params;
  if (!id) {
    return redirect(EAdminNavigation.users);
  }

  const customer = await prisma.customer.findFirst({
    where: { id: Number(id) },
  });

  if (!customer) {
    return redirect(EAdminNavigation.users);
  }
  const formData = await request.formData();
  const method = formData.get('_method');

  await prisma.customer.update(
    {
        where: { id: Number(id) },
        data: {
            deletedAt: new Date(),
        } });
return redirect(EAdminNavigation.customers);
};
