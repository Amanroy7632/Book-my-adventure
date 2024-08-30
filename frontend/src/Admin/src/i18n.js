import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationHI from './locales/hi/translation.json';
import translationDE from './locales/de/translation.json';
import translationFR from './locales/fr/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  hi: {
    translation: translationHI,
  },
  de: {
    translation: translationDE,
  },
  fr: {
    translation: translationFR,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en', // fallback language
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
