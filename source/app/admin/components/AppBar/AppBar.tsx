import {TopBar, TopBarProps} from '@shopify/polaris';
import {FC, useCallback, useState} from 'react';

export interface AppBarProps {
  onNavigationToggle: TopBarProps['onNavigationToggle'];
}

export const AppBar: FC<AppBarProps> = ({onNavigationToggle}) => {
  const [userMenuActive, setUserMenuActive] = useState(false);

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    [],
  );

  const userMenuActions = [
    {
      items: [{content: 'Community forums'}],
    },
  ];

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name="Dharma"
      detail={'storeName'}
      initials="D"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  return (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={onNavigationToggle}
    />
  );
};
