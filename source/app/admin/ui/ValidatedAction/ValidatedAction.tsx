import React from 'react';
import {FORM_ACTION_FIELD} from '~/admin/constants/action.constant';
import {BannerProps} from '@shopify/polaris/build/ts/src/components/Banner/Banner';
import {useField} from 'remix-validated-form';
import {Banner} from '@shopify/polaris';

export type ValidateActionProps = BannerProps & {
  action: string;
}

export const ValidatedAction = (props: ValidateActionProps) => {
  const {action, tone = 'critical', ...rest} = props;
  const {error} = useField(FORM_ACTION_FIELD);

  if (!error) {
    return (
      <input type="hidden" name={FORM_ACTION_FIELD} value={action}/>
    );
  }

  return (
    <Banner tone={tone} {...rest}>
      <p>
        {error}
      </p>
      <input type="hidden" name={FORM_ACTION_FIELD} value={action}/>
    </Banner>
  );
};
