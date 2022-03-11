import React from "react";
import { Row, Col } from "antd";
import { Menu } from "antd";

import "./header.css";
import { Link, useHistory } from "react-router-dom";
type Props = {};

const Header = (props: Props) => {
  let name = localStorage.getItem("name");
  let role = localStorage.getItem("role");

  let history = useHistory();

  var today = new Date();

  var t = today.getHours();
  var a = "";
  if (t > 4 && t < 11) {
    a = "buổi sáng";
  } else if (t >= 11 && t < 13) {
    a = "buổi trưa";
  } else if (t >= 13 && t < 18) {
    a = "buổi chiều";
  } else {
    a = "buổi tối";
  }
  return (
    <Row className="row">
      <Col span={4} className="left">
        <img
          className="img-logo-footer"
          src="./logobv.png"
          alt="logob"
          width="150"
          height="150"
        ></img>{" "}
      </Col>
      <Col span={10}>
        <p className="bvvtn">BỆNH VIỆN ĐA KHOA VÙNG TÂY NGUYÊN</p>
        <p className="text">Bệnh viện là nhà - Người bệnh như người thân</p>
      </Col>

      <Col span={8} className="right-header">
        <div>
          <h3 className="hello">
            Chào {a} {name}[{role}]
          </h3>
        </div>
      </Col>

      <Col span="24">
        <Menu mode="horizontal" defaultSelectedKeys={["1"]} className="menu">
          <Menu.Item key="1">
            <Link to="/">Trang chủ</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/user">Thông Tin Tài Khoản</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/calendar">Lịch Tháng</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/meetupOnce">Lịch ngày</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/room">Phòng</Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to="/ScoreRoom"> Chấm điểm/Xếp loại</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <span
              onClick={() => {
                localStorage.clear();
                history.push("/login");
              }}
            >
              Đăng xuất
            </span>
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  );
};
export default Header;
