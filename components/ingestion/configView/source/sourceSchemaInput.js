import {
  Button,
  Col,
  Form,
  Image,
  Input,
  message,
  Row,
  Space,
  Modal,
  Select,
} from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetch_retry_put } from "../../../../network/api-manager";
import { CREATENODE } from "../../../../network/apiConstants";
import { loderShowHideAction } from "../../../../Redux/action";
import { getFileName } from "../../../helper/getFileName";
const SourceSchemaInput = ({
  connectionId,
  connection,
  workspace,
  ingestionCss,
  setActiveKey,
  setTableData,
  nodeId,
  sourceData,
  setSourceData,
  updateble,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const getTableDataAction = async (data) => {
    dispatch(loderShowHideAction(true));
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
    }
    dispatch(loderShowHideAction(false));
  };

  const getTableData = async (type) => {
    const sourceIndex = sourceData?.transformation_properties.find(
      (item) => item.property_name === "source_table"
    );
    const connectionIndex = sourceData?.transformation_properties.find(
      (item) => item.property_name === "connection_id"
    );

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
          title: "The file has changed on disk.",
          content: "Do you want to reload it?",
          okText: "Yes",
          cancelText: "No",
          onOk: async () => {
            await getTableDataAction(type);
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
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
  };

  useEffect(() => {
    setOldValue();
  }, []);

  return (
    <>
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
            layout="vertical" //horizontal , vertical
            autoComplete="on"
            onFinish={(e) => {
              getTableData(e);
            }}
          >
            <Row justify={"space-between"}>
              <Col span={11}>
                <Form.Item
                  label={"Location"}
                  labelAlign={"left"}
                  name={"source_object"}
                  rules={[
                    {
                      required: true,
                      message: "Location is required.",
                    },
                  ]}
                >
                  <Input
                    key={"input-source-name"}
                    className={"input"}
                    name={"source_object"}
                    placeholder="Location"
                  />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label={"File Type"}
                  labelAlign={"left"}
                  name={"file_type"}
                  rules={[
                    {
                      required: true,
                      message: "File Type is required.",
                    },
                  ]}
                >
                  <Select
                    name={"file_type"}
                    options={[
                      { value: "csv", label: "csv" },
                      { value: "csv.gz", label: "csv.gz" },
                      { value: "parquet", label: "parquet" },
                      { value: "parquet.gz", label: "parquet.gz" },
                      { value: "gz.parquet", label: "gz.parquet" },
                    ]}
                    className="inputSelect"
                  />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label={"File Pattern"}
                  labelAlign={"left"}
                  name={"file_pattern"}
                >
                  <Input
                    type="text"
                    className="input"
                    name={"file_pattern"}
                    placeholder="cp"
                  />
                </Form.Item>
              </Col>
              <Col span={11}>
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
              <Col span={24} className={ingestionCss.generalLastDiv}>
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
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default SourceSchemaInput;
