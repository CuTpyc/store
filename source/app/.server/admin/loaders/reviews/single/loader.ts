import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import {SerializeFrom} from '@remix-run/server-runtime';
import { productMapper } from '~/.server/admin/mappers/product.mapper';
import { customerMapper } from '~/.server/admin/mappers/customer.mapper';
import { reviewMapper } from '~/.server/admin/mappers/review.mapper';

export async function loader({request, params}: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.reviews);
  }

  const productReview = await prisma.productReview.findFirst({
    where: {id: Number(id)}
  });

  if (!productReview) {
    return redirect(EAdminNavigation.reviews);
  }

  const product = await prisma.product.findFirst({
    where: { id: productReview.productId },
    include: {
      reviews: true,
      category: true,
    }
  });
  const customer = await prisma.customer.findFirst({
    where: { id: productReview.customerId },
    include: {
      addresses: true,
      reviews: true,
    }
  });
  if (!product || !customer) {
    return redirect(EAdminNavigation.reviews);
  }

  return json({
    review: reviewMapper(productReview),
    product: productMapper(product),
    customer: customerMapper(customer),
  });
}

export type TAdminReviewsSingleLoader = typeof loader;
export type TAdminReviewsSingleLoaderData = SerializeFrom<typeof loader>;
