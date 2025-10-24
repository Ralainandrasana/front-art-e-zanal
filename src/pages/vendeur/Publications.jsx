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
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { apiProduit, apiCategory } from "../../api";
import axios from "axios";
import dayjs from "dayjs";

const { Option } = Select;

const Publications = () => {
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProduits();
    fetchCategories();
  }, []);

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

  // 🔹 Ajouter un produit avec JWT
  const handleAdd = async (values) => {
    try {
      const token = localStorage.getItem("token"); // Récupère le JWT

      if (!token) {
        message.error("Vous devez être connecté pour ajouter un produit");
        return;
      }

      const formData = new FormData();
      formData.append("nomProduit", values.nomProduit);
      formData.append("descriptionProduit", values.descriptionProduit);
      formData.append("prixUnitaire", values.prixUnitaire);
      formData.append("quantite", values.quantite);
      formData.append("id_category", values.id_category);
      if (values.image && values.image[0]) {
        formData.append("image", values.image[0].originFileObj);
      }

      await axios.post("http://127.0.0.1:8000/api/produit/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // JWT envoyé au backend
        },
      });

      message.success("Produit ajouté avec succès ✅");
      fetchProduits();
      setIsProduitModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Erreur lors de l’ajout du produit ❌");
    }
  };

  // 🔹 Supprimer un produit
  const handleDelete = async (id_produit) => {
    Modal.confirm({
      title: "Supprimer ce produit ?",
      okText: "Oui",
      cancelText: "Non",
      onOk: async () => {
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
      },
    });
  };

  // 🔹 Colonnes du tableau
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) =>
        image ? <img src={`http://127.0.0.1:8000${image}`} width="60" alt="Produit" /> : "Aucune",
    },
    { title: "Produit", dataIndex: "nomProduit", key: "nomProduit" },
    { title: "Description", dataIndex: "descriptionProduit", key: "descriptionProduit" },
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
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => console.log(record)} />
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id_produit)} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <h2>🧱 Liste des publications</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsProduitModalOpen(true)}
        >
          Ajouter un produit
        </Button>
      </div>

      <Table dataSource={produits} columns={columns} rowKey="id_produit" bordered pagination={{ pageSize: 5 }} />

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
                getValueFromEvent={(e) =>
                  Array.isArray(e) ? e : e && e.fileList
                }
              >
                <Upload listType="picture-card" beforeUpload={() => false} maxCount={1}>
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
                rules={[{ required: true, message: "Veuillez saisir le nom du produit" }]}
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
                    rules={[{ required: true, message: "Indiquez la quantité" }]}
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
                rules={[{ required: true, message: "Sélectionnez une catégorie" }]}
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
        title={`Ajouter une promotion pour ${selectedProduit?.nomProduit}`}
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
