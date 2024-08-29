import bcryptjs from 'bcryptjs';
import {TUserDto} from '~/.server/admin/dto/user.dto';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {hasRole} from '~/admin/utils/access.util';
import {redirect} from '@remix-run/node';
import {$Enums} from '@prisma/client';

export const hashPassword = async (password: string): Promise<string> => {
  return bcryptjs.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcryptjs.compare(password, hash);
};

export const hasRoleOrRedirect = (user: Pick<TUserDto, 'role'>) => (role: TUserDto['role'], failureRedirect?: EAdminNavigation): void => {
  failureRedirect = failureRedirect ?? EAdminNavigation.dashboard;

  if (!hasRole(user)(role)) {
    throw redirect(failureRedirect);
  }
};

export const hasAdminRoleOrRedirect = (user: Pick<TUserDto, 'role'>, failureRedirect?: EAdminNavigation): void => {
  hasRoleOrRedirect(user)($Enums.AdminRole.ADMIN, failureRedirect);
};

export const hasStaffRoleOrRedirect = (user: Pick<TUserDto, 'role'>, failureRedirect?: EAdminNavigation): void => {
  hasRoleOrRedirect(user)($Enums.AdminRole.STUFF, failureRedirect);
};
