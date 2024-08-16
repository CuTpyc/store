import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {
  barcodeRule,
  compareAtPriceRule,
  costPerItemRule,
  descriptionRule,
  priceRule,
  quantityRule,
  skuRule,
  slugRule,
  titleRule
} from '~/admin/components/products/NewForm/NewForm.validator';


export const editPrimaryFormValidator = withZod(
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
