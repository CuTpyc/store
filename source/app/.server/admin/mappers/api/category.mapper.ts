import {Category} from '@prisma/client';
import {TApiCategoryDto} from '~/.server/admin/dto/api/category.dto';

export const apiCategoryMapper = (category: Category): TApiCategoryDto => {
  return {
    id: String(category.id),
    slug: category.slug,
    title: category.title,
  };
};
