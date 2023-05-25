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
  Tooltip,
  Modal,
  Radio,
} from "antd";
const { Panel } = Collapse;
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  ANALYZESUMMARY,
  VERSION,
  TABLE,
  RELEASEVERSION,
  TABLECHANGELOGS,
  COLUMNCHANGELOGS,
  CHANGELOGS,
  GETANALYZEDATA,
  UPDATEDESIGN,
  DISCARD,
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
  setOpenDetails,
} from "../../Redux/action";

import {
  DownOutlined,
  UpOutlined,
  EyeOutlined,
  UndoOutlined,
} from "@ant-design/icons";

import DrawerView from "./drawerView";
import DesignPanel from "./designPanel";
import { useIsVisible } from "../../hooks/useIsVisible";
import { fileStatusBadge } from "../helper/fileStatus";

export default function Design({ dataModernizationCss }) {
  const { query } = useRouter();
  const router = useRouter();
  const myRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [fileId, setFileId] = useState();
  const [version, setVersion] = useState();
  const [childData, setChildData] = useState([]);

  const [tableId, setTableId] = useState([]);
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
  const [tableType, setTableType] = useState("source");
  const [bothTableShow, setBothTableShow] = useState(false);
  const [sourceTargetData, setSourceTargetData] = useState([]);
  const [isRelease, setIsRelease] = useState(false);
  const [githubStatus, setGithubStatus] = useState(false);

  const dispatch = useDispatch();
  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );
  const openDetails = useSelector((state) => state.openDetails.openDetails);

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
      `${ANALYZESUMMARY}${query.id ? query.id : projectDetails.projectId}`
    );
    setLoading(false);
    if (data.success) {
      setFileList(data?.data?.fileDetails);

      const selectedFile = data?.data?.fileDetails.find(
        (e) => e.fileId == openDetails?.detailId
      );
      console.log({ selectedFile, openDetails });
      if (openDetails?.detailId) {
        getFileData(selectedFile?.fileId);
        setFileName(selectedFile?.fileName);
        dispatch(setOpenDetails({}));
      }
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
    setUpdatedTableDetails([]);
    setUpdatedColumnDetails([]);
    setSourceTargetData([]);

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
    setChildData(tableData?.data ? tableData?.data : []);

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
            type: e?.tableDetails?.tableType,
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

  const updateFileRecord = async (release = false) => {
    const sourceTargetDataArr = finalDataForUpdate.filter(
      (e) => e.type === "source_and_target"
    );
    if (sourceTargetDataArr.length > 0) {
      setIsRelease(release);
      setSourceTargetData(sourceTargetDataArr);
      setBothTableShow(true);
    } else {
      updateFileRecordAction(release);
    }
  };

  const updateFileRecordAction = async (release = false) => {
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
          isUserAction: true,
        })
      );
      dispatch(
        setOpenDetails({
          detailId: fileId,
        })
      );
      dispatch(SetTabTypeAction("Transform"));
    }
    getFileData(fileId);
    dispatch(loderShowHideAction(false));
  };

  const updatefinalData = (type, tableId) => {
    const _temp = JSON.parse(JSON.stringify(finalDataForUpdate));
    const index = _temp.findIndex((e) => e.tableId == tableId);
    _temp[index].type = type;
    setFinalDataForUpdate(_temp);
  };

  const changeVersion = async (version) => {
    const tableData = await fetch_retry_get(
      `${TABLE}${fileId}?version=${version}`
    );
    setChildData(tableData?.data ? tableData?.data : []);
    setTableId(tableId);
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
        type: data.tableType,
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

  useEffect(() => {
    updateFinalFileRecord();
  }, [updatedTableDetails, updatedColumnDetails]);

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

  const discardAllChanges = async (fileId, tableId = 0) => {
    dispatch(loderShowHideAction(true));
    await fetch_retry_post(`${DISCARD}${fileId}?tableId=${tableId}`);
    await getFileData(fileId);
    dispatch(loderShowHideAction(false));
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
      <Modal
        title={<h4 style={{ color: "#052b3b" }}>{errorDetails.fileName}</h4>}
        centered
        open={bothTableShow}
        onOk={() => {
          updateFileRecordAction(isRelease);
          setBothTableShow(false);
        }}
        okText={"confirm"}
        onCancel={() => setBothTableShow(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        width={"60%"}
      >
        <Table
          pagination={false}
          dataSource={sourceTargetData}
          columns={[
            {
              title: "Table Name",
              dataIndex: "tableName",
              key: "tableName",
            },
            {
              title: "Update at",
              dataIndex: "updateAt",
              key: "tableName",
              render: (_, record) => {
                return (
                  <Radio.Group
                    name="radiogroup"
                    defaultValue={"source_and_target"}
                    onChange={(e) => {
                      updatefinalData(e.target.value, record.tableId);
                    }}
                  >
                    <Radio value={"source_and_target"}>Source & Target</Radio>
                    <Radio value={"source"}>Source</Radio>
                    <Radio value={"target"}>Target</Radio>
                  </Radio.Group>
                );
              },
            },
          ]}
        />
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
              align: "center",
            },
            {
              title: "Mappings",
              dataIndex: "mappings",
              key: "mappings",
              align: "center",
            },
            {
              title: "Transformations",
              dataIndex: "transformations",
              key: "transformations",
              align: "center",
            },
            {
              title: "Status",
              key: "fileStatus",
              render: (_, record) => {
                return fileStatusBadge(record.fileStatus, record?.isUserAction);
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
                          <EyeOutlined /> View
                        </a>
                      </Space>
                    );
                  default:
                    switch (record.isUserAction) {
                      case true:
                        switch (record.githubStatus) {
                          case "uploaded":
                            return (
                              <Tooltip
                                placement="topLeft"
                                title={"This file alredy checked-in"}
                              >
                                <Space
                                  size="middle"
                                  // style={{
                                  //   cursor: "not-allowed",
                                  // }}
                                >
                                  <a
                                    // style={{
                                    //   color: "#adadad",
                                    //   cursor: "not-allowed",
                                    // }}
                                    onClick={() => {
                                      getFileData(record.fileId);
                                      setFileName(record.fileName);
                                      setGithubStatus(record.githubStatus);
                                    }}
                                  >
                                    <EyeOutlined /> View
                                  </a>
                                </Space>
                              </Tooltip>
                            );
                          default:
                            return (
                              <Space size="middle">
                                <a
                                  onClick={() => {
                                    getFileData(record.fileId);
                                    setFileName(record.fileName);
                                    setGithubStatus(record.githubStatus);
                                  }}
                                >
                                  <EyeOutlined /> View
                                </a>
                              </Space>
                            );
                        }
                      default:
                        return (
                          <Tooltip
                            placement="topLeft"
                            title={"Please transform this file."}
                          >
                            <Space
                              size="middle"
                              style={{
                                cursor: "not-allowed",
                              }}
                            >
                              <a
                                style={{
                                  color: "#adadad",
                                  cursor: "not-allowed",
                                }}
                              >
                                <EyeOutlined /> View
                              </a>
                            </Space>
                          </Tooltip>
                        );
                    }
                }
              },
              align: "center",
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
              <Col xs={24} sm={24} md={24} lg={18} xl={18} xxl={18}>
                <h3>
                  {fileName}
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
                </h3>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={1}
                xl={1}
                xxl={1}
                style={{
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {isDraftState && (
                  <Tooltip placement="top" title={"Discard All Changes"}>
                    <Button
                      style={{ backgroundColor: "#0c3246" }}
                      shape="circle"
                      icon={
                        <UndoOutlined
                          style={{ fontSize: "large", color: "#FFF" }}
                        />
                      }
                      onClick={() => {
                        discardAllChanges(fileId);
                      }}
                    />
                  </Tooltip>
                )}
              </Col>
              <Col xs={24} sm={24} md={24} lg={5} xl={5} xxl={5}>
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

              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Row align="middle" className={dataModernizationCss.designTabs}>
                  {[
                    { title: "Source Tables", value: "source" },
                    { title: "Target Tables", value: "target" },
                    {
                      title: "Common Source and Target Tables",
                      value: "source_and_target",
                    },
                  ].map((data, i) => {
                    return (
                      <Col
                        key={(Math.random() + 1).toString(36).substring(7)}
                        span={8}
                        onClick={() => {
                          setTableType(data?.value);
                        }}
                      >
                        <div
                          className={`${dataModernizationCss.designTabsStep} ${
                            tableType === data?.value
                              ? dataModernizationCss.designTabsStepSelected
                              : null
                          } `}
                        >
                          {data?.title}
                        </div>
                      </Col>
                    );
                  })}
                </Row>
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
                      header={`${e.tableName} (${
                        e?.baseTableName ? e.baseTableName : "Not Available"
                      })`}
                      key={i + "panel"}
                      forceRender={true}
                      style={{
                        display: e.tableType === tableType ? "" : "none",
                      }}
                      extra={
                        <div onClick={(e) => e.stopPropagation()}>
                          <p>
                            <b>
                              Database:{" "}
                              <span style={{ color: "#e74860" }}>
                                {e.dbType}{" "}
                              </span>
                            </b>
                            {isDraftState && (
                              <span>
                                <Tooltip
                                  placement="top"
                                  title={"Discard Changes"}
                                >
                                  <Button
                                    style={{ backgroundColor: "#0c3246" }}
                                    size="small"
                                    shape="circle"
                                    icon={
                                      <UndoOutlined
                                        style={{
                                          fontSize: "small",
                                          color: "#FFF",
                                        }}
                                      />
                                    }
                                    onClick={() => {
                                      discardAllChanges(fileId, e.tableId);
                                    }}
                                  />
                                </Tooltip>
                              </span>
                            )}
                          </p>
                        </div>
                      }
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

            {!childData?.filter((e) => e.tableType === tableType).length && (
              <center>No Record Available</center>
            )}
          </Card>
        )}
      </div>

      <div
        style={{ marginTop: "2%" }}
        className={dataModernizationCss.nextExitBtn}
        ref={refBtn}
      >
        <Button
          style={{ marginRight: "1rem" }}
          type="primary"
          danger
          className={dataModernizationCss.nextBtn}
          onClick={() => {
            updateFileRecord();
          }}
          disabled={
            loading ||
            versionListArr.length != version ||
            githubStatus === "uploaded"
          }
        >
          Save
        </Button>

        <Button
          type="primary"
          danger
          className={dataModernizationCss.nextBtn}
          onClick={() => {
            updateFileRecord(true);
          }}
          disabled={
            loading ||
            versionListArr.length != version ||
            githubStatus === "uploaded"
          }
        >
          Transform File
        </Button>

        <Button
          type="primary"
          danger
          className={dataModernizationCss.exitBtn}
          onClick={() => {
            router.push(`/dashboard`);
          }}
        >
          Exit
        </Button>
      </div>
    </>
  );
}
