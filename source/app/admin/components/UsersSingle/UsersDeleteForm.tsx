import {Box, Button, Divider, InlineStack, Text} from '@shopify/polaris';
import React, {FC} from 'react';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {ValidatedAction} from '~/admin/ui/ValidatedAction/ValidatedAction';
import {EAdminUserAction} from '~/admin/constants/action.constant';
import {TUserDto} from '~/.server/admin/dto/user.dto';
import {usersDeleteFormValidator} from '~/admin/components/UsersSingle/UsersDeleteForm.validator';

export type UsersDeleteFormProps = {
  fullName: TUserDto['fullName'];
  toggleActive: () => void;
}

export const UsersDeleteForm: FC<UsersDeleteFormProps> = (props) => {
  const {fullName, toggleActive} = props;

  return (
    <ValidatedForm validator={usersDeleteFormValidator} method="post" onSubmit={toggleActive}>
      <Box padding="200" paddingBlockEnd="0">
        <ValidatedAction action={EAdminUserAction.deleteUser}/>
      </Box>

      <Box padding="400" paddingBlockStart="200">
        <Text as="p">
          Are you sure you want to delete {fullName}?
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
