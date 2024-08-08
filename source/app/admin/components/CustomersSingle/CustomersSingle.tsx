import { BlockStack, Layout } from '@shopify/polaris';
import { FC } from 'react';
import { TCustomerDto } from '~/.server/admin/dto/customer.dto';
import { PrimaryInfoCard } from '~/admin/components/CustomersSingle/PrimaryInfoCard';
import { PrimaryAddressInfoCard } from './PrimaryAddressInfoCard';

export type CustomersSingleProps = {
  customer: TCustomerDto;
};

export const CustomersSingle: FC<CustomersSingleProps> = ({ customer }) => {
  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap='500'>
          <PrimaryInfoCard customer={customer} />
          {customer.addresses.map((address) => (
            <PrimaryAddressInfoCard
              key={address.id}
              address={address}
              customer={customer}
            />
          ))}
        </BlockStack>
      </Layout.Section>
    </Layout>
  );
};
