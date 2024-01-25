import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
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
import {
  fetch_retry_delete,
  fetch_retry_get,
  fetch_retry_put,
} from "../../../../network/api-manager";
import {
  NODEMETADATA as NMD,
  UPDATEFIELDNAME as UFN,
} from "../../../../network/apiConstants";
const keyTable = ({
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

  const [tableKey, setTableKey] = useState(
    (Math.random() + 1).toString(36).substring(7)
  );
  const [columns] = useState([
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
  ]);
  const [tableData, setTableData] = useState(metadata);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateRecord, setUpdateRecord] = useState({});
  const [apiCall, setApiCall] = useState(false);

  const getUpdatedRecord = async () => {
    const oldRecord = await fetch_retry_get(`${NMD}${nodeId}/metadata`);
    setTableData(oldRecord?.data?.fields);
    setTableKey((Math.random() + 1).toString(36).substring(7));
  };

  const updateFieldName = async () => {
    form.validateFields().then(async (values) => {
      setApiCall(true);
      const obj = { ...updateRecord, ...values };
      const requestBody = {
        pipeline_id: pipeline,
        node_id: nodeId,
        fields: [
          Object.keys(obj).reduce((acc, key) => {
            acc[key] = obj[key] === null ? "" : obj[key];
            return acc;
          }, {}),
        ],
      };
      const updateResult = await fetch_retry_put(`${UFN}`, requestBody);
      if (updateResult.success) {
        message.success(updateResult?.data?.message);
        getUpdatedRecord();
        setUpdateRecord({});
        setModalVisible(false);
        setApiCall(false);
      } else {
        setApiCall(false);
        // message.error([...updateResult?.error]);
        console.log([...updateResult?.error])
      }
    });
  };

  const deleteField = async (field) => {
    const updateResult = await fetch_retry_delete(`${UFN}`, {
      data: {
        pipeline_id: pipeline,
        node_id: nodeId,
        field_ids: [field?.field_id],
      },
    });
    if (updateResult.success) {
      message.success(updateResult?.data?.message);
      getUpdatedRecord();
    } else {
      // message.error([...updateResult?.error]);
      console.log([...updateResult?.error])
    }
  };

  return (
    <>
      <Modal
        title="Update Field"
        open={modalVisible}
        onOk={updateFieldName}
        onCancel={() => {
          setUpdateRecord({});
          setModalVisible(false);
        }}
        destroyOnClose={true}
        okText={apiCall ? <LoadingOutlined /> : "Update"}
      >
        <Form form={form} layout="vertical">
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
          <Table
            key={tableKey}
            pagination={false}
            dataSource={[...tableData]}
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
                      {/* <EditOutlined
                        onClick={() => {
                          setUpdateRecord(record);
                          setModalVisible(true);
                          form.setFieldValue("name", record?.name);
                        }}
                      /> */}
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
            ]}
          />
        </Col>
        <Divider></Divider>
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
    </>
  );
};

export default keyTable;
