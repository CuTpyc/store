import React from 'react';
import {useLoaderData} from '@remix-run/react';
import {Page} from '@shopify/polaris';
import {PlusIcon} from '@shopify/polaris-icons';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import type {TAdminProductsLoader} from '~/.server/admin/loaders/products/index/loader';
import {Index} from '~/admin/components/products/Index/Index';
import { useTranslation } from 'react-i18next';

export {loader} from '~/.server/admin/loaders/products/index/loader';


export default function AdminProductsIndex() {
  const data = useLoaderData<TAdminProductsLoader>();
  const {t, i18n} = useTranslation();
  return (
    <Page
      fullWidth
      title={t('product.title')}
      primaryAction={{
        content: t('product.content'),
        icon: PlusIcon,
        accessibilityLabel: t('product.content'),
        url: EAdminNavigation.productsCreate,
      }}
    >
      <Index products={data.products} query={data.query} pagination={data.pagination}/>
    </Page>
  );
}

