import moment from "moment";
import { DatePicker, message, Table } from "antd";
import { useState, useEffect } from "react";
import "moment/locale/vi";
import { ScoreActions } from "../../redux/reducers/Score/score";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
moment.locale("vi");

const ScoreFind = () => {
  const { dataScore } = useAppSelector((state) => state.score);

  const dispatch = useAppDispatch();
  const [today, settoday] = useState(moment());
  useEffect(() => {
    dispatch(
      ScoreActions.REQUREST_SCORETODAYLIST(
        // cai dong o duoi goi la payload
        {
          data: moment(),
        }
      )
    );
  }, [dispatch]);
  const role = localStorage.getItem("role");
  function onChange(date: any, dateString: any) {
    console.log(date, "date");
    settoday(date);
    dispatch(
      ScoreActions.REQUREST_SCORETODAYLIST(
        // cai dong o duoi goi la payload
        {
          data: date,
        }
      )
    );
  }

  const columns = [
    {
      title: "Tên nhân viên",
      dataIndex: "Name",
      key: "Name",
      render: (Name: any) => <li>{Name.Name}</li>,
    },
    {
      title: "Điểm tự chấm",
      dataIndex: "MyPoint",
      key: "MyPoint",
      render: (MyPoint: Number) => MyPoint,
    },
    {
      title: "Điểm Trung Bình Phòng",
      dataIndex: "AveragePoint",
      key: "AveragePoint",
      render: (AveragePoint: Number) => AveragePoint,
    },
    {
      title: "Điểm lãnh đạo",
      dataIndex: "LeadPoint",
      key: "LeadPoint",
      render: (LeadPoint: Number) => LeadPoint,
    },
    {
      title: "Time",
      dataIndex: "Time",
      key: "Time",
      render: (Time: Date) => moment(Time).startOf("day").fromNow(),
    },
  ];
  return (
    <>
      <div>
        <DatePicker onChange={onChange} picker="month" defaultValue={today} />
      </div>
      <Table
        dataSource={dataScore}
        columns={columns}
        rowKey={(record) => record._id}
      />
    </>
  );
};

export default ScoreFind;
