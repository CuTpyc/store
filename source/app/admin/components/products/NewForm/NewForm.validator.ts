import {withZod} from '@rvf/zod';
import {z} from 'zod';

export const slugRule = z.string().trim().min(1, {message: 'Slug is required'});
export const titleRule = z.string().trim().min(1, {message: 'Title is required'});
export const descriptionRule = z.string().trim().min(1, {message: 'Description is required'}).max(1024, {message: 'Description max length: 1024'});
export const priceRule = z.coerce.number().int().min(1, {message: 'Price must be greater than 0'});
export const costPerItemRule = z.coerce.number().int().min(1, {message: 'Cost per item must be greater than 0'});
export const compareAtPriceRule = z.coerce.number().int().min(1, {message: 'Compare at price must be greater than 0'});
export const quantityRule = z.coerce.number().int().min(1, {message: 'Quantity must be greater than 0'});
export const skuRule = z.string().trim().max(256, {message: 'SKU max length: 256'}).optional();
export const barcodeRule = z.string().trim().max(256, {message: 'Barcode max length: 256'}).optional();
export const categoryIdRule = z.coerce.number().positive({message: 'Category is required'});


export const newFormValidator = withZod(
  z.object({
    slug: slugRule,
    title: titleRule,
    description: descriptionRule,
    price: priceRule,
    costPerItem: costPerItemRule,
    compareAtPrice: compareAtPriceRule,
    quantity: quantityRule,
    sku: skuRule,
    barcode: barcodeRule,
  })
);
