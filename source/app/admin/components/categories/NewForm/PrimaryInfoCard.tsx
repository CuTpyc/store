import {BlockStack, Card, FormLayout, Text} from '@shopify/polaris';
import React, {FC} from 'react';
import {ValidatedTextField} from '~/admin/ui/ValidatedTextField/ValidatedTextField';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';

type Props = {
  category?: Omit<TCategoryDto, 'addresses'>
}

export const PrimaryInfoCard: FC<Props> = (props) => {
  const {category} = props;

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
            defaultValue={category?.slug}
          />
          <ValidatedTextField
            label="Title"
            type="text"
            name="title"
            autoComplete="off"
            defaultValue={category?.title}
          />
          <ValidatedTextField
            label="Description"
            type="text"
            name="description"
            autoComplete="off"
            defaultValue={category?.description || ''}
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
