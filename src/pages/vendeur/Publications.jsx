import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  message,
  Upload,
  Row,
  Col,
  Select,
  DatePicker,
  List,
  Badge,
  Dropdown,
  notification,
} from "antd";
import {
  BellOutlined,
  PlusOutlined,
  DeleteOutlined,
  GiftOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { apiProduit, apiCategory } from "../../api";
import axios from "axios";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const { Option } = Select;

const Publications = () => {
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isProduitModalOpen, setIsProduitModalOpen] = useState(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [form] = Form.useForm();

  const [notifications, setNotifications] = useState([]);
  const [notifVisible, setNotifVisible] = useState(false);

  useEffect(() => {
    fetchProduits();
    fetchCategories();
    fetchNotifications();
  }, []);

  // 🔹 Charger les notifications
const fetchNotifications = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await axios.get(
      "http://127.0.0.1:8000/api/notifvendeur/notifvendeur/",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (Array.isArray(res.data)) {
      setNotifications(res.data);
    } else {
      setNotifications([]);
    }
  } catch (error) {
    console.error(error);
    message.error("Erreur lors du chargement des notifications");
  }
};

// ✅ Fonction pour marquer comme lu
const handleMarkAsRead = async (notif) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    await axios.patch(
      `http://127.0.0.1:8000/api/notifvendeur/notifvendeur/${notif.id_notif}/mark_as_read/`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setNotifications((prev) =>
      prev.map((n) =>
        n.id_notif === notif.id_notif ? { ...n, is_read: true } : n
      )
    );

    // 🔔 Optionnel : ouvrir un dialogue selon le message
    if (notif.message === "Commandes validées") {
      Swal.fire({
        icon: "success",
        title: "Commande validée",
        text: "Votre commande a été validée ! Allez au paiement 💰",
      });
    } else if (notif.message === "Commandes refusées") {
      Swal.fire({
        icon: "error",
        title: "Commande refusée",
        text: "Votre commande a été refusée.",
      });
    }
  } catch (error) {
    console.error(error);
    message.error("Erreur lors du marquage comme lu");
  }
};

// ✅ Menu notifications stylisé
const notifMenu = (
  <div className="notif-dropdown">
    <div className="notif-header">
      <h4>Notifications</h4>
      <Button
        type="link"
        size="small"
        onClick={() => message.info("Toutes les notifications")}
      >
        Voir tout
      </Button>
    </div>

    <div className="notif-list">
      {notifications.length === 0 ? (
        <div className="notif-empty">Aucune notification</div>
      ) : (
        notifications.map((item) => (
          <div
            key={item.id_notif}
            className={`notif-item ${item.is_read ? "read" : "unread"}`}
            onClick={() => handleMarkAsRead(item)}
          >
            <div className="notif-icon">
              <BellOutlined style={{ color: item.is_read ? "#888" : "#1890ff" }} />
            </div>
            <div className="notif-content">
              <p className="notif-message">{item.message}</p>
              <span className="notif-time">
                {dayjs(item.date_creation).format("DD/MM/YYYY HH:mm")}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

  // 🔹 Charger les produits
  const fetchProduits = async () => {
    try {
      const response = await apiProduit.get("/");
      setProduits(response.data);
    } catch (error) {
      console.error(error);
      message.error("Erreur lors du chargement des produits 😢");
    }
  };

  // 🔹 Charger les catégories
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await apiCategory.get("/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategories(response.data);
    } catch (error) {
      message.error("Erreur lors du chargement des catégories");
      console.error(error);
    }
  };

  // 🔹 Ajouter un produit
const handleAdd = async (values) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Vous devez être connecté pour ajouter un produit ❌",
      });
      return;
    }

    const formData = new FormData();
    formData.append("nomProduit", values.nomProduit);
    formData.append("descriptionProduit", values.descriptionProduit);
    formData.append("prixUnitaire", values.prixUnitaire);
    formData.append("quantite", values.quantite);
    formData.append("id_category_id", values.id_category);

    if (values.image && values.image[0]) {
      formData.append("image", values.image[0].originFileObj);
    }

    await axios.post("http://127.0.0.1:8000/api/produit/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    // ✅ Boîte de dialogue succès avec SweetAlert
    await Swal.fire({
      icon: "success",
      title: "Succès",
      text: `Le produit "${values.nomProduit}" a été ajouté avec succès !`,
      confirmButtonText: "OK",
    });

    fetchProduits();
    setIsProduitModalOpen(false);
    form.resetFields();
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Erreur",
      text: "Erreur lors de l’ajout du produit ❌",
    });
  }
};

  // 🔹 Supprimer un produit
  const handleDelete = async (id_produit) => {
    const result = await Swal.fire({
      title: "Supprimer ce produit ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
      confirmButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://127.0.0.1:8000/api/produit/${id_produit}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        message.success("Produit supprimé ✅");
        fetchProduits();
      } catch (error) {
        console.error(error);
        message.error("Erreur lors de la suppression ❌");
      }
    }
  };

  // 🔹 Ouvrir le modal de promotion
  const handleOpenPromo = (produit) => {
    setSelectedProduit(produit);
    setIsPromoModalOpen(true);
  };

  // 🔹 Fermer le modal de promotion
  const handleCancelPromotion = () => {
    setIsPromoModalOpen(false);
    setSelectedProduit(null);
  };

  const handleCreatePromotion = async (values) => {
    if (!selectedProduit) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Aucun produit sélectionné ❌",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Vous devez être connecté",
        });
        return;
      }

      // Préparer les données
      const data = {
        id_produit_id: selectedProduit.id_produit,
        prixAvant: values.prixAvant,
        prixApres: values.prixApres,
        date_debut: values.date_debut.format("YYYY-MM-DD"),
        date_fin: values.date_fin.format("YYYY-MM-DD"),
      };

      // Envoyer la requête POST
      await axios.post("http://127.0.0.1:8000/api/promotion/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ Boîte de dialogue succès avec SweetAlert
      await Swal.fire({
        icon: "success",
        title: "Succès",
        text: `La promotion pour "${selectedProduit.nomProduit}" a été ajoutée avec succès !`,
        confirmButtonText: "OK",
      });

      handleCancelPromotion();
    } catch (error) {
      console.error(error.response || error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Erreur lors de la création de la promotion ❌",
      });
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) =>
        image ? (
          <img src={`http://127.0.0.1:8000${image}`} width="60" alt="Produit" />
        ) : (
          "Aucune"
        ),
    },
    { title: "Produit", dataIndex: "nomProduit", key: "nomProduit" },
    {
      title: "Description",
      dataIndex: "descriptionProduit",
      key: "descriptionProduit",
    },
    { title: "Prix (Ar)", dataIndex: "prixUnitaire", key: "prixUnitaire" },
    { title: "Quantité", dataIndex: "quantite", key: "quantite" },
    {
      title: "Catégorie",
      dataIndex: ["id_category", "nomCategory"],
      key: "id_category",
      render: (text) => text || "—",
    },
    {
      title: "Date de publication",
      dataIndex: "datePublication",
      key: "datePublication",
      render: (text) => (text ? dayjs(text).format("DD/MM/YYYY") : "—"),
    },

    {
      title: "Vendeur",
      dataIndex: ["id_user", "nom"],
      key: "id_user",
      render: (text) => text || "—",
    },

    {
      title: "Statut",
      dataIndex: ["statut"],
      key: "statut",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          {console.log(record)}
          <Button
            icon={<GiftOutlined />}
            onClick={() => handleOpenPromo(record)}
          ></Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id_produit)}
          />
        </Space>
      ),
    },
  ];

  // ✅ Fonction pour ouvrir/fermer le menu de notifications
