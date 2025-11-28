import React, { useState, useEffect } from "react";
import { Card, Descriptions, Avatar, Spin, message, Button } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const VendeurSettings = () => {
  const [vendeur, setVendeur] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fonction pour la déconnexion avec SweetAlert
      const handleLogout = () => {
          Swal.fire({
              title: "Voulez-vous vraiment vous déconnecter ?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Confirmer",
              cancelButtonText: "Annuler",
          }).then((result) => {
              if (result.isConfirmed) {
                  // Nettoyer localStorage et rediriger
                  localStorage.clear();
                  navigate("/signIn");
              }
          });
      };
  

  // 🔹 Charger les infos du vendeur connecté
  useEffect(() => {
    const fetchVendeur = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/utilisateur/me_vendeur/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setVendeur(res.data);
      } catch (err) {
        console.error("Erreur détaillée :", err.response || err);
        message.error("Impossible de récupérer vos informations");
      } finally {
        setLoading(false);
      }
    };

    fetchVendeur();
  }, [token]);

  // // 🔹 Déconnexion
  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   window.location.href = "/signIn";
  // };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!vendeur) {
    return (
      <div className="text-center mt-10">
        <p>Aucune information trouvée.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <Card
        title="Mon Profil Vendeur"
        style={{ borderRadius: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Avatar
            size={100}
            icon={<UserOutlined />}
            src={vendeur.photo || null}
          />
          <h2 style={{ marginTop: 10 }}>{vendeur.nom}</h2>
          <p style={{ color: "gray" }}>
            {vendeur?.role ? vendeur.role.toUpperCase() : "Vendeur"}
          </p>
        </div>

        <Descriptions bordered column={1} size="middle">
          <Descriptions.Item label="Nom">
            {vendeur.nom}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {vendeur.email}
          </Descriptions.Item>
          {/* <Descriptions.Item label="Entreprise">
            {vendeur.entreprise || "Non spécifié"}
          </Descriptions.Item>
          <Descriptions.Item label="Contact">
            {vendeur.contact || "Non spécifié"}
          </Descriptions.Item> */}
        </Descriptions>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Button
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Déconnexion
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default VendeurSettings;
