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
    users: 'Users',
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
    noCompany: "---",
    snackbarSuccessMessage: 'New computer added',
    //SignUp / Login
    loginform: "Login form",
    name: 'Name',
    password: 'Password',
    confirmPassword: "Confirm password",
    login: 'Log in',
    successAddUser: 'New user created',
    signup: "Sign Up",
    cancel: 'cancel',
    completeAllFields: "Please complete all fields.",
    passwordTooShort: "Password must be at least 6 characters.",
    passDontMatch: "Passwords don't match.",
    nameEmpty: "Name is empty.",
    snackbarSuccessMessageDelete: 'Computer deleted',
    invalidCredentials: "Invalid credentials.",
    addNewAdmin: "Add new admin",
    //CompanyList
    companyAdded: "Company Added",
    companyDelete: "Company Deleted",
    delete: "Delete ",
    confirmationDelete: "Are you sure to delete this company ?",
    yes: "yes",
    no: "no",
    addCompany: "Add Company",
    enterNewCompanyName: "Enter the new company's name :",
    searchName: "Search name",
    errorNoCompanies: "ERROR NO COMPANIES FOUND",
    newName: "New name",
    emptyName: "Name can't be empty",
    edit: "Edit",
    companyEdited: "Company name edited",
    //Pagination
    next: "Next",
    previous: "Previous",
    search: "Search",
    errorNoComputers: "Error, no computer found",
    SnackSuccessLogout: "Logout success",
    successMessageEdit: 'Computer edited',
    successMessageNoEdit: "Computer was not edited",
    page: "Page",
    size: "Size",
    SnackFailLogin: "Login fail",
    create: "Create",
    addAdminTitle: "Create a new Administrator",
    admin: "Administrators",
    // computer error message
    EMPTY_NAME_ERROR: "Cannot set an empty name.",
    UNCONSISTENT_DATES_ERROR: "Cannot have introduced date after discontinued date."
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
    users: 'Utilisateurs',
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
    noCompany: "---",
    snackbarSuccessMessage: 'Nouvel ordinateur ajouté',
    //SignUp / Login
    loginform: "Authentification",
    name: 'Nom',
    password: 'Mot de passe',
    confirmPassword: "Confirmez le mot de passe",
    login: 'Connexion',
    successAddUser: 'Nouveau utilisateur crée',
    signup: "S'inscrire",
    cancel: 'Annuler',
    completeAllFields: "Veuillez remplir tous les champs.",
    passwordTooShort: "Votre mot de passe doit être d'au moins 6 caractere.",
    passDontMatch: "Les mots de passe ne sont pas les mêmes.",
    nameEmpty: "Le nom est vide.",
    snackbarSuccessMessageDelete: 'Ordinateur supprimé',
    invalidCredentials: "Les identifiants sont invalide.",
    successMessageEdit: 'Ordinateur edité',
    successMessageNoEdit: "Ordinateur n'a pas été edité",
    addNewAdmin: "Ajouter l'administrateur",
    //CompanyList
    companyAdded: "Entreprise ajoutée",
    companyDelete: "Entreprise Suprimée",
    delete: "Suprimer ",
    confirmationDelete: "Êtes vous sure de suprimer cette entreprise ?",
    yes: "oui",
    no: "non",
    addCompany: "Ajouter entreprise",
    enterNewCompanyName: "Entrez le nom de la nouvelle entreprise",
    searchName: "Rechercher nom",
    errorNoCompanies: "Erreur, aucune entreprise trouvée",
    newName: "Nouveau nom",
    emptyName: "Le nom ne peut pas être vide",
    edit: "Editer",
    companyEdited: "Entreprise modifiée",
    //Pagination
    next: "Suivant",
    previous: "Précedent",
    search: "Rechercher",
    errorNoComputers: "Erreur, aucun ordinateur trouvée",
    SnackSuccessLogout: "Deconnexion réussie",
    SnackFailLogin: "Echec connexion",
    //Pagination
    page: "Page",
    size: "Taille",
    // Admin
    create: "Créer",
    addAdminTitle: "Créer un nouvel Administrateur",
    admin: "Administrateurs",
    // computer error message
    EMPTY_NAME_ERROR: "Le nom d'ordinateur ne peut être vide.",
    UNCONSISTENT_DATES_ERROR: "La date d'introduction ne peut être après la date d'abandon."

  }
}

const i18n = createI18n(
  locales,
  translations,
);

export default i18n;