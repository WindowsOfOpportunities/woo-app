import { Layout, Avatar, Dropdown, Typography, Button, Menu } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { UserOutlined, LogoutOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Logo from "../../../assets/images/logo.png";

const { Header } = Layout;
const { Text } = Typography;

const PannelWrapper = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get current route

    // User menu dropdown
    const userMenu = (
        <Menu>
            <Menu.Item key="logout" onClick={() => navigate("/logout")} icon={<LogoutOutlined />}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* Top Navigation Bar */}
            <Header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "black", padding: "0 20px" }}>
                {/* Left Section: Logo + App Name */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img src={Logo} alt="Logo" style={{ width: 40 }} />
                    <Text style={{ color: "white", fontSize: "18px", fontWeight: "bold" }}>
                        Windows of Opportunities
                    </Text>
                </div>

                {/* User Profile Dropdown */}
                <Dropdown overlay={userMenu} placement="bottomRight">
                    <Avatar size="large" icon={<UserOutlined />} style={{ cursor: "pointer" }} />
                </Dropdown>
            </Header>

            {/* Back Button (Placed Below Navigation) */}
            {location.pathname !== "/dashboard" && (
                <div style={{ padding: "10px 24px", background: "#f5f5f5" }}>
                    <Button
                        type="default"
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </Button>
                </div>
            )}

            {/* Content Area */}

            <Outlet />

        </Layout>
    );
};

export default PannelWrapper;
