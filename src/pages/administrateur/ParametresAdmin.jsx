import React, { useState, useEffect } from "react";
import { Card, Table, Tag, Space, Typography, Modal, Descriptions, Button, List } from "antd";
import { SettingOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title } = Typography;

// Fonction utilitaire pour afficher "vu il y a X min/heures"
const getLastSeenText = (lastSeen) => {
  const now = new Date();
  const diffMs = now - new Date(lastSeen);
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) return "En ligne maintenant";
  if (diffMinutes < 60) return `Vu il y a ${diffMinutes} min`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `Vu il y a ${diffHours} h`;
  const diffDays = Math.floor(diffHours / 24);
  return `Vu il y a ${diffDays} j`;
};

const ParametresAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [clientsData, setClientsData] = useState([]);
  const [vendeursData, setVendeursData] = useState([]);

  // --- Charger les utilisateurs depuis le backend ---
  useEffect(() => {
    const token = localStorage.getItem("token"); // Ton JWT stocké

    axios
      .get("http://127.0.0.1:8000/api/utilisateur/utilisateurs/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const users = res.data;
        setClientsData(users.filter((u) => u.role === "client"));
        setVendeursData(users.filter((u) => u.role === "vendeur"));
      })
      .catch((err) => console.error("Erreur récupération utilisateurs :", err));
  }, []);

  // Colonnes communes pour Table
  const columns = [
    { title: "Nom", dataIndex: "nom", key: "nom" },
    
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <SettingOutlined
            style={{ color: "#1677ff", cursor: "pointer" }}
            onClick={() => {
              setSelectedUser(record);
              setIsModalOpen(true);
            }}
          />
        </Space>
      ),
    },
    // {
    //   title: "Statut",
    //   key: "statut",
    //   render: (_, record) => {
    //     const text = getLastSeenText(record.last_login || record.date_joined);
    //     const isOnline = text === "En ligne maintenant";
    //     return (
    //       <Tag color={isOnline ? "green" : "volcano"}>
    //         {isOnline ? "🟢 " : "🔴 "}
    //         {text}
    //       </Tag>
    //     );
    //   },
    // },
  ];

  // Fonction pour transformer les données utilisateur pour le tableau
  const formatUserForTable = (user) => ({
    key: user.id_user,
    nom: user.nom,
    prenom: user.prenom || "",
    adresse: user.adresse || user.utilisateur?.adresse || "",
    telephone: user.telephone || user.utilisateur?.telephone || "",
    email: user.email,
    role: user.role === "client" ? "Client" : "Vendeur",
    lastSeen: user.last_login || user.date_joined,
    historique: user.historique || [],
  });

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Paramètres administrateur</Title>

      {/* --- Clients --- */}
      <Card
        title="Clients abonnés"
        bordered={false}
        style={{
          marginBottom: 30,
          borderRadius: 10,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <Table
          columns={columns}
          dataSource={clientsData.map(formatUserForTable)}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* --- Vendeurs --- */}
      <Card
        title="Vendeurs abonnés"
        bordered={false}
        style={{
          borderRadius: 10,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <Table
          columns={columns}
          dataSource={vendeursData.map(formatUserForTable)}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* --- Modal détails utilisateur --- */}
      <Modal
        title={selectedUser ? `${selectedUser.role} : ${selectedUser.prenom} ${selectedUser.nom}` : "Détails utilisateur"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        {selectedUser && (
          <>
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Nom">{selectedUser.nom}</Descriptions.Item>
              {/* <Descriptions.Item label="Prénom">{selectedUser.prenom}</Descriptions.Item>
              <Descriptions.Item label="Adresse">{selectedUser.adresse}</Descriptions.Item>
              <Descriptions.Item label="Téléphone">{selectedUser.telephone}</Descriptions.Item> */}
              <Descriptions.Item label="Email">{selectedUser.email}</Descriptions.Item>
              {/* <Descriptions.Item label="Statut">{getLastSeenText(selectedUser.lastSeen)}</Descriptions.Item> */}
            </Descriptions>

            <Title level={5} style={{ marginTop: 20 }}>
              Historique récent :
            </Title>
            <List
              dataSource={selectedUser.historique.length ? selectedUser.historique : ["Aucune activité récente"]}
              renderItem={(item) => <List.Item>🕒 {item}</List.Item>}
              bordered
              style={{ marginBottom: 20 }}
            />

            <Button
              type="primary"
              danger
              icon={<ExclamationCircleOutlined />}
              block
              onClick={() => alert(`${selectedUser.nom} a été suspendu temporairement.`)}
            >
              Suspendre ce {selectedUser.role.toLowerCase()}
            </Button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ParametresAdmin;
