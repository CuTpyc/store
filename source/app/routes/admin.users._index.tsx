import React from "react";
import { useLoaderData } from "@remix-run/react";
import { BlockStack, Card, Page, Text } from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { adminUsersLoader } from "~/.server/admin/loaders/users.loader";
import { AdminUsersTable } from "~/admin/components/UsersTable/UsersTable";

export const loader = adminUsersLoader;

export default function AdminUsersIndex() {
  const data = useLoaderData<typeof loader>();

  return (
    <Page
      fullWidth
      title="Users"
      primaryAction={{
        content: "Create user",
        icon: PlusIcon,
        accessibilityLabel: "Create user",
        url: EAdminNavigation.usersCreate,
      }}
    >
      <AdminUsersTable
        users={data.users}
        query={data.query}
        pagination={data.pagination}
      />

      <Card>
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Credit card
          </Text>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </BlockStack>
      </Card>
    </Page>
  );
}
