import type { ProductReview } from "@prisma/client";
import { TProductDto } from "./product.dto";
import { TCustomerDto } from "./customer.dto";

type ExcludedField = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type TReviewDto = Omit<ProductReview, ExcludedField> & {
  id: string;
  product: TProductDto | null;
  customer: TCustomerDto | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
