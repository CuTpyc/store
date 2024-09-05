import {TopBar, TopBarProps} from '@shopify/polaris';
import {FC, useCallback, useState} from 'react';
import {TUserDto} from '~/.server/admin/dto/user.dto';
import {UserMenu} from '~/admin/components/AppBar/UserMenu';
import {LanguageSwitcher} from '~/admin/components/AppBar/LanguageSwitcher';

export interface AppBarProps {
  onNavigationToggle: TopBarProps['onNavigationToggle'];
  user: TUserDto;
}

export const AppBar: FC<AppBarProps> = ({onNavigationToggle, user}) => {
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [languageSwitcherActive, setLanguageSwitcherActive] = useState(false);

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    [],
  );

  const toggleLanguageSwitcherActive = useCallback(
    () => setLanguageSwitcherActive((active) => !active),
    [],
  );

  return (
    <TopBar
      showNavigationToggle
      secondaryMenu={<LanguageSwitcher user={user} active={languageSwitcherActive}
                                       toggleActive={toggleLanguageSwitcherActive}/>}
      userMenu={<UserMenu user={user} userMenuActive={userMenuActive} toggleUserMenuActive={toggleUserMenuActive}/>}
      onNavigationToggle={onNavigationToggle}
    />
  );
};
