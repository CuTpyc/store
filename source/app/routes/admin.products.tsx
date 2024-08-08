import { BaseLayout } from '~/admin/layouts/BaseLayout/BaseLayout';
import { Outlet, useRouteLoaderData } from '@remix-run/react';
import { adminLoader } from '~/.server/admin/loaders/admin.loader';
import { adminProductsLoader } from '~/.server/admin/loaders/products.loader';
import { JsonifyObject, TProductDto } from '~/.server/admin/dto/product.dto';

export default function AdminProducts() {
  const data = useRouteLoaderData<typeof adminProductsLoader>('routes/admin/products');
  const products = data?.products;
  console.log(products)
  if (!data?.products) {
    return null;
  }

  return (
    <BaseLayout products={products as TProductDto}>
      <Outlet />
    </BaseLayout>
  );
}
