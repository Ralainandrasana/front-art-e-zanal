import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../styles/panier.css";
import axios from "axios";
import Swal from "sweetalert2";


function Panier() {
  const navigate = useNavigate();
  const [panier, setPanier] = useState([]);
  const [commandeCree, setCommandeCree] = useState(null);

  // Charger le panier depuis localStorage
  useEffect(() => {
    const savedPanier = JSON.parse(localStorage.getItem("panier")) || [];
    const panierAvecQuantite = savedPanier.map((p) => ({
      ...p,
      quantite: p.quantite || 1,
      prixUnitaire: Number(p.prixUnitaire) || 0,
    }));
    setPanier(panierAvecQuantite);
  }, []);

  const handleIncrement = (id) => {
    const newPanier = panier.map((p) =>
      p.id_produit === id ? { ...p, quantite: p.quantite + 1 } : p
    );
    setPanier(newPanier);
    localStorage.setItem("panier", JSON.stringify(newPanier));
  };

  const handleDecrement = (id) => {
    const newPanier = panier.map((p) =>
      p.id_produit === id
        ? { ...p, quantite: p.quantite > 1 ? p.quantite - 1 : 1 }
        : p
    );
    setPanier(newPanier);
    localStorage.setItem("panier", JSON.stringify(newPanier));
  };

  const handleRemove = (id) => {
    const newPanier = panier.filter((p) => p.id_produit !== id);
    setPanier(newPanier);
    localStorage.setItem("panier", JSON.stringify(newPanier));
  };

  // Calcul du total
  const total = panier.reduce(
    (acc, item) => acc + item.prixUnitaire * item.quantite,
    0
  );

  // ✅ Créer la commande sans naviguer (avec SweetAlert2)
const handleGoPayer = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Connexion requise ⚠️",
        text: "Vous devez être connecté pour commander.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Se connecter",
      });
      return;
    }

    

    const payload = {
      panier: panier.map((p) => ({
        id_produit: p.id_produit,
        quantite: p.quantite,
        prixUnitaire: p.prixUnitaire,
      })),
      total,
    };

    const response = await axios.post(
      "http://127.0.0.1:8000/api/commande/",
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const nouvelleCommande = response.data;
    setCommandeCree(nouvelleCommande);

    // ✅ Message de succès
    Swal.fire({
      icon: "success",
      title: "Commande créée 🎉",
      text: "Votre commande a été créée avec succès !",
      confirmButtonColor: "#28a745",
      confirmButtonText: "OK",
      timer: 3000,
      timerProgressBar: true,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la création de la commande :",
      error.response?.data || error.message
    );

    // ❌ Message d'erreur
    Swal.fire({
      icon: "error",
      title: "Erreur ❌",
      text: "Une erreur est survenue lors de la création de votre commande.",
      confirmButtonColor: "#d33",
    });
  }
};


  return (
    <>
      <Header />
      <div className="acheteur">
        <div className="header1">
          <h2 className="logo">
            <img src="logos/logoPlateforme.png" alt="" /> art-e-zanal
          </h2>
        </div>

        <div className="content2">
          <div className="titlePanier">
            <h3 className="left">
              Détail de votre panier ({panier.length} article
              {panier.length > 1 ? "s" : ""})
            </h3>
          </div>

          <div className="body">
            <div className="left articles">
              {panier.length > 0 ? (
                panier.map((produit) => (
                  <div className="card" key={produit.id_produit}>
                    <div className="left">
                      <img
                        src={
                          produit.image ? produit.image : "images/default.png"
                        }
                        className="product-img"
                        alt={produit.nomProduit}
                        onError={(e) => (e.target.src = "images/default.png")}
                      />
                    </div>
                    <div className="center">
                      <h2>{produit.nomProduit}</h2>
                      <p>Référence : {produit.descriptionProduit}</p>
                    </div>
                    <div className="right">
                      <div className="action">
                        <button onClick={() => handleRemove(produit.id_produit)}>
                          <img src="icons/trash-2.png" alt="Supprimer" />
                        </button>
                        <button
                          onClick={() => handleDecrement(produit.id_produit)}
                          disabled={produit.quantite <= 1}
                        >
                          -
                        </button>
                        <p>{produit.quantite}</p>
                        <button onClick={() => handleIncrement(produit.id_produit)}>
                          +
                        </button>
                      </div>
                      <p>
                        <strong>
                          Prix : {produit.prixUnitaire * produit.quantite} Ar
                        </strong>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>Votre panier est vide.</p>
              )}
            </div>

            <div className="right payer">
              <div className="wrapPayer">
                <strong>
                  Récapitulatif ({panier.length} produit
                  {panier.length > 1 ? "s" : ""})
                </strong>
                <p>
                  <strong>Prix Total :</strong>{" "}
                  <span>{total.toLocaleString()} Ar</span>
                </p>
                <button onClick={handleGoPayer} disabled={panier.length === 0}>
                  Valider
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

export default Panier;
