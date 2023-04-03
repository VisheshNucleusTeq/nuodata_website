import React from "react";
import { Table, Input, Row, Col } from "antd";
import { useEffect, useState } from "react";

import { TABLEDATA } from "../../network/apiConstants";
import { fetch_retry_get } from "../../network/api-manager";

const DesignPanel = ({
  dataModernizationCss,
  e,
  versionListArr,
  version,
  fileId,
  showColumnLogs,
  updatedTableDetailsAction,
  updatedColumnDetailsAction,
  showTableLogs,
}) => {
  const [tableName, setTableName] = useState("");
  const [childTableData, setChildTableData] = useState([]);
  const [preChildTableData, setPreChildTableData] = useState([]);
  const [tableId, setTableId] = useState([]);

  const getTableData = async (tableId, v = null) => {
    setTableId(tableId);

    const tableKeyData = await fetch_retry_get(
      `${TABLEDATA}${fileId}?version=${v ? v : version}&tableId=${tableId}`,
      {
        version: v ? v : version,
        tableId: tableId,
      }
    );
    setChildTableData(tableKeyData?.data);
    setPreChildTableData(tableKeyData?.data);
  };

  useEffect(() => {
    getTableData(e.tableId);
  }, [e]);

  return (
    <>
      <Row style={{ marginTop: "1vh", marginBottom: "5vh" }}>
        <Col span={11}>
          <Row>
            <Col className={dataModernizationCss.tableNameView} span={24}>
              Target Table Plan
            </Col>
            <Col span={24}>
              <Input
                onChange={(tableNameValue) => {
                  setTableName(tableNameValue.target.value);
                  updatedTableDetailsAction({
                    ...e,
                    newName: tableNameValue.target.value,
                  });
                }}
                value={tableName != "" ? tableName : e.tableName}
                style={{ borderRadius: "10px", height: "5vh" }}
                disabled={versionListArr.length != version}
              />
            </Col>
          </Row>
        </Col>
        <Col span={2} />
        <Col span={11}></Col>
        <Col span={4} className="centerButton">
          <p
            style={{
              color: "#e74860",
              cursor: "pointer",
            }}
            onClick={() => {
              showTableLogs(e.baseTableName, e.tableId);
            }}
          >
            Change Logs
          </p>
        </Col>
      </Row>

      <Table
        pagination={false}
        rowKey="columnId"
        columns={[
          {
            title: "Base Column Name",
            dataIndex: "baseColumnName",
            key: "baseColumnName",
          },
          {
            title: "Base Column Type",
            dataIndex: "baseColumnType",
            key: "baseColumnType",
          },

          {
            title: "Column Name",
            dataIndex: "columnName",
            key: "columnName",
            render: (record, eData, index) => (
              <Input
                value={eData.columnName}
                onChange={(_e) => {
                  const _tamp = JSON.parse(JSON.stringify(childTableData));
                  _tamp[index].columnName = _e.target.value;
                  setChildTableData(_tamp);
                  updatedColumnDetailsAction({
                    ...preChildTableData[index],
                    newName: _e.target.value,
                    tableDetails: e,
                  });
                }}
                disabled={versionListArr.length != version}
              />
            ),
          },
          {
            title: "Column Type",
            dataIndex: "columnType",
            key: "columnType",
          },
          {
            title: "Action",
            dataIndex: "columnId",
            key: "columnId",
            render: (record, _e, index) => (
              <p
                style={{
                  color: "#e74860",
                  cursor: "pointer",
                }}
                onClick={() => {
                  showColumnLogs(
                    _e.columnId,
                    _e.baseColumnName,
                    _e.baseColumnType,
                    e.tableId
                  );
                }}
              >
                Change Logs
              </p>
            ),
          },
        ]}
        dataSource={childTableData.sort((a, b) => a.columnId - b.columnId)}
      />
    </>
  );
};

export default DesignPanel;
