import React, { useEffect, useState } from "react";
import "../styles/visiteur.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Visiteur() {
  const [promotions, setPromotions] = useState([]);
  const [produits, setProduits] = useState([]);
  const [materiaux, setMateriaux] = useState([]);
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/SignIn");
  };

  const handleSignUp = () => {
    navigate("/SignUp");
  };

  const handleProduitClick = (id_produit) => {
    // Pour l'instant, ne fait rien
    console.log("Produit cliqué :", id_produit);
  };

  // 🔹 Charger tous les matériaux
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/produit/")
      .then((res) => {
        setMateriaux(res.data);
      })
      .catch((err) => console.error("Erreur chargement matériaux :", err));
  }, []);

  // 🔹 Charger les 5 produits les moins chers
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/produit/?ordering=prixUnitaire")
      .then((res) => setProduits(res.data.slice(0, 5)))
      .catch((err) => console.error("Erreur chargement produits :", err));
  }, []);

  // 🔹 Charger les promotions
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/promotion/");
        setPromotions(res.data);
      } catch (err) {
        console.error("Erreur chargement promotions :", err);
      }
    };
    fetchPromotions();
  }, []);

  return (
    <>
      <Header />
      <div className="visiteur">
        <div className="header1">
          <h2 className="logo">
            <img src="logos/logoPlateforme.png" alt="" /> art-e-zanal
          </h2>
          <div className="search">
            <img src="icons/search.png" alt="" />
            <input
              type="text"
              placeholder="recherche des matriaux: brique, sable, moellon, gravillon..."
            />
          </div>
          <div className="logout-login">
            <img src="icons/user.png" alt="" />
            <p>
              <button onClick={handleSignUp}>S’inscrire</button> /{" "}
              <button onClick={handleSignIn}>Se connecter</button>
            </p>
          </div>
        </div>

        <div className="menu">
          <ul>
            <li>
              <a href="#" className="activated">
                Accueil
              </a>
            </li>
            <li>
              <a href="#">Produits</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
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
            <h2 className="left">
              Nos <span className="blue">Promotions</span>
            </h2>
            <p className="right">
              Voir tous <img src="icons/ArrowLeft.png" alt="" />
            </p>
          </div>
          <div className="wrapContent">
            {promotions.map((promo) => {
              const reduction = Math.round(
                ((promo.prixAvant - promo.prixApres) / promo.prixAvant) * 100
              );
              const saveAmount = promo.prixAvant - promo.prixApres;
              return (
                <div className="card" key={promo.id_prom}>
                  <div className="top">
                    <img
                      src={ promo.id_produit.image ? promo.id_produit.image  : "images/default.png"}
                      alt={ promo.nomProduit}
                        onError={(e) => (e.target.src = "images/default.png")}
                    />
                    <div className="reduction">-{reduction}%</div>
                  </div>
                  <div className="center">
                    <p>{promo.id_produit.nomProduit}</p>
                    <p>
                      {promo.prixApres} ar{" "}
                      <span className="through">{promo.prixAvant} ar</span>
                    </p>
                  </div>
                  <div className="bottom">
                    <p>Save - {saveAmount} ar</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="content2">
          <div className="title">
            <h2 className="left">
              Listes des <span className="blue">matériaux</span> disponible
            </h2>
            <p className="right">.</p>
          </div>
          <div className="content">
            <div className="wrapContent">
              {materiaux.length > 0 ? (
                materiaux.map((mat) => (
                  <div
                    className="li cursor-pointer hover:scale-105 transition-transform duration-200"
                    key={mat.id_produit}
                    onClick={() => handleProduitClick(mat.id_produit)}
                  >
                     <img
                        src={mat.image ? mat.image : "images/default.png"}
                        alt={mat.nomProduit}
                        onError={(e) => (e.target.src = "images/default.png")}
                      />
                    <p>{mat.nomProduit}</p>
                  </div>
                ))
              ) : (
                <p>Aucun matériaux disponible pour le moment.</p>
              )}
            </div>
          </div>
        </div>

        <div className="content4">
          <div className="title">
            <h2 className="left">
              Produits <span className="blue">moins chers</span>
            </h2>
            <p className="right">Voir tous <img src="icons/ArrowLeft.png" alt="" /></p>
          </div>
          <div className="content">
            <div className="wrapContent">
              {produits.length > 0 ? (
                produits.map((produit) => (
                  <div
                    className="li cursor-pointer hover:scale-105 transition-transform duration-200"
                    key={produit.id_produit}
                    onClick={() => handleProduitClick(produit.id_produit)}
                  >
                    <img
                        src={
                          produit.image ? produit.image : "images/default.png"
                        }
                        
                        alt={produit.nomProduit}
                        onError={(e) => (e.target.src = "images/default.png")}
                      />
                    <p>{produit.nomProduit}</p>
                    <p>
                      <strong>{produit.prixUnitaire} Ar</strong>
                    </p>
                  </div>
                ))
              ) : (
                <p>Aucun produit à afficher.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Visiteur;
