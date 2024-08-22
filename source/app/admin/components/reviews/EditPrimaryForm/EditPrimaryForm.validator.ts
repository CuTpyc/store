import { withZod } from "@rvf/zod";
import { z } from "zod";
import {
  customerIdRule,
  productIdRule,
  rateRule,
  reviewRule,
} from "~/admin/components/reviews/NewForm/NewForm.validator";

export const editPrimaryFormValidator = withZod(
  z.object({
    customerId: customerIdRule,
    productId: productIdRule,
    rate: rateRule,
    review: reviewRule,
  })
);
