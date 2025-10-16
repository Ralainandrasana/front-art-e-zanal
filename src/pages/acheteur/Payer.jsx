import React from 'react';
import '../../styles/payer.css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

function Payer() {

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
                        <h3 className="left">Payement</h3>
                    </div>
                    <div className="back">
                        <img src="icons/chevron-left.png" alt="" />
                    </div>
                    <div className="body">
                        <div className="left">
                            <div className="top">
                                <p>Methode de payement</p>
                                <div className="operateur">
                                    <img src="logos/telma.png" alt="" />
                                    <input type="radio" name="operateur" id="" />
                                </div>
                                <div className="operateur">
                                    <img src="logos/airtel.png" alt="" />
                                    <input type="radio" name="operateur" id="" />
                                </div>
                                <div className="operateur">
                                    <img src="logos/orange.png" alt="" />
                                    <input type="radio" name="operateur" id="" />
                                </div>
                            </div>
                            <div className="bottom">
                                <p>Vous  avez à payer  </p>
                                <h1>50.000ar</h1>
                                <p><img src="icons/badge-check.png" alt="" /> Nous prenons soin de tout pour vous. Effectuez vos paiements en toute </p>
                                <p>sécurité pendant que nous assurons le bon traitement de votre</p>
                                <p>transaction.</p>
                            </div>
                        </div>
                        <div className="right">
                            <h1>Details</h1>
                            <div className="formPayment">
                                <label htmlFor="nom">Nom</label><br /><input type="text" /><br />
                                <label htmlFor="nom">Prenom</label><br /><input type="text" /><br />
                                <label htmlFor="nom">Numéro Téléphone</label><br /><input type="text" placeholder='+261...' /><br />
                                <label htmlFor="nom">code</label><br /><input type="text" placeholder='XXXX' /><br />
                                <button>Payer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Payer