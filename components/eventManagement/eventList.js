import { Button, Col, Image, Row, Switch, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import React, { useState } from "react";

const EventList = ({ eventManagementCss, setTabType }) => {
  const [modelOpen, setModelOpen] = useState(false);

  return (
    <>
      <Modal
        title="Delete Confirmation"
        open={modelOpen}
        onOk={() => {
          setModelOpen(false);
        }}
        onCancel={() => {
          setModelOpen(false);
        }}
        okText={"Delete"}
        okButtonProps={{
          style: { backgroundColor: "red", border: "1px solid red" },
        }}
      >
        Are you sure you want to delete this event
      </Modal>

      <div style={{ marginTop: "4vh" }} className={eventManagementCss.listDiv}>
        {Array(12)
          .fill(undefined)
          .map(() => {
            return (
              <div className={eventManagementCss.listData}>
                <Row>
                  <Col span={6}>
                    <div className={eventManagementCss.imageDiv}>
                      <Image
                        src="https://picsum.photos/300/200"
                        height={"19.8vh"}
                        width={"100%"}
                        preview={false}
                      />
                      <p
                        onClick={() => {
                          setTabType("Add Event");
                        }}
                      >
                        <EditOutlined />
                      </p>
                    </div>
                  </Col>
                  <Col span={18}>
                    <Row>
                      <Col span={22}>
                        <Row style={{ margin: "1vh" }}>
                          <Col span={24}>
                            <h2>
                              <span className={eventManagementCss.eventTitle}>
                                Data + AI
                              </span>{" "}
                              &nbsp; &nbsp;
                              <span>
                                <Switch
                                  checkedChildren="Active"
                                  unCheckedChildren="Inactive"
                                  defaultChecked
                                  style={{ backgroundColor: "green" }}
                                />
                              </span>
                            </h2>
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book. It has survived not only five centuries, but
                              also the{" "}
                            </p>
                          </Col>
                          <Col span={24}></Col>
                        </Row>
                      </Col>
                      <Col span={2}>
                        <Button
                          onClick={() => {
                            setModelOpen(true);
                          }}
                          type="primary"
                          danger
                          className={eventManagementCss.deleteBtn}
                        >
                          <DeleteOutlined />
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default EventList;
