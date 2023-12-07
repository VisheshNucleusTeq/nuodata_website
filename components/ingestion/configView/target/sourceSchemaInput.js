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
import { useDispatch } from "react-redux";

import { fetch_retry_put } from "../../../../network/api-manager";
import { CREATENODE } from "../../../../network/apiConstants";
import { loderShowHideAction } from "../../../../Redux/action";

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
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const getTableData = async (data) => {
    dispatch(loderShowHideAction(true));
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
    } else {
      message.error("Something went wrong");
    }
    dispatch(loderShowHideAction(false));
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
  };

  useEffect(() => {
    setOldValue();
  }, []);

  return (
    <>
      <Row>
        <Col span={24} className={ingestionCss.addSourceImage}>
          <Space size={20}>
            <Image src={`/db_icon/${connection.title}.png`} />
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
            <Row>
              <Col span={12}>
                <Form.Item
                  label={"Source"}
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
              </Col>

              <Col span={24}>
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
