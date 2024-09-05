import {Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData,} from '@remix-run/react';
import {json, LoaderFunctionArgs} from '@remix-run/node';
import {useTranslation} from 'react-i18next';
import {useChangeLanguage} from 'remix-i18next/react';
import i18nServer from './.server/admin/services/i18next.service';
import { changeUserLanguage } from './.server/admin/loaders/language/loader';


export const loader = changeUserLanguage


export function Layout({children}: { children: React.ReactNode }) {
  const {locale} = useLoaderData<typeof loader>();
  const {i18n} = useTranslation();

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()}>
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <Meta/>
      <Links/>
    </head>
    <body>
    {children}
    <ScrollRestoration/>
    <Scripts/>
    </body>
    </html>
  );
}

export default function App() {
  return <Outlet/>;
}
