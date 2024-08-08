import { json, LoaderFunctionArgs } from '@remix-run/node';
import { authenticator } from '~/.server/admin/services/auth.service';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';
import { userMapper } from '~/.server/admin/mappers/user.mapper';
import { prisma } from '~/.server/shared/utils/prisma.util';
import { productMapper } from '../mappers/products.mapper';

export async function adminProductsLoader({ request }: LoaderFunctionArgs) {


  const products = await prisma.product.findMany({
    include: {
      images: true,
    },
  });

  const productsDtos = products.map(productMapper);

  return json({ products: productsDtos});
}
