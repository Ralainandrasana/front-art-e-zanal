import React, { useState } from "react";
import { Card, Row, Col, Typography, Button, Modal, message, Tag } from "antd";

const { Title, Paragraph, Text } = Typography;

const PublicationsAdmin = () => {
    // --- Exemple de publications à valider ---
    const [publications, setPublications] = useState([
        {
            id: 1,
            image: "/produits/panier_osier.jpg",
            nomProduit: "Panier artisanal en osier",
            reference: "ART-001",
            marque: "ArtMalagasy",
            vendeur: "Rabe Jean",
            prix: "25 000 Ar",
            statut: "En attente",
        },
        {
            id: 2,
            image: "/produits/sac_cuir.jpg",
            nomProduit: "Sac artisanal en cuir",
            reference: "ART-002",
            marque: "Mad'Art",
            vendeur: "Rakoto Fara",
            prix: "80 000 Ar",
            statut: "En attente",
        },
        {
            id: 3,
            image: "/produits/tapis_raphia.jpg",
            nomProduit: "Tapis traditionnel en raphia",
            reference: "ART-003",
            marque: "SoaDesign",
            vendeur: "Andry Michel",
            prix: "60 000 Ar",
            statut: "En attente",
        },
    ]);

    // --- Fonction de validation ---
    const handleValidate = (id) => {
        setPublications((prev) =>
            prev.map((pub) =>
                pub.id === id ? { ...pub, statut: "Validée" } : pub
            )
        );
        message.success("✅ Publication validée avec succès !");
    };

    // --- Fonction de refus (avec confirmation) ---
    const handleDecline = (id) => {
        Modal.confirm({
            title: "Refuser cette publication ?",
            content:
                "Êtes-vous sûr de vouloir refuser cette publication ? Le vendeur sera notifié.",
            okText: "Oui, refuser",
            cancelText: "Annuler",
            okType: "danger",
            onOk: () => {
                setPublications((prev) =>
                    prev.map((pub) =>
                        pub.id === id ? { ...pub, statut: "Refusée" } : pub
                    )
                );
                message.error("⚠️ Publication refusée !");
            },
        });
    };

    return (
        <div style={{ padding: 24 }}>
            <Title level={2}>Publications des vendeurs</Title>
            <Paragraph type="secondary">
                Validez ou refusez les publications avant leur mise en ligne afin
                de garantir la qualité des produits sur la plateforme.
            </Paragraph>

            <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
                {publications.map((pub) => (
                    <Col xs={24} sm={12} md={8} key={pub.id}>
                        <Card
                            hoverable
                            style={{
                                borderRadius: 10,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            }}
                            cover={
                                <img
                                    alt={pub.nomProduit}
                                    src={pub.image}
                                    style={{
                                        width: "100%",
                                        height: 180,
                                        objectFit: "cover",
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                    }}
                                />
                            }
                        >
                            <div>
                                <Title level={5}>{pub.nomProduit}</Title>
                                <Text type="secondary">
                                    Référence : {pub.reference}
                                </Text>
                                <br />
                                <Text>Marque : {pub.marque}</Text>
                                <br />
                                <Text>Vendeur : {pub.vendeur}</Text>
                                <br />
                                <Text strong>Prix : {pub.prix}</Text>
                                <br />
                                <div style={{ marginTop: 8 }}>
                                    {pub.statut === "Validée" ? (
                                        <Tag color="green">Validée</Tag>
                                    ) : pub.statut === "Refusée" ? (
                                        <Tag color="red">Refusée</Tag>
                                    ) : (
                                        <Tag color="orange">En attente</Tag>
                                    )}
                                </div>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: 16,
                                }}
                            >
                                <Button
                                    type="primary"
                                    onClick={() => handleValidate(pub.id)}
                                    disabled={pub.statut !== "En attente"}
                                >
                                    Valider
                                </Button>
                                <Button
                                    danger
                                    onClick={() => handleDecline(pub.id)}
                                    disabled={pub.statut !== "En attente"}
                                >
                                    Refuser
                                </Button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default PublicationsAdmin;
