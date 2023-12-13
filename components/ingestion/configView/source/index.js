import { Col, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import {
  fetch_retry_get,
  fetch_retry_post,
} from "../../../../network/api-manager";
import {
  CREATENODE,
  GETCONNECTIONDETAIL,
  INGESTIONTEMPLATES,
  NODEMETADATA,
} from "../../../../network/apiConstants";
import AddSource from "./addSource";
import DataTable from "./dataTable";
import General from "./general";
import KeyTable from "./keyTable";
import SelectSource from "./selectSource";
import SourceSchema from "./sourceSchema";
import SourceSchemaInput from "./sourceSchemaInput";
const Source = ({ ingestionCss, nodeId, updateble }) => {
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
    const oldRecord = await fetch_retry_get(`${NODEMETADATA}${nodeId}/metadata`);
    if (oldRecord?.data?.sample_data && oldRecord?.data?.sample_data.length) {
      updateble ? setActiveKey("fields_tab") : null;
      setTableData(oldRecord?.data);
    } else {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const tableData = await fetch_retry_post(
        `${GETCONNECTIONDETAIL}data/${table}?org_id=${
          authData?.orgId
        }&workspace_id=${localStorage.getItem(
          "workspace"
        )}&connection_id=${connectionId}&type=${type}&rows=10&node_id=${nodeId}`
      );
      updateble ? setActiveKey("fields_tab") : null;
      setTableData(tableData?.data);
    }
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

              if (
                sourceTable &&
                sourceTable.length &&
                ["mysql", "mongodb", "snowflake", "postgres"].includes(
                  conn[0].type
                )
              ) {
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
          {/* <center style={{color : "#e74860"}}>{!updateble && "An update cannot be executed if the nodes are interconnected."}</center> */}
          <Tabs className={`${'underline'}`} defaultActiveKey="1">
          {/* <Tabs className={`${'underline'} ${!updateble ? 'buttonHide' : ""}`} defaultActiveKey="1"> */}
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

                <Tabs.TabPane
                  tab="Source"
                  key="source_tab"
                  disabled={!(sourceData && sourceData?.transformation_name)}
                >
                  {connection && connection?.title ? (
                    <Row>
                      <Col span={24}>
                        <AddSource
                          key={"source_add_source"}
                          ingestionCss={ingestionCss}
                          connection={connection}
                          setIsModalOpen={() => {}}
                          connectionId={connectionId}
                          setConnectionId={setConnectionId}
                          setActiveKey={setActiveKey}
                          setConnection={setConnection}
                          updateble={updateble}
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
                  tab="Source Dataset"
                  key="schema_tab"
                  disabled={!(connection && connection?.title && connectionId)}
                >
                  {["mysql", "mongodb", "snowflake", "postgres"].includes(
                    connection.type
                  ) && (
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
                      updateble={updateble}
                    />
                  )}
                  {["s3bucket"].includes(connection.type) && (
                    <SourceSchemaInput
                      connectionId={connectionId}
                      connection={connection}
                      workspace={localStorage.getItem("workspace")}
                      ingestionCss={ingestionCss}
                      setActiveKey={setActiveKey}
                      setTableData={setTableData}
                      nodeId={nodeId}
                      sourceData={sourceData}
                      setSourceData={setSourceData}
                      updateble={updateble}
                    />
                  )}
                </Tabs.TabPane>
                {["mysql", "mongodb", "snowflake", "postgres"].includes(
                  connection.type
                ) && (
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
                )}
              </Tabs>
            </Tabs.TabPane>
            {["mysql", "mongodb", "snowflake", "postgres"].includes(
              connection.type
            ) && (
              <Tabs.TabPane
                tab="Preview"
                key="2"
                disabled={!tableData?.sample_data}
              >
                <DataTable
                  ingestionCss={ingestionCss}
                  tableData={tableData?.sample_data}
                />
              </Tabs.TabPane>
            )}
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default Source;
