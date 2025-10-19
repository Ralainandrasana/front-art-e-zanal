import React from 'react';
import { Card, Row, Col, Statistic, Typography } from 'antd';
import { BookOutlined, UserOutlined, ClockCircleOutlined, BoxPlotOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Accueil = () => {
    return (
        <div>
            <Title level={2}>Tableau de bord</Title>

            {/* --- Statistiques principales --- */}
            <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
                <Col xs={24} sm={12} md={8}>
                    <Card bordered={false} style={{ textAlign: 'center', borderRadius: 10, boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                        <Statistic
                            title="Produits"
                            value={128}
                            prefix={<BoxPlotOutlined style={{ color: '#1677ff' }} />}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <Card bordered={false} style={{ textAlign: 'center', borderRadius: 10, boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                        <Statistic
                            title="Clients"
                            value={45}
                            prefix={<UserOutlined style={{ color: '#52c41a' }} />}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <Card bordered={false} style={{ textAlign: 'center', borderRadius: 10, boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                        <Statistic
                            title="Commandes"
                            value={23}
                            prefix={<ClockCircleOutlined style={{ color: '#faad14' }} />}
                        />
                    </Card>
                </Col>
            </Row>

            {/* --- Section d'information --- */}
        </div>
    );
};

export default Accueil;
