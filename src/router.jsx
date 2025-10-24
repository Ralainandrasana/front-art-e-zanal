import { createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Visiteur from "./pages/Visiteur";
import SignUp from "./pages/SignUp";
import AccueilAcheteur from "./pages/acheteur/AccueilAcheteur";
import Panier from "./pages/acheteur/Panier";
import Publication from "./pages/acheteur/Publication";
import Details from "./pages/acheteur/Details";
import Payer from "./pages/acheteur/Payer";
import Publier from "./pages/vendeur/Publier";
import Publications from "./pages/vendeur/Publications";
import Commandes from "./pages/vendeur/Commandes";
import Parametres from "./pages/vendeur/Parametres";
import Accueil from "./pages/vendeur/Accueil";
import Navbar from "./pages/administrateur/Navbar";
import AccueilAdmin from "./pages/administrateur/AccueilAdmin";
import TransactionsAdmin from "./pages/administrateur/TransactionsAdmin";
import PublicationsAdmin from "./pages/administrateur/PublicationsAdmin";
import ParametresAdmin from "./pages/administrateur/ParametresAdmin";

const router = createBrowserRouter([
  { path: "/", element: <Visiteur /> },
  { path: "/SignIn", element: <SignIn /> },
  { path: "/SignUp", element: <SignUp /> },
  { path: "/Acheteur", element: <AccueilAcheteur /> },
  { path: "/Panier", element: <Panier /> },
  { path: "/Payer", element: <Payer /> },
  { path: "/Details/:id_produit", element: <Details /> },
  { path: "/Publication", element: <Publication /> },
  {
    path: "/Vendeur",
    element: <Publier />,
    children: [
      { index: true, element: <Accueil /> },
      { path: "publications", element: <Publications /> },
      { path: "commandes", element: <Commandes /> },
      { path: "parametres", element: <Parametres /> },
    ],
  },
  {
    path: "/administrateur",
    element: <Navbar />,
    children: [
      { index: true, element: <AccueilAdmin /> },
      { path: "transactionsAdmin", element: <TransactionsAdmin /> },
      { path: "publicationsAdmin", element: <PublicationsAdmin /> },
      { path: "parametresAdmin", element: <ParametresAdmin /> },
    ],
  },
]);

export default router;
