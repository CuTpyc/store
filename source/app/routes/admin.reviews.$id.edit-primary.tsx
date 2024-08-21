import React, {useCallback} from 'react';
import {Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {useRouteLoaderData} from '@remix-run/react';
import {EditPrimaryForm} from '~/admin/components/reviews/EditPrimaryForm/EditPrimaryForm';
import {editPrimaryFormValidator} from '~/admin/components/reviews/EditPrimaryForm/EditPrimaryForm.validator';
import { TAdminReviewsSingleLoader } from '~/.server/admin/loaders/reviews/single/loader';


export {action} from '~/.server/admin/actions/reviews/edit-primary/action';

export default function AdminProductReviewsIdEditPrimary() {
  const data = useRouteLoaderData<TAdminReviewsSingleLoader>('routes/admin.reviews.$id');

  const primaryAction = useCallback(() => (
    <ValidatedSubmitButton text="save" variant="primary"/>
  ), []);

  if (!data?.review) {
    return null;
  }

  return (
    <ValidatedForm validator={editPrimaryFormValidator} method="post">
      <Page
        title="Edit review primary info"
        backAction={{
          url: `${EAdminNavigation.reviews}/${data.review.id}`,
        }}
        primaryAction={primaryAction()}
      >
        <EditPrimaryForm review={data.review} product={data.product} customer={data.customer}/>
      </Page>
    </ValidatedForm>
  );
}
