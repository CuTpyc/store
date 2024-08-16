import {Box, Button, Divider, FormLayout, InlineStack, SelectProps} from '@shopify/polaris';
import React, {FC, useMemo} from 'react';
import {TUserDto} from '~/.server/admin/dto/user.dto';
import {ValidatedForm} from 'remix-validated-form';
import {$Enums} from '@prisma/client';
import {ValidatedSelect} from '~/admin/ui/ValidatedSelect/ValidatedSelect';
import {usersRoleFormValidator} from '~/admin/components/UsersSingle/UsersRoleForm.validator';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {ValidatedAction} from '~/admin/ui/ValidatedAction/ValidatedAction';
import {EAdminUserAction} from '~/admin/constants/action.constant';

export type UsersRoleFormProps = {
  role: TUserDto['role'];
  toggleActive: () => void;
}

export const UsersRoleForm: FC<UsersRoleFormProps> = (props) => {
  const {role, toggleActive} = props;

  const roleOptions: SelectProps['options'] = useMemo(() => ([
    {
      label: 'Select role',
      value: '',
    },
    {
      label: 'Admin',
      value: $Enums.AdminRole.ADMIN,
    },
    {
      label: 'Staff',
      value: $Enums.AdminRole.STUFF,
    }
  ]), []);

  return (
    <ValidatedForm validator={usersRoleFormValidator} method="post" onSubmit={toggleActive}>
      <Box padding="200" paddingBlockEnd="0">
        <ValidatedAction action={EAdminUserAction.updateRole}/>
      </Box>

      <Box padding="400" paddingBlockStart="200">
        <FormLayout>
          <ValidatedSelect
            label={null}
            name="role"
            options={roleOptions}
            defaultValue={role}
          />
        </FormLayout>
      </Box>
      <Divider/>
      <Box padding="400">
        <InlineStack direction="row-reverse" align="end" gap="200">
          <ValidatedSubmitButton text={'Save'} variant="primary"/>
          <Button onClick={toggleActive}>Cancel</Button>
        </InlineStack>
      </Box>
    </ValidatedForm>
  );
};
