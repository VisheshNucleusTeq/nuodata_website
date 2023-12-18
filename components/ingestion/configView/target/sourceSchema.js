import {
  Button,
  Col,
  Form,
  Image,
  Input,
  message,
  Radio,
  Row,
  Select,
  Space,
} from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetch_retry_get,
  fetch_retry_post,
  fetch_retry_put,
} from "../../../../network/api-manager";
import {
  CONVERTPIPELINE,
  CREATENODE,
  GETCONNECTIONDETAIL,
  RUNPIPELINE,
  NODEMETADATA,
} from "../../../../network/apiConstants";
import { loderShowHideAction } from "../../../../Redux/action";

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
  const [writeMode, setWriteMode] = useState("append");

  const getSchema = async () => {
    dispatch(loderShowHideAction(true));
    const authData = JSON.parse(localStorage.getItem("authData"));
    const schemaData = await fetch_retry_get(
      `${GETCONNECTIONDETAIL}${connectionId}/datasets?org_id=${authData?.orgId}&workspace_id=${workspace}&type=${connection?.type}&node_id=${nodeId}`
    );
    setSchemas(schemaData?.data?.schemas ? schemaData?.data?.schemas : []);
    dispatch(loderShowHideAction(false));
    schemaData?.data?.schemas ? setTargetType("exist") : setTargetType("new");
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
        `${GETCONNECTIONDETAIL}data/${data?.table}?org_id=${
          authData?.orgId
        }&workspace_id=${workspace}&connection_id=${connectionId}&type=${
          connection?.type
        }&rows=${data?.rows ? data?.rows : 20}&node_id=${nodeId}`
      );

      const oldRecordSchema = await fetch_retry_get(
        `${NODEMETADATA}${nodeId}/metadata`
      );
      if (
        (oldRecordSchema?.data?.sample_data &&
          oldRecordSchema?.data?.sample_data.length) ||
        (oldRecordSchema?.data?.fields && oldRecordSchema?.data?.fields.length)
      ) {
        // setActiveKey("fields_tab");
        setTableData(oldRecordSchema?.data);
      }

      // setTableData(tableData?.data);

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

      const targetTypeIndex = transformation_properties.findIndex(
        (item) => item.property_name === "target_type"
      );
      if (targetTypeIndex < 0) {
        transformation_properties.push({
          property_name: "target_type",
          property_value: targetType,
        });
      } else {
        transformation_properties[targetTypeIndex] = {
          property_name: "target_type",
          property_value: targetType,
        };
      }

      const writeModeIndex = transformation_properties.findIndex(
        (item) => item.property_name === "write_mode"
      );
      if (writeModeIndex < 0) {
        transformation_properties.push({
          property_name: "write_mode",
          property_value: writeMode,
        });
      } else {
        transformation_properties[writeModeIndex] = {
          property_name: "write_mode",
          property_value: writeMode,
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
    } catch (error) {}
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

    const targetTypeIndex = sourceData?.transformation_properties.findIndex(
      (item) => item.property_name === "target_type"
    );
    if (sourceIndex >= 0) {
      setTargetType(sourceData?.transformation_properties[targetTypeIndex]?.property_value)
    }

    const writeModeIndex = sourceData?.transformation_properties.findIndex(
      (item) => item.property_name === "write_mode"
    );
    if (writeModeIndex >= 0) {
      console.log(sourceData?.transformation_properties[writeModeIndex]?.property_value)
      setWriteMode(sourceData?.transformation_properties[writeModeIndex]?.property_value)
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
        <Space>
          <b>Write Mode:</b>
          <Radio.Group
            onChange={(e) => {
              setWriteMode(e.target.value);
            }}
            value={writeMode}
          >
            <Radio value={"append"}>Append</Radio>
            <Radio value={"overwrite"}>Overwrite</Radio>
          </Radio.Group>
        </Space>
      </Col>

      <Col span={24} style={{ marginTop: "5vh" }}>
        <Radio.Group
          onChange={(e) => {
            // form.setFieldValue("table", "");
            setTargetType(e.target.value);
            // setOldValue()
          }}
          value={targetType}
        >
          <Radio value={"exist"}>Select existing</Radio>
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
                  label={"Select Target"}
                  labelAlign={"left"}
                  name={"table"}
                  rules={[
                    {
                      required: true,
                      message: "target is required.",
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
                  label={"Select Target"}
                  labelAlign={"left"}
                  name={"table"}
                  rules={[
                    {
                      required: true,
                      message: "Target is required.",
                    },
                    {
                      validator: (rule, value, callback, source, options) => {
                        schemas.includes(value)
                          ? callback("This dataset is already available.")
                          : callback();
                      },
                    },
                  ]}
                >
                  <Input
                    key={"input-source-name"}
                    className={"input"}
                    name={"table"}
                    placeholder="Target Name"
                  />
                </Form.Item>
              )}
            </Col>
            <Col span={2} />
            <Col span={10} style={{ display: "none" }}>
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
