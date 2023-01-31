import {
  Table,
  Space,
  Button,
  Input,
  Collapse,
  Card,
  Row,
  Col,
  message,
  Select,
  Drawer,
  Timeline,
  Divider,
} from "antd";
const { Panel } = Collapse;
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  ANALYZESUMMARY,
  VERSION,
  TABLE,
  TABLEDATA,
  UPDATETABLE,
  UPDATECOLDETAILS,
  RELEASEVERSION,
  TABLECHANGELOGS,
  COLUMNCHANGELOGS,
  CHANGELOGS,
} from "../../network/apiConstants";
import {
  fetch_retry_post,
  fetch_retry_get,
  fetch_retry_put,
} from "../../network/api-manager";
import {
  SetTabTypeAction,
  SetProjectTransformDetailsAction,
  SetDesignDetailsAction,
} from "../../Redux/action";

import { LoadingOutlined } from "@ant-design/icons";

export default function Design({ dataModernizationCss }) {
  const { query } = useRouter();
  const myRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [fileId, setFileId] = useState();
  const [version, setVersion] = useState();
  const [childData, setChildData] = useState([]);
  const [childTableData, setChildTableData] = useState([]);
  const [preChildTableData, setPreChildTableData] = useState([]);
  const [tableId, setTableId] = useState([]);
  const [tableName, setTableName] = useState("");
  const [preTableName, setPreTableName] = useState("");
  const [versionListArr, setVersionListArr] = useState([]);
  const [isDraftState, setIsDraftState] = useState(false);
  const [open, setOpen] = useState(false);
  const [tableNameLog, setTableNameLog] = useState([]);
  const [columnLog, setColumnLog] = useState([]);
  const [tableColumnsChange, setTableColumnsChange] = useState({
    pastVersionDetails: {
      tableAndColumns: [
        {
          tableId: 464,
          tableName: "ALLIVET_ORDER_STATUS_DAY",
          columnDetails: [
            {
              columnId: 5468,
              columnName: "ALLIVET_ORDER_NBR",
              columnType: "STRING",
            },
            {
              columnId: 5469,
              columnName: "RX_HOLD_DT",
              columnType: "DATE",
            },
            {
              columnId: 5470,
              columnName: "OPEN_DT",
              columnType: "DATE",
            },
            {
              columnId: 5471,
              columnName: "COMPLETE_DT",
              columnType: "DATE",
            },
            {
              columnId: 5472,
              columnName: "VOID_DT",
              columnType: "DATE",
            },
            {
              columnId: 5473,
              columnName: "UPDATE_TSTMP",
              columnType: "TIMESTAMP",
            },
            {
              columnId: 5474,
              columnName: "LOAD_TSTMP",
              columnType: "TIMESTAMP",
            },
          ],
        },
      ],
    },
    currentVersionDetails: {
      tableAndColumsWithUser: [
        {
          tableName: "ALLIVET_ORDER_STATUS_DAY_version_2",
          tableId: 464,
          userEmail: "vishesh.tungare@nucleusteq.com",
          columnDetails: [
            {
              columnId: 5468,
              columnName: "ALLIVET_ORDER_NBR_v2",
              columnType: "STRING",
            },
            {
              columnId: 5469,
              columnName: "RX_HOLD_DT",
              columnType: "DATE",
            },
            {
              columnId: 5470,
              columnName: "OPEN_DT",
              columnType: "DATE",
            },
            {
              columnId: 5471,
              columnName: "COMPLETE_DT",
              columnType: "DATE",
            },
            {
              columnId: 5472,
              columnName: "VOID_DT",
              columnType: "DATE",
            },
            {
              columnId: 5473,
              columnName: "UPDATE_TSTMP",
              columnType: "TIMESTAMP",
            },
            {
              columnId: 5474,
              columnName: "LOAD_TSTMP",
              columnType: "TIMESTAMP",
            },
          ],
        },
      ],
    },
    changedColumnDetails: [
      {
        tableId: 464,
        columnIdAndUserEmail: [
          {
            columnId: 5468,
            userEmail: "vishesh.tungare@nucleusteq.com",
          },
        ],
      },
    ],
  });

  const dispatch = useDispatch();
  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );

  const showTableLogs = async (baseTableName) => {
    setColumnLog([]);
    setTableColumnsChange({});
    const logData = await fetch_retry_get(`${TABLECHANGELOGS}${tableId}`);
    const logDataArr = logData?.data;
    if (logDataArr?.length > 0) {
      setOpen(true);
      setTableNameLog(
        [
          ...logDataArr,
          {
            tableName: baseTableName,
            userEmail: <p style={{ color: "green" }}>Base Table Name</p>,
            version: 1,
          },
        ].sort((a, b) => b.version - a.version)
      );
    } else {
      setTableNameLog([]);
      setOpen(false);
    }
  };

  const showColumnLogs = async (columnId) => {
    setTableNameLog([]);
    setTableColumnsChange({});
    const logData = await fetch_retry_get(`${COLUMNCHANGELOGS}${columnId}`);
    const logDataArr = logData?.data;
    if (logDataArr?.length > 0) {
      setOpen(true);
      setColumnLog(logDataArr.sort((a, b) => b.version - a.version));
    } else {
      setColumnLog([]);
      setOpen(false);
    }
  };

  const getFileChangeLog = async (v = null) => {
    setColumnLog([]);
    setTableNameLog([]);

    const tableKeyData = await fetch_retry_get(
      `${CHANGELOGS}${fileId}?version=${v ? v : version}`,
      {
        version: v ? v : version,
      }
    );
    setOpen(true);
    setTableColumnsChange(tableKeyData.data);
  };

  const onClose = () => {
    setOpen(false);
  };

  const getDesignData = async () => {
    const data = await fetch_retry_get(
      `${ANALYZESUMMARY}${query.id ? query.id : projectDetails.projectId}`
    );
    setLoading(false);
    if (data.success) {
      setFileList(data?.data?.fileDetails);
    } else {
      dispatch(SetProjectTransformDetailsAction({}));
      dispatch(SetTabTypeAction("Connect"));
      message.error([data?.error]);
    }
  };

  useEffect(() => {
    getDesignData();
  }, []);

  const getFileData = async (fileId) => {
    myRef?.current?.scrollIntoView({ behavior: "smooth" });
    setFileId(fileId);

    const modelVersionObj = await fetch_retry_get(`${VERSION}${fileId}`);
    const version = modelVersionObj?.data?.isDraft
      ? modelVersionObj?.data?.version + 1
      : modelVersionObj?.data?.version;

    setIsDraftState(modelVersionObj?.data?.isDraft);
    setVersion(version);

    const tableData = await fetch_retry_get(
      `${TABLE}${fileId}?version=${version}`
    );
    setChildData([]);
    setChildData(tableData?.data?.tables ? tableData?.data?.tables : []);

    const versionList = [];
    for (let index = 1; index <= version; index++) {
      versionList.push({
        value: index,
        label:
          "Version " +
          index +
          (modelVersionObj?.data?.isDraft == true && index == version
            ? " (Draft)"
            : ""),
      });
    }
    setVersionListArr(versionList);
  };

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

  const updateFileRecord = async (release = false) => {
    setLoading(true);
    const authData = JSON.parse(localStorage.getItem("authData"));

    if (tableName.trim() != preTableName.trim()) {
      await fetch_retry_put(
        `${UPDATETABLE}${fileId}?userId=${authData?.userId}`,
        [
          {
            tableId: tableId,
            tableName: tableName,
          },
        ]
      );
      getFileData(fileId);
    }

    const isSameUser = (a, b) => {
      return a.columnId === b.columnId && a.columnName === b.columnName;
    };
    const onlyInLeft = (left, right, compareFunction) => {
      return left.filter((leftValue) => {
        return !right.some((rightValue) =>
          compareFunction(leftValue, rightValue)
        );
      });
    };
    const result = onlyInLeft(childTableData, preChildTableData, isSameUser);

    if (result && result.length) {
      await fetch_retry_put(
        `${UPDATECOLDETAILS}${fileId}?userId=${authData?.userId}`,
        result
      );
      getFileData(fileId);
    }

    if (release) {
      await fetch_retry_post(`${RELEASEVERSION}${fileId}`);
      dispatch(
        SetProjectTransformDetailsAction({
          analyzeDetailsId: fileId,
          version: isDraftState ? version : version + 1,
        })
      );
      dispatch(SetTabTypeAction("Transform"));
    }

    setLoading(false);
  };

  const updateFileRecord_old = async (release = false) => {
    setLoading(true);
    const authData = JSON.parse(localStorage.getItem("authData"));
    let res1 = await fetch_retry_put(
      `${UPDATETABLE}${fileId}?userId=${authData?.userId}`,
      [
        {
          tableId: tableId,
          tableName: tableName,
        },
      ]
    );

    getFileData(fileId);
    if (res1.success) {
      let res2 = await fetch_retry_put(
        `${UPDATECOLDETAILS}${fileId}?userId=${authData?.userId}`,
        childTableData
      );
      getFileData(fileId);
      if (res2.success && release) {
        let res3 = await fetch_retry_post(`${RELEASEVERSION}${fileId}`);

        if (res3.success && res1.success && res2.success) {
          dispatch(
            SetProjectTransformDetailsAction({
              analyzeDetailsId: fileId,
              version: isDraftState ? version : version + 1,
            })
          );
          dispatch(SetTabTypeAction("Transform"));
          setLoading(false);
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const changeVersion = async (version, i) => {
    const tableData = await fetch_retry_get(
      `${TABLE}${fileId}?version=${version}`
    );
    setChildData(tableData?.data?.tables ? tableData?.data?.tables : []);
    getTableData(tableId, version);
    setTableName(tableData?.data?.tables[i]?.tableName);
  };

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
            // color: oldName?.tableName != newName?.tableName ? "red" : "#0c3246",
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
            // color: oldName?.tableName != newName?.tableName ? "green" : "#0c3246",
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
                oldName?.columnName != newName?.columnName ? "#ffd7d5" : "#FFF",
            }}
          >
            <b>{oldName?.columnName}</b>
          </p>
          <p>
            <small><i>{oldName?.columnType}</i></small>
          </p>
        </>
      );
    } else {
      return (
        <>
          <p
            style={{
              backgroundColor:
                oldName?.columnName != newName?.columnName ? "#e6ffec" : "#FFF",
            }}
          >
            <b>{newName?.columnName}</b>
          </p>
          <p>
            <small><i>{newName?.columnType}</i></small>
          </p>
        </>
      );
    }

    return <p>{columnId}</p>;
  };

  return (
    <>
      <div className={dataModernizationCss.designMain}>
        <Table
          pagination={false}
          className="demo"
          columns={[
            {
              title: "File",
              dataIndex: "fileName",
              key: "fileName",
            },
            {
              title: "Workflows",
              dataIndex: "workflows",
              key: "workflows",
            },
            {
              title: "Mappings",
              dataIndex: "mappings",
              key: "mappings",
            },
            {
              title: "Transformations",
              dataIndex: "transformations",
              key: "transformations",
            },

            {
              title: "Action",
              key: "action",
              render: (_, record) => (
                <Space size="middle">
                  <a
                    onClick={() => {
                      getFileData(record.fileId);
                    }}
                  >
                    Details
                  </a>
                </Space>
              ),
            },
          ]}
          dataSource={fileList}
        />
      </div>
      <Drawer
        title={tableNameLog.length > 0 ? "Table Logs" : "Column Logs"}
        placement={"right"}
        closable={false}
        onClose={onClose}
        open={open}
        key={"placement1"}
        width={"45%"}
      >
        <Timeline mode={"left"}>
          {tableNameLog.length > 0 &&
            tableNameLog.map((e) => {
              return (
                <Timeline.Item
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
                          {e.tableName}
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
                        <h5
                          style={{ color: "#0c3246", wordBreak: "break-all" }}
                        >
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

          {tableColumnsChange?.pastVersionDetails?.tableAndColumns.map(
            (table, i) => {
              return (
                <Row>
                  <Col span={24}>
                    <Select
                      className="inputDesignSelect"
                      showSearch
                      style={{
                        width: "100%",
                        marginBottom: "4%",
                      }}
                      placeholder="Search to Select"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      value={version}
                      onSelect={(version) => {
                        setVersion(version);
                        changeVersion(version, i);
                        getFileChangeLog(version);
                      }}
                      options={versionListArr.filter((e) => {
                        return e.value > 1;
                      })}
                    />
                  </Col>
                  <Col span={24}>
                    <h3>
                      <b>TABLE NAME</b>
                    </h3>
                  </Col>
                  <Col span={24} style={{ marginTop: "1%" }}>
                    <Row>
                      <Col span={1}></Col>
                      <Col span={10}>
                        {findCurrentTableName(table.tableId, "OLD")}
                      </Col>
                      <Col span={2} style={{textAlign : "center"}}>-</Col>
                      <Col span={10}>
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
                        <Row>
                          <Col span={2}></Col>
                          <Col span={9}>
                            {findCurrentColumnName(col.columnId, i, "OLD")}
                          </Col>
                          <Col span={2} style={{textAlign : "center"}}>-</Col>
                          <Col span={9}>
                            <p>
                              {findCurrentColumnName(col.columnId, i, "NEW")}
                            </p>
                          </Col>
                          <Col span={2}></Col>
                          <Col span={24}>{/* <Divider /> */}</Col>
                        </Row>
                      );
                    })}
                  </Col>
                </Row>
              );
            }
          )}
        </Timeline>
      </Drawer>
      <div className={dataModernizationCss.designMain} ref={myRef}>
        {childData.length > 0 && (
          <Card bordered={false} className={dataModernizationCss.designCard}>
            <Collapse
              defaultActiveKey={""}
              onChange={(e) => {
                if (childData[e]?.tableId != undefined) {
                  getTableData(childData[e].tableId);
                  setTableName(childData[e].tableName);
                  setPreTableName(childData[e].tableName);
                }
              }}
              accordion
              ghost
            >
              {childData.map((e, i) => {
                return (
                  <>
                    <Panel
                      header={`${e.tableName} (${e.baseTableName})`}
                      key={i}
                      forceRender={true}
                      extra={
                        <div onClick={(e) => e.stopPropagation()}>
                          <a
                            onClick={() => {
                              getFileChangeLog();
                            }}
                          >
                            View Change Logs
                          </a>
                        </div>
                      }
                    >
                      <Row style={{ marginTop: "1vh", marginBottom: "5vh" }}>
                        <Col span={11}>
                          <Row>
                            <Col
                              className={dataModernizationCss.tableNameView}
                              span={24}
                            >
                              Target Table Plan
                            </Col>
                            <Col span={24}>
                              <Input
                                onChange={(e) => setTableName(e.target.value)}
                                value={
                                  tableName != "" ? tableName : e.tableName
                                }
                                // defaultValue={e.tableName}
                                style={{ borderRadius: "10px", height: "5vh" }}
                                disabled={versionListArr.length != version}
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col span={2} />
                        <Col span={11}>
                          <Row>
                            <Col
                              className={dataModernizationCss.tableNameView}
                              span={24}
                            >
                              Select Versions
                            </Col>
                            <Col span={24}>
                              <Select
                                className="inputDesignSelect"
                                showSearch
                                style={{
                                  width: "100%",
                                }}
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                  (option?.label ?? "").includes(input)
                                }
                                value={version}
                                onSelect={(version) => {
                                  setVersion(version);
                                  changeVersion(version, i);
                                }}
                                options={versionListArr}
                              />
                            </Col>
                          </Row>
                        </Col>
                        {/* <Col span={1} /> */}
                        <Col span={4} className="centerButton">
                          {/* <Button
                            type="primary"
                            style={{
                              backgroundColor: "#e74860",
                              border: "1px solid #e74860",
                            }}
                            onClick={() => {
                              showTableLogs(e.baseTableName);
                            }}
                          >
                            Table Change Logs
                          </Button> */}
                          <p
                            style={{
                              color: "#e74860",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              showTableLogs(e.baseTableName);
                            }}
                          >
                            Change Logs
                          </p>
                        </Col>
                      </Row>

                      <Table
                        pagination={false}
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
                            render: (record, e, index) => (
                              <Input
                                value={e.columnName}
                                onChange={(_e) => {
                                  const _tamp = JSON.parse(
                                    JSON.stringify(childTableData)
                                  );
                                  _tamp[index].columnName = _e.target.value;
                                  setChildTableData(_tamp);
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
                            render: (record, e, index) => (
                              <p
                                style={{
                                  color: "#e74860",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  showColumnLogs(e.columnId);
                                }}
                              >
                                Change Logs
                              </p>
                            ),
                          },
                        ]}
                        dataSource={childTableData}
                      />

                      <div
                        style={{ marginTop: "2%" }}
                        className={dataModernizationCss.nextExitBtn}
                      >
                        <Button
                          type="primary"
                          style={{ marginRight: "1rem", color: "#fff" }}
                          danger
                          className={dataModernizationCss.exitBtn}
                          htmlType="submit"
                          onClick={() => {
                            updateFileRecord();
                          }}
                          disabled={loading || versionListArr.length != version}
                        >
                          Save {loading && <LoadingOutlined spin />}
                        </Button>
                        <Button
                          type="primary"
                          danger
                          className={dataModernizationCss.nextBtn}
                          onClick={() => {
                            updateFileRecord(true);
                          }}
                          disabled={loading || versionListArr.length != version}
                        >
                          Transform File
                        </Button>
                      </div>
                    </Panel>
                  </>
                );
              })}
            </Collapse>
          </Card>
        )}
      </div>

      <div className={dataModernizationCss.nextExitBtn}>
        <Button
          type="primary"
          danger
          className={dataModernizationCss.nextBtn}
          htmlType="submit"
          disabled={loading || versionListArr.length != version}
          onClick={() => {
            dispatch(SetProjectTransformDetailsAction({}));
            dispatch(SetTabTypeAction("Transform"));
          }}
        >
          Transform Project
        </Button>
      </div>
    </>
  );
}
