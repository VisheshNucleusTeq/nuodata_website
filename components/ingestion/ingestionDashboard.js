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
  message
} from "antd";
import { SwapOutlined, FilterOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { GETWORKSPACE, GETPIPELINE } from "../../network/apiConstants";
import { fetch_retry_get } from "../../network/api-manager";
import { setWorkspaceAction } from "../../Redux/action";

const IngestionDashboard = ({ ingestionCss }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [workspace, setWorkspace] = React.useState("");
  const [workspaceData, setWorkspaceData] = React.useState([]);
  const [pipelineData, setPipelineData] = React.useState([]);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const color = ["#44ae48", "#dda807", "#ff7575", "#a5a5a5"];

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text) => {
        return (
          <>
            <Space size={15}>
              <Image
                preview={false}
                src={
                  "https://placehold.co/150?text=" +
                  alphabet[Math.floor(Math.random() * alphabet.length)]
                }
                className={ingestionCss.iconImage}
              />
              <SwapOutlined
                className={ingestionCss.title}
                style={{ fontSize: "1.2vw" }}
              />
              <Image
                preview={false}
                src={
                  "https://placehold.co/150?text=" +
                  alphabet[Math.floor(Math.random() * alphabet.length)]
                }
                className={ingestionCss.iconImage}
              />
            </Space>
          </>
        );
      },
    },
    {
      title: "Pipeline Name",
      dataIndex: "workspace_name",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => {
        return (
          <Badge
            count={"Status"}
            color={color[Math.floor(Math.random() * color.length)]}
          />
        );
      },
    },
    {
      title: "Schedule",
      dataIndex: "schedule",
    },
    {
      title: "Last Modified",
      dataIndex: "create_dt_time",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text) => {
        return (
          <Button
            style={{
              background: color[Math.floor(Math.random() * color.length)],
              color: "#fff",
              borderRadius: "25px",
            }}
          >
            Action
          </Button>
        );
      },
    },
  ];

  // const data = Array(3)
  //   .fill(undefined)
  //   .map((e, i) => {
  //     return {
  //       key: "1",
  //       pipelineName: "Demo",
  //       schedule: "Every Day",
  //       lastModified: new Date().toDateString(),
  //     };
  //   });

  const getWorkSpaceData = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (authData && authData?.orgId) {
      const data = await fetch_retry_get(`${GETWORKSPACE}${authData?.orgId}`);
      if (data.success) {
        console.log(data?.data)
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
      if (workspace && ("workspace" in localStorage)) {
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
          }
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
