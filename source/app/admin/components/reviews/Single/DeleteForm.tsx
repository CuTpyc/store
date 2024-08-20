import {Box, Button, Divider, InlineStack, Text} from '@shopify/polaris';
import React, {FC} from 'react';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import type {TReviewDto} from '~/.server/admin/dto/review.dto';
import {deleteFormValidator} from '~/admin/components/categories/Single/DeleteForm.validator';

type Props = {
  review: Pick<TReviewDto, 'id'>;
  toggleActive: () => void;
}

export const DeleteForm: FC<Props> = (props) => {
  const {review, toggleActive} = props;
  const {id} = review;

  return (
    <ValidatedForm validator={deleteFormValidator} method="post" onSubmit={toggleActive}>
      <Box padding="400" paddingBlockStart="200">
        <Text as="p">
          Are you sure you want to delete {id}?
        </Text>
      </Box>
      <Divider/>
      <Box padding="400">
        <InlineStack direction="row-reverse" align="end" gap="200">
          <ValidatedSubmitButton text={'Delete'} variant="primary" tone="critical"/>
          <Button onClick={toggleActive}>Cancel</Button>
        </InlineStack>
      </Box>
    </ValidatedForm>
  );
};
