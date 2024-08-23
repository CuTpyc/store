import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';

export async function action({request, params}: ActionFunctionArgs) {
  console.warn("Edit-Single")
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.reviews);
  }

  const review = await prisma.productReview.findFirst({
    where: {id: Number(id)}
  });

  if (!review) {
    return redirect(EAdminNavigation.reviews);
  }

  const deleted = await prisma.productReview.update({
    where: {id: Number(id)},
    data: {
      deletedAt: new Date()
    }
  });

  if (deleted) {
    const totalReviews =await prisma.productReview.count({
      where: { productId: review.productId, deletedAt: null }
    });
    const { _avg } = await prisma.productReview.aggregate({
      where: { productId: review.productId, deletedAt: null },
      _avg: { rate: true },
    });
    const avgRate = (_avg.rate && _avg.rate * 100) || 0;

    await prisma.product.update({
      where: { id: review.productId },
      data: { totalReviews, avgRate },
    });

    // return redirect(`${EAdminNavigation.reviews}`);
  }

  return redirect(`${EAdminNavigation.reviews}/${id}`);
}
