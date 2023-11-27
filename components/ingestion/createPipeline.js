import React, { useEffect } from "react";
import { Row, Col, Space, Card, Tooltip, Button, Divider } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import Define from "./pipelinePages/define";
import Build from "./pipelinePages/build";

import { GETWORKSPACE } from "../../network/apiConstants";
import { fetch_retry_get } from "../../network/api-manager";
import { setWorkspaceAction } from "../../Redux/action";
const CreatePipeline = ({ ingestionCss }) => {
  const dispatch = useDispatch();

  const workspace = useSelector((state) => state?.workspace?.workspace);
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [workspaceData, setWorkspaceData] = React.useState([]);

  const getWorkSpaceData = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (authData && authData?.orgId) {
      const data = await fetch_retry_get(`${GETWORKSPACE}${authData?.orgId}`);
      if (data.success) {
        setWorkspaceData(data.data);
      } else {
        setWorkspaceData([]);
        message.error([data?.error]);
      }
    }
  };

  const setOldData = async () => {
    if (typeof window !== "undefined") {
      if (!workspace && !("workspace" in localStorage)) {
        // setIsModalOpen(true);
      } else {
        const workspaceValue = localStorage.getItem("workspace")
        dispatch(setWorkspaceAction(workspaceValue));
      }
    }
  } 

  useEffect(() => {
    getWorkSpaceData();
    setOldData()
  }, [workspace, typeof window !== "undefined"]);
  

  return (
    <>
      {workspace && (
        <Row style={{borderRadius : "5px"}}>
          <Col className={ingestionCss.WorkspaceName} span={24}>
            <Row>
              <Col
                span={24}
                style={{ display: "flex", alignItems: "center", height: "8vh" }}
              >
                {
                  workspaceData.filter((e) => e.workspace_id === workspace)[0]
                    ?.workspace_name
                }
              </Col>
            </Row>
          </Col>
        </Row>
      )}

      <div className={ingestionCss.main} style={{borderRadius : "5px"}}>
        <Row>
          <Col span={24} className={ingestionCss.pipelineTitle}>
            <span>New Pipeline- Editable Field</span>
          </Col>
          <Divider style={{ margin: "2vh 0vh 2vh 0vh" }}></Divider>
          <Col span={24} className={ingestionCss.pipelineSteps}>
            <Row className={ingestionCss.dashedLines}>
              <Col span={18}>
                <Row align={"space-between"}>
                  {["Define", "Build", "Test", "Configure", "Deploy"].map(
                    (data, i) => {
                      return (
                        <>
                          <Col
                            span={4}
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
                          {[0, 1, 2, 3].includes(i) ? (
                            <Col
                              span={1}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <div
                                style={{
                                  border: `1px dashed ${
                                    i <= selectedTab - 1 ? "green" : "gray"
                                  }`,
                                  width: "100%",
                                }}
                              ></div>
                            </Col>
                          ) : null}
                        </>
                      );
                    }
                  )}
                </Row>
              </Col>
              <Col span={6} className={ingestionCss.pipelineBtns}>
                <Space>
                  <Button className={ingestionCss.draftBtn}>Draft</Button>
                  <Button className={ingestionCss.saveBtn}>Save</Button>
                </Space>
              </Col>
            </Row>
          </Col>
          <Col span={24} className={ingestionCss.pipelineStepData}>
            {selectedTab === 0 && (
              <>
                <Divider style={{ margin: "2vh 0vh 2vh 0vh" }}></Divider>
                {workspaceData.length && workspace ? (
                  <Define
                    ingestionCss={ingestionCss}
                    workspaceData={workspaceData}
                    workspace={workspace}
                    setSelectedTab={setSelectedTab}
                  />
                ) : null}
              </>
            )}
            {selectedTab === 1 && (
              <>
                <Build ingestionCss={ingestionCss} setSelectedTab={setSelectedTab} />
              </>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CreatePipeline;
