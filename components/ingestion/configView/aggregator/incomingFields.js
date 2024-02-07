import React, { useEffect, useState } from "react";
import { Table, Radio, Collapse, Col, Row, Transfer, Button } from "antd";
import ingestionCss from "../../../../styles/ingestion.module.css";
import KeyTable from "../commonView/keyTable";
const { Panel } = Collapse;

import { NODEMETADATA, CREATENODE } from "../../../../network/apiConstants";
import { fetch_retry_get } from "../../../../network/api-manager";

const IncomingFields = ({ nodeId, pipeline }) => {
  const [activeKey, setActiveKey] = useState("general_tab");
  const [tableData, setTableData] = useState({});
  const [sourceData, setSourceData] = useState({
    transformation_name: "",
    description: "",
    transformation_properties: [],
  });

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

  const getNodeRecord = async (nodeId) => {
    const oldRecordSchema = await fetch_retry_get(
      `${NODEMETADATA}${nodeId}/metadata`
    );
    if (
      (oldRecordSchema?.data?.sample_data &&
        oldRecordSchema?.data?.sample_data.length) ||
      (oldRecordSchema?.data?.fields && oldRecordSchema?.data?.fields.length)
    ) {
      setActiveKey("fields_tab");
      setTableData(oldRecordSchema?.data);
    }

    const oldRecord = await fetch_retry_get(`${CREATENODE}/${nodeId}`);
    setSourceData({
      transformation_name: oldRecord?.data?.transformation_name
        ? oldRecord?.data?.transformation_name
        : "",
      description: oldRecord?.data?.description
        ? oldRecord?.data?.description
        : "",
      transformation_properties:
        oldRecord?.data?.transformation_properties &&
          oldRecord?.data?.transformation_properties?.length
          ? oldRecord?.data?.transformation_properties
          : [],
    });
  };

  useEffect(() => {
    getNodeRecord(nodeId);
  }, []);

  return (
    <>
      <Row>
        {/* <Col span={24}>
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
        </Col> */}

        <Col span={24}>
          {/* <Radio.Group
            className={ingestionCss.radioStyle}
            defaultValue={"included"}
          >
            <Radio value={"included"}>Included Fields</Radio>
            <Radio value={"excluded"}>Excluded Fields</Radio>
          </Radio.Group> */}

          <KeyTable
            key={Date.now()}
            ingestionCss={ingestionCss}
            metadata={tableData?.fields ? tableData?.fields : []}
            nodeId={nodeId}
            sourceData={sourceData}
            setSourceData={setSourceData}
            pipeline={pipeline}
          />

          {/* <Table pagination={true} columns={columns} dataSource={dataSource} /> */}
        </Col>
      </Row>
    </>
  );
};

export default IncomingFields;
