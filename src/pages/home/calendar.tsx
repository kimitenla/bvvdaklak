import React, { useState } from "react";
import { Calendar, Badge, Modal, Form, Button, message } from "antd";
import "./calendar.css";
import Layout1 from "../layout/layout";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { HomeActions } from "../../redux/reducers/home";
import moment from "moment";
import FormUpdate from "../../components/Home/FormUpdate";
import "moment/locale/vi";
moment.locale("vi");

const CalendarPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemSeleted, setItemSeleted] = useState<any>({});
  const showModal = (item: any) => {
    setIsModalVisible(true);
    setItemSeleted(item);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const dispatch = useAppDispatch();
  let isUpdate = false;
  let isDelete = false;
  const { data_all } = useAppSelector((state) => state.home);
  React.useEffect(() => {
    dispatch(HomeActions.GET_ALL_LIST_REQUREST());
  }, []);
  function dateCellRender(value: any) {
    const listData = data_all.filter(
      (c) =>
        parseInt(moment(c.Date).format("DD")) === value.date() &&
        parseInt(moment(c.Date).format("MM")) === value.month() + 1 &&
        parseInt(moment(c.Date).format("YYYY")) === value.year()
    );

    return (
      <div>
        <ul className="events">
          {listData.map((item) => (
            <li key={item._id}>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  showModal(item);
                }}
              >
                <Badge
                  status="success"
                  text={
                    item.title + "  (" + moment(item.Time).format("LT") + ")"
                  }
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  const DeleteHandle = (values: any) => {
    dispatch(
      HomeActions.DELETE_TODO_REQUREST({
        id: itemSeleted._id,
        cb: (res: any) => {
          if (res) {
            handleCancel();
            message.success("Xoá thành công");
          }
        },
      })
    );
  };
  const handleUpdate = (values: any) => {
    dispatch(
      HomeActions.UPDATE_TODO_REQUREST({
        data: values,
        id: itemSeleted._id,
        cb: (res: any) => {
          if (res) {
            handleCancel();
            message.success("Cập Nhật thành công");
          }
        },
      })
    );
  };
  const onFinish = (values: any) => {
    if (isUpdate) {
      handleUpdate(values);
    } else if (isDelete) {
      DeleteHandle(values);
    }
  };
  const onUpdate = () => {
    isUpdate = true;
    isDelete = false;
  };
  const onDelete = () => {
    isUpdate = false;
    isDelete = true;
  };
  const role = localStorage.getItem("role");
  console.log("itemSeleted");

  if (role === "admin") {
    return (
      <Layout1>
        <Calendar dateCellRender={dateCellRender} />
        <Modal
          destroyOnClose={true}
          title={itemSeleted.title}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: false }}
            onFinish={onFinish}
          >
            <FormUpdate data={itemSeleted} />
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={onUpdate}
                style={{ margin: 10 }}
              >
                Cập Nhật
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                onClick={onDelete}
                style={{
                  margin: 10,
                  backgroundColor: "red",
                  borderColor: "transparent",
                }}
              >
                Xoá
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Layout1>
    );
  } else {
    return (
      <Layout1>
        <Calendar dateCellRender={dateCellRender} />
        <Modal
          title={"THÔNG TIN CUỘC HỌP"}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <div className="text1">
            <span>
              <div className="title">
                <h4 className="title-h4">{itemSeleted.title}</h4>
              </div>
              <div className="div-space">
                Nội Dung: {itemSeleted.description}
              </div>
              <div className="div-space">Phòng họp: {itemSeleted.Address}</div>
              <div className="div-space">
                Người tham gia:
                {itemSeleted.User?.map((ele: any) => {
                  <li key={ele._id}>{ele.Name}</li>;
                })}
              </div>
              <div className="div-space">
                Lãnh đạo cuộc họp:
                {itemSeleted.Userlead?.map((ele: any) => {
                  <li key={ele._id}>{ele.Name}</li>;
                })}
              </div>
              <div className="div-space">
                Thời Gian: {moment(itemSeleted.Time).format("LT")}, ngày {""}
                {moment(itemSeleted.Date).format("LL")}
              </div>

              <div className="div-space">
                Phòng Giám Sát: {itemSeleted.MonitoringRoom}
              </div>
              <div className="div-space">
                Khách Mời:{itemSeleted.UserInvitation}
              </div>
            </span>
          </div>
        </Modal>
      </Layout1>
    );
  }
};

export default CalendarPage;
