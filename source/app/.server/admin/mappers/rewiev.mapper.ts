import {ProductReview} from '@prisma/client';
import {TReviewDto} from '~/.server/admin/dto/review.dto';

export const reviewMapper = (review: ProductReview): TReviewDto => {
  return {
    id: String(review.id),
    rate: review.rate,
    review: review.review,
    createdAt: review.createdAt.toJSON(),
    updatedAt: review.updatedAt.toJSON(),
    deletedAt: review.deletedAt ? review.deletedAt.toJSON() : null,
    productId: String(review.productId),
    customerId:  String(review.customerId),
  };
};

