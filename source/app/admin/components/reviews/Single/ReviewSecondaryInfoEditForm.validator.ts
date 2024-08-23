import {withZod} from '@rvf/zod';
import {z} from 'zod';
import { customerIdRule, productIdRule } from '../NewForm/NewForm.validator';

export const reviewSecondaryInfoEditFormValidator = withZod(
  z.object({
    productId: productIdRule,
    customerId: customerIdRule,
  })
);
