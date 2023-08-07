import React from "react";
import { Col, Image, Input, Row, Table, Button, Space, Badge } from "antd";
import injectionDashboardCss from "../../styles/injectionDashboard.module.css";
import { SwapOutlined } from "@ant-design/icons";
const InjectionDashboard = () => {
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
                className={injectionDashboardCss.iconImage}
              />
              <SwapOutlined
                className={injectionDashboardCss.title}
                style={{ fontSize: "1.2vw" }}
              />
              <Image
                preview={false}
                src={
                  "https://placehold.co/150?text=" +
                  alphabet[Math.floor(Math.random() * alphabet.length)]
                }
                className={injectionDashboardCss.iconImage}
              />
            </Space>
          </>
        );
      },
    },
    {
      title: "Pipeline Name",
      dataIndex: "pipelineName",
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
      dataIndex: "lastModified",
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (text) => {
        return (
          <Button
            style={{ background: color[Math.floor(Math.random() * color.length)], color: "#fff", borderRadius: "25px" }}
          >
            Action
          </Button>
        );
      },
    },
  ];
  const data = Array(3)
    .fill(undefined)
    .map(() => {
      return {
        key: "1",
        pipelineName: "Pipeline Name",
        schedule: "Every Day",
        lastModified: "07/27/2023 17:45:19",
      };
    });

  return (
    <>
      {["Pipelines", "Models", "Workflows"].map((titleName) => {
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
                      <Input className="input" placeholder="Search Pipeline" />
                    </Col>
                    <Col
                      span={10}
                      style={{ justifyContent: "end", display: "flex" }}
                    >
                      <Button
                        style={{
                          background: "#e74860",
                          color: "#fff",
                          borderRadius: "25px",
                          height: "100%",
                        }}
                      >
                        New {titleName}
                      </Button>
                    </Col>
                  </Row>
                </>
              );
            }}
          />
        );
      })}
    </>
  );
};

export default InjectionDashboard;
