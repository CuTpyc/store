import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import {validationError} from 'remix-validated-form';
import {editPrimaryFormValidator} from '~/admin/components/products/EditPrimaryForm/EditPrimaryForm.validator';

export async function action({request, params}: ActionFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.products);
  }

  // get product
  const product = await prisma.product.findFirst({
    where: {id: Number(id)}
  });

  // if not exist
  if (!product) {
    return redirect(EAdminNavigation.products);
  }

  // validate form data
  const data = await editPrimaryFormValidator.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }

  const {slug} = data.data;

  // check unique slug
  const exist = await prisma.product.findFirst({
    where: {
      slug,
      id: {
        not: Number(id)
      }
    }
  });

  if (exist) {
    return validationError({
      fieldErrors: {
        slug: 'Product with this slug already exist'
      }
    });
  }

  // update Product
  await prisma.product.update({
    where: {id: Number(id)},
    data: {
      ...data.data
    }
  });

  // redirect to user page
  return redirect(`${EAdminNavigation.products}/${id}`);
}
