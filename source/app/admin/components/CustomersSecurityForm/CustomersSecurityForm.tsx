import { BlockStack, Card, FormLayout, Text } from '@shopify/polaris';
import { ValidatedTextField } from '~/admin/ui/ValidatedTextField/ValidatedTextField';

export const CustomersSecurityForm = () => {
  return (
    <Card>
      <BlockStack gap='200'>
        <Text as='h2' variant='headingSm'>
          Security
        </Text>
        <FormLayout>
          <ValidatedTextField
            label='Password'
            type='password'
            name='password'
            autoComplete='off'
          />
          <ValidatedTextField
            label='Confirm Password'
            type='password'
            name='passwordConfirm'
            autoComplete='off'
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
