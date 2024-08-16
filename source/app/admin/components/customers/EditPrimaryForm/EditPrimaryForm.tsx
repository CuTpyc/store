import {BlockStack, Box, Layout} from '@shopify/polaris';
import React, {FC} from 'react';
import {TCustomerDto} from '~/.server/admin/dto/customer.dto';
import {PrimaryInfoCard} from '~/admin/components/customers/NewForm/PrimaryInfoCard';

type Props = {
  customer: Omit<TCustomerDto, 'addresses'>
}

export const EditPrimaryForm: FC<Props> = ({customer}) => {
  return (
    <Box paddingBlockEnd="500">
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <PrimaryInfoCard customer={customer}/>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Box>
  );
};
