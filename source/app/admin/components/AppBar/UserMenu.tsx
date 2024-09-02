import { TopBar } from '@shopify/polaris';
import type { UserMenuProps } from '@shopify/polaris/build/ts/src/components/TopBar';
import { FC, useMemo, useState } from 'react';
import { TUserDto } from '~/.server/admin/dto/user.dto';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';
import { ExitIcon, LanguageTranslateIcon } from '@shopify/polaris-icons';
import i18n from 'i18next';
import {LanguageSwitcher} from './LanguageSwitcher'; // Импортируйте компонент модального окна

export type TUserMenuProps = {
  user: TUserDto;
  userMenuActive: boolean;
  toggleUserMenuActive: () => void;
};



export const UserMenu: FC<TUserMenuProps> = ({ userMenuActive, user, toggleUserMenuActive }) => {
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  const toggleLanguageModal = () => {
    setIsLanguageModalOpen(!isLanguageModalOpen);
  };

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const userMenuActions: UserMenuProps['actions'] = useMemo(
    () => [
      {
        items: [
          {
            icon: LanguageTranslateIcon,
            content: 'Change language',
            onAction: toggleLanguageModal, // Открываем модальное окно
          },
          {
            icon: ExitIcon,
            content: 'Logout',
            url: EAdminNavigation.authLogout,
          },
        ],
      },
    ],
    []
  );

  return (
    <>
      <TopBar.UserMenu
        actions={userMenuActions}
        name={user.fullName || ''}
        detail={user.role}
        initials={getInitials(user.fullName || '')}
        open={userMenuActive}
        onToggle={toggleUserMenuActive}
      />

      <LanguageSwitcher
        open={isLanguageModalOpen}
        onClose={toggleLanguageModal}
      />
    </>
  );
};

const getInitials = (fullName: string) => {
  return fullName.split(' ').map((name) => name[0]).join('');
};
