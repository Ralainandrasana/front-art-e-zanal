import axios from "axios";

// Instance pour les utilisateurs
export const apiUtilisateur = axios.create({
  baseURL: "http://127.0.0.1:8000/api/utilisateur/",
});

// Instance pour les produits
export const apiProduit = axios.create({
  baseURL: "http://127.0.0.1:8000/api/produit/",
});

// Instance pour les produits
export const apiCategory = axios.create({
  baseURL: "http://127.0.0.1:8000/api/category/",
});