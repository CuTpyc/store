import {json, LoaderFunctionArgs} from '@remix-run/node';
import {prisma} from '~/.server/shared/services/prisma.service';
import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {Prisma} from '@prisma/client';
import type {SerializeFrom} from '@remix-run/server-runtime';
import {customerMapper} from '~/.server/admin/mappers/customer.mapper';
import {
  hasNextCalculate,
  makeQuery,
  queryToPagination,
  queryToSearch,
  queryToSort,
  requestToSearchParams,
  sortValueToField
} from '~/.server/admin/utils/query.util';
import {containsInsensitive} from '~/.server/shared/utils/prisma.util';
import {ECustomersSortVariant} from '~/admin/components/customers/Index/Filters';
import {ESoftDeleteStatus} from '~/admin/constants/entries.constant';
import { apiCustomerMapper } from '~/.server/admin/mappers/api/customers.mapper';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loader({request}: LoaderFunctionArgs) {
  const searchParams = requestToSearchParams(request);
  const search = await queryToSearch(searchParams);

  let searchQuery;

  if (search) {
    searchQuery = {
      OR: [
        {firstName: containsInsensitive(search)},
        {lastName: containsInsensitive(search)},
      ]
    };
  }

  const customers = await prisma.customer.findMany({
    include: {
      addresses: true
    },
    take: 10,
    skip: 0,
    where: {
      ...searchQuery,
    },
    orderBy: {
      firstName: 'asc'
    }
  });



  return json({customers: customers.map(apiCustomerMapper)});
}

export type TAdminApiCustomersLoader = typeof loader;
export type TAdminApiCustomersLoaderData = SerializeFrom<typeof loader>;
