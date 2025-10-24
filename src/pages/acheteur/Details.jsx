import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/details.css";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { StarOutlined } from "@ant-design/icons";

function Details() {
  const { id_produit } = useParams();
  const navigate = useNavigate();
  const [produit, setProduit] = useState(null);
  const [quantite, setQuantite] = useState(0);

  // ✅ Aller vers la page panier
  const goToPanier = () => {
    navigate("/Panier");
  };

  // ✅ Diminuer quantité
  const handleDecrease = () => {
    if (quantite > 0) {
      setQuantite(quantite - 1);
    }
  };

  // ✅ Augmenter quantité
  const handleIncrease = () => {
    setQuantite(quantite + 1);
  };

  // ✅ Ajouter au panier (localStorage uniquement)
  const handleAddToCart = () => {
    if (quantite > 0 && produit) {
      // Récupérer le panier existant dans le localStorage
      const panier = JSON.parse(localStorage.getItem("panier")) || [];

      // Vérifier si le produit est déjà dans le panier
      const existingIndex = panier.findIndex(
        (item) => item.id_produit === produit.id_produit
      );

      if (existingIndex !== -1) {
        // Si le produit existe déjà, on met à jour la quantité
        panier[existingIndex].quantite += quantite;
      } else {
        // Sinon, on ajoute un nouveau produit
        panier.push({
          id_produit: produit.id_produit,
          nomProduit: produit.nomProduit,
          descriptionProduit: produit.descriptionProduit,
          image: produit.image,
          prixUnitaire: produit.prixUnitaire,
          quantite: quantite,
        });
      }

      // Sauvegarder le panier mis à jour
      localStorage.setItem("panier", JSON.stringify(panier));
      alert("✅ Produit ajouté au panier !");
      setQuantite(0); // Réinitialiser la quantité
    } else {
      alert("Veuillez sélectionner une quantité avant d’ajouter au panier.");
    }
  };

  // ✅ Charger les détails du produit depuis le backend
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/produit/${id_produit}`)
      .then((res) => setProduit(res.data))
      .catch((err) => console.error("Erreur de chargement produit:", err));
  }, [id_produit]);

  if (!produit) {
    return (
      <>
        <Header />
        <div className="loading">Chargement du produit...</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="acheteur">
        <div className="header1">
          <h2 className="logo">
            <img src="logos/logoPlateforme.png" alt="" /> art-e-zanal
          </h2>
          <div className="search">
            <img src="icons/search.png" alt="" />
            <input
              type="text"
              placeholder="recherche des matériaux: brique, sable, moellon, gravillon..."
            />
          </div>
          <div className="compte-panier">
            <button>
              <img src="icons/user.png" alt="" />
              <p>Mon compte</p>
            </button>
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

        <div className="content2">
          <div className="titlePanier">
            <h3 className="left">{produit.nomProduit}</h3>
          </div>
          <div className="back" onClick={() => navigate(-1)}>
            <img src="icons/chevron-left.png" alt="" />
          </div>

          <div className="bodyDetails">
            <div className="top">
              <img
                src={`http://127.0.0.1:8000${produit.image}`}
                className="photo"
                onError={(e) => (e.target.src = "/images/default.png")}
              />

              <div className="right">
                <div className="text">
                  <h1>
                    <strong>{produit.nomProduit}</strong>
                  </h1>
                  <p className="description">
                    Référence : {produit.id_produit}
                  </p>

                  <div className="dddd">
                    <div className="stars" style={{ color: "#73AB05" }}>
                      <StarOutlined />
                      <StarOutlined />
                      <StarOutlined />
                      <StarOutlined />
                      <StarOutlined />
                    </div>
                    <p>Donnez votre avis</p>
                  </div>

                  <p>Description : {produit.descriptionProduit || "N/A"}</p>
                  <p>
                    <strong>Prix unitaire : {produit.prixUnitaire} Ar</strong>
                  </p>
                </div>

                <div className="btn1">
                  <div className="action">
                    <button onClick={handleDecrease} disabled={quantite === 0}>
                      -
                    </button>
                    <p>{quantite}</p>
                    <button onClick={handleIncrease}>+</button>
                  </div>

                  {/* Bouton AJOUTER AU PANIER */}
                  <button
                    className="auPanier"
                    onClick={handleAddToCart}
                    disabled={quantite === 0}
                  >
                    Ajouter
                  </button>

                  {/* Bouton ALLER AU PANIER */}
                  <button className="auPanier" onClick={goToPanier}>
                    <img src="/icons/shopping-cart.png" alt="Panier" />
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
                    <span>Paiement sécurisé</span>
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
                <img src="icons/square-pen.png" alt="" />
                Description
              </button>

              <div className="cara">
                <strong>Caractéristiques produits:</strong>
              </div>

              <p>-Nature : {produit.descriptionProduit || "N/A"}</p>
              <p>-Quantité disponible : {produit.quantite || "N/A"}</p>

              <div className="avis">
                <strong>Donner votre Avis</strong>
              </div>

              <div className="msg">
                <input type="text" placeholder="Écrire vos messages" />
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
  );
}

export default Details;
