import React, { useState } from "react";
import { Row, Col, Space, Card, Tooltip } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";

import InjectionSource from "./injectionSource";
import InjectionPipeline from "./injectionPipeline";
import SourceTargetPipeline from "./sourceTargetPipeline";
import Configure from "./configure";
import TestPipeline from "./testPipeline";
const CreatePipline = ({ injectionPipelineCss }) => {
 
  const [selectedTab, setSelectedTab] = useState(0);

  //   useEffect(() => {
  //     alert(selectedTab);
  //   }, [selectedTab]);

  return (
    <>
      <div className={injectionPipelineCss.main}>
        <h1>New Pipeline- Editable Field</h1>
        <Row className={injectionPipelineCss.dashedLines}>
          <Col span={24}>
            <Row align={"space-between"}>
              {[
                "Select Source",
                "Transform",
                "Select Target",
                "Configure",
                "Test",
                "Deploy",
              ].map((data, i) => {
                return (
                  <>
                    <Col
                      span={3}
                      style={{
                        border: "1px solid lightGray",
                        height: "6vh",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedTab(i);
                      }}
                    >
                      <Space
                        style={{
                          fontSize: "1vw",
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
                            color: i <= selectedTab ? "green" : "gray",
                          }}
                          twoToneColor="#fff"
                        />
                        {data}
                      </Space>
                    </Col>
                    {[0, 1, 2, 3, 4].includes(i) ? (
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

        {selectedTab === 0 && (
          <>
            <InjectionSource injectionPipelineCss={injectionPipelineCss} />
          </>
        )}
        {selectedTab === 1 && (
          <>
            <InjectionPipeline injectionPipelineCss={injectionPipelineCss} />
          </>
        )}
        {selectedTab === 2 && (
          <>
            <SourceTargetPipeline injectionPipelineCss={injectionPipelineCss} />
          </>
        )}
        {selectedTab === 3 && (
          <>
            <Configure injectionPipelineCss={injectionPipelineCss} />
          </>
        )}

        {selectedTab === 4 && (
          <>
            <TestPipeline injectionPipelineCss={injectionPipelineCss} />
          </>
        )}

        {/*  */}
      </div>
    </>
  );
};

export default CreatePipline;
