import {
  Table,
  Space,
  Button,
  Collapse,
  Card,
  message,
  Drawer,
  Row,
  Col,
  Select,
  Divider,
  Badge,
  Modal,
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
  RELEASEVERSION,
  TABLECHANGELOGS,
  COLUMNCHANGELOGS,
  CHANGELOGS,
  GETANALYZEDATA,
  UPDATEDESIGN,
} from "../../network/apiConstants";
import {
  fetch_retry_post,
  fetch_retry_get,
  fetch_retry_put,
} from "../../network/api-manager";
import {
  SetTabTypeAction,
  SetProjectTransformDetailsAction,
  loderShowHideAction,
} from "../../Redux/action";

import { DownOutlined, UpOutlined } from "@ant-design/icons";

import DrawerView from "./drawerView";
import DesignPanel from "./designPanel";
import { useIsVisible } from "../../hooks/useIsVisible";

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
  const [fileName, setFileName] = useState();
  const [errorDetails, setErrorDetails] = useState({});
  const [updatedTableDetails, setUpdatedTableDetails] = useState([]);
  const [updatedColumnDetails, setUpdatedColumnDetails] = useState([]);
  const [finalDataForUpdate, setFinalDataForUpdate] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );

  const refs = useRef();
  const refBtn = useRef();
  const UpperRef = useRef();
  const isVisible = useIsVisible(refBtn);

  const showTableLogs = async (baseTableName, tableId) => {
    setColumnLog([]);
    setTableColumnsChange({});
    const logData = await fetch_retry_get(
      `${TABLECHANGELOGS}${fileId}?tableId=${tableId}`
    );
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
      setOpen(true);
    }
  };

  const showColumnLogs = async (
    columnId,
    baseColumnName,
    baseColumnType,
    tableId
  ) => {
    setTableNameLog([]);
    setTableColumnsChange({});
    const logData = await fetch_retry_get(
      `${COLUMNCHANGELOGS}${fileId}?tableId=${tableId}&columnId=${columnId}`
    );
    const logDataArr = logData?.data;
    if (logDataArr?.length > 0) {
      setOpen(true);
      setColumnLog(
        [
          ...logDataArr,
          {
            columnName: baseColumnName,
            columnType: baseColumnType,
            userEmail: <p style={{ color: "green" }}>Base Column Name</p>,
            version: 1,
          },
        ].sort((a, b) => b.version - a.version)
      );
    } else {
      setColumnLog([]);
      setOpen(true);
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
      `${ANALYZESUMMARY}${
        query.id ? query.id : projectDetails.projectId
      }?type=analyze`
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
    myRef?.current?.scrollIntoView({ behavior: "smooth" });
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

  const updateFinalFileRecord = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const _temp = JSON.parse(JSON.stringify(updatedTableDetails));

    if (updatedColumnDetails && updatedColumnDetails.length) {
      updatedColumnDetails.forEach((e) => {
        var index = _temp.findIndex(
          (p) => p.tableId == e?.tableDetails?.tableId
        );
        if (index < 0) {
          _temp.push({
            tableId: e?.tableDetails?.tableId,
            tableName: e?.tableDetails?.tableName,
            columns: [
              {
                columnId: e.columnId,
                columnName: e.columnName,
                columnType: e.columnType,
                changedBy: authData?.userId,
                changeDateTime: null,
              },
            ],
          });
        } else {
          _temp[index]?.columns.push({
            columnId: e.columnId,
            columnName: e.columnName,
            columnType: e.columnType,
            changedBy: authData?.userId,
            changeDateTime: null,
          });
        }
      });
    }
    setFinalDataForUpdate(_temp);
  };

  useEffect(() => {
    updateFinalFileRecord();
  }, [updatedTableDetails, updatedColumnDetails]);

  const updateFileRecord = async (release = false) => {
    dispatch(loderShowHideAction(true));

    const authData = JSON.parse(localStorage.getItem("authData"));
    if (finalDataForUpdate.length) {
      await fetch_retry_put(
        `${UPDATEDESIGN}${fileId}?userId=${authData?.userId}`,
        finalDataForUpdate
      );
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
    getFileData(fileId);
    dispatch(loderShowHideAction(false));
  };


  const changeVersion = async (version) => {
    const tableData = await fetch_retry_get(
      `${TABLE}${fileId}?version=${version}`
    );
    setChildData(tableData?.data?.tables ? tableData?.data?.tables : []);
    getTableData(tableId, version);

    setUpdatedTableDetails([]);
    setUpdatedColumnDetails([]);
  };

  const updatedTableDetailsAction = async (data) => {
    const _temp = JSON.parse(JSON.stringify(updatedTableDetails));
    var index = _temp.findIndex((p) => p.tableId == data.tableId);
    if (index < 0) {
      _temp.push({
        tableId: data.tableId,
        tableName: data.newName,
        columns: [],
      });
    } else {
      if (data.newName === data.tableName) {
        _temp.splice(index, 1);
      } else {
        _temp[index].tableName = data.newName;
      }
    }
    setUpdatedTableDetails(_temp);
  };

  const updatedColumnDetailsAction = async (data) => {
    const _temp = JSON.parse(JSON.stringify(updatedColumnDetails));
    var index = _temp.findIndex(
      (p) =>
        p.columnId == data.columnId &&
        p.tableDetails.tableId == data.tableDetails.tableId
    );
    if (index < 0) {
      _temp.push({
        columnId: data.columnId,
        columnName: data.newName,
        columnType: data.columnType,
        tableDetails: data?.tableDetails,
      });
    } else {
      if (data.newName === data.columnName) {
        _temp.splice(index, 1);
      } else {
        _temp[index].columnName = data.newName;
      }
    }
    setUpdatedColumnDetails(_temp);
  };

  const getErrorDetails = async (analyzeDetailsId) => {
    setLoading(true);
    const modelVersionObj = await fetch_retry_get(
      `${VERSION}${analyzeDetailsId}`
    );
    const version = modelVersionObj?.data?.isDraft
      ? modelVersionObj?.data?.version + 1
      : modelVersionObj?.data?.version;

    const data = await fetch_retry_get(
      `${GETANALYZEDATA}${analyzeDetailsId}?version=${version}`
    );
    setErrorDetails(data.data);
    setModalOpen(true);
    setLoading(false);
  };

  const changeLogs = () => {
    return (
      <>
        <p>Change logs</p>
        {tableColumnsChange?.pastVersionDetails?.tableAndColumns.length > 0 && (
          <Select
            ref={refs}
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
              refs.current.blur();
              setVersion(version);
              changeVersion(version);
              getFileChangeLog(version);
            }}
            options={versionListArr.filter((e) => {
              return e.value > 1;
            })}
          />
        )}
      </>
    );
  };

  const getTrueStatus = (fileStatus) => {
    switch (fileStatus) {
      case "convert_failed":
        return <Badge count={"Transformed Partially"} color="orange" />;
      case "converted":
        return <Badge count={"Transformed Successfully"} color="green" />;
      default:
        return <Badge count={"Analysis Completed"} color="green" />;
    }
  };

  const gerFalseStatus = (fileStatus) => {
    switch (fileStatus) {
      case "analyze_failed":
        return <Badge count={"Analysis Failed"} color="red" />;
      default:
        return <Badge count={"Analysis Completed"} color="green" />;
    }
  };

  return (
    <>
      <Modal
        title={<h4 style={{ color: "#052b3b" }}>{errorDetails.fileName}</h4>}
        centered
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => setModalOpen(false)}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <ul>
          {errorDetails &&
            errorDetails?.failureReasons &&
            errorDetails?.failureReasons.map((error) => {
              return (
                <li style={{ color: "#e74860", marginBottom: "4px" }}>
                  {error?.errorLocation}
                </li>
              );
            })}
        </ul>
      </Modal>
      <div className={dataModernizationCss.designMain}>
        <Table
          pagination={false}
          className="demo"
          rowKey="fileId"
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
              title: "Status",
              key: "fileStatus",
              render: (_, record) => {
                return record?.isUserAction
                  ? getTrueStatus(record.fileStatus)
                  : gerFalseStatus(record.fileStatus);
              },
            },
            {
              title: "Action",
              key: "action",
              render: (_, record) => {
                switch (record.fileStatus) {
                  case "analyze_failed":
                    return (
                      <Space size="middle" style={{ cursor: "not-allowed-" }}>
                        <a
                          style={{ cursor: "not-allowed-" }}
                          onClick={() => {
                            getErrorDetails(record.fileId);
                          }}
                        >
                          Details
                        </a>
                      </Space>
                    );
                  default:
                    switch (record.isUserAction) {
                      case true:
                        return (
                          <Space size="middle">
                            <a
                              onClick={() => {
                                getFileData(record.fileId);
                                setFileName(record.fileName);
                              }}
                            >
                              Details
                            </a>
                          </Space>
                        );
                      default:
                        return (
                          <Space
                            size="middle"
                            style={{ cursor: "not-allowed" }}
                          >
                            <a style={{ cursor: "not-allowed" }}>Details</a>
                          </Space>
                        );
                    }
                }
              },
            },
          ]}
          dataSource={fileList.sort((a, b) => a.fileId - b.fileId)}
        />
      </div>

      <Drawer
        title={
          tableNameLog.length > 0
            ? "Table Logs"
            : columnLog.length > 0
            ? "Column Logs"
            : changeLogs()
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
            dataModernizationCss={dataModernizationCss}
            setVersion={setVersion}
            changeVersion={changeVersion}
            getFileChangeLog={getFileChangeLog}
          />
        )}
      </Drawer>
      <div className={dataModernizationCss.designMain} ref={myRef}>
        {childData.length > 0 && (
          <Card
            ref={UpperRef}
            bordered={false}
            className={dataModernizationCss.designCard}
          >
            <div
              className={dataModernizationCss.okbutton}
              onClick={() => {
                isVisible
                  ? UpperRef.current.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                      inline: "nearest",
                    })
                  : refBtn.current.scrollIntoView({
                      behavior: "smooth",
                      block: "end",
                      inline: "nearest",
                    });
              }}
            >
              {isVisible ? <UpOutlined /> : <DownOutlined />}
            </div>
            <Row className={dataModernizationCss.detailsTitle}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                <h2>
                  {fileName}{" "}
                  <span>
                    (
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
                    )
                  </span>
                </h2>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
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
                    changeVersion(version);
                  }}
                  options={versionListArr}
                />
              </Col>
            </Row>
            <Divider />
            <Collapse
              defaultActiveKey={Array(childData.length)
                .fill(undefined)
                .map((a, b) => {
                  return b + "panel";
                })}
              ghost
            >
              {childData
                .sort((a, b) => a.tableId - b.tableId)
                .map((e, i) => {
                  return (
                    <Panel
                      header={`${e.tableName} (${e.baseTableName})`}
                      key={i + "panel"}
                      forceRender={true}
                    >
                      <DesignPanel
                        dataModernizationCss={dataModernizationCss}
                        e={e}
                        versionListArr={versionListArr}
                        version={version}
                        fileId={fileId}
                        showColumnLogs={showColumnLogs}
                        updatedTableDetailsAction={updatedTableDetailsAction}
                        updatedColumnDetailsAction={updatedColumnDetailsAction}
                        showTableLogs={showTableLogs}
                      />
                    </Panel>
                  );
                })}
            </Collapse>
          </Card>
        )}
      </div>

      <div
        style={{ marginTop: "2%" }}
        className={dataModernizationCss.nextExitBtn}
        ref={refBtn}
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
          Save
        </Button>
        <Button
          type="primary"
          danger
          className={dataModernizationCss.nextBtn}
          onClick={() => {
            // updateFileRecord(true);
          }}
          // disabled={loading || versionListArr.length != version}
          disabled={true}
        >
          Transform File
        </Button>
      </div>
    </>
  );
}
