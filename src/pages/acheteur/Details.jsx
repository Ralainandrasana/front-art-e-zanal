import React from 'react';
import { useNavigate } from "react-router-dom";
import '../../styles/details.css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { StarOutlined, FormOutlined } from "@ant-design/icons";

function Details() {
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
                        <h3 className="left">Produits à base de sable</h3>
                    </div>
                    <div className="back">
                        <img src="icons/chevron-left.png" alt="" />
                    </div>
                    <div className="bodyDetails">
                        <div className="top">
                            <img src="images/sable.png" alt="" className='photo' />
                            <div className="right">
                                <div className="text">
                                    <h1><strong>sable gros</strong></h1>
                                    <p className='description'>Référence 06084467 Marque NFA GRANITE</p>
                                    <div className="dddd">
                                        <div className="stars" style={
                                            { color: "#73AB05" }
                                        }>
                                            <StarOutlined />
                                            <StarOutlined />
                                            <StarOutlined />
                                            <StarOutlined />
                                            <StarOutlined />
                                        </div>
                                        <FormOutlined style={{ fontSize: '20px', margin: "0 10px 0 10px", color: '#000000' }} />
                                        <p style={
                                            { margin: 0, borderBottom: "solid 1px black" }
                                        }>Donnez votre  avis</p>
                                    </div>
                                    <p>Taille des grains: 0,25 mm</p>
                                    <p><strong>Prix : 5000ar/sac</strong></p>
                                </div>
                                <div className="btn1">
                                    <div className="action">
                                        <button>-</button>
                                        <p>1</p>
                                        <button>+</button>
                                    </div>
                                    <button className='auPanier'>
                                        <img src="icons/shopping-cart.png" alt="" />
                                        au panier
                                    </button>
                                </div>
                                <div className="btn2">
                                    <button>
                                        <img src="icons/phone-outgoing.png" alt="" />
                                        <span>Besoin d’aide</span>
                                        <img src="icons/move-right.png" alt="" />
                                    </button>
                                    <button>
                                        <img src="icons/wallet-cards.png" alt="" />
                                        <span>Paiement sécurisé </span>
                                        <img src="icons/move-right.png" alt="" />
                                    </button>
                                    <button>
                                        <img src="icons/car.png" alt="" />
                                        <span>Livraison standard</span>
                                        <img src="icons/move-right.png" alt="" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="bottom">
                            <button className="desc">
                                <img src="icons/square-pen.png" alt="" />Description
                            </button>
                            <div className="cara">
                                <strong>Caractéristiques produits:</strong>
                            </div>

                            <p>-Taille des grains (mm):  0,25 mm</p>
                            <p>-Aspect visuel: Poudreux, doux au toucher</p>
                            <p>-Usage principal: Enduits fins, finitions</p>
                            <p>-Méthode simple pour reconnaître à la main: colle entre les doigts, lisse</p>
                            <div className="avis">
                                <strong>Donner votre Avis</strong>
                            </div>
                            <div className="msg">
                                <input type="text" placeholder='Ecrire vos messages' />
                                <button className="send">
                                    <img src="icons/message-square-dot.png" alt="" />
                                    Envoyer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Details