import React, {useCallback} from 'react';
import {Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {newFormValidator} from '~/admin/components/customers/addresses/NewForm/NewForm.validator';
import {NewForm} from '~/admin/components/customers/addresses/NewForm/NewForm';
import {useRouteLoaderData} from '@remix-run/react';
import {TAdminCustomersSingleLoader} from '~/.server/admin/loaders/customers/single/loader';

export {action} from '~/.server/admin/actions/customers/addresses/new/action';

export default function AdminCustomerAddressNew() {
  const data = useRouteLoaderData<TAdminCustomersSingleLoader>('routes/admin.customers.$id');

  const primaryAction = useCallback(() => (
    <ValidatedSubmitButton text="save" variant="primary"/>
  ), []);

  if (!data?.customer) {
    return null;
  }

  return (
    <ValidatedForm validator={newFormValidator} method="post">
      <Page
        title={`Create new address for customer: ${data.customer.firstName} ${data.customer.lastName}`}
        backAction={{
          url: `${EAdminNavigation.customers}/${data.customer.id}`,
        }}
        primaryAction={primaryAction()}
      >
        <NewForm/>
      </Page>
    </ValidatedForm>
  );
}
