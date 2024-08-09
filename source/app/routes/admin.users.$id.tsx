import { useState, useCallback } from 'react';
import { useLoaderData, useActionData, useSubmit } from '@remix-run/react';
import { Page, Banner } from '@shopify/polaris';
import { adminUsersSingleLoader } from '~/.server/admin/loaders/users.single.loader';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';
import { UsersSingle } from '~/admin/components/UsersSingle/UsersSingle';
import { LoaderFunctionArgs } from '@remix-run/node';
import { TUserDto } from '~/.server/admin/dto/user.dto';
import DeleteUserModal from '~/admin/components/UsersSingle/DeleteUserModal';
import { adminUsersModificationAction } from '~/.server/admin/actions/users.modification.actions';

export const loader = adminUsersSingleLoader;

export const action = adminUsersModificationAction;

export default function AdminUsersSingle() {
  const data = useLoaderData<{ user: TUserDto }>();
  const actionData = useActionData();
  const [active, setActive] = useState(false);
  const submit = useSubmit();

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  if (!data || !data.user) {
    return <div>Loading...</div>;
  }

  const { user } = data;

  const handleDelete = () => {
    setActive(false);
    submit(
      { deletedAt: user.deletedAt, actionType: 'deleteUser' },
      { method: 'post', action: `/admin/users/${user.id}` }
    );
  };

  const secondaryActions = [];

  if (!user.deletedAt) {
    secondaryActions.push({
      content: 'Remove',
      onAction: toggleActive,
      destructive: true,
      accessibilityLabel: 'Delete User',
    });
  }

  secondaryActions.push({
    content: 'Security',
    accessibilityLabel: 'Security',
    url: `${EAdminNavigation.users}/${user.id}/security`,
  });

  return (
    <Page
      title={user.fullName || ''}
      backAction={{
        url: EAdminNavigation.users,
      }}
      secondaryActions={secondaryActions}
    >
      {actionData?.error && (
        <Banner status='critical'>
          <p>{actionData.error}</p>
        </Banner>
      )}
      <UsersSingle user={user} />
      <DeleteUserModal
        active={active}
        toggleActive={toggleActive}
        handleDelete={handleDelete}
        error={actionData?.error}
      />
    </Page>
  );
}
