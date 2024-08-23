import {Box, Button, Divider, FormLayout, InlineStack} from '@shopify/polaris';
import React, {FC} from 'react';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {ValidatedAction} from '~/admin/ui/ValidatedAction/ValidatedAction';
import {EAdminProductAction} from '~/admin/constants/action.constant';
import {categoryFormValidator} from '~/admin/components/products/Single/CategoryForm.validator';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';
import { ValidatedLazyAutocomplete } from '~/admin/ui/ValidatedLazyAutocomplete/ValidatedLazyAutocomplete';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {
  TAdminApiCategoriesLoader,
  TAdminApiCategoriesLoaderData
} from '~/.server/admin/loaders/api/categories/index/loader';
import { TCustomerDto } from '~/.server/admin/dto/customer.dto';
import { TAdminApiProductsLoader, TAdminApiProductsLoaderData } from '~/.server/admin/loaders/api/products/index/loader';
import { TAdminApiCustomersLoader, TAdminApiCustomersLoaderData } from '~/.server/admin/loaders/api/customers/index/loader';
import { reviewSecondaryInfoEditFormValidator } from './ReviewSecondaryInfoEditForm.validator';
import { ValidatedSelect } from '~/admin/ui/ValidatedSelect/ValidatedSelect';
import { ValidatedTextField } from '~/admin/ui/ValidatedTextField/ValidatedTextField';
import { TReviewDto } from '~/.server/admin/dto/review.dto';



type Props = {
  review: TReviewDto | null;
  product: TCategoryDto | null;
  customer: TCustomerDto | null;
}

const responseProductToOptions = (data?: TAdminApiProductsLoaderData) => {
  return data?.products?.map((product
  ) => ({
    value: product.id,
    label: `${product.title} (${product.slug})`,
  })) || [];
};
const responseCustomerToOptions = (data?: TAdminApiCustomersLoaderData) => {
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
    label: `${customer.firstName} (${customer.lastName})`,
    value: customer.id,
  } : undefined;

  return (
    <>
      <Box padding="200" paddingBlockEnd="0">
        <ValidatedAction action={EAdminProductAction.updateReview}/>
      </Box>
      <Box padding="400" paddingBlockStart="200">
        <FormLayout>
          <ValidatedLazyAutocomplete<TAdminApiProductsLoader>
              label="Product"
              name="productId"
              url={EAdminNavigation.apiProducts}
              responseToOptions={responseProductToOptions}
              defaultValue={defaultProductValue}
            />
          <ValidatedLazyAutocomplete<TAdminApiCustomersLoader>
            label="Customer"
            name="customerId"
            url={EAdminNavigation.apiCustomers}
            responseToOptions={responseCustomerToOptions}
            defaultValue={defaultCustomerValue}
          />
        </FormLayout>

      </Box>

      <Divider/>
    </>
  );
};
