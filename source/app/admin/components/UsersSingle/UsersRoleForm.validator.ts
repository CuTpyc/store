import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {roleRule} from '~/admin/components/UsersNewForm/UsersNewForm.validator';
import {EAdminUserAction, FORM_ACTION_FIELD} from '~/admin/constants/action.constant';

export const usersRoleFormValidator = withZod(
  z.object({
    role: roleRule,
    [FORM_ACTION_FIELD]: z.literal(EAdminUserAction.updateRole),
  })
);
