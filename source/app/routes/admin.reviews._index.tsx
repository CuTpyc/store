import {useLoaderData} from '@remix-run/react';
import {Page} from '@shopify/polaris';
import {PlusIcon} from '@shopify/polaris-icons';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import type { TAdminReviewsLoaderData } from '~/.server/admin/loaders/reviews/index/loader';
import {Index} from '~/admin/components/reviews/Index/Index';

export {loader} from '~/.server/admin/loaders/reviews/index/loader';


export default function AdminProductReviewsIndex() {
  const data = useLoaderData<TAdminReviewsLoaderData>();

  return (
    <Page
      fullWidth
      title="Reviews"
      primaryAction={{
        content: "Create reviews",
        icon: PlusIcon,
        accessibilityLabel: "Create reviews",
        url: EAdminNavigation.reviewsCreate,
      }}
    >
      <Index
        reviews={data.reviews}
        query={data.query}
        pagination={data.pagination}
      />
    </Page>
  );
}

