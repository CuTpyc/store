import {Frame} from '@shopify/polaris';
import {FC, PropsWithChildren, useCallback, useState} from 'react';
import {BaseNav} from '~/admin/navigations/BaseNav/BaseNav';
import {AppBar} from '~/admin/components/AppBar/AppBar';
import {TUserDto} from '~/.server/admin/dto/user.dto';

export type BaseLayoutProps = PropsWithChildren<{
  user: TUserDto;
}>

export const BaseLayout: FC<BaseLayoutProps> = ({children, user}) => {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const logo = {
    width: 86,
    topBarSource:
      'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
    contextualSaveBarSource:
      'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
    accessibilityLabel: 'Shopify',
  };

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive,
      ),
    [],
  );

  return (
    <Frame
      logo={logo}
      topBar={<AppBar user={user} onNavigationToggle={toggleMobileNavigationActive}/>}
      navigation={<BaseNav/>}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigationActive}
    >
      {children}
    </Frame>
  );
};



