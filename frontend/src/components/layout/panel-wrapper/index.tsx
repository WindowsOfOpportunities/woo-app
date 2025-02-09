import { Layout, Avatar, Dropdown, Typography, Button, Menu } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { UserOutlined, LogoutOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Logo from "../../../assets/images/logo.png";
import { useContext } from "react";
import { AntContext } from "../../../utils/providers/antd";

const { Header } = Layout;
const { Text } = Typography;

const PannelWrapper = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get current route
    const { modalApi } = useContext(AntContext);

    // Logout function with confirmation modal
    const handleLogout = () => {
        modalApi.confirm({
            title: "Confirm Logout",
            content: "Are you sure you want to log out?",
            okText: "Yes, Logout",
            cancelText: "Cancel",
            okButtonProps: {
                type: 'default',
            },
            onOk: () => {
                localStorage.removeItem("token"); // Clear authentication token
                navigate("/"); // Redirect to login page
            },
        });
    };

    // User menu dropdown
    const userMenu = (
        <Menu>
            <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout style={styles.layout}>
            {/* Top Navigation Bar */}
            <Header style={styles.header}>
                {/* Left Section: Logo + App Name */}
                <div style={styles.logoContainer}>
                    <img src={Logo} alt="Logo" style={styles.logo} />
                    <Text style={styles.title}>Windows of Opportunities</Text>
                </div>

                {/* User Profile Dropdown */}
                <Dropdown overlay={userMenu} placement="bottomRight">
                    <Avatar size="large" icon={<UserOutlined />} style={styles.avatar} />
                </Dropdown>
            </Header>

            {/* Back Button (Placed Below Navigation) */}
            {location.pathname !== "/dashboard" && (
                <div style={styles.backButtonContainer}>
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

// Styles object for consistency
const styles = {
    layout: { minHeight: "100vh" },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "black",
        padding: "0 20px",
    },
    logoContainer: { display: "flex", alignItems: "center", gap: 10 },
    logo: { width: 40 },
    title: {
        color: "white",
        fontSize: "18px",
        fontWeight: "bold",
    },
    avatar: { cursor: "pointer" },
    backButtonContainer: {
        padding: "10px 24px",
        background: "#f5f5f5",
    },
};

export default PannelWrapper;
