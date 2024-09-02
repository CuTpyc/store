import React from 'react';
import {useLoaderData} from '@remix-run/react';
import {adminDashboardLoader} from '~/.server/admin/loaders/dashboard.loader';
import { useTranslation } from 'react-i18next';

export const loader = adminDashboardLoader;

export default function DashboardIndex() {
  const data = useLoaderData<typeof loader>();
  let { t } = useTranslation();
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">{t('dashboard.hello')}</h1>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
