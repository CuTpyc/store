import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {EAdminCustomerAction, FORM_ACTION_FIELD} from '~/admin/constants/action.constant';

export const addressDeleteFormValidator = withZod(
  z.object({
    [FORM_ACTION_FIELD]: z.literal(EAdminCustomerAction.deleteAddress),
  })
);
