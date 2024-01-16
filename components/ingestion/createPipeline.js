import {
  CheckCircleFilled,
  CloseCircleOutlined,
  LeftOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  Divider,
  Drawer,
  Image,
  Modal,
  Row,
  Space,
  Tag,
  Tooltip,
  message,
} from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Build from "./pipelinePages/build";
import Define from "./pipelinePages/define";

import { loderShowHideAction, setWorkspaceAction } from "../../Redux/action";
import { fetch_retry_get, fetch_retry_post } from "../../network/api-manager";
import {
  CONVERTPIPELINE,
  CREATEPIPELINE,
  GETPIPELINEERROR,
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
  const checkValidation = useSelector(
    (state) => state?.checkValidation?.checkValidation
  );

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [workspaceData, setWorkspaceData] = React.useState([]);
  const [pipelineDetails, setPipelineDetails] = React.useState({});
  const [showJobList, setShowJobList] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [validation, setValidation] = React.useState({});
  const [validateLoad, setValidateLoad] = React.useState(false);

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

  const getValidationData = async () => {
    const id = query?.pipeline ? query?.pipeline : pipelineData;
    if (id) {
      setValidateLoad(true);
      const validationData = await fetch_retry_get(
        `${GETPIPELINEERROR}${id}/validate`
      );
      if (validationData.success) {
        setValidation(validationData.data);
      }
      setValidateLoad(false);
    }
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

  useEffect(() => {
    checkValidation && getValidationData();
  }, [checkValidation]);

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

      <Drawer
        title={
          <>
            <Row>
              <Col span={12}>
                <b>Validation</b>
              </Col>
              <Col span={12} style={{ display: "flex", justifyContent: "end" }}>
                <Space>
                  <ReloadOutlined
                    style={{
                      // color: "#FFF",
                      borderRadius: "25px",
                      fontSize: "1.5vw",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      getValidationData();
                    }}
                    spin={validateLoad}
                  />
                  &nbsp;
                  <CloseCircleOutlined
                    style={{
                      color: "#FFF",
                      backgroundColor: "red",
                      borderRadius: "25px",
                      fontSize: "1.5vw",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setOpen(false);
                    }}
                  />
                </Space>
              </Col>
            </Row>
          </>
        }
        placement={"right"}
        closable={false}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        key={"right"}
        width={"40%"}
        height={"100%"}
      >
        {validation?.validations &&
          validation?.validations.length > 0 &&
          validation?.validations.map((e) => {
            return (
              <>
                <Collapse
                  expandIconPosition="right"
                  onChange={() => {
                    console.log(e?.element_id);
                  }}
                  accordion
                >
                  <Collapse.Panel
                    arrow="right"
                    header={
                      <Row>
                        <Col span={18}>
                          <Tooltip placement="top" title={e?.element_type}>
                            <span
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <span>
                                <Image
                                  preview={false}
                                  src={`/pipelines_icons/${e?.element_type}.png`}
                                  width={"2.5vw"}
                                  height={"2.5vw"}
                                />
                              </span>
                              &nbsp; &nbsp;
                              <span
                                style={{
                                  color: "#000",
                                  fontWeight: "initial",
                                  fontSize: "1vw",
                                }}
                              >
                                <span>{e?.element_name}</span>
                                <br></br>
                                {/* <small style={{backgroundColor : "lightblue", color : "#000", borderRadius : "5px"}}>&nbsp;{e?.element_type}&nbsp;</small> */}
                                <Tag bordered={false} color="processing">
                                  {e?.element_type}
                                </Tag>
                              </span>
                            </span>
                          </Tooltip>
                        </Col>
                        <Col span={6}>
                          <>
                            <div
                              style={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "end",
                              }}
                            >
                              {e?.element_status == "invalid" && (
                                <Tag icon={<CloseCircleOutlined />} color="red">
                                  Invalid
                                </Tag>
                              )}
                              {(e?.element_status == "partially_valid" ||
                                e?.element_status == "partially valid") && (
                                <Tag
                                  icon={<CloseCircleOutlined />}
                                  color="orange"
                                >
                                  Partially Valid
                                </Tag>
                              )}
                            </div>
                          </>
                        </Col>
                      </Row>
                    }
                    key="1"
                  >
                    <ul>
                      {e?.validation_messages &&
                        e?.validation_messages?.map((errorList) => {
                          return <li>{errorList}</li>;
                        })}
                    </ul>
                  </Collapse.Panel>
                </Collapse>
                <p></p>
              </>
            );
          })}
      </Drawer>

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
                </a>
              </span>
            )}
            {pipelineDetails?.pipeline_name && (
              <>
                ,
                <span>
                  Pipeline:&nbsp;<a>{pipelineDetails?.pipeline_name}</a>
                </span>
              </>
            )}
          </Col>

          <Col
            span={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              paddingRight: "2vw",
            }}
          >
            {}
            {validation?.pipeline_status &&
              validation?.pipeline_status != "valid" && (
                <Button
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <span>
                    <span>
                      <LeftOutlined />
                    </span>
                    &nbsp;
                    <span>
                      {`validation (${validation?.validations?.length})`}{" "}
                    </span>
                    &nbsp; &nbsp;
                    <span>
                      <CloseCircleOutlined
                        style={{
                          color: "#FFF",
                          backgroundColor: "red",
                          borderRadius: "25px",
                        }}
                      />
                    </span>
                  </span>
                </Button>
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
                  {validation?.pipeline_status == "valid" && (
                    <>
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
                        Convert pipeline
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
                    </>
                  )}
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
