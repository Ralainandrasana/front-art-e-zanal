import React from 'react';
import '../styles/visiteur.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from "react-router-dom";

function Visiteur() {
    const navigate = useNavigate();
    const handleSignIn = () => {
        navigate("/SignIn");
    };
    const handleSignUp = () => {
        navigate("/SignUp");
    };
    return (
        <>
            <Header />
            <div className="visiteur">
                <div className="header1">
                    <h2 className="logo"> <img src="logos/logoPlateforme.png" alt="" /> art-e-zanal</h2>
                    <div className="search">
                        <img src="icons/search.png" alt="" />
                        <input type="text" placeholder="recherche des matriaux: brique, sable, moellon, gravillon..." />
                    </div>
                    <div className="logout-login">
                        <img src="icons/user.png" alt="" /><p><button href="#" onClick={handleSignUp}>S’inscrire</button> / <button href="#" onClick={handleSignIn}>Se connecter</button></p>
                    </div>
                </div>
                <div className="menu">
                    <ul>
                        <li><a href="#" className="activated">Accueil</a></li>
                        <li><a href="#">Produits</a></li>
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
                <div className="content1">
                    <div className="title">
                        <h2 className="left">Nos <span className="blue">Promotions</span></h2>
                        <p className="right">Voir tous <img src="icons/ArrowLeft.png" alt="" /></p>
                    </div>
                    <div className="content">
                        <div className="card">
                            <div className="top">
                                <img src="images/brique.png" alt="" />
                                <div className="reduction">-75%</div>
                            </div>
                            <div className="center">
                                <p>Brique</p>
                                <p>150 ar <span className="through">200ar</span></p>
                            </div>
                            <div className="bottom">
                                <p>Save - 50ar</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="top">
                                <img src="images/moellon.png" alt="" />
                                <div className="reduction">-75%</div>
                            </div>
                            <div className="center">
                                <p>Brique</p>
                                <p>150 ar <span className="through">200ar</span></p>
                            </div>
                            <div className="bottom">
                                <p>Save - 50ar</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="top">
                                <img src="images/gravillon.png" alt="" />
                                <div className="reduction">-75%</div>
                            </div>
                            <div className="center">
                                <p>Brique</p>
                                <p>150 ar <span className="through">200ar</span></p>
                            </div>
                            <div className="bottom">
                                <p>Save - 50ar</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content2">
                    <div className="title">
                        <h2 className="left">Listes des <span className="blue">matériaux</span> disponible</h2>
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
                        <h2 className="left">Nos <span className="blue">fournisseurs</span></h2>
                        <p className="right">Voir tous <img src="icons/ArrowLeft.png" alt="" /></p>
                    </div>
                    <div className="content">
                        <div className="wrapContent">
                            <div className="card granite">
                                <p className="left">NFA Granite</p>
                                <div className="right"><img src="logos/nfaGranite.png" alt="" /></div>
                            </div>
                            <div className="card batistock">
                                <p className="left">BATISTOCK<br />Madagascar</p>
                                <div className="right"><img src="logos/batiStock.png" alt="" /></div>
                            </div>
                            <div className="card mazana">
                                <p className="left">Mazana Brika</p>
                                <div className="right"><img src="logos/mazana.png" alt="" /></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content4">
                    <div className="title">
                        <h2 className="left">Produits<span className="blue"> moins chers</span></h2>
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

export default Visiteur