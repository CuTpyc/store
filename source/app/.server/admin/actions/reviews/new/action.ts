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

  const {rate, review} = data.data;

  // check rate field

  if (!rate) {
    return validationError({
      fieldErrors: {
        rate: 'You need to set rate'
      }
    });
  }

  // create new Category
  const newReview = await prisma.productReview.create({
    data: {
      rate,
      review,
    },
    include: {
      product: true,
      customer: true
    }
  });

  return redirect(`${EAdminNavigation.categories}/${newReview.id}`);
}
