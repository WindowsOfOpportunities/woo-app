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
            <Typography.Title level={3}>h3. Ant Design</Typography.Title>
            <Typography.Paragraph>lorem30  asdsa dsa hasdh sahd sahdhas dhsa hashd sahhdsa hhdahs dhasd hh</Typography.Paragraph>
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
