import React, { useEffect, useState } from "react";
import { Table, Space, Tooltip, Button } from "antd";
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
  const user = useSelector((state) => state.userDetails.isLogged);

  const getAllProjects = async () => {
    setLoading(true);
    const authData = JSON.parse(localStorage.getItem("authData"));
    const data = await fetch_retry_get(`${GETALLPROJECT}${authData?.orgId}`);
    setLoading(false);
    dispatch(loderShowHideAction(false));
    if (data.success) {
      setData(data.data);
    } else {
      message.error([data?.error]);
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
      <Table
        className="demo"
        columns={[
          {
            title: "Business Unit",
            dataIndex: "businessUnit",
            key: "businessUnit",
          },
          {
            title: "Project",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Total Files",
            dataIndex: "totalFiles",
            key: "totalFiles",
          },
          {
            title: "Source Platform",
            dataIndex: "sourcePlatform",
            key: "sourcePlatform",
          },
          {
            title: "Target",
            dataIndex: "targetPlatform",
            key: "targetPlatform",
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
    </div>
  );
};

export default DashboardView;
