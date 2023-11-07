import React, { useState } from "react";
import { Row, Col, Tabs, Button } from "antd";
import General from "./general";
import SelectSource from "./selectSource";
import AddSource from "./addSource";
import KeyTable from "./keyTable";
import SourceSchema from "./sourceSchema";
import DataTable from "./dataTable";

const Source = ({ ingestionCss }) => {
  const [connection, setConnection] = useState({});
  const [activeKey, setActiveKey] = useState("general_tab");
  const [connectionId, setConnectionId] = useState(null);
  const [tableData, setTableData] = useState({});

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
                // setConnection({})
              >
                <Tabs.TabPane tab="General" key="general_tab">
                  <General ingestionCss={ingestionCss} />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Source" key="source_tab">
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
                  disabled={!(connection && connection?.title)}
                >
                  <SourceSchema
                    connectionId={connectionId}
                    connection={connection}
                    workspace={localStorage.getItem("workspace")}
                    ingestionCss={ingestionCss}
                    setActiveKey={setActiveKey}
                    setTableData={setTableData}
                  />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Fields" key="fields_tab" disabled={!tableData?.metadata}>
                  <KeyTable ingestionCss={ingestionCss} metadata={tableData?.metadata} />
                </Tabs.TabPane>
              </Tabs>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Preview" key="2" disabled={!tableData?.data}>
              <DataTable ingestionCss={ingestionCss} tableData={tableData?.data} />
            </Tabs.TabPane>
            {/* <Tabs.TabPane tab="Preview" key="2">
              Preview
            </Tabs.TabPane>
            <Tabs.TabPane tab="Source" key="3">
              Source
            </Tabs.TabPane> */}
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default Source;
