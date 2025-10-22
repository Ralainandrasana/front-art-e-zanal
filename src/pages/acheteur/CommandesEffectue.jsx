import React from 'react';
import { useNavigate } from "react-router-dom";
import '../../styles/CommandesEff.css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CommandesTable from '../../components/CommandesTable'

function CommandesEffectue() {
    const navigate = useNavigate();
    const handleGoPayer = () => {
        navigate("/Payer");
    };
    return (
        <>
            <Header />
            <div className="acheteur">
                <div className="header1">
                    <h2 className="logo"> <img src="logos/logoPlateforme.png" alt="" /> art-e-zanal</h2>
                    <div className="search">
                        <img src="icons/search.png" alt="" />
                        <input type="text" placeholder="recherche des matriaux: brique, sable, moellon, gravillon..." />
                    </div>
                    <div className="compte-panier">
                        <button><img src="icons/user.png" alt="" /><p>Mon compte</p></button>
                    </div>
                </div>
                <div className="menu">
                    <ul>
                        <li><a href="#" className="activated">Accueil</a></li>
                        <li><a href="#">Produits</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div className="contentTable">
                    <div className="titlePanier">
                        <h3 className="left">Listes des commandes effectué</h3>
                    </div>
                    <div className="body">
                        <CommandesTable />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CommandesEffectue