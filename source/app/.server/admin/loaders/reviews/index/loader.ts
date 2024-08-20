import {json, LoaderFunctionArgs} from '@remix-run/node';
import {prisma} from '~/.server/shared/services/prisma.service';
import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {Prisma} from '@prisma/client';
import type {SerializeFrom} from '@remix-run/server-runtime';
import {reviewMapper} from '~/.server/admin/mappers/rewiev.mapper';
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
import { EReviewsSortVariant } from '~/admin/components/reviews/Index/Filters';
import {ESoftDeleteStatus} from '~/admin/constants/entries.constant';

type ProductReviewOrderByWithRelationInput = Prisma.ProductReviewOrderByWithRelationInput;


export const reviewQueryValidator = withZod(
  z.object({
    softDeleteStatus: z.nativeEnum(ESoftDeleteStatus).optional(),
  })
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loader({request}: LoaderFunctionArgs) {
  const searchParams = requestToSearchParams(request);
  const {data} = await reviewQueryValidator.validate(
    searchParams
  );
  const search = await queryToSearch(searchParams);
  const pagination = await queryToPagination(searchParams);
  const sort = await queryToSort(searchParams, EReviewsSortVariant, EReviewsSortVariant.createdAt_desc);
  const orderBy = sortValueToField<ProductReviewOrderByWithRelationInput>(sort);

  let searchQuery;
  let filterAccountStatusQuery;

  if (search) {
    searchQuery = {
      OR: [
        {review: containsInsensitive(search)},
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
  console.log("filterAccountStatusQuery  1",filterAccountStatusQuery)
  const Reviews = await prisma.productReview.findMany({
    take: pagination.take,
    skip: pagination.skip,
    where: {
      ...searchQuery,
      ...filterAccountStatusQuery,
    },
    orderBy
  });

  pagination.count = Reviews.length;
  pagination.total = await prisma.productReview.count({
    where: {
      ...searchQuery,
      ...filterAccountStatusQuery,
    }
  });
  console.log("filterAccountStatusQuery  2",filterAccountStatusQuery)
  pagination.hasNext = hasNextCalculate(pagination);

  return json({reviews: Reviews.map(reviewMapper), query: makeQuery(search, sort, data), pagination});
}

export type TAdminReviewsLoader = typeof loader;
export type TAdminReviewsLoaderData = SerializeFrom<typeof loader>;
