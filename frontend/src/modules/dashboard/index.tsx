import { Flex, Layout, Typography } from "antd"
import { Content } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import WindowIconAdd from "../../assets/images/window-add.svg";
import WindowIconSearch from "../../assets/images/window-search.svg";
const { Title } = Typography;

// Reusable Action Card Component
const ActionCard = ({ title, icon, route }: { title: string; icon: string; route: string }) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(route)} className="card">
            <img src={icon} alt={title} />
            <Title level={2}>{title}</Title>
        </div>
    );
};

const DashBoard = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Layout style={{ padding: 24 }}>
                <Content>
                    <Flex gap={64} justify="center" align="center" style={{ height: "70vh" }}>
                        <ActionCard title="Find Windows" icon={WindowIconSearch} route="/dashboard/find-window" />
                        <ActionCard title="Add Windows" icon={WindowIconAdd} route="/dashboard/add-window" />
                    </Flex>
                </Content>
            </Layout>
        </Layout>
    )
}

export default DashBoard
