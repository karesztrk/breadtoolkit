import i18n from 'i18next';

export const changeLanguage = (language: string) => {
  if (typeof window !== 'undefined') {
    i18n.changeLanguage(language);
    localStorage.setItem('lang', language);
  }
};

export const loadLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('lang');
  }
  return 'en';
};
