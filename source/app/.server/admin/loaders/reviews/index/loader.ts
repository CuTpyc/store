import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
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
import { EAdminNavigation } from '~/admin/constants/navigation.constant';
import { authenticator } from '~/.server/admin/services/auth.service';

type ProductReviewOrderByWithRelationInput = Prisma.ProductReviewOrderByWithRelationInput;

export const ReviewQueryValidator = withZod(
  z.object({
    softDeleteStatus: z.nativeEnum(ESoftDeleteStatus).optional(),
  })
);

export async function loader({request}: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  const searchParams = requestToSearchParams(request);
  const { data } = await ReviewQueryValidator.validate(searchParams);
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
    take: pagination.take,
    skip: pagination.skip,
    include: {
      customer: true,
      product: true,
    },
    where: {
      ...searchQuery,
      ...filterAccountStatusQuery,
    },
    orderBy,
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
