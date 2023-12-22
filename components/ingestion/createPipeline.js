import { CheckCircleFilled } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Modal,
  Row,
  Space,
  message
} from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Define from "./pipelinePages/define";
import Build from "./pipelinePages/build";

import { loderShowHideAction, setWorkspaceAction } from "../../Redux/action";
import { fetch_retry_get, fetch_retry_post } from "../../network/api-manager";
import {
  CONVERTPIPELINE,
  CREATEPIPELINE,
  GETWORKSPACE,
  RUNPIPELINE,
} from "../../network/apiConstants";
import JobList from "./configView/jobList";

const CreatePipeline = ({ ingestionCss }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = useRouter();
  const pipelineData = useSelector((state) => state?.pipeline?.pipeline);
  const workspace = useSelector((state) => state?.workspace?.workspace);

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [workspaceData, setWorkspaceData] = React.useState([]);
  const [pipelineDetails, setPipelineDetails] = React.useState({});
  const [showJobList, setShowJobList] = React.useState(false);

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
        const workspaceValue = localStorage.getItem("workspace");
        dispatch(setWorkspaceAction(workspaceValue));
      }
    }
  };

  const setOldPipeline = async (id) => {
    const pipelineDetails = await fetch_retry_get(`${CREATEPIPELINE}${id}`);
    setPipelineDetails(pipelineDetails?.data);
  };

  const convertPipeline = async (id) => {
    dispatch(loderShowHideAction(true));
    const result = await fetch_retry_post(`${CONVERTPIPELINE}${id}`);
    if (result?.success) {
      dispatch(loderShowHideAction(false));
      message.success(result?.data?.message);
    } else {
      message.error("Something went wrong");
    }
  };

  const runPipeline = async (id) => {
    dispatch(loderShowHideAction(true));
    const result = await fetch_retry_post(`${RUNPIPELINE}${id}`);
    if (result?.success) {
      message.success(result?.data?.message);
    } else {
      message.error("Something went wrong");
    }
    dispatch(loderShowHideAction(false));
  };

  const convertAndRunPipeline = async (id) => {
    await convertPipeline(id);
  };

  useEffect(() => {
    getWorkSpaceData();
    setOldData();
  }, [workspace, typeof window !== "undefined"]);

  useEffect(() => {
    query?.pipeline || pipelineData
      ? setOldPipeline(query?.pipeline ? query?.pipeline : pipelineData)
      : null;
  }, [workspace, query?.pipeline, pipelineData]);

  return (
    <>
      <Modal
        width={"80%"}
        title={"Job List"}
        centered
        open={showJobList}
        onOk={() => {
          setShowJobList(false);
        }}
        onCancel={() => {
          setShowJobList(false);
        }}
        maskClosable={false}
        okText={"Ok"}
        destroyOnClose
      >
        <JobList />
      </Modal>
      {/* {workspace && (
        <Row style={{ borderRadius: "5px" }}>
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
      )} */}

      <div className={ingestionCss.main} style={{ borderRadius: "5px" }}>
        <Row>
          <Col span={12} className={ingestionCss.pipelineTitle}>
            {workspaceData && (
              <span>
                Workspace:&nbsp;
                <a
                  onClick={() => {
                    router.push("/ingestion");
                  }}
                >
                  {
                    workspaceData.filter((e) => e.workspace_id === workspace)[0]
                      ?.workspace_name
                  }
                  ,
                </a>
              </span>
            )}
            {pipelineDetails.pipeline_name && (
              <span>
                Pipeline:&nbsp;<a>{pipelineDetails.pipeline_name}</a>
              </span>
            )}
          </Col>

          <Divider style={{ margin: "0vh 0vh 1vh 0vh" }}></Divider>
          <Col span={24} className={ingestionCss.pipelineSteps}>
            <Row className={ingestionCss.dashedLines}>
              <Col span={16}>
                <Row align={"space-between"}>
                  {["Define", "Build", "Test", "Configure", "Deploy"].map(
                    (data, i) => {
                      return (
                        <>
                          <Col
                            span={4}
                            style={{
                              border: "1px solid lightGray",
                              height: "4vh",
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
                                  fontSize: "1vw",
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
              <Col span={8} className={ingestionCss.pipelineBtns}>
                <Space>
                  <Button
                    className={ingestionCss.saveBtn}
                    onClick={async () => {
                      const id = query?.pipeline
                        ? query?.pipeline
                        : pipelineData;
                      convertPipeline(id);
                      // await convertAndRunPipeline(id);
                    }}
                  >
                    Save pipeline
                  </Button>
                  <Button
                    className={ingestionCss.saveBtn}
                    onClick={async () => {
                      const id = query?.pipeline
                        ? query?.pipeline
                        : pipelineData;
                      runPipeline(id);
                      // await convertAndRunPipeline(id);
                    }}
                  >
                    Run pipeline
                  </Button>
                  <Button
                    className={ingestionCss.draftBtn}
                    onClick={() => {
                      setShowJobList(true);
                    }}
                  >
                    Job List
                  </Button>
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
                <Build
                  ingestionCss={ingestionCss}
                  setSelectedTab={setSelectedTab}
                />
              </>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CreatePipeline;
