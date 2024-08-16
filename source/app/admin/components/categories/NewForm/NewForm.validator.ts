import {withZod} from '@rvf/zod';
import {z} from 'zod';

export const slugRule = z.string().trim().min(1, {message: 'Slug is required'});
export const titleRule = z.string().trim().min(1, {message: 'Title is required'});
export const descriptionRule = z.string().trim().max(1024, {message: 'Description max length: 1024'}).optional();

export const newFormValidator = withZod(
  z.object({
    slug: slugRule,
    title: titleRule,
    description: descriptionRule,
  })
);
