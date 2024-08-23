import { withZod } from "@rvf/zod";
import { z } from "zod";

export const rateRule = z.coerce.number().min(0, { message: "Rate is required" }).max(5, { message: "Rate max length: 5" }).optional();

export const reviewRule = z.string().trim().min(1, { message: "Review is required" }).optional();

export const productIdRule = z.coerce.number().min(1, { message: "Product is required" }).optional();

export const customerIdRule = z.coerce.number().min(1, { message: "Customer is required" }).optional();

export const newFormValidator = withZod(
  z.object({
    rate: rateRule,
    review: reviewRule,
    productId: productIdRule,
    customerId: customerIdRule,
  })
);
