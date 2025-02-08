import { Search } from "@carbon/icons-react";
import { Card, Flex, Layout, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";

const MainContent = () => {
    const navigate = useNavigate();

    return (
        <Layout style={{ padding: "24px" }}>
            <Content >
                {/* <Outlet /> */}
                <Flex gap={64} justify="center" align="center" style={{
                    height: '100vh'
                }}>
                    <Card style={{
                        width: 300,
                        height:400
                    }}>
                        <Flex vertical align="center" >
                            <Search size={128} />
                            <Typography.Title level={2}>Find Windows</Typography.Title>
                        </Flex>

                    </Card>
                    <Card style={{
                        width: 300,
                        height:400
                    }}>
                        <Flex vertical align="center">
                            <Search size={128} />
                            <Typography.Title level={2}>Add Windows</Typography.Title>

                        </Flex>

                    </Card>
                    {/* <Card style={{
                        width: 300
                    }}>
                        <Flex vertical align="center">
                            <Search />
                            <Typography.Text>Data</Typography.Text>
                            <Typography.Paragraph>Search your thing here . ahahdhashdhsahasdhsahdashdas</Typography.Paragraph>

                        </Flex>

                    </Card> */}
                </Flex>

            </Content>
        </Layout>
    );
};

export default MainContent;