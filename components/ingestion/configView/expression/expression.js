import React, {useState} from "react";
import { Row, Col, Tabs } from "antd";
import General from "./general";

const Expression = ({ ingestionCss, nodeId, updateble }) => {
    const [activeKey, setActiveKey] = useState("general_tab");
    const [sourceData, setSourceData] = useState({
        transformation_name: "",
        description: "",
        transformation_properties: [],
      });
    

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

              {/* <Tabs.TabPane tab="Filter" key="filter_tab">
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
              />
            </Tabs.TabPane> */}
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

export default Expression;
