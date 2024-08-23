import React from 'react';
import {Outlet, useLoaderData} from '@remix-run/react';
import { TAdminReviewsSingleLoader } from '~/.server/admin/loaders/reviews/single/loader';

export {loader} from '~/.server/admin/loaders/reviews/single/loader'

export default function AdminReviewId() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = useLoaderData<TAdminReviewsSingleLoader>();
  return (
    <Outlet/>
  );
}
