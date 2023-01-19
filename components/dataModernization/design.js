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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  ANALYZESUMMARY,
  VERSION,
  TABLE,
  TABLEDATA,
  UPDATETABLE,
  UPDATECOLDETAILS,
  RELEASEVERSION
} from "../../network/apiConstants";
import { fetch_retry_post, fetch_retry_get, fetch_retry_put } from "../../network/api-manager";

export default function Design({ dataModernizationCss }) {
  const { query } = useRouter();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [fileId, setFileId] = useState();
  const [version, setVersion] = useState();
  const [childData, setChildData] = useState([]);
  const [childTableData, setChildTableData] = useState([]);
  const [tableId, setTableId] = useState([]);
  const [tableName, setTableName] = useState("");
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
    setFileId(fileId);

    const modelVersionObj = await fetch_retry_get(`${VERSION}${fileId}`);
    console.log(modelVersionObj);
    const version = modelVersionObj?.data?.isDraft
      ? modelVersionObj?.data?.version + 1
      : modelVersionObj?.data?.version;

    setVersion(version);

    const tableData = await fetch_retry_get(
      `${TABLE}${fileId}?version=${version}`
    );
    setChildData(tableData?.data?.tables ? tableData?.data?.tables : []);

    const versionList = [];
    for (let index = 1; index <= version; index++) {
      versionList.push({
        value: index,
        label: "version " + index,
      });
    }
    setVersionListArr(versionList);
  };

  const getTableData = async (tableId) => {
    setTableId(tableId);

    const tableKeyData = await fetch_retry_get(
      `${TABLEDATA}${fileId}?version=${version}&tableId=${tableId}`,
      {
        version: version,
        tableId: tableId,
      }
    );

    setChildTableData(tableKeyData?.data);
  };

  const updateFileRecord = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    console.log(authData?.userId)
    await fetch_retry_put(`${UPDATETABLE}${fileId}?userId=${authData?.userId}`, [
      {
        tableId: tableId,
        tableName: tableName,
      },
    ]);

    await fetch_retry_put(
      `${UPDATECOLDETAILS}${fileId}?userId=${authData?.userId}`,
      childTableData
    );

    await fetch_retry_post(`${RELEASEVERSION}${fileId}`);
  };

  const changeVersion = async (version) => {
    const tableData = await fetch_retry_get(
      `${TABLE}${fileId}?version=${version}`
    );
    setChildData(tableData?.data?.tables ? tableData?.data?.tables : []);
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

      {childData.length && (
        <div className={dataModernizationCss.designMain}>
          <Card bordered={false} className={dataModernizationCss.designCard}>
            <Collapse
              onChange={(e) => {
                if (childData[e]?.tableId != undefined) {
                  getTableData(childData[e].tableId);
                  setTableName(childData[e].tableName);
                }
              }}
              accordion
              ghost
            >
              {childData.map((e, i) => {
                return (
                  <Panel header={`${e.tableName} (${e.baseTableName})`} key={i}>
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
                              onChange={(e) => setTableName(e.target.value)}
                              value={tableName != "" ? tableName : e.tableName}
                              defaultValue={e.tableName}
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
                              value={version}
                              onSelect={(version) => {
                                setVersion(version);
                                changeVersion(version);
                              }}
                              options={versionListArr}
                            />
                          </Col>
                        </Row>
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
                            />
                          ),
                        },
                        {
                          title: "Column Type",
                          dataIndex: "columnType",
                          key: "columnType",
                        },
                      ]}
                      dataSource={childTableData}
                    />

                    <div className={dataModernizationCss.nextExitBtn}>
                      <Button
                        type="primary"
                        danger
                        className={dataModernizationCss.nextBtn}
                        htmlType="submit"
                        onClick={() => {
                          updateFileRecord();
                        }}
                        style={{ marginTop: "2%" }}
                      >
                        Transform Project File
                      </Button>
                    </div>
                  </Panel>
                );
              })}
            </Collapse>
          </Card>
        </div>
      )}
    </>
  );
}
