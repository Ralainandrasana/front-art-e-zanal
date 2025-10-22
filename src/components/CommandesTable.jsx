import React, { useState } from 'react';
import { Table, Button, Space, Modal, Tag } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Column } = Table;
const { confirm } = Modal;

const CommandesTable = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    // Données simulées pour les commandes
    const [commandes, setCommandes] = useState([
        {
            idCmd: 'CMD001',
            dateCmd: '2024-01-15',
            statut: 'En attente',
            total: 150.50,
            lignesCmd: [
                { idLigne: 1, produit: 'Produit A', quantite: 2, prix: 50 },
                { idLigne: 2, produit: 'Produit B', quantite: 1, prix: 50.50 }
            ]
        },
        {
            idCmd: 'CMD002',
            dateCmd: '2024-01-16',
            statut: 'Validée',
            total: 89.99,
            lignesCmd: [
                { idLigne: 1, produit: 'Produit C', quantite: 1, prix: 89.99 }
            ]
        },
        {
            idCmd: 'CMD003',
            dateCmd: '2024-01-17',
            statut: 'En attente',
            total: 245.75,
            lignesCmd: [
                { idLigne: 1, produit: 'Produit D', quantite: 3, prix: 75 },
                { idLigne: 2, produit: 'Produit E', quantite: 1, prix: 20.75 }
            ]
        }
    ]);

    // Fonction pour annuler une commande
    const annulerCommande = (idCmd) => {
        confirm({
            title: 'Confirmer l\'annulation',
            icon: <ExclamationCircleOutlined />,
            content: 'Êtes-vous sûr de vouloir annuler cette commande ?',
            okText: 'Oui',
            cancelText: 'Non',
            onOk() {
                setCommandes(prevCommandes =>
                    prevCommandes.map(cmd =>
                        cmd.idCmd === idCmd ? { ...cmd, statut: 'Annulée' } : cmd
                    )
                );
            }
        });
    };

    // Fonction pour gérer l'expansion des lignes
    const onExpand = (expanded, record) => {
        const keys = expanded
            ? [...expandedRowKeys, record.idCmd]
            : expandedRowKeys.filter(key => key !== record.idCmd);
        setExpandedRowKeys(keys);
    };

    // Fonction pour développer/réduire toutes les lignes
    const expandAll = () => {
        setExpandedRowKeys(commandes.map(cmd => cmd.idCmd));
    };

    const collapseAll = () => {
        setExpandedRowKeys([]);
    };

    // Configuration des colonnes du tableau principal
    const columns = [
        {
            title: 'ID Commande',
            dataIndex: 'idCmd',
            key: 'idCmd',
            sorter: (a, b) => a.idCmd.localeCompare(b.idCmd),
        },
        {
            title: 'Date Commande',
            dataIndex: 'dateCmd',
            key: 'dateCmd',
            sorter: (a, b) => new Date(a.dateCmd) - new Date(b.dateCmd),
            render: (date) => new Date(date).toLocaleDateString('fr-FR')
        },
        {
            title: 'Statut',
            dataIndex: 'statut',
            key: 'statut',
            filters: [
                { text: 'En attente', value: 'En attente' },
                { text: 'Validée', value: 'Validée' },
                { text: 'Annulée', value: 'Annulée' },
            ],
            onFilter: (value, record) => record.statut === value,
            render: (statut) => {
                let color = 'blue';
                if (statut === 'Validée') color = 'green';
                if (statut === 'Annulée') color = 'red';
                if (statut === 'En attente') color = 'orange';

                return (
                    <Tag color={color}>
                        {statut.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'Total (Ar)',
            dataIndex: 'total',
            key: 'total',
            sorter: (a, b) => a.total - b.total,
            render: (total) => `${total.toFixed(2)} Ar`
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="link"
                        onClick={() => onExpand(true, record)}
                    >
                        Voir détails
                    </Button>
                    {record.statut === 'En attente' && (
                        <Button
                            danger
                            onClick={() => annulerCommande(record.idCmd)}
                        >
                            Annuler
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    // Configuration pour le tableau développé (lignes de commande)
    const expandedRowRender = (record) => {
        const columnsLignes = [
            {
                title: 'ID Ligne',
                dataIndex: 'idLigne',
                key: 'idLigne',
            },
            {
                title: 'Produit',
                dataIndex: 'produit',
                key: 'produit',
            },
            {
                title: 'Quantité',
                dataIndex: 'quantite',
                key: 'quantite',
            },
            {
                title: 'Prix Unitaire (Ar)',
                dataIndex: 'prix',
                key: 'prix',
                render: (prix) => `${prix.toFixed(2)} Ar`
            },
            {
                title: 'Sous-total (Ar)',
                key: 'sousTotal',
                render: (_, ligne) => `${(ligne.quantite * ligne.prix).toFixed(2)} Ar`
            },
        ];

        return (
            <div style={{ padding: '16px', background: '#fafafa' }}>
                <h4>Lignes de commande - {record.idCmd}</h4>
                <Table
                    columns={columnsLignes}
                    dataSource={record.lignesCmd}
                    pagination={false}
                    size="small"
                    rowKey="idLigne"
                />
                <div style={{ marginTop: '16px', textAlign: 'right' }}>
                    <strong>Total commande: {record.total.toFixed(2)} Ar</strong>
                </div>
            </div>
        );
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: setSelectedRowKeys,
    };

    return (
        <div className="body">
            <div style={{ marginBottom: 16 }}>
                <Space>
                    <Button onClick={expandAll}>Développer tout</Button>
                    <Button onClick={collapseAll}>Réduire tout</Button>
                </Space>
            </div>

            <Table
                columns={columns}
                dataSource={commandes}
                rowKey="idCmd"
                expandable={{
                    expandedRowRender,
                    expandedRowKeys,
                    onExpand: onExpand,
                    rowExpandable: (record) => record.lignesCmd && record.lignesCmd.length > 0,
                }}
                rowSelection={rowSelection}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} sur ${total} commandes`,
                }}
                scroll={{ x: 800 }}
            />
        </div>
    );
};

export default CommandesTable;