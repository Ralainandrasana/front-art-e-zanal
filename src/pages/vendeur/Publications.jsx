import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Upload, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const Publications = () => {
    const [livres, setLivres] = useState([
        { id: 1, titre: 'L’Alchimiste', auteur: 'Paulo Coelho', annee: 1988 },
        { id: 2, titre: 'Le Petit Prince', auteur: 'Antoine de Saint-Exupéry', annee: 1943 },
        { id: 3, titre: '1984', auteur: 'George Orwell', annee: 1949 },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const handleAdd = (values) => {
        const newLivre = {
            id: livres.length + 1,
            ...values,
        };
        setLivres([...livres, newLivre]);
        setIsModalOpen(false);
        message.success('Livre ajouté avec succès ✅');
        form.resetFields();
    };

    const handleDelete = (id) => {
        setLivres(livres.filter((livre) => livre.id !== id));
        message.success('Livre supprimé 🗑️');
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 60,
        },
        {
            title: 'Titre',
            dataIndex: 'titre',
            key: 'titre',
        },
        {
            title: 'Auteur',
            dataIndex: 'auteur',
            key: 'auteur',
        },
        {
            title: 'Année',
            dataIndex: 'annee',
            key: 'annee',
            width: 100,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button icon={<EyeOutlined />} size="small" />
                    <Button icon={<EditOutlined />} size="small" />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                        onClick={() => handleDelete(record.id)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <h2>Liste des publications</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalOpen(true)}
                >
                    Ajouter une publication
                </Button>
            </div>

            <Table
                dataSource={livres}
                columns={columns}
                rowKey="id"
                bordered
                pagination={{ pageSize: 5 }}
            />

            {/* --- Modal pour ajouter un livre --- */}
            <Modal
                title="Ajouter un produit"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
                okText="Ajouter"
                cancelText="Annuler"
                width={700} // un peu plus large pour bien afficher les deux colonnes
            >
                <Form form={form} layout="vertical" onFinish={handleAdd}>
                    <Row gutter={16}>
                        {/* ===== COLONNE GAUCHE : IMAGE ===== */}
                        <Col span={8}>
                            <Form.Item
                                label="Image du produit"
                                name="image"
                                valuePropName="fileList"
                                getValueFromEvent={(e) => Array.isArray(e) ? e : e && e.fileList}
                            >
                                <Upload
                                    listType="picture-card"
                                    beforeUpload={() => false} // Empêche l’upload automatique
                                    maxCount={1}
                                    style={{ width: '100%' }}
                                >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Ajouter</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>

                        {/* ===== COLONNE DROITE : INFOS PRODUIT ===== */}
                        <Col span={16}>
                            <Form.Item
                                label="Nom du produit"
                                name="nom"
                                rules={[{ required: true, message: 'Veuillez saisir le nom du produit' }]}
                            >
                                <Input placeholder="Ex : Casque Bluetooth" />
                            </Form.Item>

                            <Form.Item
                                label="Détails"
                                name="details"
                                rules={[{ required: true, message: 'Veuillez décrire le produit' }]}
                            >
                                <Input.TextArea rows={3} placeholder="Ex : Casque sans fil avec réduction de bruit..." />
                            </Form.Item>

                            <Row gutter={12}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Quantité"
                                        name="quantite"
                                        rules={[{ required: true, message: 'Veuillez indiquer la quantité' }]}
                                    >
                                        <Input type="number" min={1} placeholder="Ex : 10" />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item
                                        label="Prix du produit (Ar)"
                                        name="prix"
                                        rules={[{ required: true, message: 'Veuillez saisir le prix du produit' }]}
                                    >
                                        <Input type="number" min={0} placeholder="Ex : 75000" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Modal>

        </div>
    );
};

export default Publications;
