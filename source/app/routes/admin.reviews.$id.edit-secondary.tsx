import React, {useCallback, useState} from 'react';
import {Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {useRouteLoaderData} from '@remix-run/react';
import { TAdminReviewsSingleLoader } from '~/.server/admin/loaders/reviews/single/loader';
import { ReviewSecondaryInfoEditForm } from '~/admin/components/reviews/Single/ReviewSecondaryInfoEditForm';
import { reviewSecondaryInfoEditFormValidator } from '~/admin/components/reviews/Single/ReviewSecondaryInfoEditForm.validator';

export {action} from '~/.server/admin/actions/reviews/edit-primary/action';


export default function AdminReviewIdEditPrimary() {
  const data = useRouteLoaderData<TAdminReviewsSingleLoader>('routes/admin.reviews.$id');


  const primaryAction = useCallback(() => (
    <ValidatedSubmitButton text="save" variant="primary"/>
  ), []);

  if (!data?.review) {
    return null;
  }

  return (
    <ValidatedForm validator={reviewSecondaryInfoEditFormValidator} method="post">
      <Page
        title="Edit review secondary info"
        backAction={{
          url: `${EAdminNavigation.reviews}/${data.review.id}`,
        }}
        primaryAction={primaryAction()}
      >
        <ReviewSecondaryInfoEditForm review={data?.review} product={data?.review.product} customer={data?.review.customer}/>
      </Page>
    </ValidatedForm>
  );
}
