import React, { useState, useEffect } from "react";
import { Row, Col, Tabs, Button } from "antd";
import General from "./general";
import SelectSource from "./selectSource";
import AddSource from "./addSource";
import KeyTable from "./keyTable";
import SourceSchema from "./sourceSchema";
import DataTable from "./dataTable";
import { CREATENODE } from "../../../../network/apiConstants";
import { fetch_retry_get } from "../../../../network/api-manager";
const Source = ({ ingestionCss, nodeId }) => {
  const [connection, setConnection] = useState({});
  const [activeKey, setActiveKey] = useState("general_tab");
  const [connectionId, setConnectionId] = useState(null);
  const [tableData, setTableData] = useState({});

  const [sourceData, setSourceData] = useState({
    transformation_name: "",
    description: "",
    transformation_properties: [],
  });

  const getNodeRecord = async (nodeId) => {
    const oldRecord = await fetch_retry_get(`${CREATENODE}/${nodeId}`);
    setSourceData({
      transformation_name: oldRecord?.data?.transformation_name ? oldRecord?.data?.transformation_name : "",
      description: oldRecord?.data?.description ? oldRecord?.data?.description : "",
      transformation_properties: (oldRecord?.data?.transformation_properties && oldRecord?.data?.transformation_properties?.length) ? oldRecord?.data?.transformation_properties : [],
    })
  }

  useEffect(()=>{
    getNodeRecord(nodeId)
  },[])

  return (
    <>
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
                  />
                </Tabs.TabPane>

                <Tabs.TabPane
                  tab="Source"
                  key="source_tab"
                  disabled={!(sourceData && sourceData?.transformation_name)}
                >
                  {connection && connection?.title ? (
                    <Row>
                      <Col span={24}>
                        <Button
                          className={ingestionCss.backButton}
                          onClick={() => {
                            setConnection({});
                          }}
                        >
                          Change Source
                        </Button>
                      </Col>
                      <Col span={24}>
                        <AddSource
                          ingestionCss={ingestionCss}
                          connection={connection}
                          setIsModalOpen={() => {}}
                          connectionId={connectionId}
                          setConnectionId={setConnectionId}
                          setActiveKey={setActiveKey}
                        />
                      </Col>
                    </Row>
                  ) : (
                    <SelectSource
                      ingestionCss={ingestionCss}
                      setConnection={setConnection}
                      setActiveKey={setActiveKey}
                    />
                  )}
                </Tabs.TabPane>

                <Tabs.TabPane
                  tab="Source Schema"
                  key="schema_tab"
                  disabled={!(connection && connection?.title && connectionId)}
                >
                  <SourceSchema
                    connectionId={connectionId}
                    connection={connection}
                    workspace={localStorage.getItem("workspace")}
                    ingestionCss={ingestionCss}
                    setActiveKey={setActiveKey}
                    setTableData={setTableData}
                    nodeId={nodeId}
                    sourceData={sourceData}
                    setSourceData={setSourceData}
                  />
                </Tabs.TabPane>
                <Tabs.TabPane
                  tab="Fields"
                  key="fields_tab"
                  disabled={!tableData?.metadata}
                >
                  <KeyTable
                    key={Date.now()}
                    ingestionCss={ingestionCss}
                    metadata={tableData?.metadata}
                    nodeId={nodeId}
                    sourceData={sourceData}
                    setSourceData={setSourceData}
                  />
                </Tabs.TabPane>
              </Tabs>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Preview" key="2" disabled={!tableData?.data}>
              <DataTable
                ingestionCss={ingestionCss}
                tableData={tableData?.data}
              />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default Source;
