import React from 'react';
import { Form, Input, Button, Checkbox, message, Typography, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { authorizedUsers } from '../authorizedUsers';

const { Title, Text } = Typography;

function Login({ onLogin }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { email, password } = values;
    const user = authorizedUsers.find(u => u.email === email && u.password === password);
    if (user) {
      message.success('Login successful!');
      onLogin(user);
    } else {
      message.error('Invalid email or password');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      background: '#f0f2f5'
    }}>
      <Space direction="vertical" align="center" size="large">
        <Title level={2} style={{ marginBottom: 0 }}>Welcome Back</Title>
        <Text type="secondary" style={{ marginBottom: 24 }}>Please sign in to your account</Text>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          style={{ width: 300,display:"flex",flexDirection:"column" }}
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a style={{ float: 'right' }} href="#">Forgot password</a>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Log in
            </Button>
          </Form.Item>
          <Form.Item>
            <Text>Don't have an account? <a href="#">Sign up</a></Text>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
}

export default Login;