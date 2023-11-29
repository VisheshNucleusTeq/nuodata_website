import React, { useState, useEffect } from "react";
import { Row, Col, Tabs, Button } from "antd";
import { fetch_retry_get } from "../../../../network/api-manager";
import { CREATENODE } from "../../../../network/apiConstants";
import General from "./general";
import FilterCondition from "./filterCondition";
const Filter = ({ ingestionCss, nodeId, nodeData, edgeData }) => {
  const [activeKey, setActiveKey] = useState("general_tab");
  const [tableData, setTableData] = useState({});
  const [sourceNode, setSourceNode] = useState(null);
  const [sourceData, setSourceData] = useState({
    transformation_name: "",
    description: "",
    transformation_properties: [],
  });

  const getNodeRecord = async (nodeId) => {
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

  // const getSourceData = (nodeId) => { //transformation_type : "Source"
  //   const findData = nodeData.filter((e) => e?.id == nodeId);
  //   console.log(findData)
  //   if(findData && findData.length){
  //       if(findData[0]?.transformation_type == "Source"){
  //           console.log(findData[0])
  //       }else{
  //           findSource(nodeId)
  //       }
  //   }
  // }

  // const findSource = (nodeId) => {
  //   const findData = edgeData.filter((e) => e?.target_node_id == nodeId);
  //   if(findData && findData.length){
  //       getSourceData(findData[0]?.source_node_id)
  //   }
  // }

  useEffect(() => {
    // findSource(nodeId)
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
                />
              </Tabs.TabPane>

              <Tabs.TabPane tab="Filter" key="filter_tab">
                <FilterCondition
                  ingestionCss={ingestionCss}
                  sourceData={sourceData}
                  nodeId={nodeId}
                />
              </Tabs.TabPane>
            </Tabs>
          </Tabs.TabPane>
          {/* <Tabs.TabPane tab="Preview" key="2" disabled={!tableData?.data}>
            <DataTable
                ingestionCss={ingestionCss}
                tableData={tableData?.data}
              />
          </Tabs.TabPane> */}
        </Tabs>
      </Col>
    </Row>
  );
};

export default Filter;
