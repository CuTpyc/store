import {BlockStack, Button, Card, Divider, InlineGrid, Link, Modal, Text} from '@shopify/polaris';
import {EditIcon} from '@shopify/polaris-icons';
import React, {FC, useCallback, useState} from 'react';
import {TProductDto} from '~/.server/admin/dto/product.dto';
import { TCustomerDto } from '~/.server/admin/dto/customer.dto';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';
import { ReviewSecondaryInfoEditForm } from './ReviewSecondaryInfoEditForm';
import { TReviewDto } from '~/.server/admin/dto/review.dto';

type Props = {
  review: TReviewDto;
  product: TProductDto | null;
  customer: TCustomerDto | null;
}


export const ReviewSecondaryInfo: FC<Props> = (props) => {

  const {review, product, customer} = props;
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);
  return (
    <Card>
      <BlockStack gap="200">
      <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Secondary info
          </Text>
          <Button
            url={`${EAdminNavigation.reviews}/${review.id}/edit-secondary`}
            accessibilityLabel="Edit secondary info"
            icon={EditIcon}
          />
        </InlineGrid>
        <BlockStack gap="200">
          <Text as="p" variant="headingXs" fontWeight="medium">
            Product:
          </Text>
          <Text as="p" variant="bodyMd">
          <Link url={`${EAdminNavigation.products}/${product?.id}`}>{`${product?.title} (${product?.slug})` || 'No category'}</Link>
          </Text>
        </BlockStack>
        <Divider/>
        <BlockStack gap="200">
          <Text as="p" variant="headingXs" fontWeight="medium">
            Customer:
          </Text>
          <Text as="p" variant="bodyMd">
            <Link url={`${EAdminNavigation.customers}/${customer?.id}`}>{`${customer?.firstName} ${customer?.lastName}` || 'No category'}</Link>
          </Text>
        </BlockStack>
      </BlockStack>

    </Card>
  );
};
