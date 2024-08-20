import {BlockStack, Box, Layout} from '@shopify/polaris';
import React from 'react';
import { PrimaryInfoCard } from './PrimaryInfoCard';

export const NewForm = () => {
  return (
    <Box paddingBlockEnd="500">
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <PrimaryInfoCard/>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Box>
  );
};
