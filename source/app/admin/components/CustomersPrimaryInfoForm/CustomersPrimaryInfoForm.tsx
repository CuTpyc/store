import { BlockStack, Card, FormLayout, Text } from '@shopify/polaris';
import { FC } from 'react';
import { ValidatedTextField } from '~/admin/ui/ValidatedTextField/ValidatedTextField';
import { TCustomerDto } from '~/.server/admin/dto/customer.dto';
// import { splitFirstName } from '~/admin/utils/user.util';

export type CustomersPrimaryInfoFormProps = {
  customer: Pick<TCustomerDto, 'firstName' | 'lastName' | 'email'>;
};

export const CustomersPrimaryInfoForm: FC<CustomersPrimaryInfoFormProps> = (
  props
) => {
  const {
    customer: { firstName, lastName, email },
  } = props;
  // const [firstName, lastName] = splitFirstName(firstName || '');

  return (
    <Card>
      <BlockStack gap='200'>
        <Text as='h2' variant='headingSm'>
          Primary info
        </Text>
        <FormLayout>
          <FormLayout.Group>
            <ValidatedTextField
              label='First Name'
              type='text'
              name='firstName'
              autoComplete='given-name'
              defaultValue={firstName}
            />
            <ValidatedTextField
              label='Last Name'
              type='text'
              name='lastName'
              autoComplete='family-name'
              defaultValue={lastName}
            />
          </FormLayout.Group>
          <ValidatedTextField
            label='Email'
            type='email'
            name='email'
            autoComplete='email'
            defaultValue={email}
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
