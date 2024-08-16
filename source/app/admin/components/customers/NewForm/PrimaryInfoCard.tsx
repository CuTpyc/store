import {BlockStack, Card, FormLayout, Text} from '@shopify/polaris';
import React, {FC} from 'react';
import {ValidatedTextField} from '~/admin/ui/ValidatedTextField/ValidatedTextField';
import {TCustomerDto} from '~/.server/admin/dto/customer.dto';

type Props = {
  customer?: Omit<TCustomerDto, 'addresses'>
}

export const PrimaryInfoCard: FC<Props> = (props) => {
  const {customer} = props;

  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Primary info
        </Text>
        <FormLayout>
          <FormLayout.Group>
            <ValidatedTextField
              label="First Name"
              type="text"
              name="firstName"
              autoComplete="given-name"
              defaultValue={customer?.firstName}
            />
            <ValidatedTextField
              label="Last Name"
              type="text"
              name="lastName"
              autoComplete="family-name"
              defaultValue={customer?.lastName}
            />
          </FormLayout.Group>
          <ValidatedTextField
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            defaultValue={customer?.email}
          />
          <ValidatedTextField
            label="Phone"
            type="text"
            name="phone"
            autoComplete="phone"
            defaultValue={customer?.phone || ''}
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
