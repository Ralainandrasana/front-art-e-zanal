import React from "react";
import { Table, Tag, Card, Typography, Divider } from "antd";
import dayjs from "dayjs"; // ← npm install dayjs

const { Title } = Typography;

const TransactionsAdmin = () => {
    // --- Données factices (plus tard remplacées par les données backend) ---
    const allTransactions = [
        { key: "1", produit: "Panier artisanal en osier", date: "2025-10-18", operateur: "Yas", prix: "15 000 Ar" },
        { key: "2", produit: "Collier perlé traditionnel", date: "2025-10-17", operateur: "Orange Money", prix: "25 000 Ar" },
        { key: "3", produit: "Tapis malgache en raphia", date: "2025-10-12", operateur: "Airtel", prix: "40 000 Ar" },
        { key: "4", produit: "Sac artisanal en cuir", date: "2025-10-09", operateur: "Yas", prix: "30 000 Ar" },
        { key: "5", produit: "Bracelet en bois", date: "2025-10-08", operateur: "Airtel", prix: "10 000 Ar" },
    ];

    // --- Détection automatique des périodes ---
    const today = dayjs();
    const startOfWeek = today.startOf("week");
    const startOfLastWeek = startOfWeek.subtract(1, "week");
    const endOfLastWeek = startOfWeek.subtract(1, "day");

    // 🔹 Transactions récentes (les 3 derniers jours)
    const transactionsRecentes = allTransactions.filter((t) =>
        dayjs(t.date).isAfter(today.subtract(3, "day"))
    );

    // 🔹 Transactions de la semaine dernière
    const transactionsSemaineDerniere = allTransactions.filter(
        (t) =>
            dayjs(t.date).isAfter(startOfLastWeek) &&
            dayjs(t.date).isBefore(endOfLastWeek)
    );

    // --- Colonnes du tableau ---
    const columns = [
        {
            title: "Produit",
            dataIndex: "produit",
            key: "produit",
            render: (text) => <strong>{text}</strong>,
        },
        {
            title: "Date de transaction",
            dataIndex: "date",
            key: "date",
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
                return <Tag color={color}>{operateur}</Tag>;
            },
        },
        {
            title: "Prix",
            dataIndex: "prix",
            key: "prix",
            render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
        },
    ];

    return (
        <div style={{ padding: 24 }}>
            <Title level={2}>Transactions effectuées</Title>

            {/* --- Transactions récentes --- */}
            {transactionsRecentes.length > 0 && (
                <Card
                    title=" Transactions récentes"
                    bordered={false}
                    style={{
                        borderRadius: 10,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        marginTop: 16,
                    }}
                >
                    <Table
                        columns={columns}
                        dataSource={transactionsRecentes}
                        pagination={false}
                        rowHoverable
                    />
                </Card>
            )}

            <Divider style={{ margin: "40px 0" }}>Historique</Divider>

            {/* --- Transactions de la semaine dernière --- */}
            {transactionsSemaineDerniere.length > 0 && (
                <Card
                    title=" Transactions de la semaine dernière"
                    bordered={false}
                    style={{
                        borderRadius: 10,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                >
                    <Table
                        columns={columns}
                        dataSource={transactionsSemaineDerniere}
                        pagination={false}
                        rowHoverable
                    />
                </Card>
            )}
        </div>
    );
};

export default TransactionsAdmin;
