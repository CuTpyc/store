import {withZod} from '@rvf/zod';
import {z} from 'zod';

export const rateRule = z.coerce.number().int().min(1, {message: 'Rate must be more then 1'}).max(5, {message: "Rate must be less then 5"});
export const reviewRule = z.string().trim().min(10, {message: 'Review must be more then 10 characters'});
export const customerRule = z.coerce.number();
export const productRule = z.coerce.number();

export const newFormValidator = withZod(
  z.object({
    rate: rateRule,
    review: reviewRule,
    customer_id: customerRule,
    product_id: productRule,
  })
);
