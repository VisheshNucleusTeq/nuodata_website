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
  loderShowHideAction,
} from "../../Redux/action";

import { DownOutlined } from '@ant-design/icons';

import DrawerView from "./drawerView";
import DesignPanel from "./designPanel";

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

  const [updatedTableDetails, setUpdatedTableDetails] = useState([]);
  const [updatedColumnDetails, setUpdatedColumnDetails] = useState([]);

  const dispatch = useDispatch();
  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );

  const showTableLogs = async (baseTableName, tableId) => {
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
      setOpen(true);
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

  const updateFileRecord = async (release = false) => {
    dispatch(loderShowHideAction(true));

    const authData = JSON.parse(localStorage.getItem("authData"));
    if (updatedTableDetails && updatedTableDetails.length) {
      await fetch_retry_put(
        `${UPDATETABLE}${fileId}?userId=${authData?.userId}`,
        updatedTableDetails
      );
      // getFileData(fileId);
    }

    if (updatedColumnDetails && updatedColumnDetails.length) {
      await fetch_retry_put(
        `${UPDATECOLDETAILS}${fileId}?userId=${authData?.userId}`,
        updatedColumnDetails
      );
      // getFileData(fileId);
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
  };

  const updatedTableDetailsAction = async (data) => {
    const _temp = JSON.parse(JSON.stringify(updatedTableDetails));
    var index = _temp.findIndex((p) => p.tableId == data.tableId);
    if (index < 0) {
      _temp.push({
        tableId: data.tableId,
        tableName: data.newName,
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
    var index = _temp.findIndex((p) => p.columnId == data.columnId);
    if (index < 0) {
      _temp.push({
        columnId: data.columnId,
        columnName: data.newName,
        columnType: data.columnType,
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

  const refs = useRef();
  const refBtn = useRef();
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

  return (
    <>
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
              title: "Action",
              key: "action",
              render: (_, record) => (
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
            setVersion={setVersion}
            changeVersion={changeVersion}
            getFileChangeLog={getFileChangeLog}
          />
        )}
      </Drawer>
      <div className={dataModernizationCss.designMain} ref={myRef}>
        {childData.length > 0 && (
          <Card bordered={false} className={dataModernizationCss.designCard}>
            <div className={dataModernizationCss.okbutton} onClick={() => {
              refBtn.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})  
            }} ><DownOutlined /></div>
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
              {childData.map((e, i) => {
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
            updateFileRecord(true);
          }}
          disabled={loading || versionListArr.length != version}
        >
          Transform File
        </Button>
      </div>
    </>
  );
}
