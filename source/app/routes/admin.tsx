import { Outlet } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import polarisStylesHref from '@shopify/polaris/build/esm/styles.css?url';
import enTranslations from '@shopify/polaris/locales/en.json';

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: polarisStylesHref },
  ];

  import {
    AppProvider,
    Page,
    LegacyCard,
    ResourceList,
    Avatar,
    Text,
  } from '@shopify/polaris';
  import React from 'react';


export default function Admin(){
    return (
        <AppProvider
          i18n={enTranslations}
        >
         
         <Outlet/>
        </AppProvider>
      );
}