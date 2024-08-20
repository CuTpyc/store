import {json, LoaderFunctionArgs} from '@remix-run/node';
import {prisma} from '~/.server/shared/services/prisma.service';
import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {Prisma} from '@prisma/client';
import type {SerializeFrom} from '@remix-run/server-runtime';
import {productMapper} from '~/.server/admin/mappers/product.mapper';
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
import {EProductsSortVariant} from '~/admin/components/products/Index/Filters';
import {ESoftDeleteStatus} from '~/admin/constants/entries.constant';
import { apiProductMapper } from '~/.server/admin/mappers/api/products.mapper';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loader({request}: LoaderFunctionArgs) {
  const searchParams = requestToSearchParams(request);
  const search = await queryToSearch(searchParams);

  let searchQuery;

  if (search) {
    searchQuery = {
      OR: [
        {title: containsInsensitive(search)},
        {slug: containsInsensitive(search)},
      ]
    };
  }



  const products = await prisma.product.findMany({
    take: 10,
    skip: 0,
    include: {
      category: true,
    },
    where: {
      ...searchQuery,
    },
    orderBy: {
      title: 'asc'
    }
  });



  return json({products: products.map(apiProductMapper)});
}

export type TAdminApiProductsLoader = typeof loader;
export type TAdminApiProductsLoaderData = SerializeFrom<typeof loader>;
