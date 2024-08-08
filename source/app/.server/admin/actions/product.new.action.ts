import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { authenticator } from '~/.server/admin/services/auth.service';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';
import { validationError } from 'remix-validated-form';
import { customersNewFormValidator } from '~/admin/components/CustomersNewForm/CustomersNewForm.validator';
import { prisma } from '~/.server/shared/utils/prisma.util';
import { hashPassword } from '~/.server/shared/utils/auth.util';
import { productsNewFormValidator } from '~/admin/components/ProductsNewForm/ProductsNewForm.validator';
import { Prisma } from '@prisma/client'; // Add this import

const exist = await prisma.product.findFirst({ where: { name } as Prisma.ProductWhereInput }); // Update the type assertion here
export async function adminProductsNewAction({ request }: ActionFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  // validate form data
  const data = await productsNewFormValidator.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }
  const { title, price, quantity, description } = data.data as {
    title: string;
    price: number;
    quantity: number;
    description: string;
    [key: string]: any;
  };

  // check unique product title
  const exist = await prisma.product.findFirst({ where: { title } as Prisma.ProductWhereInput });
  if (exist) {
    return validationError({
      fieldErrors: {
        title: 'Product already exists',
      },
    });
  }

  // create new Product
  const newProduct = await prisma.product.create({
    data: {
      title,
      price,
      description,
    },
  });

  return redirect(`${EAdminNavigation.products}/${newProduct.id}`);
}
