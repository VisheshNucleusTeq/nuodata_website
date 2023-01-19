import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Table,
  Space,
  Card,
  message,
  Skeleton,
  Collapse,
  Button,
  Divider,
} from "antd";
const { Panel } = Collapse;
import { ArrowRightOutlined } from '@ant-design/icons';

import { useDispatch } from "react-redux";

import {
  GETANALYZEDATA,
  DOWNLOADFILE,
  DESIGN,
} from "../../network/apiConstants";
import { fetch_retry_get } from "../../network/api-manager";

import AnalyzeDetailPopup from "./analyzeDetailPopup";
import {
  DownloadOutlined,
  EyeOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import {
  SetTabTypeAction,
  SetAnalyzeDetailAction,
  SetProjectTransformDetailsAction,
} from "../../Redux/action";

const AnalyzeDetail = ({
  dataModernizationCss,
  analyzeDetailsId,
  setAnalyze,
}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState();
  const [analyzeDetails, setAnalyzeDetails] = useState(null);
  const [outputFiles, setOutputFiles] = useState([]);
  const [transformationSummary, setTransformationSummary] = useState([]);
  const [open, setOpen] = useState(false);
  const [outputFileId, setOutputFileId] = useState();
  const [transformSql, setTransformSql] = useState();
  const [sourceDdl, setSourceDdl] = useState();
  const [targetDdl, setTargetDdl] = useState();

  const getAnalyzeData = async () => {
    setLoading(true);
    const data = await fetch_retry_get(`${GETANALYZEDATA}${analyzeDetailsId}?version=1`);
    setLoading(false);
    if (data.success) {
      dispatch(SetAnalyzeDetailAction(data?.data));
      setData({
        fileName: data?.data?.fileName,
        ...data?.data?.analysis,
      });
      setAnalyzeDetails(data?.data?.complexity);
      setOutputFiles(data?.data?.outputFiles);
      setTransformationSummary(data?.data?.transformationSummary);
    } else {
      message.error([data?.error]);
    }
  };

  const getGraphSrcDataApi = async (id) => {
    const data = await fetch_retry_get(`${DESIGN}${id}`);
    if (data.success) setModalData(data.data);
  };

  const getTransformSqlDataApi = async (id) => {
    const data = await fetch_retry_get(`${DOWNLOADFILE}${id}`);
    if (data.success) setTransformSql(data.data);
  };

  const getSourceDdlDataApi = async (id) => {
    const data = await fetch_retry_get(`${DOWNLOADFILE}${id}`);
    if (data.success) setSourceDdl(data.data);
  };

  const getTargetDdlDataApi = async (id) => {
    const data = await fetch_retry_get(`${DOWNLOADFILE}${id}`);
    if (data.success) setTargetDdl(data.data);
  };

  useEffect(() => {
    getAnalyzeData();
  }, []);

  useEffect(() => {
    outputFiles.forEach((e) => {
      if (e.fileType == "graph_src") {
        getGraphSrcDataApi(e.outputFileId);
      }

      if (e.fileType == "transform_sql") {
        getTransformSqlDataApi(e.outputFileId);
      }

      if (e.fileType == "source_ddl") {
        getSourceDdlDataApi(e.outputFileId);
      }

      if (e.fileType == "target_ddl") {
        getTargetDdlDataApi(e.outputFileId);
      }
    });
  }, [outputFiles]);

  const getAnalysisData = (data) => {
    return (
      <Table
        pagination={false}
        dataSource={transformationSummary}
        columns={[
          {
            title: "Transformation Type",
            dataIndex: "transformationType",
            key: "transformationType",
            render: (value, row, index) => {
              if (transformationSummary.length == index + 1) {
                return (
                  <b style={{ color: "#0c3246", fontWeight: "bold" }}>
                    <span>{value}</span>
                  </b>
                );
              } else {
                return <span>{value}</span>;
              }
            },
          },
          {
            title: "Transformation Count",
            dataIndex: "transformationCount",
            key: "transformationCount",
            render: (value, row, index) => {
              if (transformationSummary.length == index + 1) {
                return (
                  <b style={{ color: "#0c3246", fontWeight: "bold" }}>
                    <span>{value}</span>
                  </b>
                );
              } else {
                return <span>{value}</span>;
              }
            },
          },
          {
            title: "Manual Effort Hours",
            dataIndex: "manualEffortHours",
            key: "manualEffortHours",
            render: (value, row, index) => {
              console.log({value, row, index})
              if (transformationSummary.length == index + 1) {
                return (
                  // <b style={{ color: "#0c3246", fontWeight: "bold" }}>
                  //   <span>
                  //     {value} {value > 1 ? "Hours" : "Hour"}
                  //   </span>
                  // </b>
                  <></>
                );
              } else {
                return (
                  <span>
                    {value} {value > 1 ? "Hours" : "Hour"}
                  </span>
                );
              }

            },
          },
          {
            title: "Automated Effort Hours",
            dataIndex: "automatedEffortHours",
            key: "automatedEffortHours",
            render: (value, row, index) => {
              if (transformationSummary.length == index + 1) {
                return (
                  <b style={{ color: "#0c3246", fontWeight: "bold" }}>
                    <span>
                      {value} {value > 1 ? "Hours" : "Hour"}
                    </span>
                  </b>
                );
              } else {
                return (
                  <span>
                    {value} {value > 1 ? "Hours" : "Hour"}
                  </span>
                );
              }
            },
          },
          // {
          //   title: "Manual Rate",
          //   dataIndex: "manualRate",
          //   key: "manualRate",
          //   render: (value, row, index) => {
          //     if(transformationSummary.length == (index + 1)){
          //       return <b style={{color : "#0c3246", fontWeight : "bold"}}>$<span>{value}</span></b>;
          //     }else{
          //       return <span>${value}</span>;
          //     }
          //   },
          // },
          // {
          //   title: "Automated Rate",
          //   dataIndex: "automatedRate",
          //   key: "automatedRate",
          //   render: (value, row, index) => {
          //     if(transformationSummary.length == (index + 1)){
          //       return <b style={{color : "#0c3246", fontWeight : "bold"}}>$<span>{value}</span></b>;
          //     }else{
          //       return <span>${value}</span>;
          //     }
          //   },
          // },

          {
            title: "Hourly Unit Rate",
            dataIndex: "hourlyUnitRate",
            key: "hourlyUnitRate",
            render: (value, row, index) => {
              if (transformationSummary.length == index + 1) {
                return (
                  // <b style={{ color: "#0c3246", fontWeight: "bold" }}>
                  //   $<span>{value}</span>
                  // </b>
                  <></>
                );
              } else {
                return <span>${value}</span>;
              }
            },
          },
          {
            title: "Manual Cost",
            dataIndex: "manualCost",
            key: "manualCost",
            render: (value, row, index) => {
              if (transformationSummary.length == index + 1) {
                return (
                  <b style={{ color: "#0c3246", fontWeight: "bold" }}>
                    $<span>{value}</span>
                  </b>
                );
              } else {
                return <span>${value}</span>;
              }
            },
          },
          {
            title: "Automated Cost",
            dataIndex: "automatedCost",
            key: "automatedCost",
            render: (value, row, index) => {
              if (transformationSummary.length == index + 1) {
                return (
                  <b style={{ color: "#0c3246", fontWeight: "bold" }}>
                    $<span>{value}</span>
                  </b>
                );
              } else {
                return <span>${value}</span>;
              }
            },
          },
        ]}
      />
    );
  };

  const getGraphSrcData = (data) => {
    return modalData ? (
      <AnalyzeDetailPopup outputFileId={outputFileId} data={modalData} />
    ) : (
      <p>Loading...</p>
    );
  };

  const getTransformSqlData = () => {
    return (
      <pre>
        <code>{transformSql}</code>
      </pre>
    );
  };

  const getSourceDdlData = () => {
    return (
      <pre>
        <code>{sourceDdl}</code>
      </pre>
    );
  };

  const getTargetDdlData = () => {
    return (
      <pre>
        <code>{targetDdl}</code>
      </pre>
    );
  };

  return (
    <>
      <ArrowLeftOutlined
        style={{ fontSize: "1.5vw" }}
        onClick={() => {
          setAnalyze(true);
        }}
      />

      {loading ? (
        <center>
          <Skeleton active />
        </center>
      ) : (
        <div
          className={dataModernizationCss.analyzeMain}
          style={{
            backgroundColor: "#FFF",
            padding: "2%",
            borderRadius: "25px",
          }}
        >
          <Row>
            {/* <Col xs={15} sm={15} md={15} lg={15} xl={15} xxl={15}>
              <div className={dataModernizationCss.analyzeMain}>
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
                  ]}
                  dataSource={data}
                />
              </div>
            </Col> */}

            <Col xs={15} sm={15} md={15} lg={15} xl={15} xxl={15}>
              <Card
                className={dataModernizationCss.cardViewGrid}
                hoverable={false}
              >
                <Card.Grid hoverable={false}>File</Card.Grid>
                <Card.Grid hoverable={false}>
                  {data && data.fileName ? data.fileName : "0"}
                </Card.Grid>

                <Card.Grid hoverable={false}>Work flows</Card.Grid>
                <Card.Grid hoverable={false}>
                  {data && data.workflows ? data.workflows : "0"}
                </Card.Grid>

                <Card.Grid hoverable={false}>Mappings</Card.Grid>
                <Card.Grid hoverable={false}>
                  {data && data.mappings ? data.mappings : "0"}
                </Card.Grid>

                <Card.Grid hoverable={false}>Transformations</Card.Grid>
                <Card.Grid hoverable={false}>
                  {data && data.transformations ? data.transformations : "0"}
                </Card.Grid>
              </Card>
            </Col>

            <Col
              xs={1}
              sm={1}
              md={1}
              lg={1}
              xl={1}
              xxl={1}
              style={{ justifyContent: "center", display: "flex" }}
            >
              <Divider
                style={{ height: "100%", backgroundColor: "#f8f8f8" }}
                type="vertical"
              />
            </Col>

            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
              <Card className={dataModernizationCss.cardViewGrid}>
                <Card.Grid hoverable={false}>Complexity</Card.Grid>
                <Card.Grid hoverable={false}>
                  {analyzeDetails && analyzeDetails.complexity
                    ? analyzeDetails.complexity
                    : "0"}
                </Card.Grid>

                <Card.Grid hoverable={false}>Conversion</Card.Grid>
                <Card.Grid hoverable={false}>
                  {analyzeDetails && analyzeDetails.conversion
                    ? analyzeDetails.conversion
                    : "0"}
                  %
                </Card.Grid>

                <Card.Grid hoverable={false}>Manual effort estimate</Card.Grid>
                <Card.Grid hoverable={false}>
                  {analyzeDetails && analyzeDetails.manualEffortsEstimateHrs
                    ? analyzeDetails.manualEffortsEstimateHrs
                    : "0"}{" "}
                  hours
                </Card.Grid>

                <Card.Grid hoverable={false}>
                  Effort with x% automation
                </Card.Grid>
                <Card.Grid hoverable={false}>
                  {analyzeDetails && analyzeDetails.automationEffortPercent
                    ? analyzeDetails.automationEffortPercent
                    : "0"}{" "}
                  %
                </Card.Grid>

                <Card.Grid hoverable={false} bordered={false}>
                  Hours Saved
                </Card.Grid>
                <Card.Grid hoverable={false} bordered={false}>
                  {analyzeDetails && analyzeDetails.hoursSaved
                    ? analyzeDetails.hoursSaved
                    : "0"}{" "}
                  hours
                </Card.Grid>
              </Card>
            </Col>

            {/* <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
              <Modal
                destroyOnClose
                centered
                open={false}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={"100vw"}
              >
                <AnalyzeDetailPopup
                  outputFileId={outputFileId}
                  data={modalData}
                />
              </Modal>
            </Col> */}

            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              xxl={24}
              className={dataModernizationCss.analyzeMainDetails}
            >
              <Collapse ghost accordion>
                {outputFiles
                  .filter(function (item) {
                    return item.description !== "Transformation SQL";
                  })
                  .map((e, i) => {
                    return (
                      <Panel
                        header={
                          e.description === "Graph Source"
                            ? "Source Graph"
                            : e.description
                        }
                        key={i}
                        style={{ margin: "2% 0% 2% 0%" }}
                        extra={
                          e.fileType != "graph_src" && (
                            <a
                              target={"_blank"}
                              href={`${DOWNLOADFILE}${e.outputFileId}`}
                            >
                              <Space
                                size="middle"
                                className={
                                  dataModernizationCss.downloadBtnSpace
                                }
                              >
                                <DownloadOutlined /> Download
                              </Space>
                            </a>
                          )
                        }
                      >
                        <Row>
                          {/* <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                          {e.fileType != "graph_src" && (
                            <a
                              target={"_blank"}
                              href={`${DOWNLOADFILE}${e.outputFileId}`}
                            >
                              <Space
                                size="middle"
                                className={
                                  dataModernizationCss.downloadBtnSpace
                                }
                              >
                                <DownloadOutlined /> Download
                              </Space>
                            </a>
                          )}
                        </Col> */}
                          <Col
                            xs={24}
                            sm={24}
                            md={24}
                            lg={24}
                            xl={24}
                            xxl={24}
                            className={dataModernizationCss.analyzeMainDetails}
                          >
                            {e.fileType === "analysis" && getAnalysisData(e)}
                            {e.fileType === "graph_src" && getGraphSrcData(e)}
                            {e.fileType === "transform_sql" &&
                              getTransformSqlData(e)}
                            {e.fileType === "source_ddl" && getSourceDdlData(e)}
                            {e.fileType === "target_ddl" && getTargetDdlData(e)}
                          </Col>
                        </Row>
                      </Panel>
                    );
                  })}
              </Collapse>

              {/* {outputFiles.map((e) => {
                  return (
                    <Row className={dataModernizationCss.dataList}>
                      <Col
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                        xl={6}
                        xxl={6}
                        className={dataModernizationCss.transformation}
                      >
                        {e.description}
                      </Col>

                      <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} />
                      <Col
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                        xl={6}
                        xxl={6}
                        className={dataModernizationCss.downloadBtn}
                      >
                        {e.fileType != "graph_src" && (
                          <a
                            target={"_blank"}
                            href={`${DOWNLOADFILE}${e.outputFileId}`}
                          >
                            <Space
                              size="middle"
                              className={dataModernizationCss.downloadBtnSpace}
                            >
                              <DownloadOutlined /> Download
                            </Space>
                          </a>
                        )}
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        {e.fileType != "graph_src" ? (
                          <Table
                            className={`demo ${dataModernizationCss.analyzeMain}`}
                            pagination={false}
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
                            ]}
                            dataSource={data}
                          />
                        ) : (
                          <>
                          {open && (
                            <p>dsf</p>
                            // <AnalyzeDetailPopup
                            //   outputFileId={outputFileId}
                            //   data={modalData}
                            // />
                            )}
                          </>
                        )}
                      </Col>
                    </Row>
                  );
                })} */}

              <div className={dataModernizationCss.nextExitBtn}>
                <Button
                  type="primary"
                  danger
                  className={dataModernizationCss.nextBtn}
                  htmlType="submit"
                  onClick={() => {
                    // dispatch(SetProjectTransformDetailsAction({ analyzeDetailsId }));
                    dispatch(SetTabTypeAction("Design"));
                  }}
                  style={{ marginRight: "2%" }}
                >
                  Design Workflow <ArrowRightOutlined />
                </Button>
                <Button
                  type="primary"
                  danger
                  className={dataModernizationCss.nextBtn}
                  htmlType="submit"
                  onClick={() => {
                    dispatch(
                      SetProjectTransformDetailsAction({ analyzeDetailsId })
                    );
                    dispatch(SetTabTypeAction("Transform"));
                  }}
                >
                  Transform
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
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default AnalyzeDetail;
