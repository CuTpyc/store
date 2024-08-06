import { Card, BlockStack, FormLayout, Text } from "@shopify/polaris";
import { ValidatedTextField } from "~/admin/ui/ValidatedTextField/ValidatedTextField";

export const AddressInfoCard = () => {
  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Customer's Address
        </Text>
        <FormLayout>
          <ValidatedTextField
            label="Country"
            type="text"
            name="country"
            autoComplete="country"
          />
          <FormLayout.Group>
            <ValidatedTextField
              label="First name"
              type="text"
              name="firstNameForAddress"
              autoComplete="family-name"
            />
            <ValidatedTextField
              label="Last name"
              type="text"
              name="lastNameForAddress"
              autoComplete="family-name"
            />
          </FormLayout.Group>
          <ValidatedTextField
            label="Company"
            type="text"
            name="company"
            autoComplete="company"
          />
          <ValidatedTextField
            label="Address"
            type="text"
            name="address"
            autoComplete="address"
          />
          <ValidatedTextField
            label="Appartment"
            type="text"
            name="appartment"
            autoComplete="appartment"
          />
          <ValidatedTextField
            label="City"
            type="text"
            name="city"
            autoComplete="city"
          />
          <ValidatedTextField
            label="Postal code"
            type="text"
            name="postalCode"
            autoComplete="postal-code"
          />
          <ValidatedTextField
            label="Phone number"
            type="text"
            name="phoneForAddress"
            autoComplete="phone-number"
          />
        </FormLayout>
      </BlockStack>

    </Card>
  )
}
