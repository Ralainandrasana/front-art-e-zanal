import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
    HomeOutlined,
    BookOutlined,
    SettingOutlined,
    CreditCardOutlined,
    ReadOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "antd/dist/reset.css";
import "../../styles/vendeur.css";
import Swal from "sweetalert2";

const { Header, Sider, Content } = Layout;

const Navbar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();

    const siderWidth = collapsed ? 80 : 200;
    // Fonction pour la déconnexion avec SweetAlert
    const handleLogout = () => {
        Swal.fire({
            title: "Voulez-vous vraiment vous déconnecter ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmer",
            cancelButtonText: "Annuler",
        }).then((result) => {
            if (result.isConfirmed) {
                // Nettoyer localStorage et rediriger
                localStorage.clear();
                navigate("/signIn");
            }
        });
    };

    return (
        <Layout>
            {/* === SIDER FIXE === */}
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapsed}
                theme="light"
                width={200}
                style={{
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    background: "#fff",
                    borderRight: "1px solid #f0f0f0",
                    boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
                    overflow: "auto",
                }}
            >
                {collapsed ? (
                    <img
                        src="/logos/logoPlateforme.png"
                        alt="Logo"
                        style={{ width: 40, height: 40, objectFit: "contain", margin: "16px auto" }}
                    />
                ) : (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            color: "#1890ff",
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                            padding: "16px",
                        }}
                    >
                        <img
                            src="/logos/logoPlateforme.png"
                            alt="Logo"
                            style={{ width: 40, height: 40, objectFit: "contain" }}
                        />
                        art-e-zanal
                    </div>
                )}

                <Menu
                    mode="inline"
                    selectedKeys={[currentPath]}
                    style={{ border: "none" }}
                >
                    <Menu.Item key="/administrateur" icon={<HomeOutlined />}>
                        <Link to="/administrateur">Accueil</Link>
                    </Menu.Item>
                    <Menu.Item key="/administrateur/transactionsAdmin" icon={<CreditCardOutlined />}>
                        <Link to="/administrateur/transactionsAdmin">Transactions</Link>
                    </Menu.Item>
                    <Menu.Item key="/administrateur/publicationsAdmin" icon={<ReadOutlined />}>
                        <Link to="/administrateur/publicationsAdmin">Publications</Link>
                    </Menu.Item>
                    <Menu.Item key="/administrateur/parametresAdmin" icon={<SettingOutlined />}>
                        <Link to="/administrateur/parametresAdmin">Paramètres</Link>
                    </Menu.Item>
                    <Menu.Item
                        key="/signIn"
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                    >
                        Déconnexion
                    </Menu.Item>
                </Menu>
            </Sider>

            {/* === CONTENU À DROITE DU SIDER === */}
            <Layout style={{ marginLeft: siderWidth, minHeight: "100vh" }}>
                <Header
                    style={{
                        background: "#fff",
                        padding: "0 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        position: "sticky",
                        top: 0,
                        zIndex: 10,
                    }}
                >
                    <h2 style={{ margin: 0, color: "#1890ff" }}>
                        Espace Administrateur (Accueil)
                    </h2>
                </Header>

                <Content
                    style={{
                        margin: "20px",
                        padding: 20,
                        background: "#fff",
                        borderRadius: 8,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                        minHeight: "calc(100vh - 64px)",
                        overflow: "auto",
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Navbar;
