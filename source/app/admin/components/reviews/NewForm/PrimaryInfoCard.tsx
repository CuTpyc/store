import {BlockStack, Card, FormLayout, Text} from '@shopify/polaris';
import {FC} from 'react';
import {ValidatedTextField} from '~/admin/ui/ValidatedTextField/ValidatedTextField';
import { ValidatedSelect } from '~/admin/ui/ValidatedSelect/ValidatedSelect';
import { TAdminApiProductsLoader, TAdminApiProductsLoaderData } from '~/.server/admin/loaders/api/products/index/loader';
import { ValidatedLazyAutocomplete } from '~/admin/ui/ValidatedLazyAutocomplete/ValidatedLazyAutocomplete';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';
import { TAdminApiCustomersLoader, TAdminApiCustomersLoaderData } from '~/.server/admin/loaders/api/customers/index/loader';



const productsResponseToOptions = (data?: TAdminApiProductsLoaderData) => {
  return data?.products?.map((product) => ({
    value: product.id,
    label: `${product.title} (${product.slug})`,
  })) || [];
};

const customersResponseToOptions = (data?: TAdminApiCustomersLoaderData) => {
  return data?.customers?.map((customer) => ({
    value: customer.id,
    label: `${customer.firstName} ${customer.lastName}`,
  })) || [];
};

export const PrimaryInfoCard = () => {

  const DefaultValue =  {
    label: ``,
    value: '',
  }

  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Primary info
        </Text>
        <FormLayout>
          <ValidatedSelect
            label="Rate"
            name="rate"
            options={["0", "1", "2", "3", "4", "5"]}
            defaultValue={String(0)}
          />
          <ValidatedTextField
            label="Review"
            type="text"
            name="review"
            autoComplete="off"
            multiline={5}
          />
          <ValidatedLazyAutocomplete<TAdminApiProductsLoader>
            key='product'
            label="Products"
            name="productId"
            url={EAdminNavigation.apiProducts}
            responseToOptions={productsResponseToOptions}
          />
          <ValidatedLazyAutocomplete<TAdminApiCustomersLoader>
            key='Customer'
            label="Customers"
            name="customerId"
            url={EAdminNavigation.apiCustomers}
            responseToOptions={customersResponseToOptions}
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
