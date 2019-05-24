import { createI18n } from 'react-router-i18n';
 
// Array of supported locales
// The first in the array is treated as the default locale
const locales = ['en', 'fr'];
 
// Dictionary of translations
const translations = {
  en: {
    settings: 'Settings',
    english: 'English',
    french: 'French',
    home: 'Home',
    welcome: 'Welcome to cdb-front',
    logout: 'Log out',
    companies: 'Companies',
    computers: 'Computers'
  },
  fr: {
    settings: 'Paramètres',
    english: 'Anglais',
    french: 'Français',
    home: 'Accueil',
    welcome: 'Bienvenue sur cdb-front',
    logout: 'Déconnexion',
    companies: 'Liste entreprises',
    computers: 'Liste ordinateurs'
  }
}
 
const i18n = createI18n(
  locales,
  translations,
);
 
export default i18n;