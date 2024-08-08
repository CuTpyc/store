import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { prisma } from '../../shared/utils/prisma.util';

export const customersDeleteAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const method = formData.get('_method');

  if (method === 'delete') {
    await prisma.customer.delete({
      where: { id: Number(params.id) },
    });

    return redirect('/admin/customers');
  }

  throw new Response('Invalid method', { status: 400 });
};
