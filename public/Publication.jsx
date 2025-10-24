import React from 'react';
import { useNavigate } from "react-router-dom";
import '../../styles/publication.css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

function Publication() {
    const navigate = useNavigate();
    const handleGoDetails = () => {
        navigate("/Details");
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
                <div className="content2">
                    <div className="titlePanier">
                        <h3 className="left">Produits à base de sable</h3>
                    </div>
                    <div className="bodyPub">
                        <div className="cardPub">
                            <img src="images/sable.png" alt="" />
                            <div className="desc">
                                <h3>sable gros</h3>
                                <p>Taille des grains: 0,25 mm</p>
                                <p>Prix : 5000ar/sac</p>
                                <div className="btnPub">
                                    <button><img src="icons/shopping-cart.png" alt="" onClick={handleGoDetails} />au panier</button>
                                    <img src="icons/ArrowLeft.png" alt="" onClick={handleGoDetails} />
                                </div>
                            </div>
                        </div>
                        <div className="cardPub">
                            <img src="images/sable.png" alt="" />
                            <div className="desc">
                                <h3>sable gros</h3>
                                <p>Taille des grains: 0,25 mm</p>
                                <p>Prix : 5000ar/sac</p>
                                <div className="btnPub">
                                    <button><img src="icons/shopping-cart.png" alt="" onClick={handleGoDetails} />au panier</button>
                                    <img src="icons/ArrowLeft.png" alt="" onClick={handleGoDetails} />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default Publication