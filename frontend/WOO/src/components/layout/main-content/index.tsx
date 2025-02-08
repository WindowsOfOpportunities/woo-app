
import { Flex, Layout, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import WindowIconAdd from '../../../assets/images/window-add.svg'
import WindowIconSearch from '../../../assets/images/window-search.svg'

const MainContent = () => {
    const navigate = useNavigate();

    const handleNavigation = (route: string) => {
        navigate(route);
    }

    return (
        <Layout style={{ padding: "24px" }}>
            <Content >
                <Flex gap={64} justify="center" align="center" style={{
                    height: '70vh'
                }}>
                    <div onClick={() => handleNavigation('/dashboard/find-window')} style={{
                        width: 300,
                        height: 400,
                        border: '3px solid black',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        cursor: 'pointer',
                        borderRadius: '7px'
                    }}>
                        <img src={WindowIconSearch} style={{
                            width: 150
                        }} alt="window search" />

                        <Typography.Title level={2}>Find Windows</Typography.Title>
                    </div>
                    <div onClick={() => handleNavigation('/dashboard/add-window')} style={{
                        width: 300,
                        height: 400,
                        border: '3px solid black',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        cursor: 'pointer',
                        borderRadius: '7px'

                    }}>
                        <Flex vertical align="center">
                            <img style={{
                                width: 150
                            }} src={WindowIconAdd} alt="window search" />
                            <Typography.Title level={2}>Add Windows</Typography.Title>
                        </Flex>
                    </div>
                </Flex>
            </Content>
        </Layout>
    );
};

export default MainContent;