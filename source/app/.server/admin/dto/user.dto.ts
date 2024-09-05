import type {User} from '@prisma/client';

type ExcludedField = 'id' | 'password' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'setedLanguage'

export type TUserDto = Omit<User, ExcludedField> & {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
