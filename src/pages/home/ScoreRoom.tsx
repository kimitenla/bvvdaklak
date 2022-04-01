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
  message,
} from "antd";
import "./scoreroom.css";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { UserActions } from "../../redux/reducers/User/user";
import { RoomActions } from "../../redux/reducers/Room/room";
import { ScoreActions } from "../../redux/reducers/Score/score";

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
  };
  const onFinish = (values: any) => {
    console.log("values:", values);
    dispatch(
      ScoreActions.CREATE_SCORE_REQUREST({
        data: values,
        cb: (res: any) => {
          if (res.isSuccess) {
            message.success("Thêm thành công");
          } else if (res.error) {
            message.error(res.error.error);
          }
        },
      })
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error(errorInfo);
  };
  // END
  const role = localStorage.getItem("role");
  let dld =
    role === "admin" ? (
      <Form.Item
        label="Điểm lãnh đạo chấm"
        name="UserLeadScore"
        rules={[{ type: "number", min: 0, max: 100 }]}
      >
        <InputNumber />
      </Form.Item>
    ) : null;
  return (
    <>
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
              name="room"
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
                    <Option key={item._id} value={item._id}>
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
                    <Option key={item._id} value={item._id}>
                      {item.Name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label="Điểm chấm"
              name="allscore"
              rules={[{ type: "number", min: 0, max: 100 }]}
            >
              <InputNumber />
            </Form.Item>
            {dld}
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
      </Row>
    </>
  );
}
