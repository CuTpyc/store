import {BlockStack, Card, FormLayout, Text} from '@shopify/polaris';
import React, {FC} from 'react';
import {ValidatedTextField} from '~/admin/ui/ValidatedTextField/ValidatedTextField';
import {TProductDto} from '~/.server/admin/dto/product.dto';

type Props = {
  product?: Omit<TProductDto, 'category'>
}

export const PrimaryInfoCard: FC<Props> = (props) => {
  const {product} = props;

  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Primary info
        </Text>
        <FormLayout>
          <ValidatedTextField
            label="Slug"
            type="text"
            name="slug"
            autoComplete="off"
            defaultValue={product?.slug}
          />
          <ValidatedTextField
            label="Title"
            type="text"
            name="title"
            autoComplete="off"
            defaultValue={product?.title}
          />
          <ValidatedTextField
            label="Description"
            type="text"
            name="description"
            autoComplete="off"
            defaultValue={product?.description || ''}
            multiline={6}
          />
          <ValidatedTextField
            label="SKU"
            type="text"
            name="sku"
            autoComplete="off"
            defaultValue={product?.sku || ''}
          />
          <ValidatedTextField
            label="Barcode"
            type="text"
            name="barcode"
            autoComplete="off"
            defaultValue={product?.barcode || ''}
          />
          <ValidatedTextField
            label="Quantity"
            type="number"
            name="quantity"
            autoComplete="off"
            defaultValue={product?.quantity}
          />
          <ValidatedTextField
            label="Price"
            type="number"
            name="price"
            autoComplete="off"
            defaultValue={product?.price}
          />
          <ValidatedTextField
            label="Compare at price"
            type="number"
            name="compareAtPrice"
            autoComplete="off"
            defaultValue={product?.compareAtPrice}
          />
          <ValidatedTextField
            label="Cost per item"
            type="number"
            name="costPerItem"
            autoComplete="off"
            defaultValue={product?.costPerItem}
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
