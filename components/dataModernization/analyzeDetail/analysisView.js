import React from "react";
import {Table} from "antd";

const AnalysisView = ({transformationSummary}) => {
  return (
    <Table
      pagination={false}
      dataSource={transformationSummary}
      rowKey="fileId"
      columns={[
        {
          title: "Transformation Type",
          dataIndex: "transformationType",
          key: "transformationType",
          render: (value, row, index) => {
            if (transformationSummary.length == index + 1) {
              return (
                <b style={{ color: "#0c3246", fontWeight: "bold" }}>
                  <span>{value}</span>
                </b>
              );
            } else {
              return <span>{value}</span>;
            }
          },
        },
        {
          title: "Transformation Count",
          dataIndex: "transformationCount",
          key: "transformationCount",
          render: (value, row, index) => {
            if (transformationSummary.length == index + 1) {
              return (
                <b style={{ color: "#0c3246", fontWeight: "bold" }}>
                  <span>{value ? value : ""}</span>
                </b>
              );
            } else {
              return <span>{value}</span>;
            }
          },
        },
        {
          title: "Manual Effort Hours",
          dataIndex: "manualEffortHours",
          key: "manualEffortHours",
          render: (value, row, index) => {
            if (transformationSummary.length == index + 1) {
              return (
                <b style={{ color: "#0c3246", fontWeight: "bold" }}>
                  <span>{value}</span>
                </b>
              );
            } else {
              return <span>{value}</span>;
            }
          },
        },
        {
          title: "Automated Effort Hours",
          dataIndex: "automatedEffortHours",
          key: "automatedEffortHours",
          render: (value, row, index) => {
            if (transformationSummary.length == index + 1) {
              return (
                <b style={{ color: "#0c3246", fontWeight: "bold" }}>
                  <span>{value}</span>
                </b>
              );
            } else {
              return <span>{value}</span>;
            }
          },
        },
      ]}
    />
  );
};

export default AnalysisView;
