import { BlockStack, Card, FormLayout, Text } from "@shopify/polaris";
import { FC } from "react";
import { IUser } from "~/.server/shared/interfaces/user.interface";
import { ValidatedTextField } from "~/admin/ui/ValidatedTextField/ValidatedTextField";

interface IPrimaryInfoCardProps {
  user: IUser;
}

export const PrimaryInfoCard: FC<IPrimaryInfoCardProps> = ({ user }) => {
  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Primary info
        </Text>
        <FormLayout>
          <FormLayout.Group>
            <ValidatedTextField
              label="Full Name"
              type="text"
              name="fullName"
              autoComplete="off"
              value={user.fullName ?? ""}
              disabled
            />

            <ValidatedTextField
              label="Email"
              type="email"
              name="email"
              autoComplete="off"
              value={user.email}
              disabled
            />

            <ValidatedTextField
              label="Role"
              type="text"
              name="role"
              autoComplete="off"
              value={user.role}
              disabled
            />
          </FormLayout.Group>
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
