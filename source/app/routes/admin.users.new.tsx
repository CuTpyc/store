import React, {useCallback} from 'react';
import {Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {UsersNewForm} from '~/admin/components/UsersNewForm/UsersNewForm';
import {usersNewFormValidator} from '~/admin/components/UsersNewForm/UsersNewForm.validator';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {adminUsersNewAction} from '~/.server/admin/actions/users.new.action';
import { adminUsersNewLoader } from '~/.server/admin/loaders/users.new.loader';

export const loader = adminUsersNewLoader;
export const action = adminUsersNewAction;

export default function AdminUsersNew() {
  const primaryAction = useCallback(() => (
    <ValidatedSubmitButton text="save" variant="primary"/>
  ), []);

  return (
    <ValidatedForm validator={usersNewFormValidator} method="post">
      <Page
        title="Create new user"
        backAction={{
          url: EAdminNavigation.users
        }}
        primaryAction={primaryAction()}
      >
        <UsersNewForm/>
      </Page>
    </ValidatedForm>
  );
}
