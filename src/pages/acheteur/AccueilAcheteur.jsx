import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/acheteurAccueil.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Swal from "sweetalert2";

function AccueilAcheteur() {
  const [produits, setProduits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [materiaux, setMateriaux] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token"); // si tu utilises JWT
      const res = await axios.get("http://127.0.0.1:8000/api/notification/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(res.data);
    } catch (error) {
      console.error("Erreur de chargement des notifications :", error);
    }
  };


  useEffect(() => {
    fetchPromotions();
  }, []);

  // 🔹 Charger les promotions
  const fetchPromotions = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/promotion/");
      setPromotions(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des promotions :", error);
    }
  };

  // 🔹 Charger tous les produits
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/produit/")
      .then((res) => setProduits(res.data))
      .catch((err) => console.error("Erreur chargement produits :", err));
  }, []);

  useEffect(() => {
    // Appel à ton backend Django pour récupérer les produits
    axios
      .get("http://127.0.0.1:8000/api/produit/")
      .then((response) => {
        setMateriaux(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des matériaux :", error);
      });
  }, []);

  useEffect(() => {
    // Appel de l’API pour récupérer les produits triés par prix croissant
    axios
      .get("http://127.0.0.1:8000/api/produit/?ordering=prixUnitaire")
      .then((response) => {
        // On garde seulement les 5 premiers produits les moins chers
        const moinsChers = response.data.slice(0, 5);
        setProduits(moinsChers);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des produits :", error);
      });
  }, []);

  // 🔹 Redirection vers page de détails
  const handleProduitClick = (id_produit) => {
    navigate(`/Details/${id_produit}`);
  };

  const handleNotificationClick = (notification) => {
  Swal.fire({
    title: "Procéder au paiement",
    text: "Souhaitez-vous procéder au paiement pour cette commande ?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Payer",
    cancelButtonText: "Annuler",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      // Redirection vers la page de paiement
      navigate("/Payer"); // 🔹 change le chemin selon ta route réelle
    }
  });
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
            <button href="#">
              <img src="icons/user.png" alt="" />
              <p>Mon compte</p>
            </button>
            <button href="/Panier">
              <img src="icons/shop.png" alt="" />
              <p>Mon panier</p>
            </button>
            <button className="notif-btn" onClick={() => setShowNotif(!showNotif)}>
    <img src="icons/bell.png" alt="" />
    {notifications.some((n) => !n.is_read) && (
      <span className="notif-badge"></span>
    )}
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
        {showNotif && (
    <div className="notif-dropdown">
      {notifications.length > 0 ? (
        notifications.map((n) => (
          <div
      key={n.id_notification}
      className="notif-item cursor-pointer hover:bg-gray-100"
      onClick={() => handleNotificationClick(n)}
    >
      {n.message}
    </div>
        ))
      ) : (
        <p>Aucune notification.</p>
      )}
    </div>
  )}
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
              {produits.length > 0 ? (
                produits
                  .filter((p) =>
                    p.nomProduit
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((produit) => (
                    <div
                      className="li"
                      key={produit.id_produit}
                      onClick={() => handleProduitClick(produit.id_produit)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={`http://127.0.0.1:8000${produit.image}`}
                        alt={produit.nomProduit}
                        onError={(e) => {
                          e.target.src = "images/default.png";
                        }}
                      />
                      <p>{produit.nomProduit}</p>
                      <p>
                        <strong>{produit.prixUnitaire} Ar</strong>
                      </p>
                    </div>
                  ))
              ) : (
                <p>Aucun produit disponible</p>
              )}
            </div>
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
          <div className="content">
            {promotions.map((promo) => {
              const reduction = Math.round(
                ((promo.prixAvant - promo.prixApres) / promo.prixAvant) * 100
              );
              const saveAmount = promo.prixAvant - promo.prixApres;
              return (
                <div className="card" key={promo.id_prom}>
                  <div className="top">
                    <img
                      src={
                        promo.id_produit.image
                          ? `http://127.0.0.1:8000${promo.id_produit.image}`
                          : "images/default.png"
                      }
                      alt={promo.id_produit.nomProduit}
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
                      src={`http://127.0.0.1:8000${mat.image}`}
                      alt={mat.nomProduit}
                      onError={(e) => (e.target.src = "images/default.png")} // image de secours
                    />
                    <p>{mat.nomProduit}</p>
                  </div>
                ))
              ) : (
                <p>Aucun matériau disponible pour le moment.</p>
              )}
            </div>
          </div>
        </div>
        <div className="content3">
          <div className="title">
            <h2 className="left">
              Nos <span className="blue">fournisseurs</span>
            </h2>
            <p className="right">
              Voir tous <img src="icons/ArrowLeft.png" alt="" />
            </p>
          </div>
          <div className="content">
            <div className="wrapContent">
              <div className="card granite">
                <p className="left">NFA Granite</p>
                <div className="right">
                  <img src="logos/nfaGranite.png" alt="" />
                </div>
              </div>
              <div className="card batistock">
                <p className="left">
                  BATISTOCK
                  <br />
                  Madagascar
                </p>
                <div className="right">
                  <img src="logos/batiStock.png" alt="" />
                </div>
              </div>
              <div className="card mazana">
                <p className="left">Mazana Brika</p>
                <div className="right">
                  <img src="logos/mazana.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content4">
          <div className="title">
            <h2 className="left">
              Produits<span className="blue"> moins chers</span>
            </h2>
            <p className="right">
              Voir tous <img src="icons/ArrowLeft.png" alt="" />
            </p>
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
                src={`http://127.0.0.1:8000${produit.image}`}
                alt={produit.nomProduit}
                onError={(e) => (e.target.src = "images/default.png")} // image de secours
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

export default AccueilAcheteur;
