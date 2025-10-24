import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../../styles/payer.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";

function Payer() {
  const navigate = useNavigate();
  const location = useLocation();
  

  // 🔹 Données passées via navigate("/Paiement", { state: { commande } })
  const commande = location.state?.commande;

  const [operateur, setOperateur] = useState("");
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    code: "",
  });

  // 🔹 Exemple de montant à payer (ou celui de la commande)
  const montant = commande?.montant || 50000;

  // 🔹 Gestion du changement dans le formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Soumission du paiement simulé
  const handlePaiement = async () => {
    if (!operateur) {
      Swal.fire("Erreur", "Veuillez choisir un opérateur", "error");
      return;
    }

    if (!formData.telephone || !formData.code) {
      Swal.fire("Erreur", "Veuillez remplir tous les champs", "error");
      return;
    }

    try {
    const token = localStorage.getItem("token"); // JWT
    const response = await axios.post(
      "http://127.0.0.1:8000/api/payement/simuler/",
      {
        montant: formData.montant,        // Float
        typePayement: formData.typePayement, // string ("Telma", "Airtel", ...)
        id_commande: formData.id_commande,  // string, ex: "COM001"
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    

      Swal.fire({
        title: "Paiement réussi ✅",
        text: `Vous avez payé ${montant} Ar via ${operateur}.`,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/"); // Redirection vers l’accueil
      });
    } catch (error) {
      console.error("Erreur de paiement :", error);
      Swal.fire("Erreur", "Échec du paiement simulé", "error");
    }
  };

  return (
    <>
      <Header />
      <div className="acheteur">
        <div className="header1">
          <h2 className="logo">
            {" "}
            <img src="logos/logoPlateforme.png" alt="" /> art-e-zanal
          </h2>
          <div className="search">
            <img src="icons/search.png" alt="" />
            <input
              type="text"
              placeholder="recherche des matriaux: brique, sable, moellon, gravillon..."
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
            <h3 className="left">Payement</h3>
          </div>
          <div className="body">
            <div className="left">
              <div className="top">
                <strong>Methode de payement</strong>
                <div className="operateur telma">
                  <img src="logos/telma.png" alt="" />
                  <input
                    type="radio"
                    name="operateur"
                    value="Telma"
                    checked={operateur === "Telma"}
                    onChange={(e) => setOperateur(e.target.value)}
                  />
                </div>
                <div className="operateur airtel">
                  <img src="logos/airtel.png" alt="" />
                  <input
                    type="radio"
                    name="operateur"
                    value="Airtel"
                    checked={operateur === "Airtel"}
                    onChange={(e) => setOperateur(e.target.value)}
                  />
                </div>
                <div className="operateur orange">
                  <img src="logos/orange.png" alt="" />
                  <input
                    type="radio"
                    name="operateur"
                    value="Orange"
                    checked={operateur === "Orange"}
                    onChange={(e) => setOperateur(e.target.value)}
                  />
                </div>
              </div>
              <div className="bottom">
                <p>Vous avez à payer </p>
                <h1>{montant.toLocaleString()} Ar</h1>
                <p>
                  <img src="icons/badge-check.png" alt="" /> Nous prenons soin
                  de tout pour vous. Effectuez vos paiements en toute{" "}
                </p>
                <p>
                  sécurité pendant que nous assurons le bon traitement de votre
                </p>
                <p>transaction.</p>
              </div>
            </div>
            <div className="right">
              <h1>Details</h1>
              <div className="formPayment">
                <label htmlFor="nom">Nom</label>
                <br />
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="nom">Prenom</label>
                <br />
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="nom">Numéro Téléphone</label>
                <br />
                <input
                  type="text"
                  name="telephone"
                  placeholder="+261..."
                  value={formData.telephone}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="nom">code</label>
                <br />
                <input
                  type="password"
                  name="code"
                  placeholder="XXXX"
                  value={formData.code}
                  onChange={handleChange}
                />
                <br />
                <div className="btn">
                  <button onClick={handlePaiement}>Payer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payer;
