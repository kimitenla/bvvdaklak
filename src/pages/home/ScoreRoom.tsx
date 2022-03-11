import React, { useEffect } from "react";
import {
  Typography,
  Row,
  Col,
  Button,
  Form,
  InputNumber,
  DatePicker,
  Select,
} from "antd";
import Layout1 from "../layout/layout";
import "./scoreroom.css";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { UserActions } from "../../redux/reducers/User/user";
import { RoomActions } from "../../redux/reducers/Room/room";

const { Title } = Typography;
const { Option } = Select;
export default function ScoreRoom() {
  const dispatch = useAppDispatch();
  // lấy data user
  useEffect(() => {
    dispatch(RoomActions.GET_LIST_ROOM_REQUREST());
  }, [dispatch]);
  const { dataUser } = useAppSelector((state) => state.user);
  const { data } = useAppSelector((state) => state.room);

  // end
  let today = new Date();
  let month = today.getMonth();
  // ON SUBMIT
  const SelectRoom = (values: any) => {
    dispatch(UserActions.GET_LIST_ON_ROOM(values));

    // eslint-disable-next-line no-lone-blocks
    // {
    //   dataUser.forEach((item) => {
    //     if (item.user_room === values) {
    //       return item.Name;
    //     }
    //   });
    // }
  };
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  // END
  return (
    <Layout1>
      <Row>
        <Col span={24}>
          <Title level={3} className="title">
            PHIẾU CHẤM ĐIỂM, XẾP LOẠI CHẤT LƯỢNG NGƯỜI LAO ĐỘNG THÁNG {month}
          </Title>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Phòng"
              name="userroom"
              rules={[
                { required: true, message: "Please input your userroom!" },
              ]}
            >
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={SelectRoom}
              >
                {data.map((item) => {
                  return (
                    <Option key={item._id} value={item.room_name}>
                      {item.room_name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Người chấm điểm"
              name="marker"
              rules={[{ required: true, message: "Please input your marker!" }]}
            >
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
              >
                {dataUser.map((item) => {
                  return (
                    <Option key={item._id} value={item.Name}>
                      {item.Name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label="Người được chấm"
              name="candidates"
              rules={[
                { required: true, message: "Please input your candidates!" },
              ]}
            >
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
              >
                {dataUser.map((item) => {
                  return (
                    <Option key={item._id} value={item.Name}>
                      {item.Name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Tổng điểm"
              name="allscore"
              rules={[{ type: "number", min: 0, max: 100 }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item label="Ngày chấm" name="dayscore">
              <DatePicker />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        </Col>
        {/* <Col span={24}>
          <table className="table" style={{ width: "100%" }}>
            <tr>
              <th>TT</th>
              <th>Nội Dung</th>
              <th>Điểm tối đa</th>
              <th colSpan={3}>Điểm chấm</th>
            </tr>

            <tr>
              <th colSpan={2}>Tổng cộng</th>
              <th>100</th>

              <th>Cá nhân chấm</th>
              <th>Phòng chấm</th>
              <th>Lãnh đạo chấm</th>
            </tr>
            <tr>
              <td>1</td>
              <td>
                <tr>Chính trị tư tưởng</tr>
                <tr>a</tr>
                <tr>b</tr>
                <tr>c</tr>
                <tr>d</tr>
              </td>
              <td>
                <tr>12</tr>
                <tr>3</tr>
                <tr>3</tr>
                <tr>3</tr>
              </td>
              <td>
                <tr>1a+1b</tr>
                <tr>
                  <input type="text" id="1a" name="1a" />
                </tr>
                <tr>
                  {" "}
                  <input type="text" id="1b" name="1b" />
                </tr>
                <tr>
                  {" "}
                  <input type="text" id="1c" name="1c" />
                </tr>
                <tr>
                  {" "}
                  <input type="text" id="1d" name="1d" />
                </tr>
              </td>
              <td>
                <tr>điểm phòng chấm</tr>
                <tr>điểm phòng chấm</tr>
                <tr>điểm phòng chấm</tr>
                <tr>điểm phòng chấm</tr>
              </td>
              <td>
                <tr>điểm lãnh đạo chấm</tr>
                <tr>điểm lãnh đạo chấm</tr>
                <tr>điểm lãnh đạo chấm</tr>
                <tr>điểm lãnh đạo chấm</tr>
              </td>
            </tr>
          </table>
        </Col> */}
      </Row>
    </Layout1>
  );
}
