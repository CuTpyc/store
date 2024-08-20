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
            label="Slug"
            type="text"
            name="slug"
            autoComplete="off"
          />
          <ValidatedTextField
            label="Title"
            type="text"
            name="title"
            autoComplete="off"
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
