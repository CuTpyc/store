import {BlockStack, Box, Layout} from '@shopify/polaris';
import React from 'react';
import {AddressCard} from '~/admin/components/customers/NewForm/AddressCard';

export const NewForm = () => {
  return (
    <Box paddingBlockEnd="500">
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <AddressCard/>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Box>
  );
};
