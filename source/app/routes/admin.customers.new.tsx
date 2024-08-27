import React, {useCallback} from 'react';
import {Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {newFormValidator} from '~/admin/components/customers/NewForm/NewForm.validator';
import {NewForm} from '~/admin/components/customers/NewForm/NewForm';

export {loader} from '~/.server/admin/loaders/customers/new/loader';
export {action} from '~/.server/admin/actions/customers/new/action';

export default function AdminCustomerNew() {
  const primaryAction = useCallback(() => (
    <ValidatedSubmitButton text="save" variant="primary"/>
  ), []);

  return (
    <ValidatedForm validator={newFormValidator} method="post">
      <Page
        title="Create new customer"
        backAction={{
          url: EAdminNavigation.customers
        }}
        primaryAction={primaryAction()}
      >
        <NewForm/>
      </Page>
    </ValidatedForm>
  );
}
