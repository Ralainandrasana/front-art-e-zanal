// PublicationsAdmin.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Modal,
  message,
  Tag,
  Pagination,
} from "antd";
import Swal from "sweetalert2";

const { Title, Paragraph, Text } = Typography;

const PublicationsAdmin = () => {
  const [publications, setPublications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const [modal, contextHolder] = Modal.useModal();

  // 🔹 Charger les publications
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          message.error("Vous devez être connecté !");
          return;
        }

        const res = await axios.get("http://127.0.0.1:8000/api/produit/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPublications(res.data);
      } catch (err) {
        console.error(err);
        message.error("Erreur lors du chargement des publications !");
      }
    };
    fetchPublications();
  }, []);

  const currentPublications = publications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // --- Valider une publication ---
  const handleValidate = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("Vous devez être connecté pour valider cette publication");
      return;
    }

    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/produit/${id}/`,
        { statut: "validee" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 🔹 Mise à jour locale seulement
      setPublications((prev) =>
        prev.map((pub) =>
          pub.id_produit === id ? { ...pub, statut: "validee" } : pub
        )
      );

      // 🔹 Boîte de dialogue SweetAlert
      Swal.fire({
        icon: "success",
        title: "Publication validée !",
        text: "La publication a été validée avec succès.",
        confirmButtonColor: "#52c41a",
      });
    } catch (error) {
      console.error(error.response || error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de valider la publication.",
        confirmButtonColor: "#ff4d4f",
      });
    }
  };

  // --- Refuser une publication ---
  const handleDecline = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Vous devez être connecté !",
        confirmButtonColor: "#ff4d4f",
      });
      return;
    }

    // 🔹 Boîte de confirmation SweetAlert
    Swal.fire({
      title: "Refuser cette publication ?",
      text: "Êtes-vous sûr de vouloir refuser cette publication ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, refuser",
      cancelButtonText: "Annuler",
      confirmButtonColor: "#ff4d4f",
      cancelButtonColor: "#1890ff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(
            `http://127.0.0.1:8000/api/produit/${id}/`,
            { statut: "refusee" },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          // 🔹 Mise à jour locale seulement
          setPublications((prev) =>
            prev.map((pub) =>
              pub.id_produit === id ? { ...pub, statut: "refusee" } : pub
            )
          );

          Swal.fire({
            icon: "success",
            title: "Publication refusée",
            text: "La publication a été refusée avec succès.",
            confirmButtonColor: "#ff4d4f",
          });
        } catch (error) {
          console.error(error.response || error);
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: "Impossible de refuser la publication.",
            confirmButtonColor: "#ff4d4f",
          });
        }
      }
    });
  };

  return (
    <div style={{ padding: 24 }}>
      {contextHolder}

      <Title level={2}>Publications des vendeurs</Title>
      <Paragraph type="secondary">
        Validez ou refusez les publications avant leur mise en ligne.
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        {currentPublications.map((pub) => (
          <Col xs={24} sm={12} md={8} key={pub.id_produit}>
            <Card
              hoverable
              cover={
                <img
                  alt={pub.nomProduit}
                  src={pub.image}
                  style={{ width: "100%", height: 180, objectFit: "cover" }}
                />
              }
            >
              <Title level={5}>{pub.nomProduit}</Title>
              <Text type="secondary">Réf : {pub.id_produit}</Text>
              <br />
              <Text>Prix : {pub.prixUnitaire} Ar</Text>

              <div style={{ marginTop: 8 }}>
                {pub.statut === "validee" ? (
                  <Tag color="green">Validée</Tag>
                ) : pub.statut === "refusee" ? (
                  <Tag color="red">Refusée</Tag>
                ) : (
                  <Tag color="orange">En attente</Tag>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 16,
                }}
              >
                <Button
                  type="primary"
                  onClick={() => handleValidate(pub.id_produit)}
                  disabled={pub.statut !== "en_attente"}
                >
                  Valider
                </Button>
                <Button
                  danger
                  onClick={() => handleDecline(pub.id_produit)}
                  disabled={pub.statut !== "en_attente"}
                >
                  Refuser
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={publications.length}
        onChange={setCurrentPage}
        style={{ marginTop: 20, textAlign: "center" }}
      />
    </div>
  );
};

export default PublicationsAdmin;
