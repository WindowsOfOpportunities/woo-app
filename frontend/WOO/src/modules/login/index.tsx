import { Button, Col, Row, Form, Input, Typography } from "antd";
import Pic from "../../assets/images/01.jpg";
import Logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = () => {
    navigate("/dashboard");
  };

  return (
    <Row style={{ height: "100vh" }}>
      {/* Left side - Background Image */}
      <Col span={12}>
        <div
          style={{
            height: "100vh",
            background: `url(${Pic}) center no-repeat`,
            backgroundSize: "cover",
          }}
        />
      </Col>

      {/* Right side - Login Form */}
      <Col span={12} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: "100%", maxWidth: "400px", textAlign: "center" }}>
          <img src={Logo} alt="Logo" style={{ width: 150 }} />
          <Typography.Title level={3}>Windows of Opportunities</Typography.Title>
          <Typography.Title level={4}>Connecting People, Unlocking Sustainability</Typography.Title>
          <Typography.Paragraph>
            Welcome to Windows of Opportunities – a seamless platform designed to connect those looking for reused windows with those offering them. Whether you're an individual or a large provider, you can effortlessly list available windows, making it easy for others to find and repurpose them.
          </Typography.Paragraph>
          <Typography.Title level={4}>Find. Connect. Reuse.</Typography.Title>

          <Form name="basic" layout="vertical" onFinish={onFinish} autoComplete="off">
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please input your username!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button color="default" variant="solid" htmlType="submit" style={{ width: "100%" }}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;