// admin.customers.$id_.address.tsx
import React, { useCallback } from 'react';
import { useLoaderData } from '@remix-run/react';
import { Page } from '@shopify/polaris';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';
import { ValidatedSubmitButton } from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import { ValidatedForm } from 'remix-validated-form';
import { addressFormValidator } from '~/admin/components/CustomersAddressForm/CustomersAddressForm.validator';
import { customersAddressAction } from '~/.server/admin/actions/customers.address.action';
import { customersSingleLoader } from '~/.server/admin/loaders/customers.single.loader';
import { PrimaryCustomerAddress } from '~/admin/components/CustomersNewForm/PrimaryCustomerAddress';

export const loader = customersSingleLoader;

export const action = customersAddressAction;

export default function AdminCustomersIdAddress() {
  const { customer } = useLoaderData<typeof loader>();

  const primaryAction = useCallback(
    () => <ValidatedSubmitButton text='Save' variant='primary' />,
    []
  );

  return (
    <ValidatedForm validator={addressFormValidator} method='post'>
      <Page
        title={`Edit Address: ${customer.firstName} ${customer.lastName}`}
        backAction={{
          url: `${EAdminNavigation.customers}/${customer.id}`,
        }}
        primaryAction={primaryAction()}
      >
        <PrimaryCustomerAddress address={customer.addresses[0] || {}} />
      </Page>
    </ValidatedForm>
  );
}
