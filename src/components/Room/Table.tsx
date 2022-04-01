/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from "react";
import { Table, Space } from "antd";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");
interface IData {
  id_room: Number;
  room_name: String;
  room_size: Number;
}

interface IProps {
  data: IData[];
  onOpenUpdateRoom: (item: any) => void;
  onDeleteHandleRoom: (item: any) => void;
}

const TableComponent: FC<IProps> = ({
  data,
  onOpenUpdateRoom,
  onDeleteHandleRoom,
}) => {
  const columns = [
    {
      title: "Mã phòng",
      dataIndex: "id_room",
      key: "id_room",
    },
    {
      title: "Tên phòng",
      dataIndex: "room_name",
      key: "room_name",
    },
    {
      title: "Diện tích",
      dataIndex: "room_size",
      key: "room_size",
    },
    {
      title: "Hành động",
      key: "action",
      render: (text: string, record: IData) => (
        <Space size="middle">
          <a
            onClick={(e) => {
              e.preventDefault();
              onOpenUpdateRoom(record);
            }}
          >
            Sửa
          </a>
          <a
            onClick={(e) => {
              e.preventDefault();
              onDeleteHandleRoom(record);
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
};
TableComponent.defaultProps = {
  data: [],
};
export default TableComponent;
