import React, { useEffect } from "react";
import { Table, Space, Tooltip } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";

import dashboardCss from "../styles/dashboard.module.css";

const Dashboard = () => {
  const setheader = () => {
    alert('set');
  };

  useEffect(() => {
    // alert(123)
  }, [])

  return (
    <div className={dashboardCss.main}>
      <h1 onClick={() => setheader()}>Data Modernization</h1>
      <p>Company admin view</p>
      <Table
        className="demo"
        columns={[
          {
            title: "Business Unit",
            dataIndex: "business_unit",
            key: "business_unit",
          },
          {
            title: "Project",
            dataIndex: "project",
            key: "project",
          },
          {
            title: "Total Files",
            dataIndex: "total_files",
            key: "total_files",
          },
          {
            title: "Source",
            dataIndex: "source",
            key: "source",
          },
          {
            title: "Target",
            dataIndex: "target",
            key: "target",
          },
          {
            title: "Phase",
            dataIndex: "phase",
            key: "phase",
          },
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
        dataSource={Array(10)
          .fill(undefined)
          .map(() => {
            return {
              business_unit: "Marketing",
              project: "Information Conversion to Databricks1",
              total_files: "15",
              source: "Informatica",
              target: "Delta Lake (PySpark)",
              phase: "Analyze",
              action: "",
            };
          })}
      />
    </div>
  );
};

export default Dashboard;
