import React from 'react';
import { Card, Row, Col, Statistic, Typography, List, Avatar } from 'antd';
import { Pie } from '@ant-design/plots';
import { DollarOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AccueilAdmin = () => {
    // --- Données du diagramme circulaire ---
    const data = [
        { type: 'Yas', value: 45 },
        { type: 'Orange Money', value: 30 },
        { type: 'Airtel', value: 25 },
    ];

    const pieConfig = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
            style: { fontSize: 14, textAlign: 'center' },
        },
        interactions: [{ type: 'element-active' }],
    };

    // --- Données des transactions récentes ---
    const transactions = [
        { title: 'Paiement Yas', amount: '+15 000 Ar', avatar: '🟢' },
        { title: 'Achat Orange Money', amount: '+10 000 Ar', avatar: '🟠' },
        { title: 'Paiement Airtel', amount: '+8 000 Ar', avatar: '🔴' },
    ];

    return (
        <div style={{ padding: 20 }}>
            <Title level={2}>Tableau de bord administrateur </Title>

            {/* --- Trois cards principales --- */}
            <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
                {/* 1️⃣ Statistiques globales */}
                <Col xs={24} md={8}>
                    <Card
                        title="Statistiques générales"
                        bordered={false}
                        style={{
                            borderRadius: 10,
                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                        }}
                    >
                        <Statistic
                            title="Utilisateurs actifs"
                            value={245}
                            prefix={<UserOutlined style={{ color: '#52c41a' }} />}
                        />
                        <Statistic
                            title="Transactions totales"
                            value={540}
                            prefix={<DollarOutlined style={{ color: '#1677ff' }} />}
                            style={{ marginTop: 16 }}
                        />
                        <Statistic
                            title="Produits vendus"
                            value={123}
                            prefix={<ShoppingCartOutlined style={{ color: '#faad14' }} />}
                            style={{ marginTop: 16 }}
                        />
                    </Card>
                </Col>

                {/* 2️⃣ Transactions récentes */}
                <Col xs={24} md={8}>
                    <Card
                        title="Transactions récentes"
                        bordered={false}
                        style={{
                            borderRadius: 10,
                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                        }}
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={transactions}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar>{item.avatar}</Avatar>}
                                        title={item.title}
                                        description={item.amount}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>

                {/* 3️⃣ Diagramme circulaire */}
                <Col xs={24} md={8}>
                    <Card
                        title="Répartition des paiements"
                        bordered={false}
                        style={{
                            borderRadius: 10,
                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                        }}
                    >
                        <Pie {...pieConfig} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AccueilAdmin;
