import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../../styles/payer.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";

function Payer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id_user, id_commande, montant } = location.state || {};

  // 🔹 Commande et montant côté Panier
  const [operateur, setOperateur] = useState("");
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    code: "",
  });

  // // 🔹 Récupérer la commande validée depuis l'id_notification si nécessaire
  // useEffect(() => {
  //   const fetchCommandeFromNotif = async () => {
  //     if (!id_notification || commande) return; // déjà récupéré depuis Panier

  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.get(
  //         `http://127.0.0.1:8000/api/notification/commande-from-notif/${id_notification}/`,
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       setCommande(response.data);
  //       setMontant(response.data.total); // montant validé côté backend
  //     } catch (error) {
  //       console.error(
  //         "Erreur récupération commande depuis notification :",
  //         error.response?.data || error.message
  //       );
  //       Swal.fire(
  //         "Erreur",
  //         "Impossible de récupérer la commande depuis la notification",
  //         "error"
  //       );
  //     }
  //   };

  //   fetchCommandeFromNotif();
  // }, [id_notification, commande]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaiement = async () => {
    if (!operateur)
      return Swal.fire("Erreur", "Veuillez choisir un opérateur", "error");
    if (!formData.telephone || !formData.code)
      return Swal.fire("Erreur", "Veuillez remplir tous les champs", "error");
    if (!id_commande) return Swal.fire("Erreur", "Commande introuvable", "error");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://127.0.0.1:8000/api/payement/simuler/",
        {
          montant,
          typePayement: operateur,
          id_commande: id_commande,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Swal.fire({
        title: "Paiement réussi ✅",
        text: `Vous avez payé ${montant.toLocaleString()} Ar via ${operateur}.`,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => navigate("/Acheteur"));
    } catch (error) {
      console.error(
        "Erreur de paiement :",
        error.response?.data || error.message
      );
      Swal.fire("Erreur", "Échec du paiement simulé", "error");
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
            <h3 className="left">Paiement</h3>
          </div>
          <div className="body">
            <div className="left">
              <div className="top">
                <strong>Méthode de paiement</strong>
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
              <strong>Vous avez à payer</strong>
              <p>
                <span>{montant.toLocaleString()} Ar</span>
              </p>
            </div>
{/* <div className="right">
                            <h1>Details</h1>
                            <div className="formPayment">
                                <label htmlFor="nom">Nom</label><br /><input type="text" /><br />
                                <label htmlFor="nom">Prenom</label><br /><input type="text" /><br />
                                <label htmlFor="nom">Numéro Téléphone</label><br /><input type="text" placeholder='+261...' /><br />
                                <label htmlFor="nom">code</label><br /><input type="text" placeholder='XXXX' /><br />
                                <div className="btn">
                                    <button>Payer</button>
                                </div>
                            </div>
                        </div> */}
            <div className="right">
              <h1>Détails</h1>
              <div className="formPayment">
                <label>Nom</label><br />
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                /><br />
                <label>Prénom</label><br />
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                /><br />
                <label>Numéro Téléphone</label><br />
                <input
                  type="text"
                  name="telephone"
                  placeholder="+261..."
                  value={formData.telephone}
                  onChange={handleChange}
                /><br />
                <label>Code</label><br />
                <input
                  type="password"
                  name="code"
                  placeholder="XXXX"
                  value={formData.code}
                  onChange={handleChange}
                /><br />
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
