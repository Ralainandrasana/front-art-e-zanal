import React from 'react';
import '../../styles/acheteurAccueil.css'
import Header from '../../components/Header'
import { useNavigate } from "react-router-dom";
import Footer from '../../components/Footer'

function AccueilAcheteur() {
    const navigate = useNavigate();
    const handleGoPanier = () => {
        navigate("/Panier");
    };
    const handleGoCommandes = () => {
        navigate("/Commandes");
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
                        <button onClick={handleGoPanier}><img src="icons/shop.png" alt="" /><p>Mon panier</p></button>
                        <button className='notif'><img src="icons/bell.png" alt="" /><div className='nbrNotif'>4</div></button>
                    </div>
                </div>
                <div className="menu">
                    <ul>
                        <li><a href="#" className="activated">Accueil</a></li>
                        <li><a href="#">Produits</a></li>
                        <li><a onClick={handleGoCommandes}>Commandes effectués</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div className="header2">
                    <div className="left">
                        <h2>Commandez vos matériaux en ligne</h2>
                        <h1>soutenez les artisans locaux.</h1>
                        <h2>service rapide et fiable !</h2>
                    </div>
                    <div className="right">
                        <img src="images/brique.png" alt="" />
                    </div>
                </div>
                <div className="content2">
                    <div className="title">
                        <h2 className="left">Les incontournables</h2>
                        <p className="right">.</p>
                    </div>
                    <div className="content">
                        <div className="wrapContent">
                            <div className="li">
                                <img src="images/brique.png" alt="" />
                                <p>Brique</p>
                            </div>
                            <div className="li">
                                <img src="images/sable.png" alt="" />
                                <p>Sable</p>
                            </div>
                            <div className="li">
                                <img src="images/moellon.png" alt="" />
                                <p>Moellon</p>
                            </div>
                            <div className="li">
                                <img src="images/gravillon.png" alt="" />
                                <p>Gravillon</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content3">
                    <div className="title">
                        <h2 className="left">Offres du moment</h2>
                        <p className="right">Voir tous <img src="icons/ArrowLeft.png" alt="" /></p>
                    </div>
                    <div className="content">
                        <div className="wrapContent">
                            <div className="card granite">
                                <div className="left">
                                    <p className="left">Brique</p>
                                    <h1>-75%</h1>
                                    <p>150 ar <span className='through'>200ar</span></p>
                                </div>
                                <div className="right"><img src="images/brique.png" alt="" /></div>
                            </div>
                            <div className="card sable">
                                <div className="left">
                                    <p className="left">Brique</p>
                                    <h1>-75%</h1>
                                    <p>150 ar <span className='through'>200ar</span></p>
                                </div>
                                <div className="right"><img src="images/sable.png" alt="" /></div>
                            </div>
                            <div className="card mazana">
                                <div className="left">
                                    <p className="left">Brique</p>
                                    <h1>-75%</h1>
                                    <p>150 ar <span className='through'>200ar</span></p>
                                </div>
                                <div className="right"><img src="images/gravillon.png" alt="" /></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content4">
                    <div className="title">
                        <h2 className="left">Nouveautés</h2>
                        <p className="right">Voir tous <img src="icons/ArrowLeft.png" alt="" /></p>
                    </div>

                    <div className="content">
                        <div className="wrapContent">
                            <div className="li">
                                <img src="images/brique.png" alt="" />
                                <p>Brique</p>
                                <p><strong>200Ar</strong></p>
                            </div>
                            <div className="li">
                                <img src="images/brique.png" alt="" />
                                <p>Brique</p>
                                <p><strong>200Ar</strong></p>
                            </div>
                            <div className="li">
                                <img src="images/brique.png" alt="" />
                                <p>Brique</p>
                                <p><strong>200Ar</strong></p>
                            </div>
                            <div className="li">
                                <img src="images/brique.png" alt="" />
                                <p>Brique</p>
                                <p><strong>200Ar</strong></p>
                            </div>
                            <div className="li">
                                <img src="images/brique.png" alt="" />
                                <p>Brique</p>
                                <p><strong>200Ar</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AccueilAcheteur