import {Outlet, useLoaderData} from '@remix-run/react';
import polarisStylesHref from '@shopify/polaris/build/esm/styles.css?url';
import {LinksFunction} from '@remix-run/node';
import {AppProvider,} from '@shopify/polaris';
import React from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';
import {adminLoader} from '~/.server/admin/loaders/admin.loader';
import { changeUserLanguageLoader } from '~/.server/admin/loaders/language/loader';

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: polarisStylesHref},
];

export const loader = adminLoader;

export const action = changeUserLanguageLoader

export default function Admin() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = useLoaderData<typeof loader>();

  return (
    <AppProvider
      i18n={enTranslations}
    >
      <Outlet/>
    </AppProvider>
  );
}
