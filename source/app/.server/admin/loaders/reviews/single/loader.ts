import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import { reviewMapper } from '~/.server/admin/mappers/rewiev.mapper';
import {SerializeFrom} from '@remix-run/server-runtime';

export async function loader({request, params}: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.categories);
  }

  // get user
  const review = await prisma.productReview.findFirst({
    where: {id: Number(id)}
  });

  // if not exist
  if (!review) {
    return redirect(EAdminNavigation.categories);
  }

  return json({review: reviewMapper(review)});
}

export type TAdminReviewSingleLoader = typeof loader;
export type TAdminReviewSingleLoaderData = SerializeFrom<typeof loader>;
