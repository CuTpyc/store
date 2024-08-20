import type {Product} from '@prisma/client';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';


export type TApiProductDto = Omit<Pick<Product, 'id'| 'slug' | 'title'>, 'id'> & {
  id: string;
  slug: string;
  title: string;
}
