import { createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Visiteur from "./pages/Visiteur";
import SignUp from "./pages/SignUp";
import AccueilAcheteur from "./pages/acheteur/AccueilAcheteur";
import Panier from "./pages/acheteur/Panier";
import CommandesEffectue from "./pages/acheteur/CommandesEffectue";
import Publication from "./pages/acheteur/Publication";
import Details from "./pages/acheteur/Details";
import Payer from "./pages/acheteur/Payer";
import Publier from "./pages/vendeur/Publier";  // layout du vendeur
import Publications from "./pages/vendeur/Publications";
import Commandes from "./pages/vendeur/Commandes";
import Parametres from "./pages/vendeur/Parametres";
import Accueil from "./pages/vendeur/Accueil";  // page d'accueil du vendeur

const router = createBrowserRouter([
    {
        path: "/",
        element: <Visiteur />,
    },
    {
        path: "/SignIn",
        element: <SignIn />,
    },
    {
        path: "/SignUp",
        element: <SignUp />,
    },
    {
        path: "/Acheteur",
        element: <AccueilAcheteur />,
    },
    {
        path: "/Panier",
        element: <Panier />,
    },
    {
        path: "/Commandes",
        element: <CommandesEffectue />,
    },
    {
        path: "/Payer",
        element: <Payer />,
    },
    {
        path: "/Details",
        element: <Details />,
    },
    {
        path: "/Publication",
        element: <Publication />,
    },
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
]);

export default router;
