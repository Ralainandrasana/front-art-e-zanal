import { createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Visiteur from "./pages/Visiteur";
import SignUp from "./pages/SignUp";
import AccueilAcheteur from "./pages/acheteur/AccueilAcheteur";


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
    }
]);

export default router;
