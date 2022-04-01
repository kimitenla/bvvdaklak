/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { message, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../utils/hook";

import Table from "../../components/User/TableUser";

import ModalUser from "../../components/User/ModalUser";
import { UserActions } from "../../redux/reducers/User/user";

const User = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(UserActions.GET_LIST_REQUREST());
  }, [dispatch]);
  const { dataUser } = useAppSelector((state) => state.user);
  // BEGIN USER
  const [titleModalUser, setTitleModalUser] = useState("");
  const [visibleUser, setVisibleUser] = useState(false);

  const [itemSeletedUser, setItemSeletedUser] = useState<any>({});
  const [isCreateUser, setIsCreateUser] = useState(true);
  const onOpenModalUser = () => {
    setVisibleUser(true);
  };

  const onCloseModalUser = () => {
    // check neu value == true (nghia la dang la modal create) thi ko lam gi het, nguoc lai thi clear data detail di
    if (!isCreateUser) setItemSeletedUser({});

    setVisibleUser(false);
  };
  const onOpenCreateUser = () => {
    setIsCreateUser(true);
    onOpenModalUser();
    setTitleModalUser("Đăng ký thông tin nhân viên");
  };

  const handleSubmit = (value: any) => {
    // h xu ly them 1 chut cho dep

    dispatch(
      UserActions.CREATE_TODO_REQUREST(
        // cai dong o duoi goi la payload
        {
          data: value,
          cb: (res: any, e: any) => {
            // cho nay chung ta kieu set cai tham so co gia tri boolean == true thi chay khuc trong if (ngoai ra ta co the truyen bat cu thu gi vao func cb)
            if (res.isSuccess == true) {
              onCloseModalUser();
              setTitleModalUser("");
              message.success("Tạo tài khoản thành công");
            }
            if (res.error) {
              onCloseModalUser();
              setTitleModalUser("");
              message.error(res.error.error);
            }
          },
        }
      )
    );
  };
  const handleUpdate = (values: any) => {
    dispatch(
      UserActions.UPDATE_TODO_REQUREST({
        data: values,
        id: itemSeletedUser._id,
        cb: (res: any) => {
          if (res) {
            onCloseModalUser();
            setTitleModalUser("");
            message.success("Update success");
          }
        },
      })
    );
  };
  const onOpenUpdateUser = (item: any) => {
    setIsCreateUser(false);
    setItemSeletedUser(item);
    onOpenModalUser();
    setTitleModalUser("Cập nhật");
  };
  const DeleteHandleUser = (item: any) => {
    console.log(item._id, " item._id");
    dispatch(
      UserActions.DELETE_TODO_REQUREST({
        id: item._id,
        cb: (res: any) => {
          if (res) {
            message.success("Delete success");
          }
        },
      })
    );
  };
  //END USER
  const role = localStorage.getItem("role");
  if (role === "admin" || role === "manager") {
    return (
      <>
        <Button type="primary" size="large" onClick={onOpenCreateUser}>
          Thêm nhân viên <PlusOutlined />
        </Button>

        <Table
          data={dataUser}
          onOpenUpdateUser={onOpenUpdateUser}
          onDeleteHandleUser={DeleteHandleUser}
        />
        <ModalUser
          title={titleModalUser}
          visible={visibleUser}
          onHide={onCloseModalUser}
          onSubmit={isCreateUser ? handleSubmit : handleUpdate}
          detailData={itemSeletedUser}
        />
      </>
    );
  } else {
    return <h1>Page not found.</h1>;
  }
};

export default User;
