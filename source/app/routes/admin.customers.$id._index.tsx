import React, {useCallback, useMemo, useState} from 'react';
import {useRouteLoaderData} from '@remix-run/react';
import {Modal, Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {TAdminCustomersSingleLoader} from '~/.server/admin/loaders/customers/single/loader';
import {Single} from '~/admin/components/customers/Single/Single';
import {CustomerDeleteForm} from '~/admin/components/customers/Single/CustomerDeleteForm';

export {action} from '~/.server/admin/actions/customers/single/action';

export default function AdminCustomersSingle() {
  const data = useRouteLoaderData<TAdminCustomersSingleLoader>('routes/admin.customers.$id');
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const deleteAction = useMemo(() => (
    {
      content: 'Delete customer',
      destructive: true,
      onAction: toggleActive,
    }
  ), [toggleActive]);

  const secondaryActions = useMemo(() => {
    return data?.customer.deletedAt ? [] : [deleteAction];
  }, [deleteAction, data?.customer.deletedAt]);

  if (!data?.customer) {
    return null;
  }
  
  return (
    <Page
      title={`${data?.customer.firstName} ${data?.customer.lastName}`}
      backAction={{
        url: EAdminNavigation.customers
      }}
      secondaryActions={secondaryActions}
    >
      <Single customer={data?.customer}/>
      <Modal
        size="small"
        open={active}
        onClose={toggleActive}
        title="Delete customer"
      >
        <CustomerDeleteForm toggleActive={toggleActive} customer={data?.customer}/>
      </Modal>
    </Page>
  );
}
