import React, { FC } from "react";
import { Form, Input, TimePicker, DatePicker, Select } from "antd";

import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { UserActions } from "../../redux/reducers/User/user";
import { RoomActions } from "../../redux/reducers/Room/room";

const FormCreate: FC = () => {
  // function onChange(dateString) {
  //   setdateString(dateString);
  // }
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(UserActions.GET_LIST_REQUREST());
    dispatch(RoomActions.GET_LIST_ROOM_REQUREST());
  }, [dispatch]);
  const dateFormat = "DD/MM/YYYY";
  const { dataUser } = useAppSelector((state) => state.user);
  const { Option } = Select;
  const { data } = useAppSelector((state) => state.room);

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
      <Form.Item label="Giờ họp" name="Time">
        <TimePicker style={{ width: "100%" }} format="HH:mm" />
      </Form.Item>
      <Form.Item label="Phòng họp" name="Address">
        <Select
          allowClear
          style={{ width: "100%" }}
          placeholder="Địa chỉ phòng họp"
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
      <Form.Item label="Người lãnh đạo" name="Userlead">
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Người lãnh đạo"
        >
          {dataUser.map((obj) => {
            return (
              <Option key={obj.ID_NB} value={obj._id}>
                {obj.Name}
              </Option>
            );
          })}
        </Select>
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
              <Option key={obj.ID_NB} value={obj._id}>
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
