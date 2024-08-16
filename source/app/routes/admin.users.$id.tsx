import React, {useCallback, useMemo, useState} from 'react';
import {useLoaderData} from '@remix-run/react';
import {Modal, Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {UsersSingle} from '~/admin/components/UsersSingle/UsersSingle';
import {adminUsersSingleLoader} from '~/.server/admin/loaders/users.single.loader';
import {adminUsersSingleAction} from '~/.server/admin/actions/users.single.action';
import {UsersDeleteForm} from '~/admin/components/UsersSingle/UsersDeleteForm';

export const loader = adminUsersSingleLoader;

export const action = adminUsersSingleAction;

export default function AdminUsersSingle() {
  const {user} = useLoaderData<typeof loader>();
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const deleteAction = useMemo(() => (
    {
      content: 'Delete user',
      destructive: true,
      onAction: toggleActive,
    }
  ), [toggleActive]);

  const securityAction = useMemo(() => (
    {
      content: 'Security',
      accessibilityLabel: 'Security',
      url: `${EAdminNavigation.users}/${user.id}/security`
    }
  ), [user.id]);

  const secondaryActions = useMemo(() => {
    return user.deletedAt ? [securityAction] : [deleteAction, securityAction];
  }, [deleteAction, securityAction, user.deletedAt]);

  return (
    <Page
      title={user.fullName || ''}
      backAction={{
        url: EAdminNavigation.users
      }}
      secondaryActions={secondaryActions}
    >
      <UsersSingle user={user}/>
      <Modal
        size="small"
        open={active}
        onClose={toggleActive}
        title="Delete user"
      >
        <UsersDeleteForm toggleActive={toggleActive} fullName={user.fullName}/>
      </Modal>
    </Page>
  );
}
