import React, { useState } from "react";
import { Row, Col, Tabs } from "antd";
import General from "./general";
import SelectSource from "./selectSource";
import AddSource from "./addSource";
import KeyTable from "./keyTable";
const Source = ({ ingestionCss }) => {
  const [connection, setConnection] = useState({});
  const [activeKey, setActiveKey] = useState("general_tab");

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
                  <SelectSource
                    ingestionCss={ingestionCss}
                    setConnection={setConnection}
                    setActiveKey={setActiveKey}
                  />
                </Tabs.TabPane>
                <Tabs.TabPane
                  tab="Source Schema"
                  key="schema_tab"
                  disabled={!(connection && connection?.title)}
                >
                  {connection && connection?.title && (
                    <AddSource
                      ingestionCss={ingestionCss}
                      connection={connection}
                      setIsModalOpen={() => {}}
                    />
                  )}
                  {/* <AddSource ingestionCss={ingestionCss} /> */}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Fields" key="fields_tab">
                  <KeyTable ingestionCss={ingestionCss} />
                </Tabs.TabPane>
              </Tabs>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Preview" key="2">
              Preview
            </Tabs.TabPane>
            <Tabs.TabPane tab="Source" key="3">
              Source
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default Source;
