// customers.single.loader.ts
import { json, LoaderFunctionArgs } from '@remix-run/node';
import { prisma } from '~/.server/shared/utils/prisma.util';
import { customerMapper } from '../mappers/customer.mapper';

export const customersSingleLoader = async ({ params }: LoaderFunctionArgs) => {
  const customer = await prisma.customer.findUnique({
    where: { id: Number(params.id) },
    include: { addresses: true },
  });

  if (!customer) {
    throw new Response('Customer not found', { status: 404 });
  }
  const mappedCustomer = customerMapper(customer);
  return json({ customer: mappedCustomer });
};
