import { Product } from "@prisma/client";
import { TApiProductDto } from "../../dto/api/product.dto";

export const apiProductMapper = (product: Product): TApiProductDto => {
  return {
    id: String(product.id),
    slug: product.slug,
    title: product.title,
  };
};
