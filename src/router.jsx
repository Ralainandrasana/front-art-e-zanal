import { createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Visiteur from "./pages/Visiteur";
import SignUp from "./pages/SignUp";
import AccueilAcheteur from "./pages/acheteur/AccueilAcheteur";
import Panier from "./pages/acheteur/Panier";
import Payer from "./pages/acheteur/Payer";


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
        path: "/Payer",
        element: <Payer />,
    }
]);

export default router;
