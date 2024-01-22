import React, { useState } from "react";
import { Table, Radio, Collapse, Col, Row, Transfer, Button } from "antd";
import ingestionCss from "../../../../styles/ingestion.module.css";

const { Panel } = Collapse;

const IncomingFields = () => {
  const [columns] = useState([
    {
      title: "Field Name",
      dataIndex: "field_name",
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
      title: "Group",
      dataIndex: "group",
    },
    {
      title: "Origin",
      dataIndex: "origin",
    },
  ]);

  const [dataSource] = useState([
    {
      key: "1",
      field_name: "orderValue",
      type: "STRING",
      precision: "256",
      scale: "0",
      group: "Group1",
      origin: "stageCustomerOrders",
    },
    {
      key: "2",
      field_name: "orderValue",
      type: "STRING",
      precision: "256",
      scale: "0",
      group: "Group2",
      origin: "stageCustomerOrders",
    },
    {
      key: "3",
      field_name: "orderValue",
      type: "STRING",
      precision: "256",
      scale: "0",
      group: "Group3",
      origin: "stageCustomerOrders",
    },
  ]);

  const transferOptionLabels = [
    {
      key: "1",
      title: "All fields",
    },
    {
      key: "2",
      title: "Name Fields",
    },
    {
      key: "3",
      title: "Fields by data type",
    },
    {
      key: "4",
      title: "Fields by text or pattern",
    },
    {
      key: "5",
      title: "All fields",
    },
    {
      key: "6",
      title: "Name Fields",
    },
    {
      key: "7",
      title: "Fields by data type",
    },
    {
      key: "8",
      title: "Fields by text or pattern",
    },
  ];

  const [targetKeys, setTargetKeys] = useState(
    transferOptionLabels.slice(0, 4).map((item) => item.key)
  );
  const [selectedKeys, setSelectedKeys] = useState([]);

  return (
    <>
      <Row>
        <Col span={24}>
          <Transfer
            dataSource={transferOptionLabels}
            render={(item) => item.title}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={(nextTargetKeys, direction, moveKeys) => {
              setTargetKeys(nextTargetKeys);
              setSelectedKeys(moveKeys);
            }}
            onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => {
              setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
            }}
            showSearch
            searchPlaceholder="Search fields"
            operations={["Excluded Fields", "Included Fields"]}
            className={"ingestion-transfer"}
          />
        </Col>

        <Col span={24}>
          <Radio.Group
            className={ingestionCss.radioStyle}
            defaultValue={"included"}
          >
            <Radio value={"included"}>Included Fields</Radio>
            <Radio value={"excluded"}>Excluded Fields</Radio>
          </Radio.Group>

          <Table pagination={true} columns={columns} dataSource={dataSource} />
        </Col>
      </Row>
    </>
  );
};

export default IncomingFields;