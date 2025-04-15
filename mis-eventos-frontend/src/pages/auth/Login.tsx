import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link, useNavigate,} from 'react-router-dom';
import { login } from '../../services/auth';
import useUserStore from '../../hooks/store';

const Login: React.FC = () => {
  const setToken = useUserStore((state: any) => state.setUserToken);
  const setUserId = useUserStore((state: any) => state.setUserProfile);

  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
        const response = await login(values.email, values.password);
        console.log(response);
        if (response.redirect === 'dashboard') {
        navigate('/dashboard', { replace: true });
      }else{
        navigate('/home', { replace: true });
      }
      console.log(response);

      localStorage.setItem('token', response["access_token"]);
      localStorage.setItem('role', response.redirect);
      localStorage.setItem('uuid_user', response["uuid_user"]);
      setToken(response["access_token"]);
      setUserId(response["uuid_user"]);

    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Iniciar Sesión</h2>
      <Form
        name="basic"
        style={{ width: '90%', backgroundColor: '#fff' }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
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

        <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Iniciar sesión
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'center' }}>
        <Link to="forgot-password">Olvidé mi contraseña</Link>
      </div>
    </>
  );
};

export default Login;
