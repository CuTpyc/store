import React from 'react';
import {useLoaderData} from '@remix-run/react';
import {Page} from '@shopify/polaris';
import {Index} from '~/admin/components/api/Index/Index';
import { TApiAdminCategoriesLoader } from '~/.server/admin/loaders/api/index/loader';
import { TCategoryDto } from '~/.server/admin/dto/category.dto';

export {loader} from '~/.server/admin/loaders/api/index/loader';


export default function AdminCategoriesIndex() {
  const data = useLoaderData<TApiAdminCategoriesLoader>();
  console.log(data)
  return (
    <Page
      fullWidth
      title="API Categories"
    >
      <Index categories={data.categories as TCategoryDto[]}/>
    </Page>
  );
}

