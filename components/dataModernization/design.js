import {
  Table,
  Space,
  Modal,
  Button,
  Input,
  Collapse,
  Card,
  Row,
  Col,
  message,
  Select,
} from "antd";
const { Panel } = Collapse;
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { useEffect, useState } from "react";
import {
  TARGET,
  ANALYZESUMMARY,
  GETANALYZEDATA,
  DESIGN,
  VERSION,
  TABLE,
  TABLEDATA,
} from "../../network/apiConstants";
import { fetch_retry_get } from "../../network/api-manager";
import {
  SetTabTypeAction,
  SetProjectTransformDetailsAction,
} from "../../Redux/action";
import AnalyzeDetailPopup from "./analyzeDetailPopup";

export default function Design({ dataModernizationCss }) {
  const { query } = useRouter();
  const router = useRouter();
  const dispatch = useDispatch();

  const [fileName, setFileName] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [outputFileId, setOutputFileId] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collapseData, setCollapseData] = useState({});
  const [modalData, setModalData] = useState();
  const [open, setOpen] = useState(false);
  const [tables, setTables] = useState([]);
  const [version, setVersion] = useState(1);
  const [tableKeyData, setTableKeyData] = useState([]);
  const [versionListArr, setVersionListArr] = useState([]);
  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );

  const getDesignData = async () => {
    const data = await fetch_retry_get(
      `${ANALYZESUMMARY}${query.id ? query.id : projectDetails.projectId}`
    );
    setLoading(false);
    if (data.success) {
      setFileData(data?.data?.fileDetails);
    } else {
      message.error([data?.error]);
    }
  };

  useEffect(() => {
    getDesignData();
  }, []);

  const getFileDetails = async (fileId) => {
    const data = await fetch_retry_get(`${TARGET}${fileId}`);
    const collapseData = {};
    data.data.forEach((e) => {
      if (!collapseData[e.tableName]) {
        collapseData[e.tableName] = [e];
      } else {
        collapseData[e.tableName].push(e);
      }
    });
    setFileId(fileId);
    setCollapseData(collapseData);

    const analyzeDetails = await fetch_retry_get(`${GETANALYZEDATA}${fileId}`);
    console.log(analyzeDetails?.data?.outputFiles);
    const outputFileId = analyzeDetails?.data?.outputFiles.find((e) => {
      return e.fileType === "graph_src";
    });
    setOutputFileId(outputFileId?.outputFileId);
  };

  const getModelData = async (fileId) => {
    const modelDataObj = await fetch_retry_get(`${DESIGN}${fileId}`);
    setModalData(modelDataObj?.data);
    setTimeout(() => {
      setOpen(true);
    }, 10);
  };

  const getFileData = async (fileId) => {
    const modelVersionObj = await fetch_retry_get(`${VERSION}${fileId}`);
    const tableData = await fetch_retry_get(
      `${TABLE}${fileId}?version=${modelVersionObj?.data?.version}`
    );
    setFileId(fileId);
    setVersion(modelVersionObj?.data?.version);
    setTables(tableData?.data?.tables ? tableData?.data?.tables : []);

    const versionList = [];
    for (let index = 1; index <= modelVersionObj?.data?.version; index++) {
      versionList.push({
        value: index,
        label: "version " + index,
      });
    }
    setVersionListArr(versionList);
  };

  const getTableData = async (tableId) => {
    const tableKeyData = await fetch_retry_get(
      `${TABLEDATA}${fileId}?version=${version}&tableId=${tableId}`,
      {
        version: version,
        tableId: tableId,
      }
    );
    setTableKeyData(tableKeyData?.data);
  };

  const onVersionChange = async () => {
    const tableData = await fetch_retry_get(
      `${TABLE}${fileId}?version=${version}`
    );
    setTables(tableData?.data?.tables ? tableData?.data?.tables : []);
  };

  return (
    <>
      <Modal
        destroyOnClose
        centered
        open={open}
        onOk={() => {
          dispatch(
            SetProjectTransformDetailsAction({
              analyzeDetailsId: fileId,
            })
          );
          dispatch(SetTabTypeAction("Transform"));
        }}
        onCancel={() => setOpen(false)}
        width={"100vw"}
      >
        <AnalyzeDetailPopup outputFileId={outputFileId} data={modalData} />
      </Modal>

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
          dataSource={fileData}
        />
      </div>

      <div className={dataModernizationCss.designMain}>
        <Card bordered={false} className={dataModernizationCss.designCard}>
          <Collapse defaultActiveKey={[""]} ghost>
            {tables.map((e, i) => {
              return (
                <Panel
                  onClick={() => {
                    getTableData(e.tableId);
                  }}
                  header={`${e.tableName} (${e.baseTableName})`}
                  key={i}
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
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                          <Input
                            value={e.tableName}
                            style={{ borderRadius: "10px", height: "5vh" }}
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
                          Version
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                          {/* <Input
                            value={e.tableName}
                            style={{ borderRadius: "10px", height: "5vh" }}
                          /> */}
                          <Select
                            showSearch
                            style={{
                              width: "100%",
                            }}
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              (option?.label ?? "").includes(input)
                            }
                            defaultValue={1}
                            filterSort={(optionA, optionB) =>
                              (optionA?.label ?? "")
                                .toLowerCase()
                                .localeCompare(
                                  (optionB?.label ?? "").toLowerCase()
                                )
                            }
                            onSelect={(ee) => {
                              setVersion(ee);
                              setTimeout(() => {
                                
                                onVersionChange();
                                getTableData(e.tableId);
                              }, 500);
                            }}
                            options={versionListArr}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Table
                    pagination={false}
                    // className="demo"
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
                        render: (record, e) => <Input value={e.columnName} />,
                      },
                      {
                        title: "Column Type",
                        dataIndex: "columnType",
                        key: "columnType",
                      },
                    ]}
                    dataSource={tableKeyData}
                  />
                </Panel>
              );
            })}
          </Collapse>
        </Card>
      </div>

      <div className={dataModernizationCss.nextExitBtn}>
        <Button
          type="primary"
          danger
          className={dataModernizationCss.nextBtn}
          htmlType="submit"
          onClick={() => {
            dispatch(SetProjectTransformDetailsAction({}));
            dispatch(SetTabTypeAction("Transform"));
          }}
        >
          Transform Project
        </Button>
        <Button
          type="primary"
          danger
          className={dataModernizationCss.exitBtn}
          onClick={() => {
            router.push(`/dashboard`);
          }}
        >
          Save & Exit
        </Button>
      </div>
    </>
  );
}
