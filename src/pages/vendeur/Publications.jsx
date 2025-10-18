import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Upload, Row, Col, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, UploadOutlined } from '@ant-design/icons';
import { apiProduit } from '../../api'; // ← utilise ton fichier api.jsx
import axios from 'axios';

const { Option } = Select;

const Publications = () => {
  const [produits, setProduits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // 🔹 Charger la liste des produits au montage
  useEffect(() => {
    fetchProduits();
  }, []);

  const fetchProduits = async () => {
    try {
      const response = await apiProduit.get('/');
      setProduits(response.data);
    } catch (error) {
      message.error("Erreur lors du chargement des produits 😢");
    }
  };

  // 🔹 Ajout d’un produit
  const handleAdd = async (values) => {
    try {
      const formData = new FormData();
      formData.append("nomProduit", values.nomProduit);
      formData.append("descriptionProduit", values.descriptionProduit);
      formData.append("prixUnitaire", values.prixUnitaire);
      formData.append("quantite", values.quantite);
      formData.append("id_category", values.id_category);
      formData.append("id_user", 1); // ⚠️ à remplacer par le vendeur connecté (depuis localStorage)
      if (values.image && values.image[0]) {
        formData.append("image", values.image[0].originFileObj);
      }

      await axios.post("http://127.0.0.1:8000/api/produit/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      message.success("Produit ajouté avec succès ✅");
      fetchProduits();
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Erreur lors de l’ajout du produit ❌");
    }
  };

  // 🔹 Suppression d’un produit
  const handleDelete = async (id_produit) => {
    Modal.confirm({
      title: "Supprimer ce produit ?",
      okText: "Oui",
      cancelText: "Non",
      onOk: async () => {
        try {
          await apiProduit.delete(`${id_produit}/`);
          message.success("Produit supprimé ✅");
          fetchProduits();
        } catch (error) {
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
        image ? (
          <img src={`http://127.0.0.1:8000${image}`} alt="Produit" width="60" />
        ) : (
          "Aucune"
        ),
    },
    { title: "Nom du produit", dataIndex: "nomProduit", key: "nomProduit" },
    { title: "Prix (Ar)", dataIndex: "prixUnitaire", key: "prixUnitaire" },
    { title: "Quantité", dataIndex: "quantite", key: "quantite" },
    {
      title: "Catégorie",
      dataIndex: ["id_category", "nomCategory"],
      key: "id_category",
      render: (text) => text || "—",
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
          <Button icon={<EyeOutlined />} onClick={() => console.log(record)}>Voir</Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id_produit)}>
            Supprimer
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2>🧱 Liste des publications</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          Ajouter un produit
        </Button>
      </div>

      <Table
        dataSource={produits}
        columns={columns}
        rowKey="id_produit"
        bordered
        pagination={{ pageSize: 5 }}
      />

      {/* --- Modal d'ajout --- */}
      <Modal
        title="Ajouter un produit"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText="Ajouter"
        cancelText="Annuler"
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAdd}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Image"
                name="image"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
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
                rules={[{ required: true, message: 'Veuillez saisir le nom du produit' }]}
              >
                <Input placeholder="Ex : Brique" />
              </Form.Item>

              <Form.Item
                label="Description"
                name="descriptionProduit"
              >
                <Input.TextArea rows={3} placeholder="Décrivez le produit..." />
              </Form.Item>

              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item
                    label="Quantité"
                    name="quantite"
                    rules={[{ required: true, message: 'Indiquez la quantité' }]}
                  >
                    <Input type="number" min={1} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Prix (Ar)"
                    name="prixUnitaire"
                    rules={[{ required: true, message: 'Indiquez le prix' }]}
                  >
                    <Input type="number" min={0} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Catégorie"
                name="id_category"
                rules={[{ required: true, message: 'Sélectionnez une catégorie' }]}
              >
                <Select placeholder="Choisir une catégorie">
                  <Option value={1}>Brique</Option>
                  <Option value={2}>Sable</Option>
                  <Option value={3}>Moellon</Option>
                  <Option value={4}>Gravillon</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Publications;
