import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { enUS } from './languages/enUS';

export const resources = {
  enUS: { enUS },
} as const;

export const defaultNS = 'enUS';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'enUS',
    ns: ['enUS'],
    lng: 'enUS',
    defaultNS,
    debug: false,
    resources,
  });

export default i18n;
