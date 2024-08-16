import {BlockStack, Button, Card, InlineGrid, Modal, Text} from '@shopify/polaris';
import {EditIcon} from '@shopify/polaris-icons';
import React, {FC, useCallback, useState} from 'react';
import {TProductDto} from '~/.server/admin/dto/product.dto';
import {CategoryForm} from '~/admin/components/products/Single/CategoryForm';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';

type Props = {
  product: Pick<TProductDto, 'id' | 'categoryId' | 'category'>;
  categories: TCategoryDto[];
}

export const CategoryCard: FC<Props> = (props) => {
  const {product, categories} = props;
  const {category, categoryId} = product;
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Category
          </Text>
          <Button
            onClick={toggleActive}
            accessibilityLabel="Change category"
            icon={EditIcon}
          />
        </InlineGrid>
        <BlockStack gap="200">
          <Text as="p" variant="bodyMd">
            {category?.title || 'No category'}
          </Text>
        </BlockStack>
      </BlockStack>
      <Modal
        size="small"
        open={active}
        onClose={toggleActive}
        title="Change category"
      >
        <CategoryForm categoryId={categoryId} toggleActive={toggleActive} categories={categories}/>
      </Modal>
    </Card>
  );
};
