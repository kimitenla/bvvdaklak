import React, { FC } from "react";
import { Table, Space } from "antd";
import moment from "moment";
import "moment/locale/vi";
import user from "../../redux/sagas/User/user";
moment.locale("vi");
interface IDataTemp {
  Address: string;
  MonitoringRoom: string;
  UserInvitation: string;
  Userlead: [];
  User: [];
  Date: Date;
  description: string;
  id: string;
  _id: string;
  Time: Date;
  title: string;
}

interface IProps {
  data: IDataTemp[];
  onOpenUpdate: (item: any) => void;
  onDeleteHandle: (item: any) => void;
}

const TableComponent: FC<IProps> = ({ data, onOpenUpdate, onDeleteHandle }) => {
  const role = localStorage.getItem("role");
  if (role === "admin") {
    const columns = [
      {
        title: "Ngày họp",
        dataIndex: "Date",
        key: "Date",
        render: (Date: Date) =>
          moment(Date).format("dddd,") + moment(Date).format(" LL"),
      },
      {
        title: "Thời gian",
        dataIndex: "Time",
        key: "Time",
        render: (Time: Date) => moment(Time).format("LT"),
      },
      {
        title: "Tiêu đề cuộc họp",
        dataIndex: "title",
        key: "title",
        render: (title: string) => <a>{title}</a>,
      },
      {
        title: "Nội Dung",
        dataIndex: "description",
        key: "description",
      },

      {
        title: "Địa chỉ",
        dataIndex: "Address",
        key: "Address",
      },
      {
        title: "Lãnh đạo cuộc họp",
        dataIndex: "Userlead",
        key: "Userlead",
        render: (record: any) => {
          return (
            <ul>
              {record.map((ele: any) => (
                <li key={ele._id}>{ele.Name}</li>
              ))}
            </ul>
          );
        },
      },
      {
        title: "Người tham gia",
        dataIndex: "User",
        key: "User",
        render: (record: any) => {
          return (
            <ul>
              {record.map((ele: any) => (
                <li key={ele._id}>{ele.Name}</li>
              ))}
            </ul>
          );
        },
      },
      {
        title: "Phòng giám sát",
        dataIndex: "MonitoringRoom",
        key: "MonitoringRoom",
      },
      {
        title: "Khách mời",
        dataIndex: "UserInvitation",
        key: "UserInvitation",
      },
      {
        title: "Hành Động",
        key: "action",
        render: (text: string, record: IDataTemp) => (
          <Space size="middle">
            <a
              onClick={(e) => {
                e.preventDefault();
                onOpenUpdate(record);
              }}
            >
              Sửa
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                onDeleteHandle(record);
              }}
            >
              Xoá
            </a>
          </Space>
        ),
      },
    ];

    return (
      <Table columns={columns} rowKey="_id" dataSource={data} bordered={true} />
    );
  } else {
    const columns = [
      {
        title: "Tiêu đề cuộc họp",
        dataIndex: "title",
        key: "title",
        render: (title: string) => <a>{title}</a>,
      },
      {
        title: "Nội Dung",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Ngày họp",
        dataIndex: "Date",
        key: "Date",
        render: (Date: Date) => (
          <h3>{moment(Date).format("dddd,") + moment(Date).format(" LL")} </h3>
        ),
      },
      {
        title: "Thời gian",
        dataIndex: "Time",
        key: "Time",
        render: (Time: Date) => moment(Time).format("LT"),
      },
      {
        title: "Địa chỉ",
        dataIndex: "Address",
        key: "Address",
      },
      {
        title: "Lãnh đạo cuộc họp",
        dataIndex: "Userlead",
        key: "Userlead",
        render: (record: any) => {
          return (
            <ul>
              {record.map((ele: any) => (
                <li key={ele._id}>{ele.Name}</li>
              ))}
            </ul>
          );
        },
      },
      {
        title: "Người tham gia",
        dataIndex: "User",
        key: "User",
        render: (record: any) => {
          return (
            <ul>
              {record.map((ele: any) => (
                <li key={ele._id}>{ele.Name}</li>
              ))}
            </ul>
          );
        },
      },
      {
        title: "Phòng giám sát",
        dataIndex: "MonitoringRoom",
        key: "MonitoringRoom",
      },
      {
        title: "Khách mời",
        dataIndex: "UserInvitation",
        key: "UserInvitation",
      },
    ];

    return (
      <Table columns={columns} rowKey="_id" dataSource={data} bordered={true} />
    );
  }
};
TableComponent.defaultProps = {
  data: [],
};
export default TableComponent;
