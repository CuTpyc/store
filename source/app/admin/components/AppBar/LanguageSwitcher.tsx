import { useState, FC } from 'react';
import { Modal, ChoiceList, Button } from '@shopify/polaris';
import { useTranslation } from "react-i18next";

import { Form, useFetcher } from '@remix-run/react';
import { languageCookie } from "~/resources/cookies/language.cookie"
import { EAdminNavigation } from '~/admin/constants/navigation.constant';

type LanguageModalProps = {
  open: boolean;
  onClose: () => void;
};

export const LanguageSwitcher: FC<LanguageModalProps> = ({ open, onClose }) => {
  const fetcher = useFetcher()
  const { i18n, t } = useTranslation()
  const [selected, setSelected] = useState<string[]>([i18n.language]);

  const handleSave = async () => {
    await i18n.changeLanguage(selected[0]);
    fetcher.submit(
      { language: selected[0], originUrl: window.location.pathname },
      { method: "post", action: EAdminNavigation.userChangeLanguage }
    );
    onClose()
  };

  const handleChange = (value: string[]) => {
    setSelected(value);
  };


  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('Change language')}
      primaryAction={{
        content: t('Save'),
        onAction: handleSave,
      }}
    >
      <Modal.Section>
        <ChoiceList
          title={t('Select your language')}
          choices={[
            { label: 'English', value: 'en' },
            { label: 'Українська', value: 'ua' },
          ]}
          selected={selected}
          onChange={handleChange}
        />
      </Modal.Section>
    </Modal>
  );
};

export default LanguageSwitcher;
