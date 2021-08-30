import React, { FC } from "react";
import { Table, Tag, Space } from "antd";

interface IDataUser {
  ID_NB: number;
  Name: string;
  Phone_Number: string;
  Role: string;
  Status: string;
  email: string;
  job_type: string;
  user_room: string;
  password: string;
}

interface IProps {
  data: IDataUser[];
  onOpenUpdateUser: (item: any) => void;
  onDeleteHandleUser: (item: any) => void;
}

const TableComponent: FC<IProps> = ({
  data,
  onOpenUpdateUser,
  onDeleteHandleUser,
}) => {
  const role = localStorage.getItem("role");
  if (role === "admin") {
    const columns = [
      {
        title: "ID Nội bộ",
        dataIndex: "ID_NB",
        key: "ID_NB",
      },
      {
        title: "Họ và tên",
        dataIndex: "Name",
        key: "Name",
        render: (title: string) => <a>{title}</a>,
      },
      {
        title: "Số điện thoại",
        dataIndex: "Phone_Number",
        key: "Phone_Number",
      },

      {
        title: "Cấp bậc",
        dataIndex: "Role",
        key: "Role",
      },
      {
        title: "Loại hình công việc",
        dataIndex: "job_type",
        key: "job_type",
      },
      {
        title: "Khoa/Phòng",
        dataIndex: "user_room",
        key: "user_room",
      },
      {
        title: "Trạng thái",
        dataIndex: "Status",
        key: "Status",
      },

      {
        title: "Hành động",
        key: "action",
        render: (text: string, record: IDataUser) => (
          <Space size="middle">
            <a
              onClick={(e) => {
                e.preventDefault();
                onOpenUpdateUser(record);
              }}
            >
              Sửa
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                onDeleteHandleUser(record);
              }}
            >
              Xoá
            </a>
          </Space>
        ),
      },
    ];
    return <Table columns={columns} rowKey="_id" dataSource={data} />;
  } else {
    const columns2 = [
      {
        title: "ID Nội bộ",
        dataIndex: "ID_NB",
        key: "ID_NB",
      },
      {
        title: "Họ và tên",
        dataIndex: "Name",
        key: "Name",
        render: (title: string) => <a>{title}</a>,
      },
      {
        title: "Số điện thoại",
        dataIndex: "Phone_Number",
        key: "Phone_Number",
      },

      {
        title: "Cấp bậc",
        dataIndex: "Role",
        key: "Role",
      },
      {
        title: "Loại hình công việc",
        dataIndex: "job_type",
        key: "job_type",
      },
      {
        title: "Khoa/Phòng",
        dataIndex: "user_room",
        key: "user_room",
      },
      {
        title: "Trạng thái",
        dataIndex: "Status",
        key: "Status",
      },
    ];
    return <Table columns={columns2} rowKey="_id" dataSource={data} />;
  }
};
TableComponent.defaultProps = {
  data: [],
};
export default TableComponent;
