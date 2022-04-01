import { Table } from "antd";
import moment from "moment";
import "moment/locale/vi";
import React, { useEffect } from "react";
import { ScoreActions } from "../../redux/reducers/Score/score";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
interface Score {
  Name: String;
  candidates: [];
  _id: string;
}
const ViewScoreRoom = () => {
  const dispatch = useAppDispatch();
  const { dataScore } = useAppSelector((state) => state.score);
  console.log(dataScore, "dataScore");
  useEffect(() => {
    dispatch(ScoreActions.GET_LIST_VIEWSCORE_REQUREST());
  }, [dispatch]);

  const columns = [
    {
      title: "Phòng",
      dataIndex: "room",
      key: "room",
      render: (room: String) => room,
    },
    {
      title: "Người chấm",
      dataIndex: "marker",
      key: "marker",
      render: (marker: Score) => <li>{marker.Name}</li>,
    },
    {
      title: "Người được chấm",
      dataIndex: "candidates",
      render: (candidates: Score) => <li>{candidates.Name}</li>,
    },
    {
      title: "Ngày chấm",
      dataIndex: "dayscore",
      key: "dayscore",
      render: (dayscore: Date) =>
        moment(dayscore).format("dddd,") + moment(dayscore).format(" LL"),
    },
    {
      title: "Điểm cá nhân chấm",
      dataIndex: "allscore",
      key: "allscore",
      render: (allscore: Number) => allscore,
    },

    {
      title: "Điểm lãnh đạo chấm",
      dataIndex: "UserLeadScore",
      key: "UserLeadScore",
      render: (UserLeadScore: Number) => UserLeadScore,
    },

    {
      title: "Điểm trung bình",
      dataIndex: "PointAverage",
      key: "PointAverage",
      render: (PointAverage: Number) => PointAverage,
    },
  ];
  return (
    <div>
      <Table
        dataSource={dataScore}
        columns={columns}
        rowKey={(record) => record._id}
      />
    </div>
  );
};

export default ViewScoreRoom;
