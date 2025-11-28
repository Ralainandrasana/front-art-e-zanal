import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/details.css";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { StarOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

// 🔹 Import Material UI
import { Button, IconButton, Typography, TextField, Box } from "@mui/material";

import PhoneIcon from "@mui/icons-material/Phone";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EditIcon from "@mui/icons-material/Edit";

function Details() {
  const { id_produit } = useParams();
  const navigate = useNavigate();
  const [produit, setProduit] = useState(null);
  const [quantite, setQuantite] = useState(0);

  const goToPanier = () => navigate("/Panier");

  const handleDecrease = () => {
    if (quantite > 0) setQuantite(quantite - 1);
  };

  const handleIncrease = () => setQuantite(quantite + 1);

  const handleAddToCart = () => {
    if (quantite > 0 && produit) {
      const panier = JSON.parse(localStorage.getItem("panier")) || [];
      const existingIndex = panier.findIndex(
        (item) => item.id_produit === produit.id_produit
      );
      if (existingIndex !== -1) {
        panier[existingIndex].quantite += quantite;
      } else {
        panier.push({
          id_produit: produit.id_produit,
          nomProduit: produit.nomProduit,
          descriptionProduit: produit.descriptionProduit,
          image: produit.image,
          prixUnitaire: produit.prixUnitaire,
          quantite: quantite,
        });
      }
      localStorage.setItem("panier", JSON.stringify(panier));
      
      setQuantite(0);
      // ✅ SweetAlert pour confirmation ajout panier
    Swal.fire({
      icon: "success",
      title: "Produit ajouté 🛒",
      text: `${produit.nomProduit} a été ajouté au panier !`,
      confirmButtonColor: "#28a745",
      timer: 2500,
      timerProgressBar: true,
    });

  } else {
    // ⚠️ SweetAlert pour avertissement
    Swal.fire({
      icon: "warning",
      title: "Quantité invalide ⚠️",
      text: "Veuillez sélectionner une quantité avant d’ajouter au panier.",
      confirmButtonColor: "#3085d6",
    });
};
  };

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
      <Box className="acheteur">
        <Box className="header1">
          <Typography variant="h5" className="logo">
            <img src="logos/logoPlateforme.png" alt="" /> art-e-zanal
          </Typography>

          <Box className="search">
            <img src="icons/search.png" alt="" />
            <TextField
              variant="outlined"
              size="small"
              placeholder="recherche des matériaux: brique, sable, moellon, gravillon..."
            />
          </Box>

          {/* <Box className="compte-panier">
            <Button>
              <img src="icons/user.png" alt="" />
              <Typography>Mon compte</Typography>
            </Button>
          </Box>*/}
        </Box>

        <Box className="menu">
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
        </Box>

        <Box className="content2">
          <Typography variant="h6" className="titlePanier">
            {produit.nomProduit}
          </Typography>
          <Box className="back" onClick={() => navigate(-1)}>
            <img src="icons/chevron-left.png" alt="" />
          </Box>

          <Box className="bodyDetails">
            <Box className="top">
              <img
                src={produit.image || "images/default.png"}
                alt={produit.nomProduit}
                className="product-image"
                onError={(e) => (e.target.src = "images/default.png")}
              />

              <Box className="right">
                <Box className="text">
                  <Typography variant="h4">
                    <strong>{produit.nomProduit}</strong>
                  </Typography>
                  <Typography className="description">
                    Référence : {produit.id_produit}
                  </Typography>

                  <Box className="dddd">
                    <Box className="stars" sx={{ color: "#73AB05" }}>
                      <StarOutlined />
                      <StarOutlined />
                      <StarOutlined />
                      <StarOutlined />
                      <StarOutlined />
                    </Box>
                    <Typography>Donnez votre avis</Typography>
                  </Box>

                  <Typography>
                    Description : {produit.descriptionProduit || "N/A"}
                  </Typography>
                  <Typography>
                    <strong>Prix unitaire : {produit.prixUnitaire} Ar</strong>
                  </Typography>
                </Box>

                <div className="btn1">
                  {" "}
                  <div className="action">
                    <button onClick={handleDecrease} disabled={quantite === 0}>
                      {" "}
                      -
                    </button>{" "}
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

                <Box className="btn2" sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<PhoneIcon />}
                    endIcon={<img src="icons/move-right.png" alt="" />}
                  >
                    Besoin d’aide
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<AccountBalanceWalletIcon />}
                    endIcon={<img src="icons/move-right.png" alt="" />}
                  >
                    Paiement sécurisé
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<LocalShippingIcon />}
                    endIcon={<img src="icons/move-right.png" alt="" />}
                  >
                    Livraison standard
                  </Button>
                </Box>
              </Box>
            </Box>

            <Box className="bottom">
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                className="desc"
              >
                Description
              </Button>

              <Box className="cara">
                <strong>Caractéristiques produits:</strong>
              </Box>

              <div className="product-detail-box">
                <p>
                  <strong>🌿 Nature :</strong>{" "}
                  <span>{produit.descriptionProduit || "N/A"}</span>
                </p>
                <p>
                  <strong>📦 Quantité disponible :</strong>{" "}
                  <span>{produit.quantite || "N/A"}</span>
                </p>
              </div>

              <Box className="avis">
                <strong>Donner votre Avis</strong>
              </Box>

              <Box className="msg">
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Écrire vos messages"
                />
                <Button className="send">
                  <img src="icons/message-square-dot.png" alt="" />
                  Envoyer
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default Details;
