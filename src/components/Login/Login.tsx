import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import React from "react";
import { message } from "antd";
import logo from "../../logobv.png";
import { useHistory } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../utils/hook";

import "./index.css";
import { LoginActions } from "../../redux/reducers/User/login";
function Login() {
  const dispatch = useAppDispatch();
  let history = useHistory();
  const onFinish1 = (values: any) => {
    dispatch(
      LoginActions.LOGIN_REQUREST({
        data: values,

        cb: (res: any) => {
          if (res.isSuccess == true) {
            history.push("/");
            message.success("ĐĂNG NHẬP THÀNH CÔNG");
          } else {
            message.error("ĐĂNG NHẬP THẤT BẠI");
          }
        },
      })
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    message.warning("Bạn đang nhập thiếu thông tin");
  };

  return (
    <Row justify="center">
      <Col span={16}>
        <img src={logo} width={200} />
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 10 }}
          initialValues={{ remember: true }}
          onFinish={onFinish1}
          onFinishFailed={onFinishFailed}
        >
          <h1 style={{ textAlign: "center" }}>Đăng Nhập</h1>

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

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
export default Login;
