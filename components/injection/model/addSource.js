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
} from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { INGESTIONTCONNECTIONLIST } from "../../../network/apiConstants";
import { fetch_retry_get } from "../../../network/api-manager";

const AddSource = ({ injectionPipelineCss, connection }) => {
  const [form] = Form.useForm();
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
          key={"input_" + key}
          name={key}
          type={"text"}
          placeholder={createTitle(key)}
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
      `${INGESTIONTCONNECTIONLIST}?type=${connection?.type}&org_id=${authData?.orgId}`
    );
    if (result.success) {
      setExistingConnections(result.data);
    }
    console.log(result);
  };

  useEffect(() => {
    setField(connection.connection_details);
    getExistingConnections();
  }, [connection]);

  return (
    <>
      <Row>
        <Col span={8} className={injectionPipelineCss.addSourceImage}>
          <Space size={20}>
            <Image src={connection.logo_url} />
            <span>{connection.title}</span>
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
                    ? injectionPipelineCss.addSourceBtnActive
                    : injectionPipelineCss.addSourceBtn
                }`}
                onClick={() => {
                  setFormType("EXISTING");
                }}
              >
                Select a existing {connection.title} connction
              </Button>
            )}

            <Button
              ghost
              type="primary"
              icon={<FormOutlined />}
              className={`${
                formType === "NEW"
                  ? injectionPipelineCss.addSourceBtnActive
                  : injectionPipelineCss.addSourceBtn
              }`}
              onClick={() => {
                setFormType("NEW");
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
                    <LinkOutlined /> &nbsp; Existing Postgres Connections
                  </div>
                }
                key="col_0"
              >
                <div>
                  <Form
                    form={form}
                    layout="vertical"
                    autoComplete="on"
                    onFinish={() => {
                      alert(1);
                    }}
                    initialValues={{}}
                  >
                    <div className={injectionPipelineCss.formHeight}>
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
                          onChange={(e) => {
                            alert(e);
                          }}
                          options={[...existingConnections].map((e) => {
                            return {
                              label: e?.connection_name,
                              value: e?.connection_id,
                            };
                          })}
                        />
                      </Form.Item>
                    </div>

                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <Button
                        type="primary"
                        danger
                        htmlType="submit"
                        shape="round"
                      >
                        Test Source Connections
                      </Button>
                    </div>
                  </Form>
                </div>
              </Collapse.Panel>
            )}

            {formType == "NEW" && (
              <Collapse.Panel
                header={
                  <div style={{ color: "#0c3246" }}>
                    <LinkOutlined /> &nbsp; Connections
                  </div>
                }
                key="col_1"
                extra={
                  <div>
                    <Space size={20}>
                      <div onClick={(e) => e.stopPropagation()}>
                        <button
                          style={{ borderRadius: "10px" }}
                          onClick={() => {
                            alert("add DB");
                          }}
                        >
                          Add DB
                        </button>
                      </div>
                      <p></p>
                    </Space>
                  </div>
                }
              >
                <div>
                  <Form
                    form={form}
                    layout="vertical"
                    autoComplete="on"
                    onFinish={() => {
                      alert(1);
                    }}
                    initialValues={{}}
                  >
                    <div className={injectionPipelineCss.formHeight}>
                      {Object.keys(field).map((e) => {
                        return createField(e);
                      })}
                    </div>

                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <Button
                        type="primary"
                        danger
                        htmlType="submit"
                        shape="round"
                      >
                        Test Source Connections
                      </Button>
                    </div>
                  </Form>
                </div>
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
