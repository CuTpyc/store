import React from 'react';
import {useLoaderData} from '@remix-run/react';
import {adminDashboardLoader} from '~/.server/admin/loaders/dashboard.loader';
import {BlockStack, Card, Page, Text} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';

export const loader = adminDashboardLoader;

export default function AdminUsersNew() {
  const data = useLoaderData<typeof loader>();

  return (
    <Page
      fullWidth
      title="User info"
      backAction={{
        url: EAdminNavigation.users
      }}
    >
      <Card>
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Credit card
          </Text>
          <Text as="p" variant="bodyMd">
            Credit card information
          </Text>
        </BlockStack>
      </Card>
    </Page>
  );
}
