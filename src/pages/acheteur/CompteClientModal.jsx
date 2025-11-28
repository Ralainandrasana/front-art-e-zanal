import React, { useEffect, useState } from "react";
import { Modal, Descriptions, Avatar, Spin, message, Button  } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import axios from "axios";
import Swal from "sweetalert2";

const CompteClientModal = ({ visible, onClose }) => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!visible) return; // ne charge que si la modal est ouverte

    const fetchClient = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/utilisateur/me/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClient(res.data);
      } catch (err) {
        console.error("Erreur détaillée :", err.response || err);
        message.error("Impossible de récupérer vos informations");
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [visible, token]);

  // 🔹 Déconnexion avec confirmation SweetAlert
  const handleLogout = () => {
    Swal.fire({
      title: "Déconnexion",
      text: "Voulez-vous vraiment vous déconnecter ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, me déconnecter",
      cancelButtonText: "Annuler",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        Swal.fire("Déconnecté !", "Vous avez été déconnecté avec succès.", "success").then(() => {
          window.location.href = "/signIn";
        });
      }
    });
  };


  return (
    <Modal
      title="Mon Compte"
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
    >
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Spin size="large" />
        </div>
      ) : client ? (
        <div style={{ textAlign: "center" }}>
          <Avatar size={80} icon={<UserOutlined />} src={client.photo || null} />
          <h3 style={{ marginTop: 10 }}>{client.nom}</h3>
          <p style={{ color: "gray" }}>{client.role?.toUpperCase() || "Client"}</p>

          <Descriptions bordered column={1} size="small" style={{ marginTop: 15 }}>
            <Descriptions.Item label="Nom">{client.nom}</Descriptions.Item>
            <Descriptions.Item label="Email">{client.email}</Descriptions.Item>
            {/* Si tu as plus de champs : */}
            {/* <Descriptions.Item label="Adresse">{client.adresse}</Descriptions.Item> */}
            {/* <Descriptions.Item label="Téléphone">{client.contact}</Descriptions.Item> */}
          </Descriptions>

          <Button
            danger
            icon={<LogoutOutlined />}
            style={{ marginTop: 15 }}
            onClick={handleLogout}
          >
            Déconnexion
          </Button>
        </div>
      ) : (
        <p>Aucune information trouvée.</p>
      )}
    </Modal>
  );
};

export default CompteClientModal;
