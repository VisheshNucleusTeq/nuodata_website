import {
  CheckCircleFilled,
  CheckCircleOutlined,
  CloseCircleOutlined,
  LeftOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Badge,
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
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../dataModernization/loading";

const Build = dynamic(() => import("./pipelinePages/build"), {
  loading: () => <Loading />,
});

const Define = dynamic(() => import("./pipelinePages/define"), {
  loading: () => <Loading />,
});

const Configure = dynamic(() => import("./pipelinePages/configure"), {
  loading: () => <Loading />,
});

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
  const [validateStatus, setValidateStatus] = React.useState(true);

  const getWorkSpaceData = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (authData && authData?.orgId) {
      const data = await fetch_retry_get(`${GETWORKSPACE}${authData?.orgId}`);
      if (data.success) {
        setWorkspaceData(data.data);
      } else {
        setWorkspaceData([]);
      }
    }
  };

  const setSelectedWorkSpace = async () => {
    if (typeof window !== "undefined") {
      if (!workspace && !("workspace" in localStorage)) {
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
      dispatch(loderShowHideAction(false));
    }
  };

  const runPipeline = async (id) => {
    dispatch(loderShowHideAction(true));
    const result = await fetch_retry_post(`${RUNPIPELINE}${id}`);
    if (result?.success) {
      message.success(result?.data?.message);
    }
    dispatch(loderShowHideAction(false));
  };

  const getValidationData = async () => {
    const id = query?.pipeline ? query?.pipeline : pipelineData;
    if (id) {
      setValidateLoad(true);
      const validationData = await fetch_retry_get(
        `${GETPIPELINEERROR}${id}/validate`
      );
      if (validationData.success) {
        setValidateStatus(validationData?.data?.pipeline_status != "valid");
        setValidation(validationData.data);
      }
      setValidateLoad(false);
    }
  };

  const validateAndSavePipeline = async () => {
    const id = query?.pipeline ? query?.pipeline : pipelineData;
    if (id) {
      dispatch(loderShowHideAction(true));
      setValidateLoad(true);
      const validationData = await fetch_retry_get(
        `${GETPIPELINEERROR}${id}/validate`
      );
      if (validationData.success) {
        setValidateStatus(validationData?.data?.pipeline_status != "valid");
        setValidation(validationData.data);
        if (validationData?.data?.pipeline_status == "valid") {
          convertPipeline(id);
        } else {
          dispatch(loderShowHideAction(false));
          message.error("Please fix the validation before saving.");
        }
      } else {
        dispatch(loderShowHideAction(false));
      }
      setValidateLoad(false);
    }
  };

  useEffect(() => {
    getWorkSpaceData();
    setSelectedWorkSpace();
  }, [workspace, typeof window !== "undefined"]);

  useEffect(() => {
    query?.pipeline || pipelineData
      ? (setOldPipeline(query?.pipeline ? query?.pipeline : pipelineData),
        getValidationData())
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

          {/* <Col
            span={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              paddingRight: "2vw",
            }}
          >
            <Space>
              <Button
                onClick={() => {
                  setOpen(
                    validation?.pipeline_status &&
                      validation?.pipeline_status != "valid"
                  );
                }}
                disabled={
                  !(
                    validation?.pipeline_status &&
                    validation?.pipeline_status != "valid"
                  )
                }
              >
                <span>
                  <span>
                    <LeftOutlined />
                  </span>
                  &nbsp;
                  <span>
                    {`validation (${
                      validation?.validations
                        ? validation?.validations?.length
                        : 0
                    })`}{" "}
                  </span>
                  &nbsp; &nbsp;
                  <span>
                    {validation?.pipeline_status &&
                    validation?.pipeline_status != "valid" ? (
                      <CloseCircleOutlined
                        style={{
                          color: "#FFF",
                          backgroundColor: "red",
                          borderRadius: "25px",
                        }}
                      />
                    ) : (
                      <CheckCircleOutlined
                        style={{
                          color: "#FFF",
                          backgroundColor: "green",
                          borderRadius: "25px",
                        }}
                      />
                    )}
                  </span>
                </span>
              </Button>
              <Tooltip placement={"left"} title={"Reload Validation"}>
                <ReloadOutlined
                  style={{
                    // color: "#FFF",
                    borderRadius: "25px",
                    fontSize: "1vw",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    getValidationData();
                  }}
                  spin={validateLoad}
                />
              </Tooltip>
            </Space>
          </Col> */}

          <Divider style={{ margin: "0vh 0vh 1vh 0vh" }}></Divider>
          <Col span={24} className={ingestionCss.pipelineStepsRow}>
            <Row className={ingestionCss.pipelineStepsRow__}>
              <Col span={14}>
                <Row align={"space-between1"}>
                  {/* {["Define", "Build", "Test", "Configure", "Deploy"].map( */}
                  {["Define", "Build", "Configure", "Deploy"].map((data, i) => {
                    return (
                      <>
                        <Col
                          className={ingestionCss.stepsIcon}
                          span={4}
                          onClick={() => {
                            setSelectedTab(i);
                          }}
                        >
                          <Space className={ingestionCss.stepsIcon_text}>
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
                        {[0, 1, 2].includes(i) ? (
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
                  })}
                </Row>
              </Col>
              <Col span={10} className={ingestionCss.pipelineBtns}>
                <Space>
                  {/* <span>
                    {validation?.pipeline_status &&
                    validation?.pipeline_status != "valid" ? (
                      <Space>
                        <Button
                          onClick={() => {
                            setOpen(
                              validation?.pipeline_status &&
                                validation?.pipeline_status != "valid"
                            );
                          }}
                          disabled={
                            !(
                              validation?.pipeline_status &&
                              validation?.pipeline_status != "valid"
                            )
                          }
                        >
                          <span>
                            <span>
                              <LeftOutlined />
                            </span>
                            &nbsp;
                            <span>
                              {`validation (${
                                validation?.validations
                                  ? validation?.validations?.length
                                  : 0
                              })`}{" "}
                            </span>
                            &nbsp; &nbsp;
                            <span>
                              {validation?.pipeline_status &&
                              validation?.pipeline_status != "valid" ? (
                                <CloseCircleOutlined
                                  style={{
                                    color: "#FFF",
                                    backgroundColor: "red",
                                    borderRadius: "25px",
                                  }}
                                />
                              ) : (
                                <CheckCircleOutlined
                                  style={{
                                    color: "#FFF",
                                    backgroundColor: "green",
                                    borderRadius: "25px",
                                  }}
                                />
                              )}
                            </span>
                          </span>
                        </Button>
                        <Tooltip placement={"left"} title={"Reload Validation"}>
                          <ReloadOutlined
                            style={{
                              // color: "#FFF",
                              borderRadius: "25px",
                              fontSize: "1vw",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              getValidationData();
                            }}
                            spin={validateLoad}
                          />
                        </Tooltip>
                      </Space>
                    ) : (
                      <CheckCircleOutlined
                        style={{
                          color: "#FFF",
                          backgroundColor: "green",
                          borderRadius: "25px",
                        }}
                      />
                    )}
                  </span> */}

                  {/* <Badge count={"Valid"} showZero color='green' /> */}
                  {/* <Badge dot={true} color='green' /> */}

                  <Tooltip
                    title={
                      validation?.pipeline_status == "valid"
                        ? ""
                        : "Please resolve the validation issue to continue."
                    }
                  >
                    <>
                      <Button
                        disabled={validateStatus}
                        className={ingestionCss.saveBtn}
                        onClick={async () => {
                          const id = query?.pipeline
                            ? query?.pipeline
                            : pipelineData;
                          validateAndSavePipeline();
                        }}
                      >
                        Save Pipeline
                      </Button>
                    </>
                  </Tooltip>
                  <Tooltip
                    title={
                      validation?.pipeline_status == "valid"
                        ? ""
                        : "Please resolve the validation issue to continue."
                    }
                  >
                    <>
                      <Button
                        disabled={validateStatus}
                        className={ingestionCss.saveBtn}
                        onClick={async () => {
                          const id = query?.pipeline
                            ? query?.pipeline
                            : pipelineData;
                          convertPipeline(id);
                        }}
                      >
                        Run pipeline
                      </Button>
                    </>
                  </Tooltip>
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
                {/* {workspaceData.length && workspace && pipelineDetails && pipelineDetails?.runtime_env_id ? ( */}
                {workspaceData.length && workspace ? (
                  <Define
                    ingestionCss={ingestionCss}
                    workspaceData={workspaceData}
                    workspace={workspace}
                    setSelectedTab={setSelectedTab}
                    pipelineDetails={pipelineDetails}
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
            {selectedTab === 2 && (
              <>
                <Configure
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
