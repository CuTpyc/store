import english from "~/resources/locales/en/common.json";
import ukrainian from "~/resources/locales/ua/common.json"

const languages = ["en", "ua"] as const;
export const supportedLanguages = [...languages];
export type Language = (typeof languages)[number];

export type Resource = {
  common: typeof english;
};

export const resources: Record<Language, Resource> = {
  en: {
    common: english,
  },
  ua: {
    common: ukrainian,
  },
};

export const returnLanguageIfSupported = (
  lang?: string
): Language | undefined => {
  if (supportedLanguages.includes(lang as Language)) {
    return lang as Language;
  }
  return undefined;
};
