import {BlockStack, Card, FormLayout, Text} from '@shopify/polaris';
import React, {FC} from 'react';
import {ValidatedTextField} from '~/admin/ui/ValidatedTextField/ValidatedTextField';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';
import { useTranslation } from 'react-i18next';

type Props = {
  category?: Omit<TCategoryDto, 'addresses'>
}

export const PrimaryInfoCard: FC<Props> = (props) => {
  const {category} = props;
  const { t } = useTranslation()
  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          {t('category.primary.primaryInfo')}
        </Text>
        <FormLayout>
          <ValidatedTextField
            label={t('category.primary.slug')}
            type="text"
            name="slug"
            autoComplete="off"
            defaultValue={category?.slug}
          />
          <ValidatedTextField
            label={t('category.primary.title')}
            type="text"
            name="title"
            autoComplete="off"
            defaultValue={category?.title}
          />
          <ValidatedTextField
            label={t('category.primary.description')}
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
