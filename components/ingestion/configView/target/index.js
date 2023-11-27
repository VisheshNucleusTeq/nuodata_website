import React, { useState, useEffect } from "react";
import { Row, Col, Tabs, Button } from "antd";
import General from "./general";
import SelectSource from "./selectSource";
import AddSource from "./addSource";
import KeyTable from "./keyTable";
import SourceSchema from "./sourceSchema";
import DataTable from "./dataTable";
import {
  CREATENODE,
  INGESTIONTEMPLATES,
  GETCONNECTIONDETAIL,
} from "../../../../network/apiConstants";
import { fetch_retry_get, fetch_retry_post } from "../../../../network/api-manager";
const Target = ({ ingestionCss, nodeId }) => {
  const [connection, setConnection] = useState({});
  const [activeKey, setActiveKey] = useState("general_tab");
  const [connectionId, setConnectionId] = useState(null);
  const [tableData, setTableData] = useState({});
  const [accountListArr, setAccountListArr] = useState([]);

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

  const getRecord = async () => {
    const result = await fetch_retry_get(INGESTIONTEMPLATES);
    if (result.success) {
      setAccountListArr(result.data);
    } else {
      message.error(result.error);
    }
  };

  useEffect(() => {
    getRecord();
    getNodeRecord(nodeId);
  }, []);

  const getSchema = async (table, connectionId, type) => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const tableData = await fetch_retry_post(
      `${GETCONNECTIONDETAIL}schema/${table}?org_id=${
        authData?.orgId
      }&workspace_id=${localStorage.getItem(
        "workspace"
      )}&connection_id=${connectionId}&type=${type}&rows=10&node_id=${nodeId}`
    );
    setActiveKey("fields_tab");
    setTableData(tableData?.data);
  };

  useEffect(() => {
    if (
      sourceData?.transformation_properties &&
      sourceData?.transformation_properties?.length &&
      accountListArr &&
      accountListArr.length
    ) {
      sourceData?.transformation_properties.map((e) => {
        if (e?.property_name === "connection_type") {
          const conn = accountListArr.filter(
            (singleConn) => singleConn.type == e?.property_value
          );
          if (conn && conn.length) {
            setConnection(conn[0]);
            const connId = sourceData?.transformation_properties.filter(
              (e) => e?.property_name == "connection_id"
            );
            if (connId && connId.length) {
              setConnectionId(connId[0]?.property_value);

              const sourceTable = sourceData?.transformation_properties.filter(
                (e) => e?.property_name == "source_table"
              );

              if (sourceTable && sourceTable.length) {
                getSchema(
                  sourceTable[0]?.property_value,
                  connId[0]?.property_value,
                  e?.property_value
                );
              }
            }
          }
        }
      });
    }
  }, [
    sourceData?.transformation_properties &&
      sourceData?.transformation_properties?.length,
    accountListArr && accountListArr.length,
  ]);

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
                  {" "}
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
                          key={"source_add_source"}
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
                      accountListArr={accountListArr}
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
                </Tabs.TabPane>
              </Tabs>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Preview" key="2" disabled={!tableData?.sample_data}>
              <DataTable
                ingestionCss={ingestionCss}
                tableData={tableData?.sample_data}
              />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default Target;