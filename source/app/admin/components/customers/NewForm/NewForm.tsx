import {BlockStack, Box, Layout} from '@shopify/polaris';
import React from 'react';
import {PrimaryInfoCard} from './PrimaryInfoCard';
import {SecurityCard} from './SecurityCard';
import {AddressCard} from './AddressCard';

export const NewForm = () => {
  return (
    <Box paddingBlockEnd="500">
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <PrimaryInfoCard/>
            <SecurityCard/>
            <AddressCard/>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Box>
  );
};
