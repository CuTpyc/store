import { BaseLayout } from '~/admin/layouts/BaseLayout/BaseLayout';
import { Outlet, useRouteLoaderData } from '@remix-run/react';
import { adminLoader } from '~/.server/admin/loaders/admin.loader';

export default function AdminUsers() {
  const data = useRouteLoaderData<typeof adminLoader>('routes/admin');

  if (!data?.user) {
    return null;
  }

  return (
    <BaseLayout user={data.user}>
      <Outlet />
    </BaseLayout>
  );
}
