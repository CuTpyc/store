
// admin.products._index.tsx
import { useLoaderData } from '@remix-run/react';
import { BlockStack, Card, Page, Text } from '@shopify/polaris';
import { PlusIcon } from '@shopify/polaris-icons';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';
import { adminProductsLoader } from '~/.server/admin/loaders/products.loader';
import { ProductsTable } from '~/admin/components/ProductsTable/ProductsTable';

export const loader = adminProductsLoader;

export default function AdminProductsIndex() {
  const data = useLoaderData<typeof loader>();

  return (
    <Page
      fullWidth
      title='Products'
      primaryAction={{
        content: 'Create product',
        icon: PlusIcon,
        accessibilityLabel: 'Create product',
        url: EAdminNavigation.productsCreate,
      }}
    >
      <ProductsTable
        products={data.products}
        // query={data.query}
        // pagination={data.pagination}
      />

      <Card>
        <BlockStack gap='200'>
          <Text as='h2' variant='headingSm'>
            Product Details
          </Text>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </BlockStack>
      </Card>
    </Page>
  );
}
