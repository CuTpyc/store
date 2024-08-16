import type {Category} from '@prisma/client';

type ExcludedField = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
export type TCategoryDto = Omit<Category, ExcludedField> & {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
