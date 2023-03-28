import React from "react";
import {
  Row,
  Col,
  Timeline,
  Divider,
} from "antd";

const DrawerView = ({
  tableNameLog,
  columnLog,
  tableColumnsChange,
  version,
  dataModernizationCss
}) => {
  const findCurrentTableName = (tableId, type) => {
    const oldName =
      tableColumnsChange?.pastVersionDetails?.tableAndColumns.find(
        (o) => o.tableId === tableId
      );
    const newName =
      tableColumnsChange?.currentVersionDetails?.tableAndColumsWithUser.find(
        (o) => o.tableId === tableId
      );

    if (type == "OLD") {
      return (
        <p
          style={{
            backgroundColor:
              oldName?.tableName != newName?.tableName ? "#ffd7d5" : "#FFF",
          }}
        >
          <b>{oldName?.tableName}</b>
        </p>
      );
    } else {
      return (
        <p
          style={{
            backgroundColor:
              oldName?.tableName != newName?.tableName ? "#e6ffec" : "#FFF",
          }}
        >
          <b>{newName?.tableName}</b>
        </p>
      );
    }
  };

  const findCurrentColumnName = (columnId, i, type) => {
    const oldName = tableColumnsChange?.pastVersionDetails?.tableAndColumns[
      i
    ].columnDetails.find((o) => o.columnId === columnId);

    const newName =
      tableColumnsChange?.currentVersionDetails?.tableAndColumsWithUser[
        i
      ].columnDetails.find((o) => o.columnId === columnId);

    if (type == "OLD") {
      return (
        <>
          <p
            style={{
              backgroundColor:
                oldName?.columnName !=
                (newName?.columnName
                  ? newName?.columnName
                  : oldName?.columnName)
                  ? "#ffd7d5"
                  : "#FFF",
            }}
          >
            <b>{oldName?.columnName}</b>
          </p>
          <p>
            <small>
              <i>{oldName?.columnType}</i>
            </small>
          </p>
        </>
      );
    } else {
      return (
        <>
          <p
            style={{
              backgroundColor:
                oldName?.columnName !=
                (newName?.columnName
                  ? newName?.columnName
                  : oldName?.columnName)
                  ? "#e6ffec"
                  : "#FFF",
            }}
          >
            <b>
              {newName?.columnName ? newName?.columnName : oldName?.columnName}
            </b>
          </p>
          <p>
            <small>
              <i>
                {newName?.columnType
                  ? newName?.columnType
                  : oldName?.columnType}
              </i>
            </small>
          </p>
        </>
      );
    }
  };

  return (
    <>
      {!tableColumnsChange?.pastVersionDetails?.tableAndColumns &&
        columnLog.length <= 0 &&
        tableNameLog.length <= 0 && (
          <center style={{ color: "red" }}>No logs available</center>
        )}

      <Timeline mode={"left"}>
        {tableNameLog.length > 0 &&
          tableNameLog.map((e) => {
            return (
              <Timeline.Item
                key={(Math.random() + 1).toString(36).substring(7)}
                style={{ height: "20vh", fontSize: "16px" }}
                label={
                  <>
                    <div
                      style={{
                        border: "1px solid #f0f0f0",
                        paddingRight: "5%",
                      }}
                    >
                      <h3 style={{ color: "#e74860", fontWeight: "bold" }}>
                        Version {e.version}
                      </h3>
                      <p
                        style={{
                          color: "#0c3246",
                          wordBreak: "break-all",
                        }}
                      >
                        {e.tableName.toString()}
                      </p>
                    </div>
                  </>
                }
              >
                <p style={{ color: "#0c3246" }}>{e.userEmail}</p>
              </Timeline.Item>
            );
          })}

        {columnLog.length > 0 &&
          columnLog.map((e) => {
            return (
              <Timeline.Item
                key={(Math.random() + 1).toString(36).substring(7)}
                style={{ height: "20vh", fontSize: "16px" }}
                label={
                  <>
                    <div
                      style={{
                        border: "1px solid #f0f0f0",
                        paddingRight: "5%",
                      }}
                    >
                      <h3 style={{ color: "#e74860", fontWeight: "bold" }}>
                        Version {e.version}
                      </h3>
                      <p style={{ color: "#0c3246", wordBreak: "break-all" }}>
                        {e.columnName}
                      </p>
                      <h5 style={{ color: "#0c3246", wordBreak: "break-all" }}>
                        {e.columnType}
                      </h5>
                    </div>
                  </>
                }
              >
                <div>
                  <p style={{ color: "#0c3246" }}>{e.userEmail}</p>
                </div>
              </Timeline.Item>
            );
          })}

        {tableColumnsChange?.pastVersionDetails?.tableAndColumns.length > 0 &&
          tableColumnsChange?.pastVersionDetails?.tableAndColumns.map(
            (table, i) => {
              return (
                <Row key={(Math.random() + 1).toString(36).substring(7)}>
                  <Col
                    span={24}
                    style={{ marginTop: "1%", marginBottom: "3%" }}
                  >
                    <Row>
                      <Col span={1}></Col>
                      <Col
                        span={10}
                        style={{ color: "#e74860", fontWeight: "bold" }}
                      >
                        VERSION {version - 1}
                      </Col>
                      <Col span={2} style={{ textAlign: "center" }}>
                        {">"}
                      </Col>
                      <Col
                        span={10}
                        style={{ color: "#e74860", fontWeight: "bold" }}
                      >
                        VERSION {version}
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <h3>
                      <b>TABLE NAME</b>
                    </h3>
                  </Col>
                  <Col span={24} style={{ marginTop: "1%" }}>
                    <Row>
                      <Col span={1}></Col>
                      <Col span={10} className={dataModernizationCss.wordCss}>
                        {findCurrentTableName(table.tableId, "OLD")}
                      </Col>
                      <Col span={2} style={{ textAlign: "center" }}>
                        -
                      </Col>
                      <Col span={10} className={dataModernizationCss.wordCss}>
                        {findCurrentTableName(table.tableId, "NEW")}
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                  </Col>
                  <Col span={24} style={{ marginTop: "2%" }}>
                    <h3>
                      <b>COLUMN</b>
                    </h3>
                  </Col>
                  <Col span={24} style={{ marginTop: "1%" }}>
                    {table?.columnDetails.map((col, j) => {
                      return (
                        <Row
                          key={(Math.random() + 1).toString(36).substring(7)}
                        >
                          <Col span={2}></Col>
                          <Col span={9} className={dataModernizationCss.wordCss}>
                            {findCurrentColumnName(col.columnId, i, "OLD")}
                          </Col>
                          <Col span={2} style={{ textAlign: "center" }}>
                            -
                          </Col>
                          <Col span={9} className={dataModernizationCss.wordCss}>
                            <p>
                              {findCurrentColumnName(col.columnId, i, "NEW")}
                            </p>
                          </Col>
                          <Col span={2}></Col>
                          <Col span={24}></Col>
                        </Row>
                      );
                    })}
                  </Col>
                  <Divider />
                </Row>
              );
            }
          )}
      </Timeline>
    </>
  );
};

export default DrawerView;
