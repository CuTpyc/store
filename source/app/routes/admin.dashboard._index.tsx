import React from 'react';
import {useLoaderData} from '@remix-run/react';
import {adminDashboardLoader} from '~/.server/admin/loaders/dashboard.loader';
import {useTranslation} from 'react-i18next';
import {MetaFunction} from '@remix-run/node';

export const loader = adminDashboardLoader;

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    {
      title: data?.meta.title,
    }
  ];
};

export default function DashboardIndex() {
  const data = useLoaderData<typeof loader>();

  const {t, i18n} = useTranslation();

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">{t('page.dashboard.title')}</h1>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
