import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {prisma} from '~/.server/shared/services/prisma.service';
import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {$Enums, Prisma} from '@prisma/client';
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
import { authenticator } from '~/.server/admin/services/auth.service';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';

type CustomerOrderByWithRelationInput = Prisma.CustomerOrderByWithRelationInput;


export const customerQueryValidator = withZod(
  z.object({
    softDeleteStatus: z.nativeEnum(ESoftDeleteStatus).optional(),
  })
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loader({request}: LoaderFunctionArgs) {
  const userAdmin = await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  if(userAdmin?.role === $Enums.AdminRole.STUFF) {
    return redirect(EAdminNavigation.dashboard)
  }
  const searchParams = requestToSearchParams(request);
  const {data} = await customerQueryValidator.validate(
    searchParams
  );
  const search = await queryToSearch(searchParams);
  const pagination = await queryToPagination(searchParams);
  const sort = await queryToSort(searchParams, ECustomersSortVariant, ECustomersSortVariant.createdAt_desc);
  const orderBy = sortValueToField<CustomerOrderByWithRelationInput>(sort);

  let searchQuery;
  let filterAccountStatusQuery;

  if (search) {
    searchQuery = {
      OR: [
        {email: containsInsensitive(search)},
        {firstName: containsInsensitive(search)},
        {lastName: containsInsensitive(search)},
        {phone: containsInsensitive(search)},
        {
          addresses: {
            some: {
              OR: [
                {firstName: containsInsensitive(search)},
                {lastName: containsInsensitive(search)},
                {address: containsInsensitive(search)},
                {phone: containsInsensitive(search)},
                {company: containsInsensitive(search)}
              ]
            }
          }
        }
      ]
    };
  }

  if (data?.softDeleteStatus === ESoftDeleteStatus.deleted) {
    filterAccountStatusQuery = {
      deletedAt: {
        not: null
      }
    };
  }

  if (data?.softDeleteStatus === ESoftDeleteStatus.active) {
    filterAccountStatusQuery = {
      deletedAt: null
    };
  }

  const customers = await prisma.customer.findMany({
    include: {
      addresses: true
    },
    take: pagination.take,
    skip: pagination.skip,
    where: {
      ...searchQuery,
      ...filterAccountStatusQuery,
    },
    orderBy
  });

  pagination.count = customers.length;
  pagination.total = await prisma.customer.count({
    where: {
      ...searchQuery,
      ...filterAccountStatusQuery,
    }
  });

  pagination.hasNext = hasNextCalculate(pagination);

  return json({customers: customers.map(customerMapper), query: makeQuery(search, sort, data), pagination});
}

export type TAdminCustomersLoader = typeof loader;
export type TAdminCustomersLoaderData = SerializeFrom<typeof loader>;
