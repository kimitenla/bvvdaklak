import React, { useContext, useState, useEffect, useRef, FC } from "react";
import { Table, Typography,Row, Col , Input, Button, Popconfirm, Form} from 'antd';
import Layout1 from "../layout";
import './scoreroom.css';
const { Title } = Typography;

export default function ScoreRoom () {
      let today = new Date();
      let month= today.getMonth();
const dataSource = [
  {
    key: '1',
    id: '1',
    des: "Chấp hành chủ trương, đường lối, quy định của Đảng, chính sách, pháp luật của Nhà nước và các nguyên tắc tổ chức, kỷ luật của Đảng, nhất là nguyên tắc tập trung dân chủ, tự phê bình và phê bình.",
    score: '3',
  },
  {
    key: '2',
    id: '2',
    des: "Có quan điểm, bản lĩnh chính trị vững vàng; kiên định lập trường; không dao động trước mọi khó khăn, thách thức",
    score: '3',
  },
];


  return (
        <Layout1>
            <Row>
      <Col span={24}>
   
    
           <Title level={3} className="title">PHIẾU CHẤM ĐIỂM, XẾP LOẠI CHẤT LƯỢNG NGƯỜI LAO ĐỘNG THÁNG {month}</Title>
       
            <Table dataSource={dataSource}  ></Table>
            
          </Col>
        
    
     </Row>
    </Layout1>
  );
}
