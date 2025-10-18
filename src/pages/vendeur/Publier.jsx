import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
    HomeOutlined,
    BookOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import 'antd/dist/reset.css';

const { Header, Sider, Content } = Layout;

const Publier = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* MENU GAUCHE */}
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div
                    style={{
                        height: 64,
                        margin: 16,
                        background: "rgba(255,255,255,0.2)",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        borderRadius: 8,
                    }}
                >
                    {collapsed ? "📚" : "Vendeur"}
                </div>

                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[currentPath]}
                >
                    <Menu.Item key="/Vendeur" icon={<HomeOutlined />}>
                        <Link to="/Vendeur">Accueil</Link>
                    </Menu.Item>
                    <Menu.Item key="/Vendeur/publications" icon={<BookOutlined />}>
                        <Link to="/Vendeur/publications">Publications</Link>
                    </Menu.Item>
                    <Menu.Item key="/Vendeur/commandes" icon={<BookOutlined />}>
                        <Link to="/Vendeur/commandes">Commandes</Link>
                    </Menu.Item>
                </Menu>
            </Sider>

            {/* HEADER + CONTENU */}
            <Layout>
                <Header
                    style={{
                        background: "#fff",
                        padding: "0 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                >
                    <h2 style={{ margin: 0 }}>Espace vendeur</h2>
                    <div>👤 Admin</div>
                </Header>

                <Content
                    style={{
                        margin: "20px",
                        padding: 20,
                        background: "#fff",
                        borderRadius: 8,
                    }}
                >
                    <Outlet /> {/* 👉 les sous-pages du vendeur s’affichent ici */}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Publier;
