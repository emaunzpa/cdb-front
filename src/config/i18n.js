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
    chooseCompany: 'Choose a company',
    snackbarSuccessMessage: 'New computer added',
    //SignUp / Login
    loginform: "Login form",
    name: 'Name',
    password: 'Password',
    login: 'Log in',
    successAddUser : 'New user created',
    signup : "Sign Up",
    cancel : 'cancel',
    completeAllFields : "Please complete all fields.",
    passwordTooShort : "Password must be at least 6 characters.",
    passDontMatch : "Passwords don't match.",
    nameEmpty : "Name is empty.",
    snackbarSuccessMessageDelete: 'Computer deleted',
    invalidCredentials : "Invalid credentials.",
    //CompanyList
    companyAdded:"Company Added",
    companyDelete:"Company Deleted",
    delete: "Delete ",
    confirmationDelete: "Are you sure to delete this company ?",
    yes:"yes",
    no:"no",
    addCompany: "Add Company",
    enterNewCompanyName:"Enter the new company's name :",
    searchName:"Search name",
    errorNoCompanies:"ERROR NO COMPANIES FOUND",
    newName:"New name",
    emptyName:"Name can't be empty",
    edit: "Edit",
    //Pagination
    next:"Next",
    previous:"Previous",
    search: "Search"

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
    chooseCompany: 'Choisissez une entreprise',
    snackbarSuccessMessage: 'Nouvel ordinateur ajouté',
    //SignUp / Login
    loginform: "Authentification",
    name: 'Nom',
    password: 'Mot de passe',
    login: 'Connexion',
    successAddUser : 'Nouveau utilisateur crée',
    signup : "S'inscrire",
    cancel: 'Annuler',
    completeAllFields : "Veuillez remplir tous les champs.",
    passwordTooShort : "Votre mot de passe doit être d'au moins 6 caractere.",
    passDontMatch : "Les mots de passe ne sont pas les mêmes.",
    nameEmpty : "Le nom est vide.",
    snackbarSuccessMessageDelete: 'Ordinateur supprimé',
    invalidCredentials : "Les identifiants sont invalide.",

    //CompanyList
    companyAdded:"Entreprise ajoutée",
    companyDelete:"Entreprise Suprimée",
    delete: "Suprimer ",
    confirmationDelete: "Êtes vous sure de suprimer cette entreprise ?",
    yes:"oui",
    no:"non",
    addCompany: "Ajouter entreprise",
    enterNewCompanyName:"Entrez le nom de la nouvelle entreprise",
    searchName:"Rechercher nom",
    errorNoCompanies:"Erreur, aucune entreprise trouvée",
    newName:"Nouveau nom",
    emptyName:"Le nom ne peut pas être vide",
    edit: "Editer",
     //Pagination
     next:"Suivant",
     previous:"Précedent",
     search: "Rechercher"
  }
}
 
const i18n = createI18n(
  locales,
  translations,
);
 
export default i18n;