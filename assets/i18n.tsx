import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/assets/i18n/en.json';
import hu from '@/assets/i18n/hu.json';
import { loadLanguage } from '@/util/languageUtil';

const resources = {
  en: {
    translation: en,
  },
  hu: {
    translation: hu,
  },
};
const lng = loadLanguage() || 'en';
i18n.use(initReactI18next).init({
  resources,
  lng,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
