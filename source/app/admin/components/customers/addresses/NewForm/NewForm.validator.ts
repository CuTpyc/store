import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {addressRule} from '~/admin/components/customers/NewForm/NewForm.validator';


export const newFormValidator = withZod(
  z.object({
    address: addressRule
  })
);
