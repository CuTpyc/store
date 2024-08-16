import {BlockStack, Box, Layout} from '@shopify/polaris';
import React, {FC} from 'react';
import {TProductDto} from '~/.server/admin/dto/product.dto';
import {PrimaryInfoCard} from '~/admin/components/products/NewForm/PrimaryInfoCard';

type Props = {
  product: Omit<TProductDto, 'category'>
}

export const EditPrimaryForm: FC<Props> = ({product}) => {
  return (
    <Box paddingBlockEnd="500">
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <PrimaryInfoCard product={product}/>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Box>
  );
};
