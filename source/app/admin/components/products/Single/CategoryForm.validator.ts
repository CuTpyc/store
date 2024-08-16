import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {EAdminProductAction, FORM_ACTION_FIELD} from '~/admin/constants/action.constant';
import {categoryIdRule} from '~/admin/components/products/NewForm/NewForm.validator';

export const categoryFormValidator = withZod(
  z.object({
    categoryId: categoryIdRule,
    [FORM_ACTION_FIELD]: z.literal(EAdminProductAction.updateCategory),
  })
);
