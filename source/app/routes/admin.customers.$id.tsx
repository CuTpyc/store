import React from 'react';
import {Outlet, useLoaderData} from '@remix-run/react';
import {TAdminCustomersSingleLoader} from '~/.server/admin/loaders/customers/single/loader';

export {loader} from '~/.server/admin/loaders/customers/single/loader';

export default function AdminCustomersSingle() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = useLoaderData<TAdminCustomersSingleLoader>();

  return (
    <Outlet/>
  );
}
