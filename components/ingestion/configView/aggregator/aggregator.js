import { Col, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import DataTable from "../commonView/dataTable";
import General from "../commonView/general";
import IncomingFields from "./incomingFields";
import Aggregate from "./aggregate";
import GroupBy from "./groupBy";
import { CREATENODE, NODEMETADATA } from "../../../../network/apiConstants";
import { fetch_retry_get } from "../../../../network/api-manager";

function Aggregator({ ingestionCss, nodeId, pipeline }) {
  const [activeKey, setActiveKey] = useState("general_tab");
  const [tableData, setTableData] = useState({});
  const [sourceNode, setSourceNode] = useState(null);
  const [sourceData, setSourceData] = useState({
    transformation_name: "",
    description: "",
    transformation_properties: [],
  });

  const getNodeRecord = async (nodeId) => {
    const oldRecordSchema = await fetch_retry_get(
      `${NODEMETADATA}${nodeId}/metadata`
    );
    if (
      (oldRecordSchema?.data?.sample_data &&
        oldRecordSchema?.data?.sample_data.length) ||
      (oldRecordSchema?.data?.fields && oldRecordSchema?.data?.fields.length)
    ) {
      // setActiveKey("fields_tab");
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
    <Row>
      <Col span={24}>
        <Tabs className="underline" defaultActiveKey="1">
          <Tabs.TabPane tab="Properties" key="1">
            <Tabs
              className="tabActive"
              tabPosition={"left"}
              activeKey={activeKey}
              onChange={(key) => {
                setActiveKey(key);
              }}
            >
              <Tabs.TabPane tab="General" key="general_tab">
                <General
                  ingestionCss={ingestionCss}
                  nodeId={nodeId}
                  sourceData={sourceData}
                  setSourceData={setSourceData}
                  setActiveKey={setActiveKey}
                  name="Aggregator"
                  pipeline={pipeline}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Incoming Fields" key="incoming_field_tab">
                <IncomingFields
                  ingestionCss={ingestionCss}
                  nodeId={nodeId}
                  sourceData={sourceData}
                  setSourceData={setSourceData}
                  setActiveKey={setActiveKey}
                  pipeline={pipeline}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Group By" key="group_by_tab">
                <GroupBy
                  ingestionCss={ingestionCss}
                  nodeId={nodeId}
                  sourceData={sourceData}
                  setSourceData={setSourceData}
                  setActiveKey={setActiveKey}
                  pipeline={pipeline}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Aggregate" key="aggregate_tab">
                <Aggregate
                  ingestionCss={ingestionCss}
                  nodeId={nodeId}
                  sourceData={sourceData}
                  setSourceData={setSourceData}
                  setActiveKey={setActiveKey}
                  pipeline={pipeline}
                />
              </Tabs.TabPane>
            </Tabs>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Preview" key="2">
            <DataTable
              ingestionCss={ingestionCss}
              tableData={tableData?.data}
              nodeId={nodeId}
            />
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  );
}

export default Aggregator;
