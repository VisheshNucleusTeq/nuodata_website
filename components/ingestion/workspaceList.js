import { EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Space, Table, Tooltip, message } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setWorkspaceAction } from "../../Redux/action";
import { fetch_retry_get } from "../../network/api-manager";
import { GETWORKSPACE } from "../../network/apiConstants";
import EnvironmentList from "./model/environmentList";

const WorkspaceList = ({ ingestionCss }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [workspaceData, setWorkspaceData] = React.useState([]);
  const [workspaceId, setWorkspaceId] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);

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
        message.error([data?.error]);
      }
    }
  };

  useEffect(() => {
    getWorkSpaceData();
  }, []);

  return (
    <>
      <Modal
        title="Environment"
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
        width={"70%"}
        destroyOnClose
      >
        <EnvironmentList
          ingestionCss={ingestionCss}
          workspaceId={workspaceId}
        />
      </Modal>

      <div className={ingestionCss.workspaceHeader}>
        <h1>Workspaces</h1>

        <Row>
          <Col span={24}>
            <Button className={ingestionCss.button}>
              <span
                style={{ fontSize: "1.2vw" }}
                onClick={() => {
                  router.push("create-workspace");
                }}
              >
                <PlusOutlined /> Create Workspace
              </span>
            </Button>
          </Col>
        </Row>
      </div>

      <Table
        pagination={{
          onChange(current, pageSize) {
            setPage(current);
          },
        }}
        dataSource={workspaceData}
        columns={[
          {
            title: "#",
            key: "index",
            render: (text, record, index) => (page - 1) * 10 + index + 1,
          },
          {
            title: "Workspace Name",
            dataIndex: "workspace_name",
            key: "workspace_name",
            render: (text, record, index) => {
              return (
                <a
                  onClick={() => {
                    localStorage.setItem("workspace", record?.workspace_id);
                    dispatch(setWorkspaceAction(record?.workspace_id));
                    router.push("/ingestion/");
                  }}
                >
                  {text}
                </a>
              );
            },
          },
          {
            title: "Description",
            dataIndex: "description",
            key: "workspace_description",
          },
          {
            title: "Created Date",
            key: "creationDateTime",
            render: (_, record) => (
              <span>{changeDateFormat(record.create_dt_time)}</span>
            ),
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
                  title={"Edit Workspace"}
                  key={(Math.random() + 1).toString(36).substring(7)}
                >
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(
                        "update-workspace?workspace=" + record?.workspace_id
                      );
                    }}
                  >
                    <EditOutlined />
                  </a>
                </Tooltip>
                <Tooltip
                  placement="top"
                  title={"View Environments"}
                  key={(Math.random() + 1).toString(36).substring(7)}
                >
                  <a
                    onClick={(e) => {
                      setWorkspaceId(record?.workspace_id);
                      e.preventDefault();
                      setIsModalOpen(true);
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
      />
    </>
  );
};

export default WorkspaceList;
