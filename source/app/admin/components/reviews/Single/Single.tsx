import {BlockStack, Layout} from '@shopify/polaris';
import React, {FC} from 'react';
import {PrimaryInfoCard} from './PrimaryInfoCard';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';

export type SingleProps = {
  category: TCategoryDto;
}

export const Single: FC<SingleProps> = ({category}) => {
  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard category={category}/>
        </BlockStack>
      </Layout.Section>

      <Layout.Section variant="oneThird">
      </Layout.Section>
    </Layout>
  );
};
