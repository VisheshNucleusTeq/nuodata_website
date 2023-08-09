import React, { useState } from "react";
import {
  Col,
  Row,
  Space,
  Steps,
  Input,
  Button,
  Card,
  Tooltip,
  Image,
  Modal,
} from "antd";
import {
  CheckCircleOutlined,
  CheckCircleFilled,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import AddSource from "./model/addSource";
import injectionSourceCss from "../../styles/injectionSource.module.css";

const InjectionSource = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [accountList, setAccountList] = useState([
    {
      name: "Databricks-Lakehouse",
      image: "/account_and_settings/databricks.svg",
      url: "#",
      isDisable: false,
    },
    {
      name: "Google Cloud Platform",
      image: "/account_and_settings/googlecloud.svg",
      url: "#",
      isDisable: false,
    },
    {
      name: "AWS",
      image: "/account_and_settings/aws.svg",
      url: "#",
      isDisable: false,
    },
    {
      name: "Azure",
      image: "/account_and_settings/azure.svg",
      url: "#",
      isDisable: false,
    },
    {
      name: "Snowflake",
      image: "/account_and_settings/snowflake.svg",
      url: "#",
      isDisable: false,
    },
    {
      name: "IBM Watsonx.data",
      image: "/account_and_settings/ibm.svg",
      url: "#",
      isDisable: false,
    },
  ]);

  return (
    <>
      <Modal
        title={"Add a Source"}
        style={{ zIndex: 999999 }}
        width={"70vw"}
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        destroyOnClose={true}
        footer={null}
      >
        <AddSource injectionSourceCss={injectionSourceCss} />
      </Modal>
      <div className={injectionSourceCss.main}>
        <h1>New Pipeline- Editable Field</h1>
        <Row className={injectionSourceCss.dashedLines}>
          <Col span={24}>
            <Row align={"space-between"}>
              {[
                "Select Source",
                "Transform",
                "Select Target",
                "Configure",
                "Deploy",
              ].map((data, i) => {
                return (
                  <>
                    <Col
                      span={4}
                      style={{
                        border: "1px solid lightGray",
                        height: "6vh",
                        borderRadius: "10px",
                      }}
                    >
                      <Space
                        style={{
                          fontSize: "1.2vw",
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",
                          height: "100%",
                          fontWeight: "bold",
                        }}
                      >
                        <CheckCircleFilled
                          style={{
                            fontSize: "1.5vw",
                            color: i <= 1 ? "green" : "gray",
                          }}
                          twoToneColor="#fff"
                        />
                        {data}
                      </Space>
                    </Col>
                    {[0, 1, 2, 3].includes(i) ? (
                      <Col
                        span={1}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <div
                          style={{ border: "1px dashed gray", width: "100%" }}
                        ></div>
                      </Col>
                    ) : null}
                  </>
                );
              })}
            </Row>
          </Col>
        </Row>

        <Row style={{ marginTop: "4vh", height: "100%" }}>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <Card className="demoCard">
                  <Row align={"center"}>
                    {accountList.map((e) => {
                      return (
                        <Col span={6}>
                          <div
                            className={
                              e.isDisable
                                ? injectionSourceCss.notClickDiv
                                : injectionSourceCss.clickDiv
                            }
                          >
                            <div
                              onClick={() => {
                                setIsModalOpen(true);
                              }}
                            >
                              <Tooltip title={e.name} color="#0c3246">
                                <Image
                                  alt={e.name}
                                  src={e.image}
                                  preview={false}
                                />
                              </Tooltip>
                            </div>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default InjectionSource;
