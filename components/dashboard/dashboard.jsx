import {
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Input,
  Modal,
  Row,
  Space,
  Table,
  Tooltip,
  message,
} from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

import { SetTabTypeAction, loderShowHideAction } from "../../Redux/action";
import { fetch_retry_get } from "../../network/api-manager";
import { GETALLPROJECT, GETGITDATA } from "../../network/apiConstants";
import dashboardCss from "../../styles/dashboard.module.css";

const DashboardView = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [modal2Open, setModal2Open] = useState(false);

  const showUpdatePage = (projectId) => {
    dispatch(SetTabTypeAction("Define"));
    router.push(`/data-modernization?id=${projectId}`);
  };

  const showUpdatePageAnalyze = (projectId, totalFiles) => {
    dispatch(SetTabTypeAction(totalFiles > 0 ? "Analyze" : "Connect"));
    router.push(`/data-modernization?id=${projectId}`);
  };

  const changeDateFormat = (date) => {
    const dt = new Date(date);
    const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
    return `${padL(dt.getMonth() + 1)}/${padL(
      dt.getDate()
    )}/${dt.getFullYear()} ${padL(dt.getHours())}:${padL(
      dt.getMinutes()
    )}:${padL(dt.getSeconds())}`;
  };

  const getAllProjects = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (authData && authData?.orgId) {
      const data = await fetch_retry_get(
        `${GETALLPROJECT}${authData?.orgId}?search=${search}`
      );
      dispatch(loderShowHideAction(false));
      if (data.success) {
        setData(data.data);
        return data;
      } else {
        setData([]);
        search === "" ?? message.error([data?.error]);
      }
    }
  };

  const { status, data: projectData } = useQuery(
    ["PROJECT_DATA", search],
    () => getAllProjects(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
      staleTime: 10 * (60 * 1000),
    }
  );

  const checkGitConfigration = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const resData = await fetch_retry_get(
      `${GETGITDATA}${authData?.orgId}?type=github`
    );
    if (
      !resData?.data?.configs?.github_url ||
      !resData?.data?.configs?.github_username
    ) {
      setModal2Open(true);
    } else {
      setModal2Open(false);
    }
  };

  useEffect(() => {
    checkGitConfigration();
    dispatch(loderShowHideAction(true));
    if (status === "success") {
      dispatch(loderShowHideAction(false));
      if (projectData?.success) {
        setData(projectData.data);
      } else {
        setData([]);
        search === "" ?? message.error([projectData?.error]);
      }
    }
  }, [status, projectData]);

  return (
    <>
      <Modal
        title={
          <>
            <p style={{ color: "#0c3246" }}>
              <WarningOutlined /> <b> Warning</b>
            </p>
          </>
        }
        centered
        open={modal2Open}
        onOk={() => {
          setModal2Open(false);
          router.push(`/account-and-settings/repo-settings/`);
        }}
        closable={false}
        cancelButtonProps={{ style: { display: "none" } }}
        maskClosable={false}
        okButtonProps={{ style: { background: "#e74860", border: "none" } }}
        okText={"Repo configuration"}
      >
        <p>Please configure github settings before proceeding.</p>
      </Modal>

      <div className={dashboardCss.main}>
        <h1>Data Modernization</h1>
        <Row style={{ marginBottom: "24px" }}>
          <Col span="12">
            <Space direction="horizontal" size={"large"}>
              <Input
                onChange={(e) => {
                  const delayDebounceFn = setTimeout(() => {
                    setSearch(e.target.value);
                  }, 1000);
                  return () => clearTimeout(delayDebounceFn);
                }}
                className={dashboardCss.input}
                placeholder="Search"
                suffix={
                  <SearchOutlined
                    style={{ fontSize: "1.2vw", color: "#a9a9a9" }}
                  />
                }
              />
            </Space>
          </Col>
          <Col span="12" align={"right"}>
            <Space direction="horizontal" size={"large"}>
              {!modal2Open && (
                <Button className={dashboardCss.button}>
                  <span
                    style={{ fontSize: "1.2vw" }}
                    onClick={() => {
                      dispatch(SetTabTypeAction("Define"));
                      router.push(`/data-modernization`);
                    }}
                  >
                    <PlusOutlined /> New Project
                  </span>
                </Button>
              )}
            </Space>
          </Col>
        </Row>
        <Card className="demoCard">
          <Row style={{ marginBottom: "2%" }}>
            <Col span={24}>
              <Table
                rowKey="projectId"
                columns={[
                  {
                    title: "Business Unit",
                    dataIndex: "businessUnit",
                    key: "businessUnit",
                    sorter: (a, b) =>
                      a.businessUnit.localeCompare(b.businessUnit),
                  },
                  {
                    title: "Project",
                    dataIndex: "name",
                    key: "name",
                    sorter: (a, b) => a.name.localeCompare(b.name),
                  },
                  {
                    title: "Total Files",
                    dataIndex: "totalFiles",
                    key: "totalFiles",
                    sorter: (a, b) => a.totalFiles - b.totalFiles,
                    align: "center",
                  },
                  {
                    title: "Source Platform",
                    dataIndex: "sourcePlatform",
                    key: "sourcePlatform",
                    sorter: (a, b) =>
                      a.sourcePlatform.localeCompare(b.sourcePlatform),
                  },
                  {
                    title: "Target",
                    dataIndex: "targetPlatform",
                    key: "targetPlatform",
                    sorter: (a, b) =>
                      a.targetPlatform.localeCompare(b.targetPlatform),
                  },
                  {
                    title: "Conversion",
                    key: "conversion",
                    render: (_, record) => (
                      <span>
                        {Number(record.conversion) ? record.conversion : 0}%
                      </span>
                    ),
                    sorter: (a, b) =>
                      (Number(a.conversion) ? a.conversion : 0) -
                      (Number(b.conversion) ? b.conversion : 0),
                    align: "center",
                  },
                  {
                    title: "Created Date",
                    key: "creationDateTime",
                    render: (_, record) => (
                      <span>{changeDateFormat(record.creationDateTime)}</span>
                    ),
                    sorter: (a, b) =>
                      new Date(a.creationDateTime).getTime() -
                      new Date(b.creationDateTime).getTime(),
                  },
                  {
                    title: "Action",
                    key: "action",
                    render: (_, record) => (
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
                            href={`/data-modernization?id=${record.projectId}`}
                            onClick={(e) => {
                              e.preventDefault();
                              showUpdatePage(record.projectId);
                            }}
                          >
                            <EditOutlined />
                          </a>
                        </Tooltip>
                        <Tooltip
                          placement="top"
                          title={"Details"}
                          key={(Math.random() + 1).toString(36).substring(7)}
                        >
                          <a
                            href={`/data-modernization?id=${record.projectId}`}
                            onClick={(e) => {
                              e.preventDefault();
                              showUpdatePageAnalyze(
                                record.projectId,
                                record.totalFiles
                              );
                            }}
                          >
                            <EyeOutlined />
                          </a>
                        </Tooltip>
                      </Space>
                    ),
                    align: "center",
                  },
                ]}
                dataSource={data}
              />
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default DashboardView;
