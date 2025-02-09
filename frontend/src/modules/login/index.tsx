import { Button, Col, Row, Form, Input, Typography } from "antd";
import Pic from "../../assets/images/window-look.jpg";
import Logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AntContext } from "../../utils/providers/antd";
import React from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { notificationApi } = useContext(AntContext);

  const onFinish = (values: { username: string; password: string }) => {
    const { username, password } = values;

    if (username === "admin" && password === "admin") {
      localStorage.setItem("token", "fake-jwt-token");
      navigate("/dashboard");
      notificationApi.success({
        message: "Welcome back!",
        description: "You have successfully logged in.",
        placement: "topRight",
        duration: 4,
        key: "login"
      });
    } else {
      notificationApi.error({
        message: "Login Failed",
        description: "Invalid username or password. Please try again.",
        placement: "topRight",
        duration: 4,
        key: 'login'
      });
    }
  };

  return (
    <Row style={{ height: "100vh" }}>
      {/* Left side - Background Image (Hidden on Small Screens) */}
      <Col xs={0} sm={0} md={12} lg={12} xl={12}>
        <div
          style={{
            height: "100vh",
            background: `url(${Pic}) center no-repeat`,
            backgroundSize: "cover",
          }}
        />
      </Col>

      {/* Right side - Login Form (Full Width on Mobile) */}
      <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
        <div style={{ width: "100%", maxWidth: "400px", textAlign: "center" }}>
          <img src={Logo} alt="Logo" style={{ width: 150 }} />
          <Typography.Title level={3}>Windows of Opportunities</Typography.Title>
          <Typography.Title level={4}>Connecting People, Unlocking Sustainability</Typography.Title>
          <Typography.Paragraph>
            Welcome to Windows of Opportunities – a seamless platform designed to connect those looking for reused windows with those offering them.
          </Typography.Paragraph>
          <Typography.Title level={4}>Find. Connect. Reuse.</Typography.Title>

          <Form name="login" layout="vertical" onFinish={onFinish} autoComplete="off">
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
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
