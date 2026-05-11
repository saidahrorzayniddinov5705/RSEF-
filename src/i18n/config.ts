import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Normally these would be in separate JSON files (e.g. public/locales/en/translation.json)
// For this environment, we bundle them directly or fetch them via an API.
const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About',
        team: 'Team',
        contact: 'Contact'
      },
      footer: {
        rights: 'All rights reserved.'
      }
    }
  },
  uz: {
    translation: {
      nav: {
        home: 'Bosh sahifa',
        about: 'Loyiha haqida',
        team: 'Jamoa',
        contact: 'Aloqa'
      },
      footer: {
        rights: 'Barcha huquqlar himoyalangan.'
      }
    }
  },
  ru: {
    translation: {
      nav: {
        home: 'Главная',
        about: 'О проекте',
        team: 'Команда',
        contact: 'Контакты'
      },
      footer: {
        rights: 'Все права защищены.'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
