import {BlockStack, Card, FormLayout, Text} from '@shopify/polaris';
import React, {FC} from 'react';
import {ValidatedTextField} from '~/admin/ui/ValidatedTextField/ValidatedTextField';
import {TReviewDto} from '~/.server/admin/dto/review.dto';

type Props = {
  review?: TReviewDto
}

export const PrimaryInfoCard: FC<Props> = (props) => {
  const {review} = props;

  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Primary info
        </Text>
        <FormLayout>
          <ValidatedTextField
            label="Rate"
            type="text"
            name="rate"
            autoComplete="off"
          />
          <ValidatedTextField
            label="Review"
            type="text"
            name="review"
            autoComplete="off"
          />
          <ValidatedTextField
            label="Product Id"
            type="text"
            name="product_id"
            autoComplete="off"
          />
          <ValidatedTextField
            label="Customer id"
            type="text"
            name="customer_id"
            autoComplete="off"
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
