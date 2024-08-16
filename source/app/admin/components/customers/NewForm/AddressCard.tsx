import {BlockStack, Card, FormLayout, Text} from '@shopify/polaris';
import React, {FC} from 'react';
import {ValidatedTextField} from '~/admin/ui/ValidatedTextField/ValidatedTextField';
import {TCustomerAddressDto} from '~/.server/admin/dto/customer.dto';

type Props = {
  address?: TCustomerAddressDto;
}

export const AddressCard: FC<Props> = (props) => {
  const {address} = props;

  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Delivery Address
        </Text>
        <FormLayout>
          <ValidatedTextField
            label="Country"
            type="text"
            name="address.country"
            autoComplete="country"
            defaultValue={address?.country}
          />
          <FormLayout.Group>
            <ValidatedTextField
              label="First Name"
              type="text"
              name="address.firstName"
              autoComplete="given-name"
              defaultValue={address?.firstName}
            />
            <ValidatedTextField
              label="Last Name"
              type="text"
              name="address.lastName"
              autoComplete="family-name"
              defaultValue={address?.lastName}
            />
          </FormLayout.Group>
          <ValidatedTextField
            label="Company"
            type="text"
            name="address.company"
            autoComplete="organization"
            defaultValue={address?.company || ''}
          />
          <ValidatedTextField
            label="Address"
            type="text"
            name="address.address"
            autoComplete="address-line1"
            defaultValue={address?.address}
          />
          <ValidatedTextField
            label="Apartment, suite, etc"
            type="text"
            name="address.apartment"
            autoComplete="apartment"
            defaultValue={address?.apartment || ''}
          />
          <FormLayout.Group>
            <ValidatedTextField
              label="City"
              type="text"
              name="address.city"
              autoComplete="city"
              defaultValue={address?.city}
            />
            <ValidatedTextField
              label="Postal Code"
              type="text"
              name="address.postalCode"
              autoComplete="postal-code"
              defaultValue={address?.postalCode}
            />
          </FormLayout.Group>
          <ValidatedTextField
            label="Phone"
            type="text"
            name="address.phone"
            autoComplete="phone"
            defaultValue={address?.phone}
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
