import { createI18n } from 'react-router-i18n';
 
// Array of supported locales
// The first in the array is treated as the default locale
const locales = ['en', 'fr'];
 
// Dictionary of translations
const translations = {
  en: {
    // Header
    settings: 'Settings',
    english: 'English',
    french: 'French',
    home: 'Home',
    welcome: 'Welcome to cdb-front',
    logout: 'Log out',
    companies: 'Companies',
    computers: 'Computers',
    // Add Computer
    required: 'This field is required',
    invalidDates: 'Invalid or incoherences between dates',
    addNewComputer: 'Add a new computer',
    computerName: 'Computer name',
    introducedDate: 'Introduced date',
    discontinuedDate: 'Discontinued date',
    company: 'Company',
    add: 'Add',
    chooseCompany: 'Choose a company'
  },
  fr: {
    // Header
    settings: 'Paramètres',
    english: 'Anglais',
    french: 'Français',
    home: 'Accueil',
    welcome: 'Bienvenue sur cdb-front',
    logout: 'Déconnexion',
    companies: 'Liste entreprises',
    computers: 'Liste ordinateurs',
    // Add Computer
    required: 'Veuillez remplir ce champ',
    invalidDates: 'Dates invalides ou incohérentes',
    addNewComputer: 'Ajouter un nouvel ordinateur',
    computerName: "Nom de l'ordinateur",
    introducedDate: "Date de sortie",
    discontinuedDate: "Date d'abandon",
    company: 'Entreprise',
    add: 'Ajouter',
    chooseCompany: 'Choisissez une entreprise'
  }
}
 
const i18n = createI18n(
  locales,
  translations,
);
 
export default i18n;