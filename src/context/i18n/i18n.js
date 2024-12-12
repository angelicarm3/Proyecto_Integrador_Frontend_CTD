import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

import en from '../../../public/locales/en/tranlations.json'
import es from '../../../public/locales/es/tranlations.json'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: {
        translation: en
      },
      es: {
        translation: es
      }
    }
  })

export default i18n
