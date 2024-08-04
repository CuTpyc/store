import { BlockStack, Layout } from "@shopify/polaris";
import { PrimaryInfoCard } from "~/admin/components/UsersNewForm/PrimaryInfoCard";
import { SecurityCard } from "~/admin/components/UsersNewForm/SecurityCard";
import { RoleCard } from "~/admin/components/UsersNewForm/RoleCard";

export const UsersNewForm = () => {
  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard />
          <SecurityCard />
        </BlockStack>
      </Layout.Section>

      <Layout.Section variant="oneThird">
        <RoleCard />
      </Layout.Section>
    </Layout>
  );
};
