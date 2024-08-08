import { BlockStack, Card, FormLayout, Text } from '@shopify/polaris';
import { ValidatedTextField } from '~/admin/ui/ValidatedTextField/ValidatedTextField';

export const ProductInfoCard = () => {
  return (
    <Card>
      <BlockStack gap='200'>
        <Text as='h2' variant='headingSm'>
          Product info
        </Text>
        <FormLayout>
          <FormLayout.Group>
            <ValidatedTextField
              label='Product Name'
              type='text'
              name='productName'
              autoComplete='off'
            />
            <ValidatedTextField
              label='Price'
              type='number'
              name='price'
              autoComplete='off'
            />
          </FormLayout.Group>
          <ValidatedTextField
            label='Description'
            type='text'
            name='description'
            multiline={3}
            autoComplete='off'
          />
          <ValidatedTextField
            label='Category'
            type='text'
            name='category'
            autoComplete='off'
          />
          <ValidatedTextField
            label='Stock'
            type='number'
            name='stock'
            autoComplete='off'
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