const handleNotifClick = () => {
  setNotifVisible(!notifVisible);
};

  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h2>🧱 Liste des publications</h2>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsProduitModalOpen(true)}
          >
            Ajouter un produit
          </Button>

          {/* 🔔 Cloche notifications */}
          <Dropdown
            overlay={notifMenu}
            trigger={["click"]}
            visible={notifVisible}
            onVisibleChange={setNotifVisible}
          >
            <Badge count={notifications.length} offset={[0, 0]}>
              <Button
                shape="circle"
                icon={<BellOutlined />}
                onClick={handleNotifClick}
              />
            </Badge>
          </Dropdown>
        </Space>
      </div>

      <Table
        dataSource={produits}
        columns={columns}
        rowKey="id_produit"
        bordered
        pagination={{ pageSize: 5 }}
      />

      {/* --- Modal d'ajout produit --- */}
      <Modal
        title="Ajouter un produit"
        open={isProduitModalOpen}
        onCancel={() => setIsProduitModalOpen(false)}
        onOk={() => form.submit()}
        okText="Ajouter"
        cancelText="Annuler"
        width={700}
      >
        <Form form={form} layout="vertical" onFinish={handleAdd}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Image"
                name="image"
                valuePropName="fileList"
                getValueFromEvent={(e) => e && e.fileList} // simplifié
              >
                <Upload
                  listType="picture-card"
                  beforeUpload={() => false}
                  maxCount={1}
                >
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Choisir</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item
                label="Nom du produit"
                name="nomProduit"
                rules={[
                  {
                    required: true,
                    message: "Veuillez saisir le nom du produit",
                  },
                ]}
              >
                <Input placeholder="Ex : Brique" />
              </Form.Item>

              <Form.Item label="Description" name="descriptionProduit">
                <Input.TextArea rows={3} placeholder="Décrivez le produit..." />
              </Form.Item>

              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item
                    label="Quantité"
                    name="quantite"
                    rules={[
                      { required: true, message: "Indiquez la quantité" },
                    ]}
                  >
                    <Input type="number" min={1} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Prix (Ar)"
                    name="prixUnitaire"
                    rules={[{ required: true, message: "Indiquez le prix" }]}
                  >
                    <Input type="number" min={0} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Catégorie"
                name="id_category"
                rules={[
                  { required: true, message: "Sélectionnez une catégorie" },
                ]}
              >
                <Select placeholder="Choisir une catégorie">
                  {categories.map((cat) => (
                    <Option key={cat.id_category} value={cat.id_category}>
                      {cat.nomCategory}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* --- Modal ajout promotion --- */}
      <Modal
        title={`Ajouter une promotion pour ${
          selectedProduit?.nomProduit || ""
        }`}
        open={isPromoModalOpen}
        onCancel={handleCancelPromotion}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleCreatePromotion}>
          <Form.Item
            label="Prix avant"
            name="prixAvant"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Prix après"
            name="prixApres"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Date début"
            name="date_debut"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Date fin"
            name="date_fin"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Créer
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Publications;
