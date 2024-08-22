import {BlockStack, Box, Layout} from '@shopify/polaris';
import React, {FC} from 'react';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';
import { TCustomerDto } from '~/.server/admin/dto/customer.dto';
import { TProductDto } from '~/.server/admin/dto/product.dto';
import { TReviewDto } from '~/.server/admin/dto/review.dto';
import {PrimaryInfoCard} from '~/admin/components/reviews/NewForm/PrimaryInfoCard';

type Props = {
  review: TReviewDto
  product: TProductDto
  customer: TCustomerDto
}

export const EditPrimaryForm: FC<Props> = ({review, product, customer}) => {
  return (
    <Box paddingBlockEnd="500">
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <PrimaryInfoCard review={review} product={product} customer={customer}/>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Box>
  );
};
