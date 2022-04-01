import moment from "moment";
import { DatePicker, message, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import Table from "../../components/Home/Table";
import Modal from "../../components/Home/Modal";
import "moment/locale/vi";
import "./meetupOnce.css";
import { HomeActions } from "../../redux/reducers/Meetups/home";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
moment.locale("vi");

const MeetupOnce = () => {
  const [visible, setVisible] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [itemSeleted, setItemSeleted] = useState<any>({});
  const [isCreate, setIsCreate] = useState(true);
  const { data2 } = useAppSelector((state) => state.home);
  const dispatch = useAppDispatch();
  const [today, settoday] = useState(moment());
  useEffect(() => {
    dispatch(
      HomeActions.REQUREST_TODAYLIST(
        // cai dong o duoi goi la payload
        {
          data: moment(today),
        }
      )
    );
  }, [dispatch, today]);

  function onChange(date: any, dateString: any) {
    console.log(date, dateString);
    settoday(date);
    dispatch(
      HomeActions.REQUREST_TODAYLIST(
        // cai dong o duoi goi la payload
        {
          data: date,
        }
      )
    );
  }
  //BEGIN MEETUP
  const onOpenCreate = () => {
    setIsCreate(true);
    onOpenModal();
    setTitleModal("Thêm cuộc họp");
  };
  const onOpenModal = () => setVisible(true);
  const onCloseModal = () => {
    // check neu value == true (nghia la dang la modal create) thi ko lam gi het, nguoc lai thi clear data detail di
    if (!isCreate) setItemSeleted({});
    setVisible(false);
  };
  const onOpenUpdate = (item: any) => {
    setIsCreate(false);
    setItemSeleted(item);
    onOpenModal();
    setTitleModal("Cập nhật");
  };

  const handleSubmit = (value: any) => {
    // h xu ly them 1 chut cho dep

    dispatch(
      HomeActions.CREATE_TODO_REQUREST(
        // cai dong o duoi goi la payload
        {
          data: value,
          cb: (res: any) => {
            // cho nay chung ta kieu set cai tham so co gia tri boolean == true thi chay khuc trong if (ngoai ra ta co the truyen bat cu thu gi vao func cb)
            if (res) {
              onCloseModal();
              setTitleModal("Thêm");
              message.success("Thêm thành công");
            }
          },
        }
      )
    );
  };
  const handleUpdate = (values: any) => {
    dispatch(
      HomeActions.UPDATE_TODO_REQUREST({
        data: values,
        id: itemSeleted._id,
        cb: (res: any) => {
          if (res) {
            onCloseModal();
            setTitleModal("");
            message.success("Cập nhật thành công");
          }
        },
      })
    );
  };
  const DeleteHandle = (item: any) => {
    dispatch(
      HomeActions.DELETE_TODO_REQUREST({
        id: item._id,
        cb: (res: any) => {
          if (res) {
            message.success("Xoá thành công");
          }
        },
      })
    );
  };
  //END MEETUP
  const role = localStorage.getItem("role");
  if (role === "admin" || role === "manager") {
    return (
      <>
        <div>
          <DatePicker onChange={onChange} defaultValue={moment()} />
        </div>
        <div>
          <h1>LỊCH HỌP TRONG NGÀY</h1>
          <Button type="primary" size="large" onClick={onOpenCreate}>
            Tạo cuộc họp
            <PlusOutlined />
          </Button>
        </div>
        <Table
          data={data2}
          onOpenUpdate={onOpenUpdate}
          onDeleteHandle={DeleteHandle}
        />
        <Modal
          title={titleModal}
          visible={visible}
          onHide={onCloseModal}
          onSubmit={isCreate ? handleSubmit : handleUpdate}
          detailData={itemSeleted}
        />
      </>
    );
  } else {
    return (
      <>
        <div>
          <DatePicker onChange={onChange} />
        </div>
        <div>
          <h1>LỊCH HỌP TRONG NGÀY</h1>
        </div>
        <Table
          data={data2}
          onOpenUpdate={onOpenUpdate}
          onDeleteHandle={DeleteHandle}
        />
        <Modal
          title={titleModal}
          visible={visible}
          onHide={onCloseModal}
          onSubmit={isCreate ? handleSubmit : handleUpdate}
          detailData={itemSeleted}
        />
      </>
    );
  }
};

export default MeetupOnce;
