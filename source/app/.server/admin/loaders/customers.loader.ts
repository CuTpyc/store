// customers.loader.ts
import { json } from '@remix-run/node';
import { prisma } from '~/.server/shared/utils/prisma.util';
import { customerMapper } from '~/.server/admin/mappers/customer.mapper';

export const adminCustomersLoader = async () => {
  const customers = await prisma.customer.findMany({
    include: { addresses: true },
  });

  const customerDtos = customers.map(customerMapper);

  return json({ customers: customerDtos });
};
