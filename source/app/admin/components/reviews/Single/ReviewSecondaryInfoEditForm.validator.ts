import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {EAdminProductAction, EAdminReviewAction, FORM_ACTION_FIELD} from '~/admin/constants/action.constant';
import {categoryIdRule} from '~/admin/components/products/NewForm/NewForm.validator';
import { customerIdRule, productIdRule } from '../NewForm/NewForm.validator';

export const reviewSecondaryInfoEditFormValidator = withZod(
  z.object({
    productId: productIdRule,
    customerId: customerIdRule,
  })
);
