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

  const [writeMode, setWriteMode] = useState("append");
  const [tableType, setTableType] = useState("");


  const setOldNewValue = (transformation_properties, property_name, property_value) => {
    const sourceIndex = transformation_properties.findIndex(
      (item) => item.property_name === property_name
    );
    if (sourceIndex < 0) {
      transformation_properties.push({
        property_name: property_name,
        property_value: property_value,
      });
    } else {
      transformation_properties[sourceIndex] = {
        property_name: property_name,
        property_value: property_value,
      };
    }
    return transformation_properties;
  }

  const deleteOldNewValue = (transformation_properties, property_name) => {
    transformation_properties = transformation_properties.filter(
      (item) => item.property_name != property_name
    );
    return transformation_properties;
  }

  const getTableData = async (data) => {
    

    dispatch(loderShowHideAction(true));
    var transformation_properties = sourceData?.transformation_properties;
    transformation_properties = setOldNewValue(transformation_properties, "target_table", data?.target_table);
    transformation_properties = setOldNewValue(transformation_properties, "insert_type", data?.insert_type);
    transformation_properties = setOldNewValue(transformation_properties, "file_format", data?.file_format);
    transformation_properties = setOldNewValue(transformation_properties, "file_format", data?.file_format);

    if(data?.table_type){
      transformation_properties = setOldNewValue(transformation_properties, "table_type", data?.table_type);
      if(data?.table_type == 'iceberg'){
        transformation_properties = setOldNewValue(transformation_properties, "database", data?.database);
        transformation_properties = setOldNewValue(transformation_properties, "catalog", data?.catalog);
      }else{
        
        transformation_properties = deleteOldNewValue(transformation_properties, "database");
        transformation_properties = deleteOldNewValue(transformation_properties, "catalog");
        // delete transformation_properties['database']
        // delete transformation_properties['catalog']
      }
      transformation_properties = setOldNewValue(transformation_properties, "table_name", data?.table_name);
    }else{
      transformation_properties = deleteOldNewValue(transformation_properties, "database");
      transformation_properties = deleteOldNewValue(transformation_properties, "catalog");
      transformation_properties = deleteOldNewValue(transformation_properties, "table_name");
      // delete transformation_properties['database']
      // delete transformation_properties['catalog']
      // delete transformation_properties['table_name']
    }

    transformation_properties = setOldNewValue(transformation_properties, "connection_id", connectionId);
    transformation_properties = setOldNewValue(transformation_properties, "connection_type", connection?.type);
    
    // console.log(transformation_properties, data);
    // dispatch(loderShowHideAction(false));
    // return true;

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
        "target_table",
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

        {/* <Col span={24} style={{ marginTop: "5vh" }}>
        <Space>
          <b>Insert Type:</b>
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
        <Space>
          <b>File Format:</b>
          <Select options={
            []
          }></Select>
        </Space>
      </Col> */}

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
                  name={"target_table"}
                  rules={[
                    {
                      required: true,
                      message: "Target is required.",
                    },
                  ]}
                >
                  <Input
                    key={"input-source-name"}
                    className={"input"}
                    name={"target_table"}
                    placeholder="Source Name"
                  />
                </Form.Item>
              </Col>

              <Col span={2} />

              <Col span={10}>
                <Form.Item
                  label={"Inset Type"}
                  labelAlign={"left"}
                  name={"insert_type"}
                  rules={[
                    {
                      required: true,
                      message: "Inset type is required.",
                    },
                  ]}
                >
                  <Select
                    options={[
                      { value: "append", label: "Append" },
                      { value: "overwrite", label: "Overwrite" },
                    ]}
                    className="inputSelect"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={"File Format"}
                  labelAlign={"left"}
                  name={"file_format"}
                  rules={[
                    {
                      required: true,
                      message: "File format is required.",
                    },
                  ]}
                >
                  <Select
                    options={[
                      { value: "csv", label: "csv" },
                      { value: "avro", label: "avro" },
                      { value: "parquet", label: "parquet" },
                      { value: "orc", label: "ord" },
                      { value: "json", label: "json" },
                    ]}
                    className="inputSelect"
                  />
                </Form.Item>
              </Col>

              <Col span={2} />

              <Col span={10}>
                <Form.Item
                  label={"Table Type"}
                  labelAlign={"left"}
                  name={"table_type"}
                  rules={
                    [
                      // {
                      //   required: true,
                      //   message: "Table type is required.",
                      // },
                    ]
                  }
                >
                  <Select
                    onChange={(e) => {
                      setTableType(e);
                    }}
                    options={[
                      { value: "", label: "None of them" },
                      { value: "iceberg", label: "Iceberg" },
                      { value: "delta", label: "Delta" },
                    ]}
                    className="inputSelect"
                    defaultValue={""}
                  />
                </Form.Item>
              </Col>
              {tableType && (
                <Col span={24}>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        label={"Database"}
                        labelAlign={"left"}
                        name={"database"}
                        rules={[
                          {
                            required: true,
                            message: "Database is required.",
                          },
                        ]}
                      >
                        <Input
                          key={"input-database"}
                          className={"input"}
                          name={"database"}
                          placeholder="Database"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={2} />

                    <Col span={10}>
                      <Form.Item
                        label={"Catalog"}
                        labelAlign={"left"}
                        name={"catalog"}
                        rules={[
                          {
                            required: true,
                            message: "Catalog is required.",
                          },
                        ]}
                      >
                        <Select
                          options={[
                            { value: "glue_catalog", label: "Glue Catalog" },
                          ]}
                          className="inputSelect"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              )}
              {tableType && tableType == "iceberg" && (
                <Col span={12}>
                  <Form.Item
                    label={"Table Name"}
                    labelAlign={"left"}
                    name={"table_name"}
                    rules={[
                      {
                        required: true,
                        message: "Source is required.",
                      },
                    ]}
                  >
                    <Input
                      key={"input-table-name"}
                      className={"input"}
                      name={"table_name"}
                      placeholder="Source Name"
                    />
                  </Form.Item>
                </Col>
              )}

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
