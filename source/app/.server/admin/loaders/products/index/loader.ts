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

type ProductOrderByWithRelationInput = Prisma.ProductOrderByWithRelationInput;


export const productQueryValidator = withZod(
  z.object({
    softDeleteStatus: z.nativeEnum(ESoftDeleteStatus).optional(),
  })
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loader({request}: LoaderFunctionArgs) {
  const searchParams = requestToSearchParams(request);
  const {data} = await productQueryValidator.validate(
    searchParams
  );
  const search = await queryToSearch(searchParams);
  const pagination = await queryToPagination(searchParams);
  const sort = await queryToSort(searchParams, EProductsSortVariant, EProductsSortVariant.createdAt_desc);
  const orderBy = sortValueToField<ProductOrderByWithRelationInput>(sort);

  let searchQuery;
  let filterAccountStatusQuery;

  if (search) {
    searchQuery = {
      OR: [
        {title: containsInsensitive(search)},
        {slug: containsInsensitive(search)},
        {sku: containsInsensitive(search)},
        {barcode: containsInsensitive(search)},
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

  const products = await prisma.product.findMany({
    take: pagination.take,
    skip: pagination.skip,
    include: {
      category: true,
    },
    where: {
      ...searchQuery,
      ...filterAccountStatusQuery,
    },
    orderBy
  });

  pagination.count = products.length;
  pagination.total = await prisma.product.count({
    where: {
      ...searchQuery,
      ...filterAccountStatusQuery,
    }
  });

  pagination.hasNext = hasNextCalculate(pagination);

  return json({products: products.map(productMapper), query: makeQuery(search, sort, data), pagination});
}

export type TAdminProductsLoader = typeof loader;
export type TAdminProductsLoaderData = SerializeFrom<typeof loader>;
