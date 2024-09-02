import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData} from '@remix-run/react';
import { useChangeLanguage } from "remix-i18next/react";
import { useTranslation } from "react-i18next";
import { changeUserLanguageLoader } from './.server/admin/loaders/language/loader';


//import './tailwind.css';
export const loader = changeUserLanguageLoader

export let handle = {

  i18n: "common",
};

export function Layout({children}: { children: React.ReactNode }) {
  let data = useLoaderData<typeof loader>()

  let { locale } = data
  let { i18n } = useTranslation();

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
