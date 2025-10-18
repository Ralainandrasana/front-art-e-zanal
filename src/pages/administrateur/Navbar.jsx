import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
    HomeOutlined,
    BookOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import "antd/dist/reset.css";
import "../../styles/vendeur.css";

const { Header, Sider, Content } = Layout;

const Navbar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <Layout style={{ minHeight: "100vh", background: "#f5f6fa" }}>
            {/* === MENU GAUCHE CLAIR === */}
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapsed}
                theme="light"
                style={{
                    background: "#fff",
                    borderRight: "1px solid #f0f0f0",
                    boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
                }}
            >
                {collapsed ? (
                    <img
                        src="/logos/logoPlateforme.png"
                        alt="Logo"
                        style={{ width: 40, height: 40, objectFit: "contain" }}
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
                    <Menu.Item key="/administrateur/transactionsAdmin" icon={<BookOutlined />}>
                        <Link to="/administrateur/transactionsAdmin">Transactions</Link>
                    </Menu.Item>
                    <Menu.Item key="/administrateur/publicationsAdmin" icon={<BookOutlined />}>
                        <Link to="/administrateur/publicationsAdmin">Publications</Link>
                    </Menu.Item>
                    <Menu.Item key="/administrateur/parametresAdmin" icon={<SettingOutlined />}>
                        <Link to="/administrateur/parametresAdmin">Paramètres</Link>
                    </Menu.Item>
                    </Menu>

            </Sider>

            {/* === HEADER + CONTENU === */}
            <Layout>
                <Header
                    style={{
                        background: "#fff",
                        padding: "0 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                >
                    <h2 style={{ margin: 0, color: "#1890ff" }}>Espace Administrateur (Acceuil) </h2>
                    <div style={{ color: "#555" }}>
                        
                    </div>
                </Header>

                <Content
                    style={{
                        margin: "20px",
                        padding: 20,
                        background: "#fff",
                        borderRadius: 8,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Navbar;
