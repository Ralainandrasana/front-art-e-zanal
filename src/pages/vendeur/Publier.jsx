import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
    HomeOutlined,
    BookOutlined,
    SettingOutlined,
    SearchOutlined,
    BellOutlined,
    UserOutlined
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import "antd/dist/reset.css";
import "../../styles/vendeur.css";

const { Header, Sider, Content } = Layout;

const Publier = () => {
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
                    <Menu.Item key="/Vendeur" icon={<HomeOutlined />}>
                        <Link to="/Vendeur">Accueil</Link>
                    </Menu.Item>
                    <Menu.Item key="/Vendeur/publications" icon={<BookOutlined />}>
                        <Link to="/Vendeur/publications">Publications</Link>
                    </Menu.Item>
                    <Menu.Item key="/Vendeur/commandes" icon={<BookOutlined />}>
                        <Link to="/Vendeur/commandes">Commandes</Link>
                    </Menu.Item>
                    <Menu.Item key="/Vendeur/parametres" icon={<SettingOutlined />}>
                        <Link to="/Vendeur/parametres">Paramètres</Link>
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
                    <h2 style={{ margin: 0, color: "#1890ff" }}>Espace vendeur</h2>
                    <div className="right"
                        style={{
                            background: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "30%",
                        }}
                    >
                        <div className="search"
                            style={{
                                background: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <div className="iconSearch">
                                <SearchOutlined style={{
                                    background: "#F5F7FA",
                                    width: "40px",
                                    height: "40px",
                                    outline: "none",
                                    borderTopLeftRadius: "10px",
                                    borderBottomLeftRadius: "10px",
                                    paddingLeft: "15px"
                                }} />
                            </div>
                            <input type="text" placeholder="Recherche" style={{
                                background: "#F5F7FA",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "150px",
                                height: "40px",
                                border: "none",
                                outline: "none",
                                borderTopRightRadius: "10px",
                                borderBottomRightRadius: "10px",
                            }} />
                        </div>
                        <BellOutlined style={{
                            background: "#F5F7FA",
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            justifyContent: "center",
                            alignContent: "center",
                        }} />
                        <UserOutlined style={{
                            background: "transparent",
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            justifyContent: "center",
                            alignContent: "center",
                            border: "solid 1px black"
                        }} />
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

export default Publier;
