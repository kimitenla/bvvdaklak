import React, { FC } from "react";
import { Form, Input, Select, InputNumber } from "antd";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { RoomActions } from "../../redux/reducers/Room/room";

const FormCreate: FC = () => {
  const { Option } = Select;
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(RoomActions.GET_LIST_ROOM_REQUREST());
  }, []);

  const { data } = useAppSelector((state) => state.room);
  return (
    <React.Fragment>
      <Form.Item
        label="Họ và tên"
        name="Name"
        rules={[{ required: true, message: "Họ và tên!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Số điện thoại" name="Phone_Number">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Phòng/Khoa" name="user_room">
        <Select
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select"
        >
          {data.map((obj) => {
            return (
              <Option key={obj.id_room} value={obj.room_name}>
                {obj.room_name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item label="Cấp bậc" name="Role" rules={[{ message: "Cấp bậc!" }]}>
        <Select placeholder="Cấp bậc">
          <Option value="manager">Quản lý</Option>
          <Option value="employee">Nhân viên</Option>
          <Option value="contract">Hợp đồng</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Loại hình công việc"
        name="job_type"
        rules={[{ message: "Loại hình công việc!" }]}
      >
        <Select placeholder="Loại hình công việc">
          <Option value="contract_job">Ký hợp đồng</Option>
          <Option value="payroll">Biên chế</Option>
          <Option value="other">Khác</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Trạng thái"
        name="Status"
        rules={[{ message: "Trạng thái!" }]}
      >
        <Select placeholder="Trạng thái!">
          <Option value="active">Hoạt Động</Option>
          <Option value="stop">Dừng</Option>
          <Option value="other">Khác</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
    </React.Fragment>
  );
};

export default FormCreate;
