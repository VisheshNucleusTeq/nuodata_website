import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Space, Table, Tooltip, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { loderShowHideAction } from "../../../Redux/action";
import {
  fetch_retry_get,
  fetch_retry_post,
  fetch_retry_put,
} from "../../../network/api-manager";
import {
  ADDRUNTIMEENV,
  ENVDETAILS,
  GETWORKSPACEENV,
} from "../../../network/apiConstants";
import AddEnvironment from "./addEnvironment";
const EnvironmentList = ({ ingestionCss, workspaceId }) => {
  const dispatch = useDispatch();
  const [environmentList, setEnvironmentList] = React.useState([]);
  const [environmentDetails, setEnvironmentDetails] = React.useState({});
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const changeDateFormat = (date) => {
    const dt = new Date(date);
    const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
    return `${padL(dt.getMonth() + 1)}/${padL(
      dt.getDate()
    )}/${dt.getFullYear()} ${padL(dt.getHours())}:${padL(
      dt.getMinutes()
    )}:${padL(dt.getSeconds())}`;
  };

  const getEnvList = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const envList = await fetch_retry_get(
      `${GETWORKSPACEENV}${workspaceId}?org_id=${authData.orgId}`
    );
    setEnvironmentList(envList?.data);
    dispatch(loderShowHideAction(false));
  };

  const getEnvData = async (runtime_env_id) => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const envDetails = await fetch_retry_get(
      `${ENVDETAILS}${runtime_env_id}?org_id=${authData.orgId}&workspace_id=${workspaceId}`
    );
    if (envDetails.success) {
      setEnvironmentDetails(envDetails?.data);
      setIsModalOpen(true);
    } else {
      // message.error([envDetails?.error]);
      console.log([envDetails?.error]);
    }
  };

  const addEnvironmentAction = async (data) => {
    let obj = environmentList.find((o) => o.name === data?.name);
    if (obj) {
      message.error(
        "Environment Name must be unique. Please specify another Name"
      );
    } else {
      let params = {};
      try {
        params = JSON.parse(data?.params);
      } catch (error) {
        params = data?.params;
      }
      dispatch(loderShowHideAction(true));
      const authData = JSON.parse(localStorage.getItem("authData"));
      const evnData = await fetch_retry_post(`${ADDRUNTIMEENV}`, {
        org_id: authData.orgId,
        created_by: authData.userId,
        workspace_id: workspaceId,
        name: data?.name,
        description: data?.description,
        engine_type: data?.engine_type,
        params: params,
      });

      if (evnData.success) {
        dispatch(loderShowHideAction(false));
        setIsModalOpen(false);
        setEnvironmentDetails({});
        message.success([evnData?.data?.message]);
        getEnvList();
      } else {
        dispatch(loderShowHideAction(false));
        // message.error([evnData?.error]);
        console.log([evnData?.error]);
      }
    }
  };

  const updateEnvData = async (data) => {
    dispatch(loderShowHideAction(true));
    const authData = JSON.parse(localStorage.getItem("authData"));
    let params = {};
    try {
      params = JSON.parse(data?.params);
    } catch (error) {
      params = data?.params;
    }
    const updateEnv = await fetch_retry_put(
      `${ADDRUNTIMEENV}${environmentDetails?.runtime_env_id}`,
      {
        org_id: authData.orgId,
        created_by: authData.userId,
        workspace_id: workspaceId,
        name: data?.name,
        description: data?.description,
        engine_type: data?.engine_type,
        params: params,
      }
    );
    if (updateEnv.success) {
      dispatch(loderShowHideAction(false));
      setIsModalOpen(false);
      setEnvironmentDetails({});
      message.success([updateEnv?.data?.message]);
    } else {
      dispatch(loderShowHideAction(false));
      // message.error([updateEnv?.error]);
      console.log([updateEnv?.error]);
    }
  };

  useEffect(() => {
    dispatch(loderShowHideAction(true));
    getEnvList();
  }, []);

  return (
    <>
      <Modal
        title="Update Runtime Environment"
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
          setEnvironmentDetails({});
        }}
        onCancel={() => {
          setIsModalOpen(false);
          setEnvironmentDetails({});
        }}
        footer={null}
        width={"80%"}
        destroyOnClose
        centered
      >
        <AddEnvironment
          ingestionCss={ingestionCss}
          addEnvironmentAction={(e) => {
            Object.keys(environmentDetails).length > 0
              ? updateEnvData(e)
              : addEnvironmentAction(e);
          }}
          environmentDetails={environmentDetails}
        />
      </Modal>

      <Row>
        <Col span={24}>
          <Button
            type="primary"
            danger
            className={ingestionCss.addnewEnv}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Add new runtime environment
          </Button>
        </Col>
        <br />
        <br />
        <br />
        <Col span={24}>
          <Table
            dataSource={environmentList}
            columns={[
              {
                title: "Runtime Env Name",
                dataIndex: "runtime_env_name",
                key: "runtime_env_name",
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
                      title={"Edit Enviroment"}
                      key={(Math.random() + 1).toString(36).substring(7)}
                    >
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          getEnvData(record?.runtime_env_id);
                        }}
                      >
                        <EditOutlined />
                      </a>
                    </Tooltip>
                  </Space>
                ),
                align: "center",
              },
            ]}
          />
        </Col>
      </Row>
    </>
  );
};

export default EnvironmentList;
