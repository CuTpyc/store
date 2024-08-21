import {BlockStack, Layout} from '@shopify/polaris';
import React, {FC} from 'react';
import { PrimaryInfoCard, PrimaryInfoCardProps } from './PrimaryInfoCard';
import {TReviewDto} from '~/.server/admin/dto/review.dto';
import { TProductDto } from '~/.server/admin/dto/product.dto';
import { TCustomerDto } from '~/.server/admin/dto/customer.dto';

export type SingleProps = {
  review: TReviewDto;
}

export const Single: FC<SingleProps> = ({review}) => {
  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard review={review}/>
        </BlockStack>
      </Layout.Section>

      <Layout.Section variant="oneThird">
      </Layout.Section>
    </Layout>
  );
};
