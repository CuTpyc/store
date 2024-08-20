import React from 'react';
import {useLoaderData} from '@remix-run/react';
import {Page} from '@shopify/polaris';
import {PlusIcon} from '@shopify/polaris-icons';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import type {TAdminReviewsLoader} from '~/.server/admin/loaders/reviews/index/loader';
import { Index } from '~/admin/components/reviews/Index/Index';
export {loader} from '~/.server/admin/loaders/reviews/index/loader';


export default function AdminReviewsIndex() {
  const data = useLoaderData<TAdminReviewsLoader>();

  return (
    <Page
      fullWidth
      title="Reviews"
      primaryAction={{
        content: 'Create Reviews',
        icon: PlusIcon,
        accessibilityLabel: 'Create Reviews',
        url: EAdminNavigation.reviewsCreate,
      }}
    >
      <Index reviews={data.reviews} query={data.query} pagination={data.pagination}/>
    </Page>
  );
}

