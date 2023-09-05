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
import injectionPipelineCss from "../../styles/injectionPipeline.module.css";

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
        centered
      >
        <AddSource injectionPipelineCss={injectionPipelineCss} />
      </Modal>

      <div style={{ marginTop: "2vw" }}>
        <Card className="demoCard">
          <Row>
            <Col span={12} className={injectionPipelineCss.sourceHeader}>
              <Input className="input" placeholder="Search.." />
            </Col>
            <Col
              span={12}
              style={{ justifyContent: "end", display: "flex" }}
              className={injectionPipelineCss.sourceHeader}
            >
              <Button
                style={{
                  background: "#e74860",
                  color: "#fff",
                  borderRadius: "15px",
                }}
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Add a Source
              </Button>
            </Col>
          </Row>
          <Row align={"center"}>
            {accountList.map((e) => {
              return (
                <Col span={4}>
                  <div
                    className={
                      e.isDisable
                        ? injectionPipelineCss.notClickDiv
                        : injectionPipelineCss.clickDiv
                    }
                  >
                    <div
                      onClick={() => {
                        setIsModalOpen(true);
                      }}
                    >
                      <Tooltip title={e.name} color="#0c3246">
                        <Image alt={e.name} src={e.image} preview={false} />
                      </Tooltip>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Card>
      </div>
    </>
  );
};

export default InjectionSource;
