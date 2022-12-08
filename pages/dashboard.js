import React, { useEffect, useState } from "react";
import { Table, Space, Tooltip } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";

import dashboardCss from "../styles/dashboard.module.css";
import { fetch_retry_get } from "../network/api-manager";
import { GETALLPROJECT } from "../network/apiConstants";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const setheader = () => {
    alert("set");
  };

  const getALLProjects = async () => {
    const data = await fetch_retry_get(GETALLPROJECT);
    setLoading(false);
    if (data.success) {
      console.log("data", data);
      setData(data.data);
    } else {
      message.error([data?.error]);
    }
  };
  useEffect(() => {
    // alert(123)
    getALLProjects();
  }, []);

  return (
    <div className={dashboardCss.main}>
      <h1 onClick={() => setheader()}>Data Modernization</h1>
      {/* <p>Company admin view</p> */}
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
          // {
          //   title: "Phase",
          //   dataIndex: "phase",
          //   key: "phase",
          // },
          {
            title: "Action",
            key: "action",
            render: (_, record) => (
              <Space size="middle">
                <Tooltip placement="top" title={"Edit"}>
                  <a>
                    <EditOutlined />
                  </a>
                </Tooltip>
                <Tooltip placement="top" title={"Details"}>
                  <a>
                    <EyeOutlined />{" "}
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

export default Dashboard;
