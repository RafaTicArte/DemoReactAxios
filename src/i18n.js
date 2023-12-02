import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'

void i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: 'en',
    fallbackLng: 'en',
    ns: ['lang'],
    defaultNS: 'lang',
    backend: {
      loadPath: '/assets/{{ns}}/{{lng}}.json'
    },
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    },
    react: {
      useSuspense: true
    }
  })

export default i18n
