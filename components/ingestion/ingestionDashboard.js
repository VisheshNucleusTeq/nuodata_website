import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Col,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  message
} from "antd";
import React from "react";

import { FilterOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { loderShowHideAction, setPipelineAction, setWorkspaceAction } from "../../Redux/action";
import { fetch_retry_delete, fetch_retry_get } from "../../network/api-manager";
import {
  DELETEPIPELINE,
  GETPIPELINE,
  GETWORKSPACE,
  GETWORKSPACEENV,
} from "../../network/apiConstants";
const IngestionDashboard = ({ ingestionCss }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [workspace, setWorkspace] = React.useState("");
  const [workspaceData, setWorkspaceData] = React.useState([]);
  const [pipelineData, setPipelineData] = React.useState([]);

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
                  router.push(
                    "/ingestion/create-pipeline?pipeline=" + record?.pipeline_id
                  );
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
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  deletePipeline(record?.pipeline_id);
                }}
              >
                <a
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <DeleteOutlined />
                </a>
              </Popconfirm>
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

  const deletePipeline = async (id) => {
    dispatch(loderShowHideAction(true));
    await fetch_retry_delete(`${DELETEPIPELINE}${id}`);
    setPipelineData(pipelineData.filter((e) => e?.pipeline_id != id));
    dispatch(loderShowHideAction(false));
  };

  const getUpdateAllData = () => {
    dispatch(loderShowHideAction(true));
    dispatch(setPipelineAction(null));
    getWorkSpaceData();
    setOldData();
    getPiplineData();
    dispatch(loderShowHideAction(false));
  };

  useEffect(() => {
    getUpdateAllData();
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
          // setIsModalOpen(workspace ? false : true);
          setIsModalOpen(workspace ? false : false);
        }}
        footer={null}
        // closable={workspace ? true : false}
        closable={workspace ? true : true}
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
          {/* {JSON.stringify(workspaceData)} */}
          <Select
            defaultValue={workspace ? workspace : null}
            placeholder="Select Workspace"
            style={{
              width: "100%",
            }}
            onChange={async (e) => {
              const authData = JSON.parse(localStorage.getItem("authData"));
              const envList = await fetch_retry_get(
                `${GETWORKSPACEENV}${e}?org_id=${authData.orgId}`
              );
              if (envList?.data && envList?.data.length) {
                localStorage.setItem("workspace", e);
                dispatch(setWorkspaceAction(e));
                setWorkspace(e);
                setIsModalOpen(false);
              } else {
                message.warning("Please add environment for this workspace.");
              }
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
    </>
  );
};

export default IngestionDashboard;
