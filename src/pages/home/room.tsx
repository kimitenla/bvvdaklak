import React, { useState } from "react";
import Layout1 from "../layout/layout";
import { message, Button } from "antd";
import Table from "../../components/Room/Table";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { RoomActions } from "../../redux/reducers/Room/room";
import { PlusOutlined } from "@ant-design/icons";
import ModalRoom from "../../components/Room/ModalRoom";

const Room = () => {
  const { data } = useAppSelector((state) => state.room);

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(RoomActions.GET_LIST_ROOM_REQUREST());
  }, []);
  // BEGIN ROOM
  const [titleModalRoom, setTitleModalRoom] = useState("");
  const [visibleRoom, setVisibleRoom] = useState(false);

  const [itemSeletedRoom, setItemSeletedRoom] = useState<any>({});
  const [isCreateRoom, setIsCreateRoom] = useState(true);
  const onOpenModalRoom = () => {
    setVisibleRoom(true);
  };

  const onCloseModalRoom = () => {
    // check neu value == true (nghia la dang la modal create) thi ko lam gi het, nguoc lai thi clear data detail di
    if (!isCreateRoom) setItemSeletedRoom({});

    setVisibleRoom(false);
  };
  const onOpenCreateRoom = () => {
    setIsCreateRoom(true);
    onOpenModalRoom();
    setTitleModalRoom("Đăng ký thông tin nhân viên");
  };

  const handleSubmit = (value: any) => {
    // h xu ly them 1 chut cho dep

    dispatch(
      RoomActions.CREATE_ROOM_TODO_REQUREST(
        // cai dong o duoi goi la payload
        {
          data: value,
          cb: (res: any, e: any) => {
            // cho nay chung ta kieu set cai tham so co gia tri boolean == true thi chay khuc trong if (ngoai ra ta co the truyen bat cu thu gi vao func cb)
            if (res.isSuccess == true) {
              onCloseModalRoom();
              setTitleModalRoom("");
              message.success("Tạo tài khoản thành công");
            }
            if (res.error) {
              onCloseModalRoom();
              setTitleModalRoom("");
              message.error(res.error.error);
            }
          },
        }
      )
    );
  };
  const handleUpdate = (values: any) => {
    dispatch(
      RoomActions.UPDATE_ROOM_TODO_REQUREST({
        data: values,
        id: itemSeletedRoom._id,
        cb: (res: any) => {
          if (res) {
            onCloseModalRoom();
            setTitleModalRoom("");
            message.success("Update success");
          }
        },
      })
    );
  };
  const onOpenUpdateRoom = (item: any) => {
    setIsCreateRoom(false);
    setItemSeletedRoom(item);
    onOpenModalRoom();
    setTitleModalRoom("Cập nhật");
  };
  const DeleteHandleRoom = (item: any) => {
    console.log(item._id, " item._id");
    dispatch(
      RoomActions.DELETE_ROOM_TODO_REQUREST({
        id: item._id,
        cb: (res: any) => {
          if (res) {
            message.success("Delete success");
          }
        },
      })
    );
  };
  //END ROOM
  return (
    <Layout1>
      <Button type="primary" size="large" onClick={onOpenCreateRoom}>
        Thêm phòng <PlusOutlined />
      </Button>
      <Table
        data={data}
        onOpenUpdateRoom={onOpenUpdateRoom}
        onDeleteHandleRoom={DeleteHandleRoom}
      />
      <ModalRoom
        title={titleModalRoom}
        visible={visibleRoom}
        onHide={onCloseModalRoom}
        onSubmit={isCreateRoom ? handleSubmit : handleUpdate}
        detailData={itemSeletedRoom}
      />
    </Layout1>
  );
};

export default Room;
