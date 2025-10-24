import React, { useState } from "react";
import { Card, Table, Tag, Space, Typography, Modal, Descriptions, Button, List } from "antd";
import { SettingOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;

// --- Fonction utilitaire pour afficher "vu il y a X min/heures" ---
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

  // --- Données simulées ---
  const clientsData = [
    {
      key: "1",
      type: "Client",
      nom: "Rakoto",
      prenom: "Jean",
      adresse: "Antananarivo",
      telephone: "034 12 345 67",
      email: "jean.rakoto@gmail.com",
      lastSeen: new Date().toISOString(),
      historique: [
        "A acheté un panier artisanal il y a 2 h",
        "A laissé un avis sur un produit hier",
      ],
    },
        {
      key: "2",
      type: "Client",
      nom: "Rakoto",
      prenom: "Jean",
      adresse: "Antananarivo",
      telephone: "034 12 345 67",
      email: "jean.rakoto@gmail.com",
      lastSeen: new Date().toISOString(),
      historique: [
        "A acheté un panier artisanal il y a 2 h",
        "A laissé un avis sur un produit hier",
      ],
    },
    {
      key: "2",
      type: "Client",
      nom: "Rabe",
      prenom: "Mino",
      adresse: "Tanambao",
      telephone: "034 45 678 90",
      email: "mino.rabe@gmail.com",
      lastSeen: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
      historique: ["A ajouté un article dans son panier il y a 30 min"],
    },
    {
      key: "3",
      type: "Client",
      nom: "Rabe",
      prenom: "Mino",
      adresse: "Tanambao",
      telephone: "034 45 678 90",
      email: "mino.rabe@gmail.com",
      lastSeen: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
      historique: ["A ajouté un article dans son panier il y a 30 min"],
    },
  ];

  const vendeursData = [
    {
      key: "1",
      type: "Vendeur",
      nom: "Randria",
      prenom: "Lova",
      adresse: "Toamasina",
      telephone: "033 22 111 44",
      email: "lova.randria@shop.mg",
      lastSeen: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      historique: ["A publié une nouvelle photo il y a 2 h", "A mis à jour un article hier"],
    },
    {
      key: "2",
      type: "Vendeur",
      nom: "Ando",
      prenom: "Tiana",
      adresse: "Mahajanga",
      telephone: "032 44 333 22",
      email: "tiana.ando@artisanal.mg",
      lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      historique: ["A ajouté un nouvel article ce matin"],
    },
    {
      key: "3",
      type: "Vendeur",
      nom: "Ando",
      prenom: "Tiana",
      adresse: "Mahajanga",
      telephone: "032 44 333 22",
      email: "tiana.ando@artisanal.mg",
      lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      historique: ["A ajouté un nouvel article ce matin"],
    },
    {
      key: "4",
      type: "Vendeur",
      nom: "Ando",
      prenom: "Tiana",
      adresse: "Mahajanga",
      telephone: "032 44 333 22",
      email: "tiana.ando@artisanal.mg",
      lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      historique: ["A ajouté un nouvel article ce matin"],
    },
  ];

  // --- Colonnes communes ---
  const columns = [
    { title: "Nom", dataIndex: "nom", key: "nom" },
    { title: "Prénom", dataIndex: "prenom", key: "prenom" },
    { title: "Adresse", dataIndex: "adresse", key: "adresse" },
    { title: "Téléphone", dataIndex: "telephone", key: "telephone" },
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
    {
      title: "Statut",
      key: "statut",
      render: (_, record) => {
        const text = getLastSeenText(record.lastSeen);
        const isOnline = text === "En ligne maintenant";
        return (
          <Tag color={isOnline ? "green" : "volcano"}>
            {isOnline ? "🟢 " : "🔴 "}
            {text}
          </Tag>
        );
      },
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Paramètres administrateur</Title>

      {/* --- Clients abonnés --- */}
      <Card
        title=" Clients abonnés"
        bordered={false}
        style={{
          marginBottom: 30,
          borderRadius: 10,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <Table columns={columns} dataSource={clientsData} pagination={{ pageSize: 10 }} />
      </Card>

      {/* --- Vendeurs abonnés --- */}
      <Card
        title=" Vendeurs abonnés"
        bordered={false}
        style={{
          borderRadius: 10,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <Table columns={columns} dataSource={vendeursData} pagination={{ pageSize: 10 }} />
      </Card>

      {/* --- Modal d'informations détaillées --- */}
      <Modal
        title={
          selectedUser
            ? `${selectedUser.type} : ${selectedUser.prenom} ${selectedUser.nom}`
            : "Détails utilisateur"
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        {selectedUser && (
          <>
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Nom">{selectedUser.nom}</Descriptions.Item>
              <Descriptions.Item label="Prénom">{selectedUser.prenom}</Descriptions.Item>
              <Descriptions.Item label="Adresse">{selectedUser.adresse}</Descriptions.Item>
              <Descriptions.Item label="Téléphone">{selectedUser.telephone}</Descriptions.Item>
              <Descriptions.Item label="Email">{selectedUser.email}</Descriptions.Item>
              <Descriptions.Item label="Statut">
                {getLastSeenText(selectedUser.lastSeen)}
              </Descriptions.Item>
            </Descriptions>

            <Title level={5} style={{ marginTop: 20 }}>
              Historique récent :
            </Title>
            <List
              dataSource={selectedUser.historique}
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
              Suspendre ce {selectedUser.type.toLowerCase()}
            </Button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ParametresAdmin;
