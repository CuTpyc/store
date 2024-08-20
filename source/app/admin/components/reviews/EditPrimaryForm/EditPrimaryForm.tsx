import {BlockStack, Box, Layout} from '@shopify/polaris';
import React, {FC} from 'react';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';
import {PrimaryInfoCard} from '~/admin/components/categories/NewForm/PrimaryInfoCard';

type Props = {
  category: Omit<TCategoryDto, 'addresses'>
}

export const EditPrimaryForm: FC<Props> = ({category}) => {
  return (
    <Box paddingBlockEnd="500">
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <PrimaryInfoCard category={category}/>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Box>
  );
};
