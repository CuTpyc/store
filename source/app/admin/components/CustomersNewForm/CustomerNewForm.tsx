import { BlockStack, Layout } from "@shopify/polaris";
import { PrimaryInfoCard } from "~/admin/components/CustomersNewForm/PrimaryInfoCard";
import { SecurityCard } from "~/admin/components/CustomersNewForm/SecurityCard";
import { AddressInfoCard } from "./AddressInfoCard";

export const CustomersNewForm = () => {
  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard />
          <AddressInfoCard />
          <SecurityCard />
        </BlockStack>
      </Layout.Section>

      
    </Layout>
  );
};
