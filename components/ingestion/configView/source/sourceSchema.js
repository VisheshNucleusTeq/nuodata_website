import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Space,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useRouter } from "next/router";
import { loderShowHideAction } from "../../../../Redux/action";
import {
  fetch_retry_post,
  fetch_retry_put,
  fetch_retry_get,
  fetch_retry_delete,
} from "../../../../network/api-manager";
import {
  GETCONNECTIONDETAIL,
  DELETEEDGE,
} from "../../../../network/apiConstants";
import { CREATENODE } from "../../../../network/apiConstants";
import { getFileName } from "../../../helper/getFileName";
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
  edgeData,
  updateble,
  pipeline,
  getPiplineGraph,
}) => {
  const [form] = Form.useForm();
  const [schemas, setSchemas] = useState([]);
  const dispatch = useDispatch();
  const route = useRouter();

  const getSchema = async () => {
    if (connectionId) {
      dispatch(loderShowHideAction(true));
      const authData = JSON.parse(localStorage.getItem("authData"));
      const schemaData = await fetch_retry_get(
        `${GETCONNECTIONDETAIL}${connectionId}/datasets?org_id=${authData?.orgId}&workspace_id=${workspace}&type=${connection?.type}&node_id=${nodeId}`
      );
      if (schemaData.success) {
        setSchemas(schemaData?.data?.schemas);
        dispatch(loderShowHideAction(false));
      } else {
        message.error(schemaData?.error);
        dispatch(loderShowHideAction(false));
      }
    }
  };

  const getTableDataAction = async (type) => {
    try {
      const data = await form.validateFields();
      dispatch(loderShowHideAction(true));
      const authData = JSON.parse(localStorage.getItem("authData"));
      const tableData = await fetch_retry_post(
        `${GETCONNECTIONDETAIL}data/${data?.table}?org_id=${authData?.orgId}&workspace_id=${workspace}&connection_id=${connectionId}&type=${connection?.type}&rows=${data?.rows}&node_id=${nodeId}`
      );
      if (tableData.success) {
        setTableData(tableData?.data);

        let transformation_properties = sourceData?.transformation_properties;

        const sourceIndex = transformation_properties.findIndex(
          (item) => item.property_name === "source_table"
        );
        if (sourceIndex < 0) {
          transformation_properties.push({
            property_name: "source_table",
            property_value: data?.table,
          });
        } else {
          transformation_properties[sourceIndex] = {
            property_name: "source_table",
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
          } else {
            setActiveKey("fields_tab");
          }
        } else {
          message.error("Something went wrong");
        }
        dispatch(loderShowHideAction(false));
      } else {
        dispatch(loderShowHideAction(false));
        message.error(tableData?.error);
      }
    } catch (error) {}
  };

  const getTableData = async (type) => {
    const sourceIndex = sourceData?.transformation_properties.find(
      (item) => item.property_name === "source_table"
    );
    const connectionIndex = sourceData?.transformation_properties.find(
      (item) => item.property_name === "connection_id"
    );

    const deleteEdges = edgeData.map((e) => {
      if (e?.source == nodeId || e?.source_node_id == nodeId) {
        return e?.id;
      }
    });

    try {
      const data = await form.validateFields();
      if (
        updateble ||
        (sourceIndex?.property_value == data?.table &&
          connectionIndex?.property_value == connectionId)
      ) {
        await getTableDataAction(type);
      } else {
        Modal.confirm({
          title: "warning!",
          content:
            "Alterations in source detected. Proceeding further will reset connection.",
          okText: "Continue",
          cancelText: "Cancel",
          onOk: async () => {
            const deleteResult = await fetch_retry_delete(
              `${DELETEEDGE}${pipeline}/edges`,
              {
                data: {
                  edge_ids: [...deleteEdges.filter((n) => n)],
                },
              }
            );
            if (deleteResult.success) {
              await getPiplineGraph(pipeline);
              await getTableDataAction(type);
            } else {
              message.error(deleteResult.error);
            }
          },
        });
      }
    } catch (error) {}
  };

  const setOldValue = () => {
    const sourceIndex = sourceData?.transformation_properties.findIndex(
      (item) => item.property_name === "source_table"
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
  }, [connectionId]);

  useEffect(() => {
    getSchema();
    setOldValue();
  }, []);

  return (
    <Row>
      <Col span={24} className={ingestionCss.addSourceImage}>
        <Space size={20}>
          <Image src={`/db_icon/${getFileName(connection.type)}.png`} />
          <b>{connection.title}</b>
        </Space>
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
                    ...schemas?.map((e) => {
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
                {/* <Radio.Group name={"rows"} defaultValue={10}>
                  <Radio value={10}>10</Radio>
                  <Radio value={20}>20</Radio>
                </Radio.Group> */}
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
                  getTableData("build");
                }}
              >
                Save & update fields
              </Button>
            </Space>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default SourceSchema;
