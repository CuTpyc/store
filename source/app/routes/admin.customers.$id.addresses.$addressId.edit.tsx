import React, {useCallback, useMemo, useState} from 'react';
import {Modal, Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {useLoaderData, useRouteLoaderData} from '@remix-run/react';
import {TAdminCustomersSingleLoader} from '~/.server/admin/loaders/customers/single/loader';
import {TAdminCustomersAddressEditLoader} from '~/.server/admin/loaders/customers/addresses/edit/loader';
import {EditForm} from '~/admin/components/customers/addresses/EditForm/EditForm';
import {editFormValidator} from '~/admin/components/customers/addresses/EditForm/EditForm.validator';
import {AddressDeleteForm} from '~/admin/components/customers/Single/AddressDeleteForm';

export {loader} from '~/.server/admin/loaders/customers/addresses/edit/loader';
export {action} from '~/.server/admin/actions/customers/addresses/edit/action';

export default function AdminCustomerAddressEdit() {
  const data = useRouteLoaderData<TAdminCustomersSingleLoader>('routes/admin.customers.$id');
  const {customerAddress} = useLoaderData<TAdminCustomersAddressEditLoader>();
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const primaryAction = useCallback(() => (
    <ValidatedSubmitButton text="save" variant="primary"/>
  ), []);

  const deleteAction = useMemo(() => (
    {
      content: 'Delete address',
      destructive: true,
      onAction: toggleActive,
    }
  ), [toggleActive]);

  const secondaryActions = useMemo(() => ([deleteAction]), [deleteAction]);

  if (!data?.customer) {
    return null;
  }

  return (
    <>
      <ValidatedForm validator={editFormValidator} method="post">
        <Page
          title={`Create new address for customer: ${data.customer.firstName} ${data.customer.lastName}`}
          backAction={{
            url: `${EAdminNavigation.customers}/${data.customer.id}`,
          }}
          primaryAction={primaryAction()}
          secondaryActions={secondaryActions}
        >
          <EditForm address={customerAddress}/>
        </Page>
      </ValidatedForm>
      <Modal
        size="small"
        open={active}
        onClose={toggleActive}
        title={`Delete address id: ${customerAddress.id}`}
      >
        <AddressDeleteForm toggleActive={toggleActive} address={customerAddress}/>
      </Modal>
    </>
  );
}
