import React from 'react';
import {Outlet, useLoaderData} from '@remix-run/react';
import {TAdminProductsSingleLoader} from '~/.server/admin/loaders/products/single/loader';

export {loader} from '~/.server/admin/loaders/products/single/loader';

export default function AdminProductsId() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = useLoaderData<TAdminProductsSingleLoader>();

  return (
    <Outlet/>
  );
}
