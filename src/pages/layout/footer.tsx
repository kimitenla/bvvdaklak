import React from "react";
import { Row, Col } from "antd";
import "./footer.css";
import { PhoneOutlined, FastForwardOutlined } from "@ant-design/icons";
type Props = {};

const Footer = (props: Props) => {
  return (
    <Row>
      <Row className="left-footer">
        <Col span={6}>
          <img
            className="img-logo-footer"
            src="./logobv.png"
            alt="logob"
            width="150"
            height="150"
          ></img>
        </Col>
        <Col span={18}>
          <p className="footer-content">BỆNH VIỆN ĐA KHOA VÙNG TÂY NGUYÊN</p>
        </Col>
      </Row>
      <Row className="right-footer">
        <span className="right-text ">
          <p>184 Trần Quý Cáp, Phường Tự An, TP Buôn Ma Thuột, tỉnh Đắk Lắk.</p>
          <p>TRỰC LÃNH ĐẠO - CẤP CỨU BỆNH VIỆN</p>
          <p> Hotline: 0262 3919009 Điện thoại: 0262 3841649</p>
          <p className="text123"> Thiết kế bởi PHÒNG CNTT - BVVTN</p>
        </span>
      </Row>
    </Row>
  );
};

export default Footer;
