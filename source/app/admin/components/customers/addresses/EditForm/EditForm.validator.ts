import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {addressRule} from '~/admin/components/customers/NewForm/NewForm.validator';
import {EAdminCustomerAction, FORM_ACTION_FIELD} from '~/admin/constants/action.constant';


export const editFormValidator = withZod(
  z.object({
    [FORM_ACTION_FIELD]: z.literal(EAdminCustomerAction.editAddress),
    address: addressRule
  })
);
