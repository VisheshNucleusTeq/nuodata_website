import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Space,
  Image,
  Select,
  Form,
  Input,
  Radio,
  Button,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  fetch_retry_get,
  fetch_retry_post,
  fetch_retry_put,
} from "../../../../network/api-manager";
import {
  GETCONNECTIONDETAIL,
  CREATENODE,
  RUNPIPELINE,
  CONVERTPIPELINE,
} from "../../../../network/apiConstants";
import { loderShowHideAction } from "../../../../Redux/action";
import { useRouter } from "next/router";

const SourceSchema = ({
  connectionId,
  connection,
  workspace,
  ingestionCss,
  setActiveKey,
  setTableData,
  nodeId,
  sourceData,
  setSourceData,
  setDefaultActiveKey,
}) => {
  const [form] = Form.useForm();
  const [schemas, setSchemas] = useState([]);
  const dispatch = useDispatch();
  const route = useRouter();
  const { query } = useRouter();
  const pipelineData = useSelector((state) => state?.pipeline?.pipeline);

  const [targetType, setTargetType] = useState("exist");

  const getSchema = async () => {
    dispatch(loderShowHideAction(true));
    const authData = JSON.parse(localStorage.getItem("authData"));
    const schemaData = await fetch_retry_get(
      `${GETCONNECTIONDETAIL}${connectionId}/schemas?org_id=${authData?.orgId}&workspace_id=${workspace}&type=${connection?.type}&node_id=${nodeId}`
    );
    setSchemas(schemaData?.data?.schemas);
    dispatch(loderShowHideAction(false));
  };

  const convertPipeline = async (id) => {
    dispatch(loderShowHideAction(true));
    const result = await fetch_retry_post(`${CONVERTPIPELINE}${id}`);
    if (result?.success) {
      dispatch(loderShowHideAction(false));
      message.success(result?.data?.message);
    } else {
      message.error("Something went wrong");
    }
  };

  const runPipeline = async (id) => {
    dispatch(loderShowHideAction(true));
    const result = await fetch_retry_post(`${RUNPIPELINE}${id}`);
    if (result?.success) {
      message.success(result?.data?.message);
    } else {
      message.error("Something went wrong");
    }
    dispatch(loderShowHideAction(false));
  };

  const getTableData = async (type) => {
    try {
      const data = await form.validateFields();
      dispatch(loderShowHideAction(true));
      const authData = JSON.parse(localStorage.getItem("authData"));
      const tableData = await fetch_retry_post(
        `${GETCONNECTIONDETAIL}schema/${data?.table}?org_id=${
          authData?.orgId
        }&workspace_id=${workspace}&connection_id=${connectionId}&type=${
          connection?.type
        }&rows=${data?.rows ? data?.rows : 20}&node_id=${nodeId}`
      );
      setTableData(tableData?.data);

      let transformation_properties = sourceData?.transformation_properties;

      const sourceIndex = transformation_properties.findIndex(
        (item) => item.property_name === "target_table"
      );
      if (sourceIndex < 0) {
        transformation_properties.push({
          property_name: "target_table",
          property_value: data?.table,
        });
      } else {
        transformation_properties[sourceIndex] = {
          property_name: "target_table",
          property_value: data?.table,
        };
      }

      const displayRowsIndex = transformation_properties.findIndex(
        (item) => item.property_name === "display_rows"
      );
      if (displayRowsIndex < 0) {
        transformation_properties.push({
          property_name: "display_rows",
          property_value: data?.rows + "",
        });
      } else {
        transformation_properties[displayRowsIndex] = {
          property_name: "display_rows",
          property_value: data?.rows + "",
        };
      }

      const connectionIndex = transformation_properties.findIndex(
        (item) => item.property_name === "connection_id"
      );
      if (connectionIndex < 0) {
        transformation_properties.push({
          property_name: "connection_id",
          property_value: connectionId,
        });
      } else {
        transformation_properties[connectionIndex] = {
          property_name: "connection_id",
          property_value: connectionId,
        };
      }

      const connectionTypeIndex = transformation_properties.findIndex(
        (item) => item.property_name === "connection_type"
      );
      if (connectionTypeIndex < 0) {
        transformation_properties.push({
          property_name: "connection_type",
          property_value: connection?.type,
        });
      } else {
        transformation_properties[connectionTypeIndex] = {
          property_name: "connection_type",
          property_value: connection?.type,
        };
      }

      const result = await fetch_retry_put(`${CREATENODE}/${nodeId}`, {
        ...sourceData,
        transformation_properties: transformation_properties,
      });
      setSourceData({
        ...sourceData,
        transformation_properties: transformation_properties,
      });
      if (result?.success) {
        message.success(result?.data?.message);
        if (type == "save") {
          route.push("/ingestion");
        } else if (type == "preview") {
          setDefaultActiveKey("preview");
        } else if (type == "run") {
          const id = query?.pipeline ? query?.pipeline : pipelineData;
          await convertPipeline(id);
          await runPipeline(id);
        }
      } else {
        message.error("Something went wrong");
      }
      dispatch(loderShowHideAction(false));
    } catch (error) {
      console.log(error);
    }
  };

  const setOldValue = () => {
    const sourceIndex = sourceData?.transformation_properties.findIndex(
      (item) => item.property_name === "target_table"
    );
    if (sourceIndex >= 0) {
      form.setFieldValue(
        "table",
        sourceData?.transformation_properties[sourceIndex]?.property_value
      );
    }

    const displayRowsIndex = sourceData?.transformation_properties.findIndex(
      (item) => item.property_name === "display_rows"
    );
    if (displayRowsIndex >= 0) {
      form.setFieldValue(
        "rows",
        Number(
          sourceData?.transformation_properties[displayRowsIndex]
            ?.property_value
        )
      );
    } else {
      form.setFieldValue("rows", 10);
    }
  };

  useEffect(() => {
    getSchema();
    setOldValue();
  }, []);

  return (
    <Row>
      <Col span={24} className={ingestionCss.addSourceImage}>
        <Space size={20}>
          <Image src={`/db_icon/${connection.title}.png`} />
          <b>{connection.title}</b>
        </Space>
      </Col>

      <Col span={24} style={{ marginTop: "5vh" }}>
        <Radio.Group
          onChange={(e) => {
            setTargetType(e.target.value);
          }}
          value={targetType}
        >
          <Radio value={"exist"}>Select existing data</Radio>
          <Radio value={"new"}>Create new dataset</Radio>
        </Radio.Group>
      </Col>
      <Col span={24} style={{ marginTop: "5vh" }}>
        <Form
          form={form}
          layout="vertical"
          autoComplete="on"
          onFinish={(e) => {
            getTableData(e);
          }}
        >
          <Row>
            <Col span={12}>
              {targetType == "exist" && (
                <Form.Item
                  label={"Select Source"}
                  labelAlign={"left"}
                  name={"table"}
                  rules={[
                    {
                      required: true,
                      message: "Source is required.",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    name="table"
                    className="inputSelect"
                    placeholder="Select a table"
                    optionFilterProp="children"
                    options={[
                      ...schemas.map((e) => {
                        return {
                          value: e,
                          label: e,
                        };
                      }),
                    ]}
                    style={{ width: "100%" }}
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                  />
                </Form.Item>
              )}
              {targetType == "new" && (
                <Form.Item
                  label={"Select Source"}
                  labelAlign={"left"}
                  name={"table"}
                  rules={[
                    {
                      required: true,
                      message: "Source is required.",
                    },
                  ]}
                >
                  <Input
                    key={"input-source-name"}
                    className={"input"}
                    name={"table"}
                    placeholder="Source Name"
                  />
                </Form.Item>
              )}
            </Col>
            <Col span={2} />
            <Col span={10}>
              <Form.Item
                label={"Display Rows"}
                labelAlign={"left"}
                name={"rows"}
                rules={[
                  {
                    required: true,
                    message: "Display rows is required.",
                  },
                ]}
              >
                <Input
                  type="number"
                  className="input"
                  name={"rows"}
                  defaultValue={10}
                  onChange={(num) => {
                    if (num.target.value > 100) {
                      form.setFieldValue("rows", 100);
                    }
                  }}
                />
              </Form.Item>
            </Col>

            {/* <Col span={24}>
              <Button
                shape="round"
                htmlType="submit"
                style={{
                  backgroundColor: "#e74860",
                  color: "#FFF",
                  float: "right",
                }}
                onClick={() => {}}
              >
                Save
              </Button>
            </Col> */}
          </Row>

          <div style={{ display: "flex", justifyContent: "end" }}>
            <Space>
              <Button
                type="primary"
                className={ingestionCss.defineSave}
                onClick={() => {
                  getTableData("save");
                }}
              >
                Save & exit
              </Button>
              <Button
                type="primary"
                className={ingestionCss.defineSaveAndBuild}
                onClick={() => {
                  getTableData("preview");
                }}
              >
                Save & preview
              </Button>
              <Button
                type="primary"
                className={ingestionCss.defineSaveAndBuild}
                onClick={() => {
                  getTableData("run");
                }}
              >
                Save & run pipeline
              </Button>
            </Space>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default SourceSchema;
