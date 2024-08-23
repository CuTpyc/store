import {BlockStack, Button, Card, InlineGrid, Text} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {EditIcon} from '@shopify/polaris-icons';
import React, {FC} from 'react';
import {TReviewDto} from '~/.server/admin/dto/review.dto';
import { TCustomerDto } from '~/.server/admin/dto/customer.dto';
import { TProductDto } from '~/.server/admin/dto/product.dto';
import { makeTextShorter } from '~/admin/utils/shorted.text.util';

export type PrimaryInfoCardProps = {
  review: TReviewDto;
}

export const PrimaryInfoCard: FC<PrimaryInfoCardProps> = ({review}) => {
  const product = review.product
  const customer = review.customer
  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Primary info
          </Text>
          <Button
            url={`${EAdminNavigation.reviews}/${review.id}/edit-primary`}
            accessibilityLabel="Edit primary info"
            icon={EditIcon}
          />
        </InlineGrid>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Rate
          </Text>
          <Text as="p" variant="bodyMd">
            {review.rate}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Review
          </Text>
          <Text as="p" variant="bodyMd">
            {makeTextShorter(review.review)}
          </Text>
        </BlockStack>
      </BlockStack>
    </Card>
  );
};
