import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Tooltip,
  Button,
  message,
  Card,
  Row,
  Col,
  Input,
} from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import dashboardCss from "../../styles/dashboard.module.css";
import { fetch_retry_get } from "../../network/api-manager";
import { GETALLPROJECT } from "../../network/apiConstants";
import { SetTabTypeAction, loderShowHideAction } from "../../Redux/action";

const DashboardView = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const user = useSelector((state) => state.userDetails.isLogged);

  const getAllProjects = async () => {
    setLoading(true);
    const authData = JSON.parse(localStorage.getItem("authData"));
    const data = await fetch_retry_get(
      `${GETALLPROJECT}${authData?.orgId}?search=${search}`
    );
    setLoading(false);
    dispatch(loderShowHideAction(false));
    if (data.success) {
      setData(data.data);
    } else {
      setData([]);
      search === "" ?? message.error([data?.error]);
    }
  };

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (authData && authData?.orgId) {
      dispatch(loderShowHideAction(true));
      getAllProjects();
    }
  }, []);

  const showUpdatePage = (projectId) => {
    dispatch(SetTabTypeAction("Define"));
    router.push(`/data-modernization?id=${projectId}`);
  };

  const showUpdatePageAnalyze = (projectId) => {
    dispatch(SetTabTypeAction("Analyze"));
    router.push(`/data-modernization?id=${projectId}`);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search.length >= 3 || search == "") {
        setSearch(search);
        getAllProjects();
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const changeDateFormat = (date) => {
    const dt = new Date(date);
    const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
    return `${padL(dt.getMonth() + 1)}/${padL(
      dt.getDate()
    )}/${dt.getFullYear()} ${padL(dt.getHours())}:${padL(
      dt.getMinutes()
    )}:${padL(dt.getSeconds())}`;
  };

  return (
    <div className={dashboardCss.main}>
      <Button
        type="primary"
        onClick={() => {
          dispatch(SetTabTypeAction("Define"));
          router.push(`/data-modernization`);
        }}
        danger
        className={dashboardCss.newProjectBtn}
      >
        New Project +
      </Button>

      <h1>Data Modernization</h1>
      <Card className="demoCard">
        <Row style={{ marginBottom: "2%" }}>
          <Col span={16}></Col>
          <Col span={8}>
            <Input
              onChange={(e) => setSearch(e.target.value)}
              className="input search"
              placeholder="Search..."
              style={{ border: "1px solid #0c3246 !important" }}
            />
          </Col>
        </Row>
        <Table
          // className="demo"
          rowKey="projectId"
          columns={[
            {
              title: "Business Unit",
              dataIndex: "businessUnit",
              key: "businessUnit",
              sorter: (a, b) => a.businessUnit.localeCompare(b.businessUnit),
              // align: 'center'
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
            },
            {
              title: "Source Platform",
              dataIndex: "sourcePlatform",
              key: "sourcePlatform",
              sorter: (a, b) => a.sourcePlatform.localeCompare(b.sourcePlatform),
            },
            {
              title: "Target",
              dataIndex: "targetPlatform",
              key: "targetPlatform",
              sorter: (a, b) => a.targetPlatform.localeCompare(b.targetPlatform),
            },
            {
              title: "Conversion",
              key: "conversion",
              render: (_, record) => (
                <span>
                  {Number(record.conversion) ? record.conversion : 0}%
                </span>
              ),
              sorter: (a, b) => (Number(a.conversion) ? a.conversion : 0) - (Number(b.conversion) ? b.conversion : 0),
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
                        showUpdatePageAnalyze(record.projectId);
                      }}
                    >
                      <EyeOutlined />
                    </a>
                  </Tooltip>
                </Space>
              ),
            },
          ]}
          dataSource={data}
        />
      </Card>
    </div>
  );
};

export default DashboardView;
