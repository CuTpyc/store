import { BlockStack, Button, Card, InlineGrid, Text } from "@shopify/polaris";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { EditIcon } from "@shopify/polaris-icons";
import { FC } from "react";
import { TUserDto } from "~/.server/admin/dto/user.dto";

export type PrimaryInfoCardProps = {
  user: TUserDto;
};

export const PrimaryInfoCard: FC<PrimaryInfoCardProps> = ({ user }) => {
  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Primary info
          </Text>
          <Button
            url={`${EAdminNavigation.users}/${user.id}/primary`}
            accessibilityLabel="Export variants"
            icon={EditIcon}
          />
        </InlineGrid>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Full Name
          </Text>
          <Text as="p" variant="bodyMd">
            {user.fullName}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Email
          </Text>
          <Text as="p" variant="bodyMd">
            {user.email}
          </Text>
        </BlockStack>
      </BlockStack>
    </Card>
  );
};
