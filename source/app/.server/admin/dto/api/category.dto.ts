import type {Category} from '@prisma/client';

export type TApiCategoryDto = Omit<Pick<Category, 'id' | 'title' | 'slug'>, 'id'> & {
  id: string;
  title: string;
  slug: string;
}
