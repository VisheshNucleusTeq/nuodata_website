import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Space,
  Table,
  message,
} from "antd";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { loderShowHideAction } from "../../../../Redux/action";
import {
  fetch_retry_delete,
  fetch_retry_get,
  fetch_retry_put,
} from "../../../../network/api-manager";
import {
  CREATENODE,
  NODEMETADATA,
  UPDATEFIELDNAME,
} from "../../../../network/apiConstants";
const KeyTable = ({
  metadata,
  ingestionCss,
  sourceData,
  setSourceData,
  nodeId,
  pipeline,
  connection,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "From Transformation Name",
      dataIndex: "from_transformation_name",
      render: (text) => {
        return text ? text : "NA";
      },
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
  const [modalVisible, setModalVisible] = useState(false);
  const [updateName, setUpdateName] = useState(null);
  const [originalName, setOriginalName] = useState(null);

  const handleEditClick = (record) => {
    setOriginalName(record?.name);
    setUpdateName(record?.name);
    setModalVisible(true);
    form.setFieldsValue({ ...record });
  };

  const handleModalOk = async () => {
    try {
      const formData = await form.validateFields();
      const updatedFields = data.map((record) => {
        if (record.name === updateName) {
          return {
            ...record,
            ...formData[record.name],
          };
        }
        return record;
      });

      const isNameChanged = formData.name !== updateName;
      if (!isNameChanged) {
        form.setFields([
          {
            name: "name",
            errors: ["Name must be different."],
          },
        ]);
        return;
      }

      setData(updatedFields);
      updateFieldInNode(updatedFields, originalName);
      setUpdateName(null);
      setOriginalName(null);
      setModalVisible(false);
    } catch (error) {
      console.error("Form validation error", error);
    }
  };

  const handleModalCancel = () => {
    setUpdateName(null);
    setModalVisible(false);
  };

  const EditableCell = ({ dataIndex, title, record, ...restProps }) => {
    const editing = updateName === record?.name;
    return (
      <td {...restProps}>
        {editing && dataIndex !== "action" ? (
          <Form.Item
            name={record.name}
            label={title}
            rules={[
              {
                required: true,
                message: `${dataIndex} is required`,
              },
            ]}
            initialValue={record[dataIndex]}
          >
            <Input />
          </Form.Item>
        ) : (
          restProps.children
        )}
      </td>
    );
  };

  const updateTableField = async () => {
    let transformation_properties = sourceData?.transformation_properties;
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

  const updateFieldInNode = async (updatedFields, previousName) => {
    const editedRow = updatedFields.find(
      (record) => record.name === updateName
    );

    if (!editedRow) {
      console.error("Edited row not found");
      return;
    }

    const { name, ...rest } = editedRow;

    const updatedFieldName = form.getFieldValue("name") || name;

    const requestBody = {
      pipeline_id: pipeline,
      node_id: nodeId,
      fields: [
        {
          name: updatedFieldName,
          ...rest,
          expression: rest.expression !== null ? rest.expression : "",
          from_node_id: nodeId,
          from_transformation_name: connection?.type,
          from_field_name: previousName,
        },
      ],
    };

    try {
      dispatch(loderShowHideAction(true));
      const updateResult = await fetch_retry_put(
        `${UPDATEFIELDNAME}`,
        requestBody
      );
      const oldRecord = await fetch_retry_get(
        `${NODEMETADATA}${nodeId}/metadata`
      );
      setData(oldRecord?.data?.fields);
      dispatch(loderShowHideAction(false));
      message.success(updateResult?.data?.message);
    } catch (error) {
      console.error("API call error", error);
      message.error([error]);
    }
  };

  const deleteField = async (field) => {
    dispatch(loderShowHideAction(true));
    const updateResult = await fetch_retry_delete(`${UPDATEFIELDNAME}`, {
      data: {
        pipeline_id: pipeline,
        node_id: nodeId,
        fields_name: [field?.name],
      },
    });
    const oldRecord = await fetch_retry_get(
      `${NODEMETADATA}${nodeId}/metadata`
    );
    setData(oldRecord?.data?.fields);
    dispatch(loderShowHideAction(false));
    message.success(updateResult?.data?.message);
  };

  return (
    <div>
      <Modal
        title="Update Field"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        destroyOnClose
      >
        <Form
          form={form}
          initialValues={{ name: updateName }}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Name is required",
              },
            ]}
          >
            <Input name="name" placeholder="Name" />
          </Form.Item>
        </Form>
      </Modal>
      <Row>
        <Col span={24}>
          <Form form={form} component={false}>
            <Table
              pagination={false}
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
                          <EditOutlined
                            onClick={() => handleEditClick(record)}
                          />
                        ) : (
                          // <Space>
                          //   <CheckOutlined
                          //     onClick={async () => {
                          //       try {
                          //         let tableData = JSON.parse(
                          //           JSON.stringify(data)
                          //         );
                          //         const formData = await form.validateFields();
                          //         const index = tableData.findIndex(
                          //           (e) => e?.name == updateName
                          //         );
                          //         if (index != -1) {
                          //           tableData[index] = formData;
                          //           setData(tableData);
                          //         }
                          //       } catch (e) {}
                          //       setUpdateName(null);
                          //     }}
                          //   />
                          //   <CloseOutlined
                          //     onClick={() => {
                          //       setUpdateName(null);
                          //     }}
                          //   />
                          // </Space>
                          <EditOutlined
                            onClick={() => handleEditClick(record)}
                          />
                        )}
                        <Popconfirm
                          title="Are you sure to delete this field?"
                          description="Are you sure to delete this field?"
                          onConfirm={() => {
                            deleteField(record);
                          }}
                          placement="left"
                          okText="Confirm"
                        >
                          <DeleteOutlined danger />
                        </Popconfirm>
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
