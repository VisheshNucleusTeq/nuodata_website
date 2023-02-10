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
import DrawerView from "./drawerView";

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
  const [tableColumnsChange, setTableColumnsChange] = useState({});

  const [updatedTableDetails, setUpdatedTableDetails] = useState({});
  const [updatedColumnDetails, setUpdatedColumnDetails] = useState({});

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
    gerTableDate()

  };

  const gerTableDate = async () => {
    // console.log(setChildData)
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


  const changeVersion = async (version, i) => {
    const tableData = await fetch_retry_get(
      `${TABLE}${fileId}?version=${version}`
    );
    setChildData(tableData?.data?.tables ? tableData?.data?.tables : []);
    getTableData(tableId, version);
    setTableName(tableData?.data?.tables[i]?.tableName);
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
        title={
          tableNameLog.length > 0
            ? "Table Logs"
            : columnLog.length > 0
            ? "Column Logs"
            : "Change logs"
        }
        placement={"right"}
        closable={false}
        onClose={onClose}
        open={open}
        key={"placement1"}
        width={"45%"}
      >
        {open && (
          <DrawerView
            tableNameLog={tableNameLog}
            columnLog={columnLog}
            tableColumnsChange={tableColumnsChange}
            versionListArr={versionListArr}
            version={version}
            setVersion={setVersion}
            changeVersion={changeVersion}
            getFileChangeLog={getFileChangeLog}
          />
        )}
      </Drawer>

      <div className={dataModernizationCss.designMain} ref={myRef}>
        {childData.length > 0 && (
          <Card bordered={false} className={dataModernizationCss.designCard}>
            <Collapse
              // activeKey={Array(childData.length)
              //   .fill(undefined)
              //   .map((a, b) => {
              //     return b;
              //   })}
              defaultActiveKey={Array(childData.length)
                .fill(undefined)
                .map((a, b) => {
                  return b;
                })}
              // defaultOpenAll={true}
              onChange={(e) => {
                if (childData[e]?.tableId != undefined) {
                  getTableData(childData[e].tableId);
                  setTableName(childData[e].tableName);
                  setPreTableName(childData[e].tableName);
                }
              }}
              // accordion
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
                            style={{
                              color: "#e74860",
                              cursor: "pointer",
                            }}
                          >
                            Change Logs
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
                                // onChange={(e) => setTableName(e.target.value)}
                                // value={
                                //   tableName != "" ? tableName : e.tableName
                                // }
                                value={e.tableName}
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
                        <Col span={4} className="centerButton">
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

                      {JSON.stringify(e?.columnData)}
                      {/* {gerTableDate(i, e)} */}

                      {/* <div
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
                      </div> */}
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
