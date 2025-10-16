import React from 'react';
import { useNavigate } from "react-router-dom";
import '../../styles/panier.css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

function Panier() {
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
                <div className="content2">
                    <div className="titlePanier">
                        <h3 className="left">Détail de votre panie( 1 article)</h3>
                    </div>
                    <div className="back">
                        <img src="icons/chevron-left.png" alt="" />
                    </div>
                    <div className="body">
                        <div className="left articles">
                            <div className="card">
                                <div className="left"><img src="images/sable.png" alt="" /></div>
                                <div className="center">
                                    <h2>Sable gros</h2>
                                    <p>Référence 06084467 Marque NFA GRANITE Taille des grains: 0,25 mm</p>
                                </div>
                                <div className="right">
                                    <div className="action">
                                        <button><img src="icons/trash-2.png" alt="" /></button>
                                        <button>-</button>
                                        <p>1</p>
                                        <button>+</button>
                                    </div>
                                    <p><strong>Prix : 5000ar</strong></p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="left"><img src="images/sable.png" alt="" /></div>
                                <div className="center">
                                    <h2>Sable gros</h2>
                                    <p>Référence 06084467 Marque NFA GRANITE Taille des grains: 0,25 mm</p>
                                </div>
                                <div className="right">
                                    <div className="action">
                                        <button><img src="icons/trash-2.png" alt="" /></button>
                                        <button>-</button>
                                        <p>1</p>
                                        <button>+</button>
                                    </div>
                                    <p><strong>Prix : 5000ar</strong></p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="left"><img src="images/sable.png" alt="" /></div>
                                <div className="center">
                                    <h2>Sable gros</h2>
                                    <p>Référence 06084467 Marque NFA GRANITE Taille des grains: 0,25 mm</p>
                                </div>
                                <div className="right">
                                    <div className="action">
                                        <button><img src="icons/trash-2.png" alt="" /></button>
                                        <button>-</button>
                                        <p>1</p>
                                        <button>+</button>
                                    </div>
                                    <p><strong>Prix : 5000ar</strong></p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="left"><img src="images/sable.png" alt="" /></div>
                                <div className="center">
                                    <h2>Sable gros</h2>
                                    <p>Référence 06084467 Marque NFA GRANITE Taille des grains: 0,25 mm</p>
                                </div>
                                <div className="right">
                                    <div className="action">
                                        <button><img src="icons/trash-2.png" alt="" /></button>
                                        <button>-</button>
                                        <p>1</p>
                                        <button>+</button>
                                    </div>
                                    <p><strong>Prix : 5000ar</strong></p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="left"><img src="images/sable.png" alt="" /></div>
                                <div className="center">
                                    <h2>Sable gros</h2>
                                    <p>Référence 06084467 Marque NFA GRANITE Taille des grains: 0,25 mm</p>
                                </div>
                                <div className="right">
                                    <div className="action">
                                        <button><img src="icons/trash-2.png" alt="" /></button>
                                        <button>-</button>
                                        <p>1</p>
                                        <button>+</button>
                                    </div>
                                    <p><strong>Prix : 5000ar</strong></p>
                                </div>
                            </div>
                        </div>
                        <div className="right payer">
                            <div className="wrapPayer">
                                <strong>Recapitulatif (1 produit)</strong>
                                <p>
                                    <strong>Prix  Total :</strong>
                                    <span>5000ar</span>
                                </p>
                                <button onClick={handleGoPayer}>Payer</button>
                            </div>
                        </div>
                    </div>
                    <div className="savoirPlus">
                        <button>voir plus</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Panier