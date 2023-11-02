import React from "react";
import {
  Col,
  Image,
  Input,
  Row,
  Table,
  Button,
  Space,
  Badge,
  Modal,
  Select,
  message,
  Tooltip,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";

import { SwapOutlined, FilterOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { GETWORKSPACE, GETPIPELINE } from "../../network/apiConstants";
import { fetch_retry_get } from "../../network/api-manager";
import { setWorkspaceAction, setPipelineAction } from "../../Redux/action";

const IngestionDashboard = ({ ingestionCss }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [workspace, setWorkspace] = React.useState("");
  const [workspaceData, setWorkspaceData] = React.useState([]);
  const [pipelineData, setPipelineData] = React.useState([]);

  const color = ["#44ae48", "#dda807", "#ff7575", "#a5a5a5"];

  const columns = [
    {
      title: "Pipeline Name",
      dataIndex: "pipeline_name",
      render: (text, record) => {
        return (
          <Tooltip placement="topLeft" title={record?.pipeline_description}>
            <p>{text}</p>
          </Tooltip>
        );
      },
    },

    {
      title: "Schedule",
      dataIndex: "schedule",
    },
    {
      title: "Last Modified",
      dataIndex: "updated_date_time",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => {
        return <Badge count={text} />;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <Space
            size="middle"
            key={(Math.random() + 1).toString(36).substring(7)}
          >
            <Tooltip
              placement="top"
              title={"Edit"}
              key={(Math.random() + 1).toString(36).substring(7)}
            >
              <a
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/ingestion/create-pipeline?pipeline=" + record?.pipeline_id)
                }}
              >
                <EditOutlined />
              </a>
            </Tooltip>
            <Tooltip
              placement="top"
              title={"Delete"}
              key={(Math.random() + 1).toString(36).substring(7)}
            >
              <a
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <DeleteOutlined />
              </a>
            </Tooltip>
          </Space>
        );
      },
    },
  ];


  const getWorkSpaceData = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (authData && authData?.orgId) {
      const data = await fetch_retry_get(`${GETWORKSPACE}${authData?.orgId}`);
      if (data.success) {
        console.log(data?.data);
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
        setIsModalOpen(true);
      } else {
        const workspaceValue = localStorage.getItem("workspace");
        setWorkspace(workspaceValue);
        dispatch(setWorkspaceAction(workspaceValue));
        setIsModalOpen(false);
      }
    }
  };

  const getPiplineData = async () => {
    if (typeof window !== "undefined") {
      if (workspace && "workspace" in localStorage) {
        const data = await fetch_retry_get(`${GETPIPELINE}${workspace}`);
        if (data.success) {
          setPipelineData(data.data);
        } else {
          setPipelineData([]);
          message.error([data?.error]);
        }
      }
    }
  };

  useEffect(() => {
    dispatch(setPipelineAction(null));
    getWorkSpaceData();
    setOldData();
    getPiplineData();
  }, [workspace, typeof window !== "undefined"]);

  return (
    <>
      <Modal
        title="Workspace"
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(true);
        }}
        footer={null}
      >
        <>
          <div className={ingestionCss.addNewWorkspace}>
            <Button
              onClick={() => {
                router.push("/ingestion/create-workspace");
              }}
            >
              Add new workspace
            </Button>
          </div>
          <Select
            placeholder="Select Workspace"
            style={{
              width: "100%",
            }}
            onChange={(e) => {
              localStorage.setItem("workspace", e);
              dispatch(setWorkspaceAction(e));
              setWorkspace(e);
              setIsModalOpen(false);
            }}
            options={[
              ...workspaceData.map((e) => {
                return {
                  value: e?.workspace_id,
                  label: e?.workspace_name,
                };
              }),
            ]}
          />
        </>
      </Modal>
      {workspace && (
        <Row>
          <Col className={ingestionCss.WorkspaceName} span={24}>
            <Row>
              <Col
                span={18}
                style={{ display: "flex", alignItems: "center", height: "8vh" }}
              >
                {
                  workspaceData.filter((e) => e.workspace_id === workspace)[0]
                    ?.workspace_name
                }
              </Col>
              <Col
                span={5}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "8vh",
                  justifyContent: "end",
                }}
              >
                <Button
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                  style={{ float: "right" }}
                >
                  Change Workspace
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      )}

      {/* {JSON.stringify(pipelineData)} */}

      <Table
        columns={columns}
        dataSource={pipelineData.map((e) => {
          return {
            ...e,
            schedule: "Every Day",
          };
        })}
        bordered
        title={() => {
          return (
            <>
              <Row>
                <Col span={4} style={{ display: "flex", alignItems: "center" }}>
                  <h1>
                    <b>Pipelines</b>
                  </h1>
                </Col>
                <Col span={10}>
                  <Input className="input" placeholder={"Search Pipelines"} />
                </Col>
                <Col
                  span={10}
                  style={{ justifyContent: "end", display: "flex" }}
                >
                  <Space>
                    <Button
                      style={{
                        background: "gray",
                        color: "#fff",
                        borderRadius: "25px",
                        height: "100%",
                      }}
                    >
                      <FilterOutlined /> Filter
                    </Button>
                    <Button
                      style={{
                        background: "#e74860",
                        color: "#fff",
                        borderRadius: "25px",
                        height: "100%",
                      }}
                      onClick={() => {
                        router.push(`/ingestion/create-pipeline`);
                      }}
                    >
                      New Pipelines
                    </Button>
                  </Space>
                </Col>
              </Row>
            </>
          );
        }}
      />

      {/* {["Pipelines", "Models", "Workflows"].map((titleName) => {
        return (
          <Table
            columns={columns}
            dataSource={data}
            bordered
            title={() => {
              return (
                <>
                  <Row>
                    <Col
                      span={4}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <h1>
                        <b>{titleName}</b>
                      </h1>
                    </Col>
                    <Col span={10}>
                      <Input
                        className="input"
                        placeholder={"Search " + titleName}
                      />
                    </Col>
                    <Col
                      span={10}
                      style={{ justifyContent: "end", display: "flex" }}
                    >
                      <Space>
                        <Button
                          style={{
                            background: "gray",
                            color: "#fff",
                            borderRadius: "25px",
                            height: "100%",
                          }}
                        >
                          <FilterOutlined /> Filter
                        </Button>
                        <Button
                          style={{
                            background: "#e74860",
                            color: "#fff",
                            borderRadius: "25px",
                            height: "100%",
                          }}
                          onClick={() => {
                            router.push(`/ingestion/create-pipeline`);
                          }}
                        >
                          New {titleName}
                        </Button>
                      </Space>
                    </Col>
                  </Row>
                </>
              );
            }}
          />
        );
      })} */}
    </>
  );
};

export default IngestionDashboard;
