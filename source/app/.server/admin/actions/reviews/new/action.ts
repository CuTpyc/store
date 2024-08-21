import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {validationError} from 'remix-validated-form';
import {prisma} from '~/.server/shared/services/prisma.service';
import { newFormValidator } from '~/admin/components/reviews/NewForm/NewForm.validator';

export async function action({request}: ActionFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  // validate form data
  const data = await newFormValidator.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }

  const {rate, review, productId, customerId} = data.data;

  const newReview = await prisma.productReview.create({
    data: { rate, review, productId, customerId }
  });

  if (newReview) {
    const totalReviews = await prisma.productReview.count({
      where: { productId, deletedAt: null }
    });
    const { _avg } = await prisma.productReview.aggregate({
      where: { productId, deletedAt: null },
      _avg: { rate: true }
    });
    const avgRate = (_avg.rate && _avg.rate * 100) || 0;

    await prisma.product.update({
      where: { id: productId },
      data: { totalReviews, avgRate }
    });
  }

  return redirect(`${EAdminNavigation.reviews}/${newReview.id}`);
}
