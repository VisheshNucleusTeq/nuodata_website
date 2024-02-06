import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Space,
  Table,
  Tooltip,
  message,
  Divider,
} from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetch_retry_get,
  fetch_retry_post,
  fetch_retry_put,
} from "../../../network/api-manager";
import {
  GETCONNECTION,
  TESTCONNECTION,
  ADDCONNECTION,
  GETCONNECTIONDETAIL,
} from "../../../network/apiConstants";
import { loderShowHideAction } from "../../../Redux/action";
import { decryptAES_CBC, encryptAES_CBC } from "../../helper/cryptojs";
import { getFileName } from "../../helper/getFileName";
const ConnectionTable = ({
  type,
  workspace,
  ingestionCss,
  title,
  connection_detail,
  connectionType,
  setConnectionType,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [connectionData, setConnectionData] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [updateRecordId, setUpdateRecordId] = React.useState(null);

  const getConnectionData = async () => {
    const result = await fetch_retry_get(
      `${GETCONNECTION}${type}?workspace_id=${workspace}`
    );
    if (result.success) {
      setConnectionData(result.data);
    }
  };

  const addConnection = async (data) => {
    dispatch(loderShowHideAction(true));
    const keyArr = [...Object.keys(connection_detail)];
    keyArr.map((e) => {
      if (connection_detail[e]) {
        data[e] = encryptAES_CBC(data[e]);
      }
    });
    const result = await fetch_retry_post(TESTCONNECTION, {
      type: type,
      connection_detail: data,
    });
    if (result.success) {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const result = await fetch_retry_post(ADDCONNECTION, {
        type: type,
        connection_detail: data,
        org_id: authData?.orgId,
        workspace_id: workspace,
      });
      if (result.success) {
        message.success(result?.data?.message);
        form.resetFields();
        setIsModalOpen(false);
        getConnectionData();
      }
      dispatch(loderShowHideAction(false));
    } else {
      dispatch(loderShowHideAction(false));
    }
  };

  const updateConnection = async (data) => {
    dispatch(loderShowHideAction(false));
    const keyArr = [...Object.keys(connection_detail)];
    keyArr.map((e) => {
      if (connection_detail[e]) {
        if (data[e].trim()) {
          data[e] = encryptAES_CBC(data[e]);
        } else {
          delete data[e];
        }
      }
    });

    const result = await fetch_retry_post(TESTCONNECTION, {
      type: type,
      connection_id: updateRecordId,
      connection_detail: data,
    });
    if (result.success) {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const result = await fetch_retry_put(
        `${ADDCONNECTION}${updateRecordId}`,
        {
          connection_id: updateRecordId,
          type: type,
          connection_detail: data,
          org_id: authData?.orgId,
          workspace_id: workspace,
        }
      );
      if (result.success) {
        setUpdateRecordId(null);
        message.success(result?.data?.message);
        form.resetFields();
        setIsModalOpen(false);
        getConnectionData();
      }
      dispatch(loderShowHideAction(false));
    } else {
      dispatch(loderShowHideAction(false));
    }
  };

  const setExistingRecord = async () => {
    const result = await fetch_retry_get(
      `${GETCONNECTIONDETAIL}${updateRecordId}?workspace_id=${workspace}`
    );
    let dataValue = result?.data?.connection_detail;
    const keyArr = [...Object.keys(connection_detail)];
    keyArr.map((e) => {
      if (connection_detail[e]) {
        // dataValue[e] = decryptAES_CBC(dataValue[e]);
        dataValue[e] = "";
      }
    });
    form.setFieldsValue(dataValue);
  };

  const createTitle = (str) => {
    const arr = str.split("_");
    for (var i = 0; i < arr.length; i++) {
      if (["and", "or"].includes(arr[i])) {
        arr[i] = arr[i];
      } else {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }
    }
    const str2 = arr.join(" ");
    return str2;
  };

  const createField = (key) => {
    return (
      <Form.Item
        label={createTitle(key)}
        labelAlign={"left"}
        name={key}
        rules={
          (!connection_detail[key] && updateRecordId) || !updateRecordId
            ? [
                {
                  required: true,
                  message: createTitle(key) + " is required.",
                },
              ]
            : []
        }
      >
        <Input
          className="input"
          key={"input_" + key}
          name={key}
          type={"text"}
          placeholder={createTitle(key)}
          onChange={() => {
            // setIsTested(false);
          }}
        />
      </Form.Item>
    );
  };

  useEffect(() => {
    if (workspace && type) {
      getConnectionData();
    }
  }, [workspace, type]);

  useEffect(() => {
    form.resetFields();
    if (updateRecordId) {
      setExistingRecord();
    }
  }, [updateRecordId]);

  useEffect(() => {
    if (connectionType && connectionType == type) {
      setUpdateRecordId(null);
      setIsModalOpen(true);
      form.resetFields();
      setConnectionType(null);
    }
  }, [connectionType]);

  return (
    <div>
      {connectionType}
      {connectionData && connectionData.length > 0 && (
        <>
          <Modal
            title={`${updateRecordId ? "Update " : "Add New "}  Connection`}
            open={isModalOpen}
            onOk={async () => {
              try {
                const data = await form.validateFields();
                updateRecordId ? updateConnection(data) : addConnection(data);
              } catch (error) {}
            }}
            onCancel={() => {
              setIsModalOpen(false);
            }}
            closable={true}
            centered
            destroyOnClose
            okText={updateRecordId ? "Update" : "Save"}
            okButtonProps={{
              style: { backgroundColor: "#e74860", borderColor: "#e74860" },
            }}
          >
            <Form
              layout="vertical"
              form={form}
              autoComplete="on"
              onFinish={(e) => {}}
              initialValues={{}}
              style={{ maxHeight: "70vh", overflowY: "scroll" }}
            >
              <div className={ingestionCss.formHeight}>
                {Object.keys(connection_detail).map((e) => {
                  return createField(e);
                })}
              </div>
            </Form>
          </Modal>

          <Table
            columns={[
              {
                title: "#",
                key: "sno",
                width: 50,
                render: (text, object, index) => {
                  return index + 1;
                },
              },
              {
                title: "Connection Name",
                dataIndex: "connection_name",
                render: (text) => <span>{text}</span>,
              },
              {
                width: 100,
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
                        title={"Edit Connection"}
                        key={(Math.random() + 1).toString(36).substring(7)}
                      >
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            setIsModalOpen(true);
                            setUpdateRecordId(record?._id);
                          }}
                        >
                          <EditOutlined />
                        </a>
                      </Tooltip>
                    </Space>
                  );
                },
              },
            ]}
            dataSource={[...connectionData]}
            bordered
            title={() => {
              return (
                <>
                  <Row>
                    <Col
                      span={12}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Image
                        src={`/db_icon/${getFileName(type)}.png`}
                        width={35}
                        style={{
                          borderRadius: "25px",
                          padding: "2px",
                        }}
                      />
                      &nbsp;
                      <b style={{ color: "#e74860" }}>{title}</b>
                    </Col>
                    <Col span={12}>
                      {/* <Button
                        className={ingestionCss.backButton}
                        onClick={() => {
                          setUpdateRecordId(null);
                          setIsModalOpen(true);
                          form.resetFields();
                        }}
                      >
                        Add New connection
                      </Button> */}
                    </Col>
                  </Row>
                </>
              );
            }}
            pagination={false}
          />
          <Divider style={{ borderColor: "#FFF" }}></Divider>
        </>
      )}
    </div>
  );
};

export default ConnectionTable;
