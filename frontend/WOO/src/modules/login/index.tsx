import { Button, Col, Flex, Form, Input, Typography } from "antd"
import Pic from "../../assets/images/01.jpg"
import Logo from "../../assets/images/logo.png"
import { useNavigate } from "react-router"

const LoginPage = () => {

  const navigate = useNavigate();

  const onFinish = () => {
    navigate('/dashboard')
  }

  return (
    <Flex style={{
      height: '100vh'
    }}>
      <Col span={12}>
        <div style={{
          height: '100vh',
          background: `url(${Pic}) center no-repeat`
        }} >

        </div>
      </Col>

      <Col span={12}>
        <Flex vertical justify="center" align="center" style={{
          height: '100vh'
        }}>
          <Flex className="login-card" vertical align="center" >
            <img src={Logo} alt="Logo" style={{
              width: 150
            }} />
            <Typography.Title level={3}>Windows of Opportunities</Typography.Title>
            <Typography.Title level={4}>Connecting People, Unlocking Sustainability</Typography.Title>
            <Typography.Paragraph style={{
              textAlign: 'center'
            }}>Welcome to Windows of Opportunities – a seamless platform designed to connect those looking for reused windows with those offering them. Whether you're an individual or a large provider, you can effortlessly list available windows, making it easy for others to find and repurpose them. By giving windows a second life, we reduce waste, support sustainable construction, and create a circular economy for building materials. Start browsing or listing today and be part of the change!</Typography.Paragraph>
            <Typography.Title level={4}>Find. Connect. Reuse.</Typography.Title>
            <Form
              name="basic"
              layout={'vertical'}
              onFinish={onFinish}
              autoComplete="off"
              style={{
                width: '350px'
              }}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item

                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item label={null}>
                <Button color="default" variant="solid" htmlType="submit" style={{
                  width: '100%'
                }}  >
                  Submit
                </Button>
              </Form.Item>
            </Form>

          </Flex>

        </Flex>

      </Col>


    </Flex>
  )
}

export default LoginPage
