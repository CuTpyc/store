import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {authenticator, getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import {productMapper} from '~/.server/admin/mappers/product.mapper';
import {SerializeFrom} from '@remix-run/server-runtime';
import {categoryMapper} from '~/.server/admin/mappers/category.mapper';
import { hasNextCalculate, queryToPagination, requestToSearchParams } from '~/.server/admin/utils/query.util';
import { reviewMapper } from '~/.server/admin/mappers/review.mapper';
import { userMapper } from '~/.server/admin/mappers/user.mapper';

export async function loader({request, params}: LoaderFunctionArgs) {
  const authUser = await getAuthUser(request);

  const searchParams = requestToSearchParams(request);
  const pagination = await queryToPagination(searchParams);

  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.products);
  }

  // get user
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      category: true,
      reviews: {
        where: { deletedAt: null },
        take: pagination.take,
        skip: pagination.skip,
      },
    },
  });

  // if not exist
  if (!product) {
    return redirect(EAdminNavigation.products);
  }

  pagination.count = product.reviews.length;
  pagination.total = await prisma.productReview.count({
    where: { productId: product.id, deletedAt: null }
  });
  pagination.hasNext = hasNextCalculate(pagination);

  const categories = await prisma.category.findMany({
    where: {
      deletedAt: null,
    }
  });

  const reviews = await prisma.productReview.findMany({
    where: { productId: product.id, deletedAt: null },
    take: pagination.take,
    skip: pagination.skip,
  });

  return json({
    user: userMapper(authUser),
    product: productMapper(product),
    categories: categories.map(categoryMapper),
    reviews: reviews.map(reviewMapper),
    pagination
  })
}

export type TAdminProductsSingleLoader = typeof loader;
export type TAdminProductsSingleLoaderData = SerializeFrom<typeof loader>;
