import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Input,
  Button,
  Card,
  Tooltip,
  Image,
  Modal,
  message,
} from "antd";

import AddSource from "./model/addSource";
import injectionPipelineCss from "../../styles/injectionPipeline.module.css";

import { INGESTIONTEMPLATES } from "../../network/apiConstants";
import { fetch_retry_get } from "../../network/api-manager";

const InjectionSource = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [connection, setConnection] = useState({})

  const [accountList, setAccountList] = useState([]);

  const getRecord = async () => {
    const result = await fetch_retry_get(INGESTIONTEMPLATES);
    if(result.success){
      setAccountList(result.data)
    }else{
      message.error(result.error)
    }
  };

  useEffect(() => {
    getRecord();
  }, []);

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
        <AddSource injectionPipelineCss={injectionPipelineCss} connection={connection} />
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
                      e?.isDisable
                        ? injectionPipelineCss.notClickDiv
                        : injectionPipelineCss.clickDiv
                    }
                  >
                    <div
                      onClick={() => {
                        setConnection(e)
                        setIsModalOpen(true);
                      }}
                    >
                      <Tooltip title={e.title} color="#0c3246">
                        <Image alt={e.title} src={e.logo_url} preview={false} />
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
