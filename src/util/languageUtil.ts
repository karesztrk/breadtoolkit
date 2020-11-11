import i18n from 'i18next';

export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language);
  localStorage.setItem('lang', language);
};

export const loadLanguage = () => {
  return localStorage.getItem('lang');
};
