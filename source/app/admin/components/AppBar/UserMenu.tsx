import {TopBar} from '@shopify/polaris';
import type {UserMenuProps} from '@shopify/polaris/build/ts/src/components/TopBar';
import {FC, useMemo} from 'react';
import {TUserDto} from '~/.server/admin/dto/user.dto';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {ExitIcon} from '@shopify/polaris-icons';

export type TUserMenuProps = {
  user: TUserDto;
  userMenuActive: boolean;
  toggleUserMenuActive: () => void
}

export const UserMenu: FC<TUserMenuProps> = ({userMenuActive, user, toggleUserMenuActive}) => {

  const userMenuActions: UserMenuProps['actions'] = useMemo(() => (
    [
      {
        items: [
          {
            icon: ExitIcon,
            content: 'Logout',
            url: EAdminNavigation.authLogout
          }
        ],
      },
    ]
  ), []);

  return (
    <TopBar.UserMenu
      actions={userMenuActions}
      name={user.fullName || ''}
      detail={user.role}
      initials={getInitials(user.fullName || '')}
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );
};

const getInitials = (fullName: string) => {
  return fullName.split(' ').map((name) => name[0]).join('');
};
