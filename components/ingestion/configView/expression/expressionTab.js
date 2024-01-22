import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Popconfirm, Row, Space, Table } from "antd";
import React, { useState, useEffect } from "react";
import AddNewFieldExp from "./addNewFieldExp";
import ConfigureFieldExpression from "./configureFieldRule";
import { NODEMETADATA } from "../../../../network/apiConstants";
import { fetch_retry_get } from "../../../../network/api-manager";
function ExpressionTab({
  ingestionCss,
  nodeId,
  sourceData,
  setSourceData,
  setActiveKey,
  name,
  pipeline
}) {
  const [tableData, setTableData] = useState({});

  const columns = [
    {
      title: "Field Name",
      dataIndex: "name",
    },
    {
      title: "Expression",
      dataIndex: "expression",
      render: (_, record) => (
        <span
          style={{ cursor: "pointer", color: "#E74860" }}
          onClick={() => setIsConfigureModalOpen(true)}
        >
          Configure...
        </span>
      ),
    },
    {
      title: "Default Value",
      dataIndex: "defaultValue",
      render: (_, record) => {
        return <p>NA</p>;
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
    {
      title: "Field Description",
      dataIndex: "fieldDescription",
      render: (_, record) => {
        return <p>NA</p>;
      },
    },
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
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [configureModalOpen, setIsConfigureModalOpen] = useState(false);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  const getNodeRecord = async (nodeId) => {
    const oldRecordSchema = await fetch_retry_get(
      `${NODEMETADATA}${nodeId}/metadata`
    );
    if (
      (oldRecordSchema?.data?.sample_data &&
        oldRecordSchema?.data?.sample_data.length) ||
      (oldRecordSchema?.data?.fields && oldRecordSchema?.data?.fields.length)
    ) {
      setTableData(oldRecordSchema?.data);
    }
  };

  useEffect(() => {
    getNodeRecord(nodeId);
  }, []);

  return (
    <>
      <Modal
        title="New Field"
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
        width={"48%"}
        destroyOnClose
        centered
      >
        <AddNewFieldExp ingestionCss={ingestionCss} nodeId={nodeId} pipeline={pipeline} getNodeRecord={getNodeRecord} setIsModalOpen={setIsModalOpen} />
      </Modal>
      <Modal
        title="Field Expression: dev_new"
        open={configureModalOpen}
        onOk={() => {
          setIsConfigureModalOpen(false);
        }}
        onCancel={() => {
          setIsConfigureModalOpen(false);
        }}
        footer={null}
        width={"72%"}
        destroyOnClose
        centered
      >
        <ConfigureFieldExpression ingestionCss={ingestionCss} tableData={tableData} />
      </Modal>
      <Table
        className={"re-ex-padding"}
        title={() => {
          return (
            <>
              <Row
                style={{
                  border: "1px solid #D9D9D9",
                  background: "var(--styler-05, #F3F4F5)",
                  flexShrink: 0,
                  padding: "10px",
                }}
              >
                <Col span={1} style={{ display: "flex", alignItems: "center" }}>
                  <h1
                    style={{
                      color: "#313131",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "16px",
                    }}
                  >
                    {name}
                  </h1>
                </Col>
                <Col
                  span={23}
                  style={{ justifyContent: "end", display: "flex" }}
                >
                  <Space>
                    <Button
                      className={ingestionCss.addBtn}
                      onClick={() => {
                        setIsModalOpen(true);
                      }}
                    >
                      Add
                    </Button>
                  </Space>
                </Col>
              </Row>
            </>
          );
        }}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        rowKey={"name"}
        pagination={false}
        dataSource={
          tableData?.fields
            ? tableData?.fields.filter((e) => e?.port_type == "output")
            : []
        }
        columns={columns}
      />
    </>
  );
}

export default ExpressionTab;
