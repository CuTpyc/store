import {
  BlockStack,
  Card,
  FormLayout,
  SelectProps,
  Text,
} from "@shopify/polaris";
import { useMemo } from "react";
import { $Enums } from "@prisma/client";
import { ValidatedSelect } from "~/admin/ui/ValidatedSelect/ValidatedSelect";

export const RoleCard = () => {
  const roleOptions: SelectProps["options"] = useMemo(
    () => [
      {
        label: "Select role",
        value: "",
      },
      {
        label: "Admin",
        value: $Enums.AdminRole.ADMIN,
      },
      {
        label: "Staff",
        value: $Enums.AdminRole.STAFF,
      },
    ],
    []
  );

  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Role
        </Text>
        <FormLayout>
          <ValidatedSelect label={null} name="role" options={roleOptions} />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
