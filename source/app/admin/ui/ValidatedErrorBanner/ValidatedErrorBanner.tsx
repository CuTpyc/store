import {useField} from 'remix-validated-form';
import {Banner, Box} from '@shopify/polaris';
import React from 'react';
import {BannerProps} from '@shopify/polaris/build/ts/src/components/Banner/Banner';

export type ValidatedErrorBannerProps = BannerProps & {
  name?: string;
}

export const ValidatedErrorBanner = (props: ValidatedErrorBannerProps) => {
  const {name = 'error', tone = 'warning', ...rest} = props;
  const {error} = useField(name);

  if (!error) {
    return;
  }

  return (
    <Box paddingBlockStart="200">
      <Banner tone={tone} {...rest}>
        <p>
          {error}
        </p>
      </Banner>
    </Box>
  );
};
