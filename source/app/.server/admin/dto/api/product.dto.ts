import type { Product } from "@prisma/client";

export type TApiProductDto = Omit<
  Pick<Product, "id" | "title" | "slug">,"id"> & {
  id: string;
  slug: string;
  title: string;
};
