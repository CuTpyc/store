import {BlockStack, Layout} from '@shopify/polaris';
import React, {FC} from 'react';
import {PrimaryInfoCard} from './PrimaryInfoCard';
import {TProductDto} from '~/.server/admin/dto/product.dto';
import {CategoryCard} from '~/admin/components/products/Single/CategoryCard';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';

export type SingleProps = {
  product: TProductDto;
  categories: TCategoryDto[];
}

export const Single: FC<SingleProps> = ({product, categories}) => {
  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard product={product}/>
        </BlockStack>
      </Layout.Section>

      <Layout.Section variant="oneThird">
        <CategoryCard product={product} categories={categories}/>
      </Layout.Section>
    </Layout>
  );
};
