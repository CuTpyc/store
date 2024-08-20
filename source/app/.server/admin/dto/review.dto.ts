import type {ProductReview} from '@prisma/client'

type ExcludedField = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'productId' | 'customerId'
export type TReviewDto = Omit<ProductReview, ExcludedField> & {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  productId: string;
  customerId: string;
}
