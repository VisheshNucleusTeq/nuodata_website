import React from "react";
import { Modal, Button, Row } from "antd";
export default function CommonModal(props) {
  const closeIcon = <img src="/user_management/popup-close.svg" alt="closeBtn" />;

  return (
    <Modal
      centered
      title={props.title}
      visible={props.visible}
      onCancel={props.onCancel}
      closeIcon={closeIcon}
      width={props.modalWidth}
      className="CustomizedModal"
      footer={null}
    >
      {props.content}
    </Modal>
  );
}
