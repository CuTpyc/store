import { Product } from '@prisma/client';
import { TProductDto } from '../dto/product.dto';

export const productMapper = (product: Product): TProductDto => {
  const { id, createdAt, updatedAt, deletedAt, ...rest } = product;
  return {
    id: Number(product.id),

    slug: product.slug,

    title: product.title,

    description: product.description,

    price: product.price,

    compareAtPrice: product.compareAtPrice,

    costPerItem: product.costPerItem,

    quantity: product.quantity,

    sku: product.sku,

    barcode: product.barcode,

    status: product.status,

    createdAt: new Date(product.createdAt),

    updatedAt: new Date(product.updatedAt),

    deletedAt: product.deletedAt ? new Date(product.deletedAt) : null,
  };
};
