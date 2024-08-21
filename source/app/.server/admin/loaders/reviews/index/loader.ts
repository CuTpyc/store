import {json, LoaderFunctionArgs} from '@remix-run/node';
import {prisma} from '~/.server/shared/services/prisma.service';
import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {Prisma} from '@prisma/client';
import type {SerializeFrom} from '@remix-run/server-runtime';
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
import {ESoftDeleteStatus} from '~/admin/constants/entries.constant';
import { EReviewsSortVariant } from '~/admin/components/reviews/Index/Filters';
import { reviewMapper } from '~/.server/admin/mappers/review.mapper';

type ProductReviewOrderByWithRelationInput = Prisma.ProductReviewOrderByWithRelationInput;

export const ProductReviewQueryValidator = withZod(
  z.object({
    softDeleteStatus: z.nativeEnum(ESoftDeleteStatus).optional(),
  })
);

export async function loader({request}: LoaderFunctionArgs) {
  const searchParams = requestToSearchParams(request);
  const { data } = await ProductReviewQueryValidator.validate(searchParams);
  const search = await queryToSearch(searchParams);
  const pagination = await queryToPagination(searchParams);
  const sort = await queryToSort(searchParams, EReviewsSortVariant, EReviewsSortVariant.createdAt_desc);
  const orderBy = sortValueToField<ProductReviewOrderByWithRelationInput>(sort);

  let searchQuery;
  let filterAccountStatusQuery;

  if (search) {
    searchQuery = {
      OR: [{ review: containsInsensitive(search) }],
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

  const reviews = await prisma.productReview.findMany({
    where: {
      ...searchQuery,
      ...filterAccountStatusQuery,
    },
    include: {
      product: true,
      customer: true,
    },
    take: pagination.take,
    skip: pagination.skip,
    orderBy
  });

  pagination.count = reviews.length;
  pagination.total = await prisma.productReview.count({
    where: {
      ...searchQuery,
      ...filterAccountStatusQuery,
    }
  });

  pagination.hasNext = hasNextCalculate(pagination);

  return json({ reviews: reviews.map(reviewMapper), query: makeQuery(search, sort, data), pagination });
}

export type TAdminReviewsLoader = typeof loader;
export type TAdminReviewsLoaderData = SerializeFrom<typeof loader>;
