import React, { FC } from "react";
import { Form, Input, InputNumber } from "antd";

const FormCreate: FC = () => {
  return (
    <React.Fragment>
      <Form.Item
        label="Tên phòng"
        name="room_name"
        rules={[{ required: true, message: "Tên phòng" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Diện tích" name="room_size">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
    </React.Fragment>
  );
};

export default FormCreate;
