import React, {useCallback} from 'react';
import {Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {useRouteLoaderData} from '@remix-run/react';
import {TAdminProductsSingleLoader} from '~/.server/admin/loaders/products/single/loader';
import {EditPrimaryForm} from '~/admin/components/products/EditPrimaryForm/EditPrimaryForm';
import {editPrimaryFormValidator} from '~/admin/components/products/EditPrimaryForm/EditPrimaryForm.validator';

export {action} from '~/.server/admin/actions/products/edit-primary/action';

export default function AdminProductsIdEditPrimary() {
  const data = useRouteLoaderData<TAdminProductsSingleLoader>('routes/admin.products.$id');

  const primaryAction = useCallback(() => (
    <ValidatedSubmitButton text="save" variant="primary"/>
  ), []);

  if (!data?.product) {
    return null;
  }

  return (
    <ValidatedForm validator={editPrimaryFormValidator} method="post">
      <Page
        title="Edit product primary info"
        backAction={{
          url: `${EAdminNavigation.products}/${data.product.id}`,
        }}
        primaryAction={primaryAction()}
      >
        <EditPrimaryForm product={data.product}/>
      </Page>
    </ValidatedForm>
  );
}
