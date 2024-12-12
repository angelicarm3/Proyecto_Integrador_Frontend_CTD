import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18n
  .use(Backend) // Carga archivos JSON
  .use(LanguageDetector) // Detecta el idioma del navegador
  .use(initReactI18next) // Conecta i18n con React
  .init({
    fallbackLng: 'en', // Idioma por defecto
    debug: true, // Habilita logs para depuración
    interpolation: {
      escapeValue: false // React ya maneja el escape
    },
    backend: {
      loadPath: './{{lng}}.json' // Ruta de los archivos JSON
    }
  })

export default i18n
