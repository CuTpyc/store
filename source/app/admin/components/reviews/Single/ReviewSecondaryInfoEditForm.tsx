import {Box, Card, Text, Divider, FormLayout} from '@shopify/polaris';
import React, {FC} from 'react';
import {ValidatedAction} from '~/admin/ui/ValidatedAction/ValidatedAction';
import {EAdminProductAction} from '~/admin/constants/action.constant';
import { ValidatedLazyAutocomplete } from '~/admin/ui/ValidatedLazyAutocomplete/ValidatedLazyAutocomplete';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import { TCustomerDto } from '~/.server/admin/dto/customer.dto';
import { TAdminApiProductsLoader, TAdminApiProductsLoaderData } from '~/.server/admin/loaders/api/products/index/loader';
import { TAdminApiCustomersLoader, TAdminApiCustomersLoaderData } from '~/.server/admin/loaders/api/customers/index/loader';
import { TReviewDto } from '~/.server/admin/dto/review.dto';
import { TProductDto } from '~/.server/admin/dto/product.dto';


type Props = {
  review?: Pick<TReviewDto, 'id' | 'rate' | 'review'> | null
  product?: Pick<TProductDto, 'id' | 'title' | 'slug'> | null
  customer?: Pick<TCustomerDto, 'id' | 'firstName' | 'lastName'> | null;
  products: TProductDto[]
  customers: TCustomerDto[]
}

const  productsResponseToOptions = (data?: TAdminApiProductsLoaderData) => {
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



export const ReviewSecondaryInfoEditForm: FC<Props> = (props) => {
  const {review, product, customer} = props;

  const defaultProductValue = product ? {
    label: `${product.title} (${product.slug})`,
    value: product.id,
  } : undefined;

  const defaultCustomerValue = customer ? {
    label: `${customer.firstName} ${customer.lastName}`,
    value: customer.id,
  } : undefined;

  return (
    <Card>
      <Text as="h2" variant="headingSm">
          Secondary info
        </Text>
      <Box padding="200" paddingBlockEnd="0">
        <ValidatedAction action={EAdminProductAction.updateReview}/>
      </Box>
      <Box padding="400" paddingBlockStart="200">
        <FormLayout>
          <ValidatedLazyAutocomplete<TAdminApiProductsLoaderData>
              label="Product"
              name="productId"
              url={EAdminNavigation.apiProducts}
              responseToOptions={productsResponseToOptions}
              defaultValue={defaultProductValue}
            />
          <ValidatedLazyAutocomplete<TAdminApiCustomersLoaderData>
            label="Customer"
            name="customerId"
            url={EAdminNavigation.apiCustomers}
            responseToOptions={customersResponseToOptions}
            defaultValue={defaultCustomerValue}
          />
        </FormLayout>

      </Box>

      <Divider/>
    </Card>
  );
};
