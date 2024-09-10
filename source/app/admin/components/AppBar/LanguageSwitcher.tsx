import {Text, TopBar} from '@shopify/polaris';
import type {UserMenuProps} from '@shopify/polaris/build/ts/src/components/TopBar';
import {FC, useCallback, useMemo} from 'react';
import {TUserDto} from '~/.server/admin/dto/user.dto';
import { LANGUAGES } from '~/admin/locale/i18n.config';
import {useSubmit} from '@remix-run/react';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';

export type TLanguageSwitcherProps = {
  user: Pick<TUserDto, 'language'>;
  active: boolean;
  toggleActive: () => void
}

export const LanguageSwitcher: FC<TLanguageSwitcherProps> = ({active, user, toggleActive}) => {
  const {language} = user;
  const submit = useSubmit();

  const handleLanguageChange = useCallback((language: string) => {
    const formData = new FormData();
    formData.set('language', language);
    submit(formData, {action: EAdminNavigation.apiChangeLanguage, method: 'POST'});
  }, [submit]);


  const actions: UserMenuProps['actions'] = useMemo(() => (
    [
      {
        items: LANGUAGES.map((content) => ({
          content,
          onAction: () => handleLanguageChange(content),
        })),
      },
    ]
  ), [submit]);


  return (
    <TopBar.Menu
      activatorContent={
        <span>
          <Text as="span">
            {language}
          </Text>
        </span>
      }
      open={active}
      onOpen={toggleActive}
      onClose={toggleActive}
      actions={actions}
    />
  );
};
