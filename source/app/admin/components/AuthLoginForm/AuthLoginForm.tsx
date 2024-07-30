import {FormLayout} from '@shopify/polaris';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedTextField} from '~/admin/ui/ValidatedTextField/ValidatedTextField';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import React from 'react';
import {authLoginFormValidator} from '~/admin/components/AuthLoginForm/AuthLoginForm.validator';
import { ValidatedErrorBanner } from '~/admin/ui/ValidatedErrorBanner/ValidatedErrorBanner';

export const AuthLoginForm = () => {
  return (
    <ValidatedForm validator={authLoginFormValidator} method="post">
      <ValidatedErrorBanner/>

      <FormLayout>
        <ValidatedTextField
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
        />
        <ValidatedTextField
          label="Password"
          type="password"
          name="password"
          autoComplete="on"
        />

        <ValidatedSubmitButton text="Submit"/>
      </FormLayout>
    </ValidatedForm>
  );
};