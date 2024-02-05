import {
  EditOutlined,
  FormOutlined,
  LinkOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  Form,
  Image,
  Input,
  Row,
  Select,
  Space,
  Tooltip,
  message,
} from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetch_retry_get,
  fetch_retry_post,
  fetch_retry_put,
} from "../../../../network/api-manager";
import { GETCONNECTION } from "../../../../network/apiConstants";

import { loderShowHideAction } from "../../../../Redux/action";
import {
  ADDCONNECTION,
  GETCONNECTIONDETAIL,
  TESTCONNECTION,
} from "../../../../network/apiConstants";
import { decryptAES_CBC, encryptAES_CBC } from "../../../helper/cryptojs";
import { getFileName } from "../../../helper/getFileName";

const AddSource = ({
  ingestionCss,
  connection,
  connectionId,
  setConnectionId,
  setActiveKey,
  setConnection,
  oldConnection,
  setOldConnection,
}) => {
  const workspace = useSelector((state) => state?.workspace?.workspace);
  const route = useRouter();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [advancedSelected, setAdvancedSelected] = useState([]);
  const [field, setField] = useState({});
  const [formType, setFormType] = useState("NEW");
  const [existingConnections, setExistingConnections] = useState([]);
  const [updateRecordId, setUpdateRecordId] = useState(null);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [isTested, setIsTested] = useState(false);

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
          (!field[key] && updateRecordId) || !updateRecordId
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
            setIsTested(false);
          }}
        />
      </Form.Item>
    );
  };

  const getExistingConnections = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const result = await fetch_retry_get(
      `${GETCONNECTION}${connection?.type}?workspace_id=${workspace}`
    );
    if (result.success) {
      setExistingConnections(result.data);
      if (result.data.length) {
        setFormType("EXISTING");
      }
    }
  };

  const testConnection = async (data) => {
    dispatch(loderShowHideAction(true));
    const keyArr = [...Object.keys(connection?.connection_detail)];
    keyArr.map((e) => {
      if (connection?.connection_detail[e]) {
        data[e] = encryptAES_CBC(data[e]);
      }
    });
    const result = await fetch_retry_post(TESTCONNECTION, {
      type: connection?.type,
      connection_detail: data,
      connection_id: updateRecordId ? updateRecordId : connectionId,
    });
    if (result.success) {
      setIsTested(true);
      message.success(result?.data?.message);
    }
    dispatch(loderShowHideAction(false));
  };

  const addConnection = async (data) => {
    dispatch(loderShowHideAction(true));
    const keyArr = [...Object.keys(connection?.connection_detail)];
    keyArr.map((e) => {
      if (connection?.connection_detail[e]) {
        data[e] = encryptAES_CBC(data[e]);
      }
    });
    const result = await fetch_retry_post(TESTCONNECTION, {
      type: connection?.type,
      connection_detail: data,
    });
    if (result.success) {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const result = await fetch_retry_post(ADDCONNECTION, {
        type: connection?.type,
        connection_detail: data,
        org_id: authData?.orgId,
        workspace_id: workspace,
      });
      if (result.success) {
        message.success(result?.data?.message);
        getExistingConnections();
        form.resetFields();
        setConnectionId(result?.data?.data?.id);
      }
      dispatch(loderShowHideAction(false));
    } else {
      dispatch(loderShowHideAction(false));
    }
  };

  const updateConnection = async (data) => {
    dispatch(loderShowHideAction(true));
    const keyArr = [...Object.keys(connection?.connection_detail)];
    keyArr.map((e) => {
      if (connection?.connection_detail[e]) {
        if (data[e].trim()) {
          data[e] = encryptAES_CBC(data[e]);
        } else {
          delete data[e];
        }
      }
    });
    const result = await fetch_retry_post(TESTCONNECTION, {
      type: connection?.type,
      connection_detail: data,
      connection_id: updateRecordId,
    });
    if (result.success) {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const result = await fetch_retry_put(
        `${ADDCONNECTION}${updateRecordId}`,
        {
          connection_id: updateRecordId,
          type: connection?.type,
          connection_detail: data,
          org_id: authData?.orgId,
          workspace_id: workspace,
        }
      );
      if (result.success) {
        setFormType("NEW");
        setUpdateRecordId(null);
        message.success(result?.data?.message);
        getExistingConnections();
        form.resetFields();
      }
      dispatch(loderShowHideAction(false));
    } else {
      dispatch(loderShowHideAction(false));
    }
  };

  const getExistingConnectionDetails = async (data) => {
    dispatch(loderShowHideAction(true));
    const authData = JSON.parse(localStorage.getItem("authData"));
    const result = await fetch_retry_get(
      `${GETCONNECTIONDETAIL}${data?.existingConnections}?workspace_id=${workspace}`
    );
    setConnectionId(data?.existingConnections);
    let dataValue = result?.data?.connection_detail;
    const keyArr = [...Object.keys(connection?.connection_detail)];
    keyArr.map((e) => {
      if (connection?.connection_detail[e]) {
        dataValue[e] = decryptAES_CBC(dataValue[e]);
      }
    });
    testConnection(dataValue);
  };

  useEffect(() => {
    connection && connection.connection_detail
      ? setField(connection.connection_detail)
      : null;
    getExistingConnections();
  }, [connection]);

  const setExistingRecord = async () => {
    const result = await fetch_retry_get(
      `${GETCONNECTIONDETAIL}${updateRecordId}?workspace_id=${workspace}`
    );
    let dataValue = result?.data?.connection_detail;
    const keyArr = [...Object.keys(connection?.connection_detail)];
    keyArr.map((e) => {
      if (connection?.connection_detail[e]) {
        // dataValue[e] = decryptAES_CBC(dataValue[e]);
        dataValue[e] = "";
      }
    });
    form.setFieldsValue(dataValue);
  };

  useEffect(() => {
    form.resetFields();
    if (updateRecordId) {
      setExistingRecord();
      setConnectionId(updateRecordId);
    }
  }, [updateRecordId]);

  useEffect(() => {
    if (connectionId) {
      setConnectionId(connectionId);
      setSelectedRecordId(connectionId);
      // setFormType("EXISTING");
      form.setFieldsValue({
        existingConnections: connectionId,
      });
    }
  }, [connectionId]);

  return (
    <>
      <Row>
        <Col span={8} className={ingestionCss.addSourceImage}>
          <Space size={20}>
            <Image src={`/db_icon/${getFileName(connection.type)}.png`} />
            <b>
              {connection.title} &nbsp;&nbsp;
              <span
                style={{ cursor: "pointer", color: "#e74860" }}
                onClick={() => {
                  setOldConnection(connection);
                  setConnection({});
                }}
              >
                <EditOutlined />
                &nbsp; Change source
              </span>
            </b>
          </Space>
        </Col>

        <Col span={16} align={"end"}>
          <Space size={20}>
            {existingConnections.length > 0 && (
              <Button
                ghost
                type="primary"
                icon={<UnorderedListOutlined />}
                className={`${
                  formType === "EXISTING"
                    ? ingestionCss.addSourceBtnActive
                    : ingestionCss.addSourceBtn
                }`}
                onClick={() => {
                  setFormType("EXISTING");
                  setUpdateRecordId(null);
                  setSelectedRecordId(null);
                  setIsTested(false);
                }}
              >
                Select an existing {connection.title.toLowerCase()} connection
              </Button>
            )}

            <Button
              ghost
              type="primary"
              icon={<FormOutlined />}
              className={`${
                formType === "NEW"
                  ? ingestionCss.addSourceBtnActive
                  : ingestionCss.addSourceBtn
              }`}
              onClick={() => {
                setFormType("NEW");
                setUpdateRecordId(null);
                setSelectedRecordId(null);
                setIsTested(false);
                setConnectionId(null);
              }}
            >
              Add a new {connection.title.toLowerCase()} connection
            </Button>
          </Space>
        </Col>
      </Row>

      <Row style={{ marginTop: "2vw" }}>
        <Col span={24}>
          <Collapse
            defaultActiveKey={["col_0", "col_1"]}
            onChange={() => {}}
            expandIconPosition="right"
          >
            {formType == "EXISTING" && (
              <Collapse.Panel
                header={
                  <div style={{ color: "#0c3246" }}>
                    <LinkOutlined /> &nbsp; Existing {connection.title}{" "}
                    Connections
                  </div>
                }
                key="col_0"
              >
                <div>
                  <Form
                    form={form}
                    layout="vertical"
                    autoComplete="on"
                    onFinish={(e) => {
                      getExistingConnectionDetails(e);
                    }}
                    initialValues={{}}
                  >
                    <div className={ingestionCss.formHeight}>
                      <Form.Item
                        label={"Existing Connections"}
                        labelAlign={"left"}
                        name={"existingConnections"}
                        rules={[
                          {
                            required: true,
                            message: "Existing Connections is required.",
                          },
                        ]}
                        key={"source_Existing_Connections"}
                      >
                        <Select
                          className="inputSelect"
                          placeholder="Select Existing Connections"
                          options={[...existingConnections].map((e) => {
                            return {
                              label: e?.connection_name,
                              value: e?._id,
                            };
                          })}
                          onChange={(e) => {
                            setSelectedRecordId(e);
                          }}
                        />
                      </Form.Item>
                    </div>

                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <Space>
                        <Button
                          shape="round"
                          onClick={async () => {
                            try {
                              const data = await form.validateFields();
                              setFormType("NEW");
                              setUpdateRecordId(data?.existingConnections);
                            } catch (error) {
                              dispatch(loderShowHideAction(false));
                            }
                          }}
                          disabled={selectedRecordId == null}
                          style={
                            selectedRecordId == null
                              ? {}
                              : { backgroundColor: "#0c3246", color: "#FFF" }
                          }
                        >
                          Edit connection
                        </Button>
                        <Button
                          type="primary"
                          danger
                          htmlType="submit"
                          shape="round"
                          disabled={selectedRecordId == null}
                          style={
                            selectedRecordId == null
                              ? {}
                              : { backgroundColor: "#e74860", color: "#FFF" }
                          }
                        >
                          Test connection
                        </Button>

                        {connectionId && isTested && (
                          <Button
                            type="primary"
                            shape="round"
                            style={{
                              backgroundColor: "#0c3246",
                              color: "#FFF",
                            }}
                            onClick={() => {
                              setActiveKey("schema_tab");
                            }}
                          >
                            Select target dataset
                          </Button>
                        )}
                      </Space>
                    </div>
                  </Form>
                </div>
              </Collapse.Panel>
            )}

            {formType == "NEW" && (
              <Collapse.Panel
                header={
                  <div style={{ color: "#0c3246" }}>
                    <LinkOutlined /> &nbsp; Connection Details
                  </div>
                }
                key="col_1"
              >
                <div>
                  <Form
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
                    form={form}
                    autoComplete="on"
                    onFinish={(e) => {
                      testConnection(e);
                    }}
                    initialValues={{}}
                  >
                    <div className={ingestionCss.formHeight}>
                      {Object.keys(field).map((e) => {
                        return createField(e);
                      })}
                    </div>

                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <Space>
                        <Tooltip
                          placement="top"
                          title={!isTested ? "First Test Connection " : null}
                        >
                          {updateRecordId ? (
                            <Button
                              type="primary"
                              shape="round"
                              onClick={async () => {
                                try {
                                  const data = await form.validateFields();
                                  updateConnection(data);
                                } catch (error) {}
                              }}
                              disabled={!isTested}
                              style={
                                isTested
                                  ? {
                                      backgroundColor: "#0c3246",
                                      color: "#FFF",
                                    }
                                  : {}
                              }
                            >
                              Edit Connection
                            </Button>
                          ) : (
                            <Button
                              type="primary"
                              shape="round"
                              onClick={async () => {
                                try {
                                  const data = await form.validateFields();
                                  addConnection(data);
                                } catch (error) {}
                              }}
                              disabled={!isTested}
                              style={
                                isTested
                                  ? {
                                      backgroundColor: "#0c3246",
                                      color: "#FFF",
                                    }
                                  : {}
                              }
                            >
                              Add connection
                            </Button>
                          )}
                        </Tooltip>
                        <Button
                          type="primary"
                          danger
                          htmlType="submit"
                          shape="round"
                          style={{ backgroundColor: "#e74860", color: "#FFF" }}
                        >
                          Test connection
                        </Button>

                        {connectionId && isTested && (
                          <Button
                            type="primary"
                            shape="round"
                            style={{
                              backgroundColor: "#0c3246",
                              color: "#FFF",
                            }}
                            onClick={() => {
                              setActiveKey("schema_tab");
                            }}
                          >
                            Select target dataset
                          </Button>
                        )}
                      </Space>
                    </div>
                  </Form>
                </div>
                {/* <Row>
                  <Col span={16}>dsfsf</Col>
                  <Col span={8}>sdfsd</Col>
                </Row> */}
              </Collapse.Panel>
            )}

            {/* <Collapse.Panel
              header={
                <div style={{ color: "#0c3246" }}>
                  <FilterOutlined /> &nbsp; Filter
                </div>
              }
              key="col_2"
            >
              <p>{"text"}</p>
            </Collapse.Panel>
            <Collapse.Panel
              header={
                <div style={{ color: "#0c3246" }}>
                  <SettingOutlined /> &nbsp; Advanced
                </div>
              }
              key="col_4"
            >
              <Checkbox.Group
                style={{ width: "100%" }}
                options={advanced}
                value={[...advancedSelected]}
                onChange={onChange}
              />
            </Collapse.Panel> */}
          </Collapse>
        </Col>
      </Row>
    </>
  );
};

export default AddSource;
