import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Typography, message } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ShoppingCartOutlined, StopOutlined } from '@ant-design/icons';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Title, Paragraph } = Typography;

const COLORS = ['#52c41a', '#ff4d4f', '#1890ff', '#faad14'];

const Accueil = () => {
  const [stats, setStats] = useState({
    produitsValides: 0,
    produitsRefuses: 0,
    commandesValidees: 0,
    commandesRefusees: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const [resProduits, resCommandes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/produit/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://127.0.0.1:8000/api/commande/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setStats({
          produitsValides: resProduits.data.filter(p => p.statut === 'validee').length,
          produitsRefuses: resProduits.data.filter(p => p.statut === 'refusee').length,
          commandesValidees: resCommandes.data.filter(c => c.statut === 'Validée').length,
          commandesRefusees: resCommandes.data.filter(c => c.statut === 'Refusée').length,
        });
      } catch (error) {
        console.error(error);
        message.error("Erreur lors du chargement des statistiques");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Chargement des statistiques...</p>;

  const produitsData = [
    { name: 'Validés', value: stats.produitsValides },
    { name: 'Refusés', value: stats.produitsRefuses },
  ];

  const commandesData = [
    { name: 'Validées', value: stats.commandesValidees },
    { name: 'Refusées', value: stats.commandesRefusees },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Bienvenue dans votre tableau de bord 🛒</Title>
      <Paragraph type="secondary">
        Suivez vos publications et commandes en un coup d'œil.
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} style={{ textAlign: 'center', borderRadius: 10 }}>
            <Statistic
              title="Produits validés"
              value={stats.produitsValides}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} style={{ textAlign: 'center', borderRadius: 10 }}>
            <Statistic
              title="Produits refusés"
              value={stats.produitsRefuses}
              prefix={<CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} style={{ textAlign: 'center', borderRadius: 10 }}>
            <Statistic
              title="Commandes validées"
              value={stats.commandesValidees}
              prefix={<ShoppingCartOutlined style={{ color: '#1890ff' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} style={{ textAlign: 'center', borderRadius: 10 }}>
            <Statistic
              title="Commandes refusées"
              value={stats.commandesRefusees}
              prefix={<StopOutlined style={{ color: '#faad14' }} />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 40 }}>
        <Col xs={24} md={12}>
          <Card title="Produits : validés vs refusés" style={{ borderRadius: 10 }}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={produitsData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {produitsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Commandes : validées vs refusées" style={{ borderRadius: 10 }}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={commandesData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {commandesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Accueil;
