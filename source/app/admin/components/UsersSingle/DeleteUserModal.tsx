import { FC } from 'react';
import { Button, FormLayout, InlineStack, Modal, Text } from '@shopify/polaris';
import {
  ValidatedForm,
  Validator,
  validationError,
} from 'remix-validated-form';
import { ValidatedSubmitButton } from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import { ValidatedErrorBanner } from '~/admin/ui/ValidatedErrorBanner/ValidatedErrorBanner';
import { userDeleteValidator } from '../../../admin/components/UsersSingle/UserDelete.validator';

type DeleteUserModalProps = {
  active: boolean;
  toggleActive: () => void;
  handleDelete: () => void;
  error?: string;
};

const deleteUserValidator: Validator<{ deletedAt: string | null }> = {
  validate: async (data) => {
    const validation = userDeleteValidator.safeParse(data);
    if (!validation.success) {
      return validationError({
        fieldErrors: {
          deletedAt: validation.error.errors.map((e) => e.message).join(', '),
        },
      });
    }
    return { errors: {}, values: validation.data };
  },
};

const DeleteUserModal: FC<DeleteUserModalProps> = ({
  active,
  toggleActive,
  handleDelete,
  error,
}) => {
  return (
    <Modal
      size='small'
      open={active}
      onClose={toggleActive}
      title='Delete user'
    >
      <ValidatedForm
        validator={deleteUserValidator}
        method='post'
        onSubmit={(e) => {
          e.preventDefault();
          handleDelete();
        }}
      >
        <input type='hidden' name='_method' value='delete' />
        <Modal.Section>
          <FormLayout>
            <ValidatedErrorBanner name='deletedAt' status='critical' />
            <Text as='p' variant='bodyMd'>
              Are you sure you want to delete this user? This is an irreversible
              process.
            </Text>
          </FormLayout>
        </Modal.Section>
        <Modal.Section>
          <InlineStack direction='row-reverse' align='end' gap='200'>
            <ValidatedSubmitButton
              text='Delete'
              variant='primary'
              onClick={handleDelete}
            />
            <Button onClick={toggleActive}>Cancel</Button>
          </InlineStack>
        </Modal.Section>
      </ValidatedForm>
    </Modal>
  );
};

export default DeleteUserModal;
