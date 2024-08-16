import {BlockStack, Box, Layout} from '@shopify/polaris';
import React, {FC} from 'react';
import {AddressCard} from '~/admin/components/customers/NewForm/AddressCard';
import {TCustomerAddressDto} from '~/.server/admin/dto/customer.dto';
import {ValidatedAction} from '~/admin/ui/ValidatedAction/ValidatedAction';
import {EAdminCustomerAction} from '~/admin/constants/action.constant';

type Props = {
  address: TCustomerAddressDto;
};

export const EditForm: FC<Props> = (props) => {
  const {address} = props;

  return (
    <Box paddingBlockEnd="500">
      <Box padding="200" paddingBlockEnd="0">
        <ValidatedAction action={EAdminCustomerAction.editAddress}/>
      </Box>
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <AddressCard address={address}/>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Box>
  );
};
