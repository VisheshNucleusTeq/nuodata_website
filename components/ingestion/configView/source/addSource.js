import { useRouter } from "next/router";

import {
  FileDoneOutlined,
  FormOutlined,
  UnorderedListOutlined,
  LinkOutlined,
  FilterOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Col,
  Image,
  Row,
  Space,
  Button,
  Form,
  Input,
  Collapse,
  Checkbox,
  Select,
  message,
  Tooltip,
} from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { INGESTIONTCONNECTIONLIST, GETCONNECTION } from "../../../../network/apiConstants";
import {
  fetch_retry_get,
  fetch_retry_post,
  fetch_retry_put,
} from "../../../../network/api-manager";

import { encryptAES_CBC, decryptAES_CBC } from "../../../helper/cryptojs";
import {
  TESTCONNECTION,
  ADDCONNECTION,
  GETCONNECTIONDETAILS,
  GETCONNECTIONDETAIL
} from "../../../../network/apiConstants";
import { loderShowHideAction } from "../../../../Redux/action";

const AddSource = ({
  ingestionCss,
  connection
}) => {
  const workspace = useSelector(
    (state) => state?.workspace?.workspace
  );
  const route = useRouter();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [advanced, setAdvanced] = useState([
    {
      label: "Include Tables",
      value: "include_tables",
      style: { width: "19%" },
    },
    { label: "Include Views", value: "include_views", style: { width: "19%" } },
    {
      label: "Enable Table Profiling",
      value: "enable_table_profiling",
      style: { width: "19%" },
    },
    {
      label: "Enable Column Profiling",
      value: "enable_column_profiling",
      style: { width: "19%" },
    },
    {
      label: "Enable Stateful Ingestion",
      value: "enable_stateful_ingestion",
      style: { width: "19%" },
    },
  ]);
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
        rules={[
          {
            required: true,
            message: createTitle(key) + " is required.",
          },
        ]}
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

  const onChange = (list) => {
    setAdvancedSelected(list);
  };

  const getExistingConnections = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const result = await fetch_retry_get(
      `${GETCONNECTION}${connection?.type}?workspace_id=${workspace}`
    );
    if (result.success) {
      setExistingConnections(result.data);
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
    });
    if (result.success) {
      setIsTested(true);
      message.success(result?.data?.message);
    } else {
      message.error(result?.error ? result?.error : "Something going wrong.");
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
        workspace_id : workspace
      });
      if (result.success) {
        message.success(result?.data?.message);
        getExistingConnections();
        form.resetFields();
      } else {
        message.error(result?.error ? result?.error : "Something going wrong.");
      }
      dispatch(loderShowHideAction(false));
    } else {
      dispatch(loderShowHideAction(false));
      message.error(result?.error ? result?.error : "Something going wrong.");
    }
  };

  const updateConnection = async (data) => {
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
      const result = await fetch_retry_put(`${ADDCONNECTION}${updateRecordId}`, {
        connection_id: updateRecordId,
        type: connection?.type,
        connection_detail: data,
        org_id: authData?.orgId,
        workspace_id : workspace
      });
      if (result.success) {
        setFormType("NEW");
        setUpdateRecordId(null);
        message.success(result?.data?.message);
        getExistingConnections();
        form.resetFields();
      } else {
        message.error(result?.error ? result?.error : "Something going wrong.");
      }
      dispatch(loderShowHideAction(false));
    } else {
      dispatch(loderShowHideAction(false));
      message.error(result?.error ? result?.error : "Something going wrong.");
    }
  };

  const getExistingConnectionDetails = async (data) => {
    dispatch(loderShowHideAction(true));
    const authData = JSON.parse(localStorage.getItem("authData"));
    const result = await fetch_retry_get(
      `${GETCONNECTIONDETAIL}${data?.existingConnections}?workspace_id=${workspace}`
    );
    let dataValue = result?.data?.connection_detail;
    const keyArr = [...Object.keys(connection?.connection_detail)];
    keyArr.map((e) => {
      if (connection?.connection_detail[e]) {
        dataValue[e] = decryptAES_CBC(decryptAES_CBC(dataValue[e]));
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
    const authData = JSON.parse(localStorage.getItem("authData"));
    const result = await fetch_retry_get(
      `${GETCONNECTIONDETAIL}${updateRecordId}?workspace_id=${workspace}`
    );
    let dataValue = result?.data?.connection_detail;
    const keyArr = [...Object.keys(connection?.connection_detail)];
    keyArr.map((e) => {
      if (connection?.connection_detail[e]) {
        dataValue[e] = decryptAES_CBC(decryptAES_CBC(dataValue[e]));
      }
    });
    form.setFieldsValue(dataValue);
  };

  const formValid = () => {};

  useEffect(() => {
    form.resetFields();
    if (updateRecordId) {
      setExistingRecord();
    }
  }, [updateRecordId]);

  return (
    <>
      <Row>
        <Col span={8} className={ingestionCss.addSourceImage}>
          <Space size={20}>
            <Image src={connection.logo_url} />
            <span>{connection.title}</span>
          </Space>
        </Col>
        {/* {workspace} */}

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
                Select a existing {connection.title} connection
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
              }}
            >
              Form
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
                      >
                        <Select
                          placeholder="Select Existing Connections"
                          options={[...existingConnections].map((e) => {
                            return {
                              label: e?.connection_name,
                              value: e?.connection_id,
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
                          // type="primary"
                          shape="round"
                          onClick={async () => {
                            try {
                              const data = await form.validateFields();
                              setFormType("NEW");
                              setUpdateRecordId(data?.existingConnections);
                            } catch (error) {
                              dispatch(loderShowHideAction(false));
                              console.log("Validation Error");
                            }
                          }}
                          disabled={selectedRecordId == null}
                          style={
                            selectedRecordId == null
                              ? {}
                              : { backgroundColor: "#0c3246", color: "#FFF" }
                          }
                        >
                          Update Connection
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
                          Test Connection
                        </Button>

                        {/* <Button
                          shape="round"
                          style={{ backgroundColor: "#0c3246", color: "#FFF" }}
                          onClick={() => {
                            route.back();
                          }}
                        >
                          Cancel
                        </Button> */}
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
                    // layout="vertical"
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
                                } catch (error) {
                                  console.log("not valid");
                                }
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
                              Update Connection
                            </Button>
                          ) : (
                            <Button
                              type="primary"
                              shape="round"
                              onClick={async () => {
                                try {
                                  const data = await form.validateFields();
                                  addConnection(data);
                                } catch (error) {
                                  console.log("not valid");
                                }
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
                              Add Connection
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
                          Test Connection
                        </Button>
                        {/* <Button
                          shape="round"
                          style={{ backgroundColor: "#0c3246", color: "#FFF" }}
                          onClick={() => {
                            route.back();
                          }}
                        >
                          Cancel
                        </Button> */}
                      </Space>
                    </div>
                  </Form>
                </div>
              </Collapse.Panel>
            )}

            <Collapse.Panel
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
            </Collapse.Panel>
          </Collapse>
        </Col>
      </Row>
    </>
  );
};

export default AddSource;
