import React, { FC } from "react";
import { Form, Input, InputNumber } from "antd";

interface IProps {
  data: any;
}

const FormCreate: FC<IProps> = ({ data }) => {
  return (
    <React.Fragment>
      <Form.Item
        label="Tên phòng"
        name="room_name"
        rules={[{ required: true, message: "Tên phòng" }]}
        initialValue={data.room_name}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Diện tích"
        name="room_size"
        initialValue={data.room_size}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
    </React.Fragment>
  );
};

export default FormCreate;
