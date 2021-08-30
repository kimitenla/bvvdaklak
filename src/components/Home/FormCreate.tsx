import React, { FC } from "react";
import {
  Form,
  Input,
  AutoComplete,
  TimePicker,
  DatePicker,
  Select,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { UserActions } from "../../redux/reducers/User/user";

const FormCreate: FC = () => {
  // function onChange(dateString) {
  //   setdateString(dateString);
  // }
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(UserActions.GET_LIST_REQUREST());
  }, []);
  const dateFormat = "DD/MM/YYYY";
  const { dataUser } = useAppSelector((state) => state.user);
  const { Option } = Select;

  return (
    <React.Fragment>
      <Form.Item
        label="Tiêu đề"
        name="title"
        rules={[{ required: true, message: "Tiêu đề!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Nội Dung"
        name="description"
        rules={[{ message: "Nội Dung" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Ngày họp" name="Date" rules={[{ required: true }]}>
        <DatePicker style={{ width: "100%" }} format={dateFormat} />
      </Form.Item>
      <Form.Item label="Giờ họp" name="Time" rules={[{ required: true }]}>
        <TimePicker style={{ width: "100%" }} format="HH:mm" />
      </Form.Item>
      <Form.Item
        label="Địa chỉ"
        name="Address"
        rules={[{ required: true, message: "Địa chỉ phòng họp" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Người lãnh đạo"
        name="Userlead"
        rules={[{ message: "Người lãnh đạo" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Nhân viên tham gia" name="User">
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select"
        >
          {dataUser.map((obj) => {
            return (
              <Option key={obj.ID_NB} value={obj.Name}>
                {obj.Name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item
        label="Phòng giám sát"
        name="MonitoringRoom"
        rules={[{ message: "Phòng giám sát" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Khách mời"
        name="UserInvitation"
        rules={[{ message: "Khách mời" }]}
      >
        <Input />
      </Form.Item>
    </React.Fragment>
  );
};

export default FormCreate;
