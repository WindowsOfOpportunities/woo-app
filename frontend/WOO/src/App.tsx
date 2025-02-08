import { Button, Checkbox, Col, Flex, Form, Input, Typography } from "antd"
import Pic from "../src/assets/images/01.jpg"

function App() {


  const onFinish = () => {

  }
  const onFinishFailed = () => {

  }

  return (
    <Flex style={{
      height: '100vh'
    }}>
      <Col span={12}>
        <div style={{
          height: '100vh',
          background: `url(${Pic}) center no-repeat contain`
        }} >

        </div>
      </Col>

      <Col span={12}>
        <Flex vertical justify="center" align="center" style={{
          height: '100vh'
        }}>
          <div className="login-card" >
            <Typography.Title level={3}>Windows of Opportunities</Typography.Title>
            <Typography.Title level={2}>Connecting People, Unlocking Sustainability</Typography.Title>
            <Typography.Paragraph>Welcome to Windows of Opportunities – a seamless platform designed to connect those looking for reused windows with those offering them. Whether you're an individual or a large provider, you can effortlessly list available windows, making it easy for others to find and repurpose them. By giving windows a second life, we reduce waste, support sustainable construction, and create a circular economy for building materials. Start browsing or listing today and be part of the change!</Typography.Paragraph>
            <Typography.Title level={2}>Find. Connect. Reuse.</Typography.Title>
            <Form
              name="basic"
              layout={'vertical'}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                style={{
                  display: '100%'
                }}
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
                <Button type="primary" htmlType="submit"  >
                  Submit
                </Button>
              </Form.Item>
            </Form>

          </div>

        </Flex>

      </Col>


    </Flex>
  )
}

export default App
