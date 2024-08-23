import {BlockStack, Box, Layout} from '@shopify/polaris';
import React, { FC } from 'react';
import { PrimaryInfoCard } from './PrimaryInfoCard';
import { TCustomerDto } from '~/.server/admin/dto/customer.dto';
import { TProductDto } from '~/.server/admin/dto/product.dto';
import { TReviewDto } from '~/.server/admin/dto/review.dto';
import { ReviewSecondaryInfoEditForm } from '../Single/ReviewSecondaryInfoEditForm';

type Props = {
  review?: TReviewDto
  product?: TProductDto
  customer?: TCustomerDto
}
export const NewForm: FC<Props> = ({ review, product, customer }) => {
  return (
    <Box paddingBlockEnd="500">
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <PrimaryInfoCard review={review}/>
            <ReviewSecondaryInfoEditForm review={review} product={product} customer={customer}/>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Box>
  );
};
