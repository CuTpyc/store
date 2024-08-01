import React, {useCallback} from 'react';
import {useLoaderData} from '@remix-run/react';
import {Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {ValidatedForm} from 'remix-validated-form';
import {UsersSecurityForm} from '~/admin/components/UsersSecurityForm/UsersSecurityForm';
import {usersSecurityFormValidator} from '~/admin/components/UsersSecurityForm/UsersSecurityForm.validator';
import {adminUsersSecurityAction} from '~/.server/admin/actions/users.security.action';
import {adminUsersSingleLoader} from '~/.server/admin/loaders/users.single.loader';

export const loader = adminUsersSingleLoader;

export const action = adminUsersSecurityAction;

export default function AdminUsersIdSecurity() {
  const {user} = useLoaderData<typeof loader>();

  const primaryAction = useCallback(() => (
    <ValidatedSubmitButton text="save" variant="primary"/>
  ), []);

  return (
    <ValidatedForm validator={usersSecurityFormValidator} method="post">
      <Page
        title={`Edit Security: ${user.fullName}`}
        backAction={{
          url: `${EAdminNavigation.users}/${user.id}`
        }}
        primaryAction={primaryAction()}
      >
        <UsersSecurityForm/>
      </Page>
    </ValidatedForm>
  );
}
