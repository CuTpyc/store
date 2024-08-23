import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import {SerializeFrom} from '@remix-run/server-runtime';
import { productMapper } from '~/.server/admin/mappers/product.mapper';
import { customerMapper } from '~/.server/admin/mappers/customer.mapper';
import { reviewMapper } from '~/.server/admin/mappers/review.mapper';
import { hasNextCalculate, makeQuery, queryToPagination, queryToSearch, queryToSort, requestToSearchParams, sortValueToField } from '~/.server/admin/utils/query.util';
import { ReviewQueryValidator } from '../index/loader';
import { containsInsensitive } from '~/.server/shared/utils/prisma.util';
import { EReviewsSortVariant } from '~/admin/components/reviews/Index/Filters';
import { ESoftDeleteStatus } from '~/admin/constants/entries.constant';
import { Prisma } from '@prisma/client';

type ProductReviewOrderByWithRelationInput = Prisma.ProductReviewOrderByWithRelationInput;

export async function loader({request, params}: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  // const {id} = params;
  // if (!id) {
  //   return redirect(EAdminNavigation.reviews);
  // }

  // const review = await prisma.productReview.findFirst({
  //   where: {id: Number(id)}
  // });

  // if (!review) {
  //   return redirect(EAdminNavigation.reviews);
  // }

  // const product = await prisma.product.findFirst({
  //   where: { id: review.productId },
  //   include: {
  //     reviews: true,
  //     category: true,
  //   }
  // });
  // const customer = await prisma.customer.findFirst({
  //   where: { id: review.customerId },
  //   include: {
  //     addresses: true,
  //     reviews: true,
  //   }
  // });
  // if (!product || !customer) {
  //   return redirect(EAdminNavigation.reviews);
  // }

  // return json({
  //   review: reviewMapper(review),
  //   product: productMapper(product),
  //   customer: customerMapper(customer),
  // });

  const searchParams = requestToSearchParams(request);
  const { data } = await ReviewQueryValidator.validate(searchParams);
  const search = await queryToSearch(searchParams);
  const pagination = await queryToPagination(searchParams);
  const sort = await queryToSort(searchParams, EReviewsSortVariant, EReviewsSortVariant.createdAt_desc);
  const orderBy = sortValueToField<ProductReviewOrderByWithRelationInput>(sort);

  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.reviews);
  }

  const review = await prisma.productReview.findFirst({
    where: {
      id: Number(id)
    },
    include: {
      customer: true,
      product: true,
    },

  });

  if (!review) {
    return redirect(EAdminNavigation.reviews);
  }

  return json({ review: reviewMapper(review)});
}

export type TAdminReviewsSingleLoader = typeof loader;
export type TAdminReviewsSingleLoaderData = SerializeFrom<typeof loader>;
