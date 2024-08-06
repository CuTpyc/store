import { BlockStack, Layout } from "@shopify/polaris";
import { PrimaryInfoCard } from "~/admin/components/CustomersNewForm/PrimaryInfoCard";
import { SecurityCard } from "~/admin/components/CustomersNewForm/SecurityCard";

export const CustomersNewForm = () => {
  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard />
          <SecurityCard />
        </BlockStack>
      </Layout.Section>

      
    </Layout>
  );
};
