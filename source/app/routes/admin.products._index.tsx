import React from 'react';
import {useLoaderData} from '@remix-run/react';
import {Page} from '@shopify/polaris';
import {PlusIcon} from '@shopify/polaris-icons';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import type {TAdminProductsLoader} from '~/.server/admin/loaders/products/index/loader';
import {Index} from '~/admin/components/products/Index/Index';

export {loader} from '~/.server/admin/loaders/products/index/loader';


export default function AdminProductsIndex() {
  const data = useLoaderData<TAdminProductsLoader>();

  return (
    <Page
      fullWidth
      title="Products"
      primaryAction={{
        content: 'Create product',
        icon: PlusIcon,
        accessibilityLabel: 'Create product',
        url: EAdminNavigation.productsCreate,
      }}
    >
      <Index products={data.products} query={data.query} pagination={data.pagination}/>
    </Page>
  );
}

