import React from 'react';
import { Card, Row, Col, Statistic, Typography } from 'antd';
import { BookOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Accueil = () => {
    return (
        <div>
            <Title level={2}>Bienvenue dans votre bibliothèque 📚</Title>
            <Paragraph type="secondary">
                Gérez facilement vos livres, vos utilisateurs et vos emprunts à partir de ce tableau de bord.
            </Paragraph>

            {/* --- Statistiques principales --- */}
            <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
                <Col xs={24} sm={12} md={8}>
                    <Card bordered={false} style={{ textAlign: 'center', borderRadius: 10, boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                        <Statistic
                            title="Livres disponibles"
                            value={128}
                            prefix={<BookOutlined style={{ color: '#1677ff' }} />}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <Card bordered={false} style={{ textAlign: 'center', borderRadius: 10, boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                        <Statistic
                            title="Utilisateurs inscrits"
                            value={45}
                            prefix={<UserOutlined style={{ color: '#52c41a' }} />}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <Card bordered={false} style={{ textAlign: 'center', borderRadius: 10, boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                        <Statistic
                            title="Livres empruntés"
                            value={23}
                            prefix={<ClockCircleOutlined style={{ color: '#faad14' }} />}
                        />
                    </Card>
                </Col>
            </Row>

            {/* --- Section d'information --- */}
            <Card
                style={{
                    marginTop: 30,
                    borderRadius: 10,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}
            >
                <Title level={4}>📖 À propos</Title>
                <Paragraph>
                    Cette application vous permet de gérer les livres, les emprunts et les utilisateurs de la bibliothèque.
                    Vous pouvez consulter les livres disponibles, enregistrer les nouveaux ouvrages, suivre les emprunts non rendus et bien plus encore.
                </Paragraph>
            </Card>
        </div>
    );
};

export default Accueil;
