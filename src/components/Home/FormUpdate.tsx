import React, { FC } from "react";
import { Form, Input, DatePicker, TimePicker, Select } from "antd";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { UserActions } from "../../redux/reducers/User/user";
interface IProps {
  data: any;
}

const FormCreate: FC<IProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(UserActions.GET_LIST_REQUREST());
  }, []);
  const { dataUser } = useAppSelector((state) => state.user);
  const { Option } = Select;
  return (
    <React.Fragment>
      <Form.Item
        label="Tiêu đề"
        name="title"
        rules={[{ required: true, message: "Tiêu đề!" }]}
        initialValue={data.title}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Nội Dung"
        name="description"
        rules={[{ message: "Nội Dung" }]}
        initialValue={data.description}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Ngày họp" name="Date" initialValue={moment(data.Date)}>
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Giờ họp" name="Time" initialValue={moment(data.Time)}>
        <TimePicker style={{ width: "100%" }} format="HH:mm" />
      </Form.Item>
      <Form.Item
        label="Địa chỉ"
        name="Address"
        rules={[{ message: "Địa chỉ phòng họp" }]}
        initialValue={data.Address}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Người lãnh đạo"
        name="Userlead"
        rules={[{ message: "Người lãnh đạo" }]}
        initialValue={data.Userlead}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Nhân viên tham gia"
        name="User"
        initialValue={data.User}
      >
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
        initialValue={data.MonitoringRoom}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Khách mời"
        name="UserInvitation"
        rules={[{ message: "Khách mời" }]}
        initialValue={data.UserInvitation}
      >
        <Input />
      </Form.Item>
    </React.Fragment>
  );
};

export default FormCreate;
