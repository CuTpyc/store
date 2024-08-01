import React, {useCallback} from 'react';
import {useLoaderData} from '@remix-run/react';
import {adminDashboardLoader} from '~/.server/admin/loaders/dashboard.loader';
import {Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {ValidatedForm} from 'remix-validated-form';
import {UsersPrimaryInfoForm} from '~/admin/components/UsersPrimaryInfoForm/UsersPrimaryInfoForm';
import {usersPrimaryInfoFormValidator} from '~/admin/components/UsersPrimaryInfoForm/UsersPrimaryInfoForm.validator';
import {adminUsersPrimaryAction} from '~/.server/admin/actions/users.primary.action';

export const loader = adminDashboardLoader;

export const action = adminUsersPrimaryAction;

export default function AdminUsersIdPrimary() {
  const {user} = useLoaderData<typeof loader>();

  const primaryAction = useCallback(() => (
    <ValidatedSubmitButton text="save" variant="primary"/>
  ), []);

  return (
    <ValidatedForm validator={usersPrimaryInfoFormValidator} method="post">
      <Page
        title={`Edit Info: ${user.fullName}`}
        backAction={{
          url: `${EAdminNavigation.users}/${user.id}`
        }}
        primaryAction={primaryAction()}
      >
        <UsersPrimaryInfoForm user={user}/>
      </Page>
    </ValidatedForm>
  );
}
