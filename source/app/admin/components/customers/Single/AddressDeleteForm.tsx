import {BlockStack, Box, Button, Divider, InlineStack, Text} from '@shopify/polaris';
import React, {FC} from 'react';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {ValidatedAction} from '~/admin/ui/ValidatedAction/ValidatedAction';
import {EAdminCustomerAction} from '~/admin/constants/action.constant';
import {addressDeleteFormValidator} from '~/admin/components/customers/Single/AddressDeleteForm.validator';
import type {TCustomerAddressDto} from '~/.server/admin/dto/customer.dto';

export type Props = {
  address: TCustomerAddressDto;
  toggleActive: () => void;
}

export const AddressDeleteForm: FC<Props> = (props) => {
  const {address: customerAddress, toggleActive} = props;
  const {address, company, country, city, apartment, postalCode, firstName, phone, lastName} = customerAddress;

  return (
    <ValidatedForm validator={addressDeleteFormValidator} method="post" onSubmit={toggleActive}>
      <Box padding="200" paddingBlockEnd="0">
        <ValidatedAction action={EAdminCustomerAction.deleteAddress}/>
      </Box>

      <Box padding="400" paddingBlockStart="200">
        <BlockStack gap="400">
          <BlockStack gap="200">
            <Text as="h3" variant="headingXs" fontWeight="medium">
              First Name
            </Text>
            <Text as="p" variant="bodyMd">
              {firstName}
            </Text>
          </BlockStack>
          <BlockStack>
            <Text as="h3" variant="headingXs" fontWeight="medium">
              Last Name
            </Text>
            <Text as="p" variant="bodyMd">
              {lastName}
            </Text>
          </BlockStack>

          <BlockStack>
            <Text as="h3" variant="headingXs" fontWeight="medium">
              Phone
            </Text>
            <Text as="p" variant="bodyMd">
              {phone}
            </Text>
          </BlockStack>

          <BlockStack>
            <Text as="h3" variant="headingXs" fontWeight="medium">
              Company
            </Text>
            <Text as="p" variant="bodyMd">
              {company}
            </Text>
          </BlockStack>

          <BlockStack>
            <Text as="h3" variant="headingXs" fontWeight="medium">
              Address
            </Text>
            <Text as="p" variant="bodyMd">
              {address}
            </Text>
          </BlockStack>

          <BlockStack>
            <Text as="h3" variant="headingXs" fontWeight="medium">
              Apartment
            </Text>
            <Text as="p" variant="bodyMd">
              {apartment}
            </Text>
          </BlockStack>

          <BlockStack>
            <Text as="h3" variant="headingXs" fontWeight="medium">
              City
            </Text>
            <Text as="p" variant="bodyMd">
              {city}
            </Text>
          </BlockStack>

          <BlockStack>
            <Text as="h3" variant="headingXs" fontWeight="medium">
              Country
            </Text>
            <Text as="p" variant="bodyMd">
              {country}
            </Text>
          </BlockStack>

          <BlockStack>
            <Text as="h3" variant="headingXs" fontWeight="medium">
              Postal Code
            </Text>
            <Text as="p" variant="bodyMd">
              {postalCode}
            </Text>
          </BlockStack>
        </BlockStack>
      </Box>
      <Divider/>
      <Box padding="400">
        <InlineStack direction="row-reverse" align="end" gap="200">
          <ValidatedSubmitButton text={'Delete'} variant="primary" tone="critical"/>
          <Button onClick={toggleActive}>Cancel</Button>
        </InlineStack>
      </Box>
    </ValidatedForm>
  );
};
