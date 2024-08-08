import { User } from '@prisma/client';
import { TUserDto } from '~/.server/admin/dto/user.dto';

export const userMapper = (user: User): TUserDto => {
  return {
    id: String(user.id),
    email: user.email,
    role: user.role,
    fullName: user.fullName,
    createdAt: user.createdAt.toJSON(),
    updatedAt: user.updatedAt.toJSON(),
    deletedAt: user.deletedAt ? user.deletedAt.toJSON() : null,
  };
};
