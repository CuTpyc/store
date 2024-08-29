import {TUserDto} from '~/.server/admin/dto/user.dto';
import {$Enums} from '@prisma/client';

export const hasRole = (user: Pick<TUserDto, 'role'>) => (hasRole: TUserDto['role']): boolean => {
  return user.role === hasRole;
};

export const hasStaffRole = (user: Pick<TUserDto, 'role'>): boolean => {
  return hasRole(user)($Enums.AdminRole.STUFF);
};

export const hasAdminRole = (user: Pick<TUserDto, 'role'>): boolean => {
  return hasRole(user)($Enums.AdminRole.ADMIN);
};
