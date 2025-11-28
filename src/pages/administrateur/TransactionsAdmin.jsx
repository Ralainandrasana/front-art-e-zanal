import React, { useEffect, useState } from "react";
import { Table, Tag, Card, Typography, message, Row, Col } from "antd";
import dayjs from "dayjs";
import axios from "axios";

const { Title } = Typography;

const TransactionsAdmin = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://127.0.0.1:8000/api/administrateur/liste-paiements/",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = res.data.map((pay) => ({
          key: pay.id_payement,
          id_commande: pay.id_commande || "Produit inconnu",
          id_user: pay.id_user || "Client inconnu",
          date: pay.datePayement,
          operateur: pay.typePayement,
          prix: pay.montant.toLocaleString() + " Ar",
        }));

        setTransactions(data);
      } catch (error) {
        console.error(error.response?.data || error);
        message.error("Impossible de récupérer les transactions !");
      }
    };

    fetchTransactions();
  }, []);

  const columns = [
    {
      title: "Commande",
      dataIndex: "id_commande",
      key: "commande",
      render: (text) => <strong style={{ color: "#1890ff" }}>{text}</strong>,
    },
    {
      title: "Client",
      dataIndex: "id_user",
      key: "client",
      render: (text) => <span style={{ color: "#52c41a" }}>{text}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => (
        <span style={{ fontStyle: "italic", color: "#595959" }}>
          {dayjs(date).format("DD/MM/YYYY HH:mm")}
        </span>
      ),
    },
    {
      title: "Opérateur",
      dataIndex: "operateur",
      key: "operateur",
      render: (operateur) => {
        let color =
          operateur === "Yas"
            ? "green"
            : operateur === "Orange Money"
            ? "orange"
            : "red";
        return <Tag color={color} style={{ fontWeight: "bold" }}>{operateur}</Tag>;
      },
    },
    {
      title: "Montant",
      dataIndex: "prix",
      key: "prix",
      render: (text) => <span style={{ fontWeight: 600, color: "#fa8c16" }}>{text}</span>,
    },
  ];

  return (
    <div style={{ padding: 24, backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={2} style={{ color: "#001529" }}>💰 Transactions</Title>
        </Col>
        <Col span={24}>
          <Card
            bordered={false}
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              backgroundColor: "#ffffff",
            }}
          >
            <Table
              columns={columns}
              dataSource={transactions}
              rowKey="key"
              pagination={{ pageSize: 10 }}
              bordered
              rowClassName={(record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
            />
          </Card>
        </Col>
      </Row>

      {/* Styles supplémentaires pour alternance de lignes */}
      <style jsx>{`
        .table-row-light {
          background-color: #f6ffed;
        }
        .table-row-dark {
          background-color: #fffbe6;
        }
      `}</style>
    </div>
  );
};

export default TransactionsAdmin;
