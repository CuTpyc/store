import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {validationError} from 'remix-validated-form';
import {prisma} from '~/.server/shared/services/prisma.service';
import {newFormValidator} from '~/admin/components/products/NewForm/NewForm.validator';

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

  const {description, title, slug, sku, compareAtPrice, price, barcode, quantity, costPerItem} = data.data;

  // check unique slug
  const exist = await prisma.product.findFirst({where: {slug}});
  if (exist) {
    return validationError({
      fieldErrors: {
        email: 'Product with this slug already exist'
      }
    });
  }

  // create new Product
  const newProduct = await prisma.product.create({
    data: {
      slug,
      title,
      description,
      sku,
      compareAtPrice,
      price,
      barcode,
      quantity,
      costPerItem,
    }
  });

  return redirect(`${EAdminNavigation.products}/${newProduct.id}`);
}
