import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/acheteurAccueil.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Swal from "sweetalert2";
import CompteClientModal from "./CompteClientModal";
import CloseIcon from "@mui/icons-material/Close";

// 🔹 Material UI
import {
  Button,
  Badge,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

function AccueilAcheteur() {
  const [produits, setProduits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [materiaux, setMateriaux] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      console.log(res.data);
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
      .then((res) => {
        console.log(res.data); // <-- ici
        setProduits(res.data);
      })
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

  const handleNotificationClick = async (notification) => {
  try {
    const token = localStorage.getItem("token");

    // 🔹 1. Marquer la notification comme lue côté backend
    await axios.patch(
      `http://127.0.0.1:8000/api/notification/${notification.id_notification}/mark_as_read/`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // 🔹 2. Mettre à jour localement
    setNotifications((prev) =>
      prev.map((n) =>
        n.id_notification === notification.id_notification
          ? { ...n, is_read: true }
          : n
      )
    );

    // 🔹 3. Vérifier le message et agir selon le cas
    if (
      notification.message.trim() ===
      "Votre commande a été validée. Veuillez procéder au paiement pour obtenir la marchandise."
    ) {
      const id_commande = notification.commande?.id_commande;

      if (!id_commande) {
        console.warn("Aucune commande liée à cette notification.");
        return;
      }

      // 🔹 4. Vérifier si la commande est déjà payée (backend)
      const checkResponse = await axios.get(
        `http://127.0.0.1:8000/api/payement/check/${id_commande}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (checkResponse.data?.isPaid) {
        // 🔹 Si déjà payée
        Swal.fire({
          icon: "info",
          title: "Commande déjà payée 💰",
          text: "Vous avez déjà effectué le paiement pour cette commande.",
          confirmButtonText: "OK",
        });
        return; // on stoppe ici
      }

      // 🔹 Sinon, proposer le paiement
      Swal.fire({
        title: "Commande validée 🎉",
        text: "Souhaitez-vous procéder au paiement maintenant ?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Oui, payer",
        cancelButtonText: "Plus tard",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/Payer", {
            state: {
              id_commande,
              montant: notification.commande?.total,
            },
          });
        }
      });
    } else if (
      notification.message.trim() === "Désolé, votre commande a été refusée."
    ) {
      Swal.fire({
        icon: "info",
        title: "Commande refusée ❌",
        text: "Votre commande a été refusée.",
        confirmButtonText: "OK",
      });
    }
  } catch (error) {
    console.error("Erreur lors du clic sur la notification :", error);
  }
};


  // ✅ Tout marquer comme lu
  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        "http://127.0.0.1:8000/api/notification/mark_all_as_read/",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch (error) {
      console.error("Erreur lors du marquage global :", error);
    }
  };

  // 🔹 Compte combien de notifications non lues
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <>
      <Header />

      <div className="acheteur">
        {/* Header */}
        <div className="header1">
          <h2 className="logo">
            <img src="logos/logoPlateforme.png" alt="" /> art-e-zanal
          </h2>

          <div className="search">
            <TextField
              placeholder="Recherche des matériaux: brique, sable, moellon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
            />
          </div>

          <div className="compte-panier">
            <Button
              onClick={() => setIsModalVisible(true)}
              variant="text"
              startIcon={<img src="icons/user.png" alt="" />}
            >
              Mon compte
            </Button>
            <CompteClientModal
              visible={isModalVisible}
              onClose={() => setIsModalVisible(false)}
            />

            <Button
              onClick={() => navigate("/Panier")}
              variant="text"
              startIcon={<img src="icons/shop.png" alt="" />}
            >
              Mon panier
            </Button>

            <IconButton onClick={() => setShowNotif(!showNotif)}>
              <Badge
                color="error"
                variant="dot"
                invisible={notifications.every((n) => n.is_read)}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </div>
        </div>

        {/* Menu */}
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

        {/* ✅ Liste des notifications */}
        {showNotif && (
          <Box className="notif-dropdown">
            <div className="notif-header">
              <h3>Notifications</h3>
              {unreadCount > 0 && (
                <Button onClick={markAllAsRead} size="small" color="primary">
                  Tout marquer comme lu
                </Button>
              )}
              <IconButton size="small" onClick={() => setShowNotif(false)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
            <div className="notif-list">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <Box
                    key={n.id_notification}
                    className={`notif-item cursor-pointer ${
                      !n.is_read ? "unread" : ""
                    }`}
                    onClick={() => handleNotificationClick(n)}
                    sx={{ p: 1, borderBottom: "1px solid #eee" }}
                  >
                    <Typography variant="body2">{n.message}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(n.date_creation).toLocaleString()}
                    </Typography>
                  </Box>
                ))
              ) : (
                <p className="no-notif">Aucune notification.</p>
              )}
            </div>
          </Box>
        )}
        {/* Header2 */}
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

        {/* Les incontournables */}
        <div className="content2">
          <div className="title">
            <h2 className="left">Les incontournables</h2>
            <p className="right">.</p>
          </div>
          <div className="content">
            <div className="wrapContent">
              {produits.length > 0 ? (
                produits
                  .filter((p) => p.statut === "validee")
                  .filter((p) =>
                    p.nomProduit
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((produit) => (
                    <Card
                      key={produit.id_produit}
                      className="li cursor-pointer hover:scale-105 transition-transform duration-200"
                      onClick={() => handleProduitClick(produit.id_produit)}
                    >
                      <CardMedia
                        component="img"
                        image={produit.image || "images/default.png"}
                        alt={produit.nomProduit}
                      />
                      <CardContent>
                        <Typography>{produit.nomProduit}</Typography>
                        <Typography>
                          <strong>{produit.prixUnitaire} Ar</strong>
                        </Typography>
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <p>Aucun produit disponible</p>
              )}
            </div>
          </div>
        </div>

        {/* Promotions */}
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
                <Card key={promo.id_prom} className="card">
                  <CardMedia
                    component="img"
                    image={promo.id_produit.image || "images/default.png"}
                    alt={promo.id_produit.nomProduit}
                  />
                  <CardContent>
                    <Typography>{promo.id_produit.nomProduit}</Typography>
                    <Typography>
                      {promo.prixApres} ar{" "}
                      <span className="through">{promo.prixAvant} ar</span>
                    </Typography>
                    <Typography variant="caption">
                      Save - {saveAmount} ar
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Matériaux disponibles */}
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
                materiaux
                  .filter((mat) => mat.statut === "validee")
                  .filter((mat) =>
                    mat.nomProduit
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((mat) => (
                    <Card
                      key={mat.id_produit}
                      className="li cursor-pointer hover:scale-105 transition-transform duration-200"
                      onClick={() => handleProduitClick(mat.id_produit)}
                    >
                      <CardMedia
                        component="img"
                        image={mat.image || "images/default.png"}
                        alt={mat.nomProduit}
                      />
                      <CardContent>
                        <Typography>{mat.nomProduit}</Typography>
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <p>Aucun matériaux disponible pour le moment.</p>
              )}
            </div>
          </div>
        </div>

        {/* Fournisseurs */}
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

        {/* Produits moins chers */}
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
                produits
                  .filter((p) => p.statut === "validee")
                  .filter((p) =>
                    p.nomProduit
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((produit) => (
                    <Card
                      key={produit.id_produit}
                      className="li cursor-pointer hover:scale-105 transition-transform duration-200"
                      onClick={() => handleProduitClick(produit.id_produit)}
                    >
                      <CardMedia
                        component="img"
                        image={produit.image || "images/default.png"}
                        alt={produit.nomProduit}
                      />
                      <CardContent>
                        <Typography>{produit.nomProduit}</Typography>
                        <Typography>
                          <strong>{produit.prixUnitaire} Ar</strong>
                        </Typography>
                      </CardContent>
                    </Card>
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
