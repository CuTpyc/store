import { Product, ProductStatus } from '@prisma/client';

type ExcludedField = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';

export type TProductDto = {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  price: number;
  compareAtPrice: number | null;
  costPerItem: number | null;
  quantity: number;
  sku: string | null;
  barcode: string | null;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type JsonifyObject<T> = {
  [P in keyof T]: T[P] extends Date ? string : T[P];
};
