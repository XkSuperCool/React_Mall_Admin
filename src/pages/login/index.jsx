import React, { memo, useCallback } from 'react';
import config from '@/config';
import LoginWrapper from './style';
import { Form, Input, Button, Row, Col } from 'antd';

const baseUrl = process.env.NODE_ENV === 'development' ? config.devBaseURL : config.proBaseURL;
const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
}
const tailLayout = {
  wrapperCol: { offset: 10, span: 16 },
};

function Login() {
  const [form] = Form.useForm();
  const onFinish = useCallback((value) => {
    console.log(value)
  }, []);

  return (
    <LoginWrapper url={baseUrl + '/background.jpg'}>
      <div className='form'>
        <Form
          {...layout}
          name="loginForm"
          form={ form }
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入管理员用户名！' }]}
          >
            <Input placeholder='请输入管理员账号' />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入管理员登录密码！' }]}
          >
            <Input.Password placeholder='请输入管理员密码' />
          </Form.Item>

          <Form.Item
            label="图形验证码"
            name="captcha"
            rules={[{ required: true, message: '请输入图形验证码！' }]}
          >
            <Row>
              <Col span={ 17 }>
                <Input placeholder='请输入图形密码' />
              </Col>
              <Col offset={ 1 } span={ 5 }>
                <img src={ baseUrl + '/admin/captcha'} alt=""/>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </LoginWrapper>
  )
}

export default memo(Login);
