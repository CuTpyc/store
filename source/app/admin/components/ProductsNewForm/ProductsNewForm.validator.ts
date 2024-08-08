// CustomersNewForm.validator.ts
import { withZod } from '@rvf/zod';
import { z } from 'zod';

export const productNameRule = z
  .string()
  .trim()
  .min(1, { message: 'Product Name is required' });
export const productPriceRule = z
  .number()
  .min(0, { message: 'Product Price must be greater than or equal to 0' });
export const productQuantityRule = z
  .number()
  .min(0, { message: 'Product Quantity must be greater than or equal to 0' });

export const productsNewFormValidator = withZod(
  z.object({
    name: productNameRule,
    price: productPriceRule,
    quantity: productQuantityRule,
  })
);
