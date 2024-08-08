// PrimaryInfoCard.tsx
import { BlockStack, Button, Card, InlineGrid, Text } from '@shopify/polaris';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';
import { EditIcon } from '@shopify/polaris-icons';
import { FC } from 'react';
import { TCustomerDto } from '~/.server/admin/dto/customer.dto';

export type PrimaryInfoCardProps = {
  customer: TCustomerDto;
};

export const PrimaryInfoCard: FC<PrimaryInfoCardProps> = ({ customer }) => {
  return (
    <Card>
      <BlockStack gap='200'>
        <InlineGrid columns='1fr auto'>
          <Text as='h2' variant='headingSm'>
            Primary info
          </Text>
          <Button
            url={`${EAdminNavigation.customers}/${customer.id}/primary`}
            accessibilityLabel='Export variants'
            icon={EditIcon}
          />
        </InlineGrid>
        <BlockStack gap='200'>
          <Text as='h3' variant='headingXs' fontWeight='medium'>
            First Name
          </Text>
          <Text as='p' variant='bodyMd'>
            {customer.firstName}
          </Text>
          <Text as='h3' variant='headingXs' fontWeight='medium'>
            Last Name
          </Text>
          <Text as='p' variant='bodyMd'>
            {customer.lastName}
          </Text>
        </BlockStack>
        <BlockStack gap='200'>
          <Text as='h3' variant='headingXs' fontWeight='medium'>
            Email
          </Text>
          <Text as='p' variant='bodyMd'>
            {customer.email}
          </Text>
        </BlockStack>
      </BlockStack>
    </Card>
  );
};
