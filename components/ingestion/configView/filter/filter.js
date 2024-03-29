import { Col, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { fetch_retry_get } from "../../../../network/api-manager";
import { CREATENODE, NODEMETADATA } from "../../../../network/apiConstants";
import DataTable from "../commonView/dataTable";
import FilterCondition from "./filterCondition";
import General from "../commonView/general";
import KeyTable from "../commonView/keyTable";
const Filter = ({ ingestionCss, nodeId, nodeData, edgeData, pipeline }) => {
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
    <Row>
      <Col span={24}>
        <Tabs className="underline" defaultActiveKey="1" destroyInactiveTabPane>
          <Tabs.TabPane tab="Properties" key="properties">
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
                  name={"Filter"}
                  nextTab="filter_tab"
                  nextButtonText="Save & Create Filter"
                />
              </Tabs.TabPane>

              <Tabs.TabPane tab="Filter" key="filter_tab">
                <FilterCondition
                  ingestionCss={ingestionCss}
                  sourceData={sourceData}
                  nodeId={nodeId}
                />
              </Tabs.TabPane>

              <Tabs.TabPane
                tab="Fields"
                key="fields_tab"
                disabled={!tableData?.fields}
              >
                <KeyTable
                  key={Date.now()}
                  ingestionCss={ingestionCss}
                  metadata={tableData?.fields}
                  nodeId={nodeId}
                  sourceData={sourceData}
                  setSourceData={setSourceData}
                  pipeline={pipeline}
                />
              </Tabs.TabPane>
            </Tabs>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Preview" key="preview">
            <DataTable
              nodeId={nodeId}
              ingestionCss={ingestionCss}
              tableData={tableData?.sample_data}
            />
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default Filter;
