import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {descriptionRule, slugRule, titleRule} from '~/admin/components/categories/NewForm/NewForm.validator';


export const editPrimaryFormValidator = withZod(
  z.object({
    slug: slugRule,
    title: titleRule,
    description: descriptionRule,
  })
);
