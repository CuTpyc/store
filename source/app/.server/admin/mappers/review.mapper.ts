import { Customer, Product, ProductReview } from "@prisma/client";
import { TReviewDto } from "../dto/review.dto";
import { productMapper } from "./product.mapper";
import { customerMapper } from "./customer.mapper";

type ProductReviewWithRelations = ProductReview & {
  product?: Product;
  customer?: Customer;
};

export const reviewMapper = (productReview: ProductReviewWithRelations): TReviewDto => {

  return {
    id: String(productReview.id),
    rate: productReview.rate,
    review: productReview.review,
    productId: productReview.productId,
    customerId: productReview.customerId,
    product: productReview.product ? productMapper(productReview.product) : null,
    customer: productReview.customer ? customerMapper(productReview.customer) : null,
    createdAt: productReview.createdAt.toJSON(),
    updatedAt: productReview.updatedAt.toJSON(),
    deletedAt: productReview.deletedAt ? productReview.deletedAt.toJSON() : null,
  };
};
