import React from "react";
import { useLoaderData } from "@remix-run/react";
import { BlockStack, Card, Page, Text } from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { adminCustomersLoader } from "~/.server/admin/loaders/admin.customers.loader";
import { adminUsersLoader } from "~/.server/admin/loaders/users.loader";
import { AdminUsersTable } from "~/admin/components/UsersTable/UsersTable";
import { AdminCustomersTable } from "~/admin/components/CustomersTable/CustomersTable";

export const loader = adminCustomersLoader;

export default function AdminUsersIndex() {
  const data = useLoaderData<typeof loader>();
  console.log(data)

  return (
    <Page
      fullWidth
      title="Customers"
      primaryAction={{
        content: "Create customer",
        icon: PlusIcon,
        accessibilityLabel: "Create customer",
        url: EAdminNavigation.customersCreate,
      }}
    >
      <AdminCustomersTable
         customers={data.customers}
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
