import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {EAdminUserAction, FORM_ACTION_FIELD} from '~/admin/constants/action.constant';

export const usersDeleteFormValidator = withZod(
  z.object({
    [FORM_ACTION_FIELD]: z.literal(EAdminUserAction.deleteUser),
  })
);
