import React from 'react';
import {Outlet, useLoaderData} from '@remix-run/react';
import {TAdminCategoriesSingleLoader} from '~/.server/admin/loaders/categories/single/loader';

export {loader} from '~/.server/admin/loaders/categories/single/loader';

export default function AdminCategoriesId() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = useLoaderData<TAdminCategoriesSingleLoader>();

  return (
    <Outlet/>
  );
}
