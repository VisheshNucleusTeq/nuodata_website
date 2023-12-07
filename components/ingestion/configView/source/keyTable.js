import React, { useState } from "react";
import {
  Divider,
  Radio,
  Table,
  Input,
  Button,
  Space,
  Form,
  Row,
  Col,
} from "antd";
import { EditOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";

import { fetch_retry_put } from "../../../../network/api-manager";
import { CREATENODE } from "../../../../network/apiConstants";

const KeyTable = ({
  metadata,
  ingestionCss,
  sourceData,
  setSourceData,
  nodeId,
}) => {
  const [form] = Form.useForm();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Precision",
      dataIndex: "precision",
    },
    {
      title: "Scale",
      dataIndex: "scale",
    },
  ];
  const [data, setData] = useState(metadata);

  const [updateName, setUpdateName] = useState(null);

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    dataKey,
    ...restProps
  }) => {
    return (
      <td {...restProps}>
        {editing && dataIndex != "action" ? (
          <Form.Item
            name={dataIndex}
            label={title}
            rules={[
              {
                required: true,
                message: `${dataIndex} is required`,
              },
            ]}
            defaultValue={record[dataIndex]}
          >
            <Input name={dataIndex} defaultValue={record[dataIndex]} />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const updateTableField = async () => {
    let transformation_properties = sourceData?.transformation_properties;
    console.log(transformation_properties, data);

    const sourceIndex = transformation_properties.findIndex(
      (item) => item.property_name === "fields"
    );
    if (sourceIndex < 0) {
      transformation_properties.push({
        property_name: "fields",
        property_value: JSON.stringify(data),
      });
    } else {
      transformation_properties[sourceIndex] = {
        property_name: "fields",
        property_value: JSON.stringify(data),
      };
    }

    const updateResult = await fetch_retry_put(`${CREATENODE}/${nodeId}`, {
      ...sourceData,
      transformation_properties: transformation_properties,
    });
    setSourceData({
      ...sourceData,
      transformation_properties: transformation_properties,
    });
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <Form form={form} component={false}>
            <Table
              pagination={false}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              columns={[
                ...columns,
                {
                  title: "Action",
                  dataIndex: "action",
                  list: true,
                  render: (_, record) => {
                    return (
                      <Space
                        size="middle"
                        key={(Math.random() + 1).toString(36).substring(7)}
                        align="center"
                      >
                        {updateName == record?.name ? (
                          <Space>
                            <CheckOutlined
                              onClick={async () => {
                                try {
                                  let tableData = JSON.parse(
                                    JSON.stringify(data)
                                  );
                                  const formData = await form.validateFields();
                                  const index = tableData.findIndex(
                                    (e) => e?.name == updateName
                                  );
                                  if (index != -1) {
                                    tableData[index] = formData;
                                    setData(tableData);
                                  }
                                  console.log(index, formData);
                                } catch (e) {
                                  console.log(e, "Not a valid form");
                                }
                                setUpdateName(null);
                              }}
                            />
                            <CloseOutlined
                              onClick={() => {
                                setUpdateName(null);
                              }}
                            />
                          </Space>
                        ) : (
                          <EditOutlined
                            onClick={() => {
                              setUpdateName(record?.name);
                              form.setFieldsValue({ ...record });
                            }}
                          />
                        )}
                      </Space>
                    );
                  },
                },
              ]?.map((columnData) => {
                return {
                  ...columnData,
                  onCell: (record) => ({
                    record,
                    inputType: "text",
                    dataIndex: columnData.dataIndex,
                    title: columnData.title,
                    editing: updateName === record?.name,
                  }),
                };
              })}
              dataSource={data}
            />
          </Form>
        </Col>
        <Divider></Divider>

        {/* <Col span={24} className={ingestionCss.pipelineBtns}>
          <Space>
            <Button
              onClick={() => {
                // updateTableField();
              }}
              className={ingestionCss.draftBtn}
            >
              Update Fields
            </Button>
          </Space>
        </Col> */}
        <Col span={24} className={ingestionCss.pipelineBtns}>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Space>
              <Button
                type="primary"
                className={ingestionCss.defineSave}
                onClick={() => {
                  // savePipline("save");
                }}
              >
                Save & exit
              </Button>
              <Button
                type="primary"
                className={ingestionCss.defineSaveAndBuild}
                onClick={() => {
                  // savePipline("build");
                }}
              >
                Save & preview fields
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default KeyTable;
