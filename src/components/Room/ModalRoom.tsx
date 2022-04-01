/* eslint-disable eqeqeq */
import React, { FC } from "react";
import { Modal, Button, Form } from "antd";
import { message } from "antd";

import FormCreate from "./FormCreateRoom";
import FormUpdate from "./FormUpdateRoom";

interface IProps {
  visible: boolean;
  onHide: () => void;
  onSubmit: (values: any) => void;
  title: string;
  detailData: any;
}
const ModalComponent: FC<IProps> = ({
  visible,
  onHide,
  title,
  onSubmit,
  detailData,
}) => {
  const onFinish = (values: any) => {
    if (values.room_size == undefined) {
      message.error("Chỉ được nhập số");
    } else {
      onSubmit(values);
    }
  };

  const handleRenderContent = () => {
    if (detailData && Object.entries(detailData).length > 0)
      return <FormUpdate data={detailData} />;
    return <FormCreate />;
  };
  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onHide}
      footer={null}
      destroyOnClose={true}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
      >
        {handleRenderContent()}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalComponent;
