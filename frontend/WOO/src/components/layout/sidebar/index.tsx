import { Search, User } from "@carbon/icons-react";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useNavigate } from "react-router-dom";

const SidebarMenu = () => {
    const navigate = useNavigate();

    return (
        <Sider width={200} theme="dark">
            <Menu
                mode="inline"
                theme="dark"
                defaultSelectedKeys={["search"]}
                onClick={(e) => navigate('/dashboard/' + e.key)}
                items={[
                    { key: "search", icon: <Search />, label: "Search" },
                    { key: "profile", icon: <User />, label: "Profile" },

                ]}
            />
        </Sider>
    );
};

export default SidebarMenu