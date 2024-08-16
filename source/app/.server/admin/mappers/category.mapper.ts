import {Category} from '@prisma/client';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';

export const categoryMapper = (category: Category): TCategoryDto => {
  return {
    id: String(category.id),
    slug: category.slug,
    title: category.title,
    description: category.description,
    image: category.image,
    createdAt: category.createdAt.toJSON(),
    updatedAt: category.updatedAt.toJSON(),
    deletedAt: category.deletedAt ? category.deletedAt.toJSON() : null,
  };
};
