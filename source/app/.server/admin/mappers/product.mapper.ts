import {Category, Product} from '@prisma/client';
import {TProductDto} from '~/.server/admin/dto/product.dto';
import {categoryMapper} from '~/.server/admin/mappers/category.mapper';

export type ProductWithRelations = Product & {
  category: Category | null;
};

export const productMapper = (product: ProductWithRelations): TProductDto => {
  return {
    id: String(product.id),
    slug: product.slug,
    title: product.title,
    description: product.description,
    price: String(product.price),
    costPerItem: String(product.costPerItem),
    compareAtPrice: String(product.compareAtPrice),
    quantity: String(product.quantity),
    sku: product.sku,
    barcode: product.barcode,
    status: product.status,
    avgRate: String(product.avgRate),
    totalReviews: String(product.totalReviews),
    categoryId: product.categoryId ? String(product.categoryId) : null,
    category: product.category ? categoryMapper(product.category) : null,
    createdAt: product.createdAt.toJSON(),
    updatedAt: product.updatedAt.toJSON(),
    deletedAt: product.deletedAt ? product.deletedAt.toJSON() : null,
  };
};
