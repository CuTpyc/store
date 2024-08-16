import {BlockStack, Button, Card, InlineGrid, Text} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {EditIcon} from '@shopify/polaris-icons';
import React, {FC} from 'react';
import {TProductDto} from '~/.server/admin/dto/product.dto';

export type PrimaryInfoCardProps = {
  product: TProductDto;
}

export const PrimaryInfoCard: FC<PrimaryInfoCardProps> = ({product}) => {
  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Primary info
          </Text>
          <Button
            url={`${EAdminNavigation.products}/${product.id}/edit-primary`}
            accessibilityLabel="Edit primary info"
            icon={EditIcon}
          />
        </InlineGrid>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Slug
          </Text>
          <Text as="p" variant="bodyMd">
            {product.slug}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Title
          </Text>
          <Text as="p" variant="bodyMd">
            {product.title}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Description
          </Text>
          <Text as="p" variant="bodyMd">
            {product.description}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            SKU
          </Text>
          <Text as="p" variant="bodyMd">
            {product.sku}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Barcode
          </Text>
          <Text as="p" variant="bodyMd">
            {product.barcode}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Quantity
          </Text>
          <Text as="p" variant="bodyMd">
            {product.quantity}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Price
          </Text>
          <Text as="p" variant="bodyMd">
            {product.price}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Compare at price
          </Text>
          <Text as="p" variant="bodyMd">
            {product.compareAtPrice}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Cost per item
          </Text>
          <Text as="p" variant="bodyMd">
            {product.costPerItem}
          </Text>
        </BlockStack>
      </BlockStack>
    </Card>
  );
};
