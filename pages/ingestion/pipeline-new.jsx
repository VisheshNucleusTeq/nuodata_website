import {
  ArrowRightOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Avatar,
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
  message,
} from "antd";
import React from "react";

import { FilterOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  loderShowHideAction,
  setPipelineAction,
  setWorkspaceAction,
} from "../../Redux/action";
import { fetch_retry_delete, fetch_retry_get } from "../../network/api-manager";
import {
  DELETEPIPELINE,
  GETPIPELINE,
  GETWORKSPACE,
  GETWORKSPACEENV,
} from "../../network/apiConstants";
//   import { getFileName } from "./helper/getFileName";
import JobRunDetails from "../../components/ingestion/model/jobRunDetails";

import { getFileName } from "../../components/helper/getFileName";
import ingestionCss from "../../styles/ingestion.module.css";
const IngestionDashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [workspace, setWorkspace] = React.useState("");
  const [workspaceData, setWorkspaceData] = React.useState([]);
  const [pipelineData, setPipelineData] = React.useState([]);
  const [pipelineId, setPipelineId] = React.useState(null);

  const columns = [
    // {
    //   title: "Source",
    //   dataIndex: "sources",
    //   render: (source, record) => {
    //     return (
    //       <Avatar.Group
    //         maxCount={2}
    //         maxStyle={{
    //           color: "#f56a00",
    //           backgroundColor: "#fde3cf",
    //         }}
    //       >
    //         {source.length ? (
    //           [...source].map((e) => {
    //             return (
    //               <Avatar
    //                 src={`/db_icon/${getFileName(e)}.png`}
    //                 style={{
    //                   border: "1px solid lightgray",
    //                   backgroundColor: "#FFF",
    //                   padding: "2px",
    //                 }}
    //               />
    //             );
    //           })
    //         ) : (
    //           <>NA</>
    //         )}
    //       </Avatar.Group>
    //     );
    //   },
    // },
    // {
    //   title: "Target",
    //   dataIndex: "targets",
    //   render: (target, record) => {
    //     return (
    //       <Avatar.Group
    //         maxCount={2}
    //         maxStyle={{
    //           color: "#f56a00",
    //           backgroundColor: "#fde3cf",
    //         }}
    //       >
    //         {target.length ? (
    //           [...target].map((e) => {
    //             return (
    //               <Avatar
    //                 src={`/db_icon/${getFileName(e)}.png`}
    //                 style={{
    //                   border: "1px solid lightgray",
    //                   backgroundColor: "#FFF",
    //                   padding: "2px",
    //                 }}
    //               />
    //             );
    //           })
    //         ) : (
    //           <>NA</>
    //         )}
    //       </Avatar.Group>
    //     );
    //   },
    // },
    {
      fixed: "left",
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
      // fixed: 'left',
      title: (
        <>
          <Row>
            <Col span={11}>Source</Col>
            <Col span={2}>
              <ArrowRightOutlined
                className={ingestionCss.title}
                style={{ fontSize: "1.2vw" }}
              />
            </Col>
            <Col span={11} style={{ justifyContent: "end", display: "flex" }}>
              Target
            </Col>
          </Row>
        </>
      ),
      dataIndex: "title",
      render: (text, record) => {
        //https://placehold.co/50?text=NA
        return (
          <>
            <Row>
              <Col span={11}>
                <Avatar.Group
                  maxCount={2}
                  maxStyle={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                  }}
                >
                  {record?.sources.length > 0 ? (
                    <Space direction="vertical">
                      {record.sources.map((e) => (
                        <Avatar
                          key={e.id}
                          src={`/db_icon/${getFileName(e)}.png`}
                          style={{
                            border: "1px solid lightgray",
                            backgroundColor: "#FFF",
                            padding: "2px",
                          }}
                        />
                      ))}
                    </Space>
                  ) : (
                    <Avatar
                      src="https://placehold.co/150/white/black?text=NA&font=roboto"
                      style={{
                        border: "1px solid lightgray",
                        backgroundColor: "#FFF",
                        padding: "2px",
                      }}
                    />
                  )}
                </Avatar.Group>
              </Col>
              <Col
                span={2}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <ArrowRightOutlined
                  // spin={true}
                  className={ingestionCss.title}
                  style={{ fontSize: "1.2vw" }}
                />
              </Col>
              <Col span={11} style={{ display: "flex", justifyContent: "end" }}>
                <Avatar.Group
                  maxCount={2}
                  maxStyle={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                  }}
                >
                  {record?.targets.length ? (
                    <Space direction="vertical">
                      {record?.targets.map((e) => (
                        <Avatar
                          src={`/db_icon/${getFileName(e)}.png`}
                          style={{
                            border: "1px solid lightgray",
                            backgroundColor: "#FFF",
                            padding: "2px",
                          }}
                        />
                      ))}
                    </Space>
                  ) : (
                    <Avatar
                      src={`https://placehold.co/150/white/black?text=NA&font=roboto`}
                      style={{
                        border: "1px solid lightgray",
                        backgroundColor: "#FFF",
                        padding: "2px",
                      }}
                    />
                    // <>NA</>
                  )}
                </Avatar.Group>
              </Col>
            </Row>

            {/* <Space size={15}>
                <Avatar.Group
                  maxCount={2}
                  maxStyle={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                  }}
                >
                  {record?.sources.length ? (
                    [...record?.sources].map((e) => {
                      return (
                        <Avatar
                          src={`/db_icon/${getFileName(e)}.png`}
                          style={{
                            border: "1px solid lightgray",
                            backgroundColor: "#FFF",
                            padding: "2px",
                          }}
                        />
                      );
                    })
                  ) : (
                    <>NA</>
                  )}
                </Avatar.Group>
  
                <ArrowRightOutlined
                  className={ingestionCss.title}
                  style={{ fontSize: "1.2vw" }}
                />
                <Avatar.Group
                  maxCount={2}
                  maxStyle={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                  }}
                >
                  {record?.targets.length ? (
                    [...record?.targets].map((e) => {
                      return (
                        <Avatar
                          src={`/db_icon/${getFileName(e)}.png`}
                          style={{
                            border: "1px solid lightgray",
                            backgroundColor: "#FFF",
                            padding: "2px",
                          }}
                        />
                      );
                    })
                  ) : (
                    <>NA</>
                  )}
                </Avatar.Group>
              </Space> */}
          </>
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
      render: (data) => {
        return changeDateFormat(data);
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => {
        let color = "#FFF";
        switch (text) {
          case "valid":
            color = "#2ecc71";
            break;
          case "invalid":
            color = "#e74c3c";
            break;
          case "converted":
            color = "#3498db";
            break;
          case "draft":
            color = "#f1c40f";
            break;
          default:
            break;
        }
        // return <Tag color={color}>{text}</Tag>;
        return (
          <Badge
            count={text}
            color={color}
            style={{ minWidth: "4vw", textTransform: "capitalize" }}
          />
        );
      },
    },

    {
      title: "Last Job Run",
      dataIndex: "last_job_run",
      render: (last_job_run) => {
        let color = "#808080";
        switch (last_job_run?.job_status) {
          case "SUBMITTED":
            color = "#3498db";
            break;
          case "PENDING":
            color = "#f39c12";
            break;
          case "SCHEDULED":
            color = "#27ae60";
            break;
          case "RUNNING":
            color = "#2c3e50";
            break;
          case "SUCCESS":
            color = "#2ecc71";
            break;
          case "FAILED":
            color = "#e74c3c";
            break;
          case "CANCELLING":
            color = "#e67e22";
            break;
          case "CANCELLED":
            color = "#95a5a6";
            break;
          default:
            break;
        }

        return (
          <Badge
            count={(last_job_run?.job_status
              ? last_job_run?.job_status
              : "NOT STARTED"
            ).toLowerCase()}
            color={color}
            style={{
              minWidth: "4vw",
              textTransform: "capitalize",
              cursor: "pointer",
            }}
            onClick={() => {
              setPipelineId(last_job_run?.exe_id);
            }}
          />
        );

        // SUBMITTED: #3498db (Blue)
        // PENDING: #f39c12 (Orange)
        // SCHEDULED: #27ae60 (Green)
        // RUNNING: #2c3e50 (Dark Gray)
        // SUCCESS: #2ecc71 (Light Green)
        // FAILED: #e74c3c (Red)
        // CANCELLING: #e67e22 (Dark Orange)
        // CANCELLED: #95a5a6 (Silver)
      },
    },
    {
      title: "Job Start Time",
      dataIndex: "last_job_run",
      render: (last_job_run) => {
        return (
          <p>
            {last_job_run?.start_time
              ? changeDateFormat(last_job_run?.start_time)
              : "--"}
          </p>
        );
      },
    },
    {
      title: "Job End Time",
      dataIndex: "last_job_run",
      render: (last_job_run) => {
        return (
          <p>
            {last_job_run?.start_time
              ? changeDateFormat(last_job_run?.end_time)
              : "--"}
          </p>
        );
      },
    },

    {
      fixed: "right",
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

  const changeDateFormat = (date) => {
    const dt = new Date(date);
    const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
    return `${padL(dt.getMonth() + 1)}/${padL(
      dt.getDate()
    )}/${dt.getFullYear()} ${padL(dt.getHours())}:${padL(
      dt.getMinutes()
    )}:${padL(dt.getSeconds())}`;
  };

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
        title="Running Status"
        open={pipelineId != null}
        onOk={() => {
          setPipelineId(null);
        }}
        onCancel={() => {
          setPipelineId(null);
        }}
        footer={null}
        closable={true}
      >
        <JobRunDetails pipelineId={pipelineId} />
      </Modal>

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
                  style={{ float: "right", display: "none" }}
                >
                  Change Workspace
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      )}

      <Table
        scroll={{ x: "max-content" }}
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
                      Add Pipeline
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
