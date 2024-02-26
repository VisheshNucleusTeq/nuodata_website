import {
  ArrowRightOutlined,
  EyeOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Carousel,
  Col,
  Modal,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SetProjectDetailsAction,
  SetProjectTransformDetailsAction,
  SetTabTypeAction,
  loderShowHideAction,
} from "../../Redux/action";
import { fetch_retry_get, fetch_retry_post } from "../../network/api-manager";
import {
  ANALYZESUMMARY,
  CONVERTTRANSFORN,
  GETANALYZEDATA,
  GETPROJECT,
  VERSION,
} from "../../network/apiConstants";
import { fileStatusBadge } from "../helper/fileStatus";
import AnalyzeDetail from "./analyzeDetail";
import BarChart from "./charts/barChart";
import LineChart from "./charts/lineChart";
import PieChart from "./charts/pieChart";

const AnalyzeHadoop = ({ dataModernizationCss }) => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const router = useRouter();

  const [data, setData] = useState([]);
  const [analyzeDetails, setAnalyzeDetails] = useState();
  const [analyzeDetailPageData, setAnalyzeDetailPageData] = useState();

  const [complexityGraph, setComplexityGraph] = useState();
  const [analyze, setAnalyze] = useState(true);
  const [analyzeDetailsId, setAnalyzeDetailsId] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorDetails, setErrorDetails] = useState({});
  const [isUserAction, setIsUserAction] = useState(false);

  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );

  const getAnalyzeData = async () => {
    // const data = await fetch_retry_get(
    //   `${ANALYZESUMMARY}${query.id ? query.id : projectDetails.projectId}`
    // );
    const data = {
      success: true,
      data: {
        complexityData: {
          totalFiles: 3,
          workflows: 1,
          workloads: 3,
          hiveFiles: 3,
          sql: 99,
          conversion: "",
          manualEffort: "20.0 Hours",
          hoursSaved: "0.0 Hours",
          automationEffort: "3.0 Hours",
        },
        complexityGraph: [
          {
            complexityType: "Very Complex",
            count: 1,
          },
        ],
        graphId: 30537,
        hiveFileDetails: [
          {
            fileId: 771,
            workFlow: "simple-Workflow",
            job: "Create_External_Table",
            fileName: "Copydata.hive",
            type: "hive",
            queryCount: 11,
            complexity: "Low",
            status: "analysis success",
            createdDate: "2024-02-23T05:51:20.461241Z",
          },
          {
            fileId: 772,
            workFlow: "simple-Workflow",
            job: "Create_orc_Table",
            fileName: "Copydata.hive",
            type: "hive",
            queryCount: 11,
            complexity: "Low",
            status: "analysis success",
            createdDate: "2024-02-23T05:51:25.046477Z",
          },
          {
            fileId: 773,
            workFlow: "simple-Workflow",
            job: "Insert_into_Table",
            fileName: "Copydata.hive",
            type: "hive",
            queryCount: 11,
            complexity: "Low",
            status: "analysis success",
            createdDate: "2024-02-23T05:51:29.935869Z",
          },
        ],
      },
    };
    if (data.success) {
      setData(data?.data?.hiveFileDetails);
      setAnalyzeDetails(data?.data?.complexityData);
      setComplexityGraph(data?.data?.complexityGraph);
    } else {
      dispatch(SetProjectTransformDetailsAction({}));
      dispatch(SetTabTypeAction("Connect"));
    }
  };

  const getProjectData = async () => {
    const data = await fetch_retry_get(`${GETPROJECT}${query.id}`);
    dispatch(SetProjectDetailsAction(data.data));
  };

  useEffect(() => {
    if (query.id) {
      getProjectData();
    }
    getAnalyzeData();
  }, [query.id]);

  const getErrorDetails = async (analyzeDetailsId) => {
    const modelVersionObj = await fetch_retry_get(
      `${VERSION}${analyzeDetailsId}`
    );
    const version = modelVersionObj?.data?.isDraft
      ? modelVersionObj?.data?.version + 1
      : modelVersionObj?.data?.version;

    const data = await fetch_retry_get(`${GETANALYZEDATA}${analyzeDetailsId}`);
    setErrorDetails(data.data);
    setModalOpen(true);
  };

  const updateTransformStatus = async () => {
    dispatch(loderShowHideAction(true));
    const isUserActionData = data.filter((e) => e.isUserAction === false);
    await Promise.all(
      isUserActionData.map(async (e) => {
        return new Promise(async (resolve, reject) => {
          const data = await fetch_retry_post(
            `${CONVERTTRANSFORN}${e?.fileId}`
          );
          resolve(data);
        });
      })
    );
    dispatch(SetProjectTransformDetailsAction({}));
    dispatch(SetTabTypeAction("Transform"));
    dispatch(loderShowHideAction(false));
  };

  const changeDateFormat = (date) => {
    const dt = new Date(date);
    const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
    return `${padL(dt.getMonth() + 1)}/${padL(
      dt.getDate()
    )}/${dt.getFullYear()} ${padL(dt.getHours())}:${padL(
      dt.getMinutes()
    )}:${padL(dt.getSeconds())}`;
  };

  return (
    <div className={dataModernizationCss.analyzeMain} style={{padding:16}}>
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

      {analyze ? (
        <Row >
          <Col
            xs={10}
            sm={10}
            md={10}
            lg={10}
            xl={10}
            xxl={10}
            style={{ paddingRight: ".5%" }}
          >
            <Card className={dataModernizationCss.cardView}>
              <Card.Grid>Total Files</Card.Grid>
              <Card.Grid>
                {analyzeDetails && analyzeDetails.totalFiles
                  ? analyzeDetails.totalFiles
                  : "0"}
              </Card.Grid>
              <Card.Grid>Workflows</Card.Grid>
              <Card.Grid>
                {analyzeDetails && analyzeDetails.workflows
                  ? analyzeDetails.workflows
                  : "0"}
              </Card.Grid>
              <Card.Grid>Workloads</Card.Grid>
              <Card.Grid>
                {analyzeDetails && analyzeDetails.workloads
                  ? analyzeDetails.workloads
                  : "0"}
              </Card.Grid>
              <Card.Grid>Hive Files</Card.Grid>
              <Card.Grid>
                {analyzeDetails && analyzeDetails.hiveFiles
                  ? analyzeDetails.hiveFiles
                  : "0"}
              </Card.Grid>

              <Card.Grid>SQL</Card.Grid>
              <Card.Grid>
                {analyzeDetails && analyzeDetails.sql
                  ? analyzeDetails.sql
                  : "0"}
              </Card.Grid>
              <Card.Grid>Conversion</Card.Grid>
              <Card.Grid>
                {analyzeDetails && analyzeDetails.conversion
                  ? analyzeDetails.conversion
                  : ""}
              </Card.Grid>
              <Card.Grid>Manual Effort</Card.Grid>
              <Card.Grid>
                <span>
                  {analyzeDetails && analyzeDetails.manualEffort
                    ? parseFloat(analyzeDetails.manualEffort).toFixed(2)
                    : "0"}{" "}
                  hours
                </span>
              </Card.Grid>

              <Card.Grid>Automation Effort</Card.Grid>
              <Card.Grid>
                <span>
                  {analyzeDetails &&
                    parseFloat(analyzeDetails.automationEffort).toFixed(2)}{" "}
                  hours
                </span>
              </Card.Grid>

              <Card.Grid
                style={{ color: "#09bd21", backgroundColor: "#e3fcef" }}
              >
                Hours Saved
              </Card.Grid>
              <Card.Grid
                style={{ color: "#09bd21", backgroundColor: "#e3fcef" }}
              >
                <span style={{ color: "#09bd21" }}>
                  {analyzeDetails && analyzeDetails.hoursSaved
                    ? parseFloat(analyzeDetails.hoursSaved).toFixed(2)
                    : "0"}{" "}
                  hours
                </span>
              </Card.Grid>
            </Card>
          </Col>
          <Col
            xs={14}
            sm={14}
            md={14}
            lg={14}
            xl={14}
            xxl={14}
            style={{ paddingLeft: ".5%" }}
          >
            <Card className={dataModernizationCss.cardViewGraphs}>
              <Carousel
                dots={false}
                autoplay
                draggable
                className={dataModernizationCss.cardViewGraphCarousel}
              >
                <div className={dataModernizationCss.cardViewGraph}>
                  {complexityGraph && (
                    <BarChart
                      complexityGraph={complexityGraph}
                      dataModernizationCss={dataModernizationCss}
                      labels={[
                        "Trivial",
                        "Simple",
                        "Medium",
                        "Complex",
                        "Very Complex",
                      ]}
                      data={[
                        "Trivial",
                        "Simple",
                        "Medium",
                        "Complex",
                        "Very Complex",
                      ].map((e) => {
                        let obj = complexityGraph?.find(
                          (o) => o.complexityType === e
                        );
                        return obj && obj.count ? obj.count : 0;
                      })}
                    />
                  )}
                </div>

                <div className={dataModernizationCss.cardViewGraph}>
                  {complexityGraph && (
                    <LineChart
                      complexityGraph={complexityGraph}
                      dataModernizationCss={dataModernizationCss}
                      labels={[
                        "Trivial",
                        "Simple",
                        "Medium",
                        "Complex",
                        "Very Complex",
                      ]}
                      data={[
                        "Trivial",
                        "Simple",
                        "Medium",
                        "Complex",
                        "Very Complex",
                      ].map((e) => {
                        let obj = complexityGraph?.find(
                          (o) => o.complexityType === e
                        );
                        return obj && obj.count ? obj.count : 0;
                      })}
                    />
                  )}
                </div>

                <div className={dataModernizationCss.cardViewGraph}>
                  {complexityGraph && (
                    <PieChart
                      complexityGraph={complexityGraph}
                      dataModernizationCss={dataModernizationCss}
                      labels={[
                        "Trivial",
                        "Simple",
                        "Medium",
                        "Complex",
                        "Very Complex",
                      ]}
                      data={[
                        "Trivial",
                        "Simple",
                        "Medium",
                        "Complex",
                        "Very Complex",
                      ].map((e) => {
                        let obj = complexityGraph?.find(
                          (o) => o.complexityType === e
                        );
                        return obj && obj.count ? obj.count : 0;
                      })}
                    />
                  )}
                </div>
              </Carousel>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Row justify="space-between" style={{
              marginTop:10,
              padding:"16px",
            border:"1px solid #ECECEC"
            }}>
              <Col>
                <Typography.Text>Graph</Typography.Text>
              </Col>
              <Col>
                <Space >
                  <a
                    onClick={() => {
                     
                    }}
                  >
                    <EyeOutlined /> View
                  </a>
                </Space>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <div className={dataModernizationCss.analyzeMain}>
              <Table
                locale={{
                  emptyText: "No Record Available",
                }}
                rowKey="fileId"
                columns={[
                  {
                    title: "Workflows",
                    dataIndex: "workFlow",
                    key: "workFlow",
                    align: "center",
                  },
                  {
                    title: "Jobs",
                    dataIndex: "job",
                    key: "job",
                    align: "center",
                  },
                  {
                    title: "File",
                    dataIndex: "fileName",
                    key: "fileName",
                  },
                  {
                    title: "Type",
                    dataIndex: "type",
                    key: "type",
                    align: "center",
                  },
                  {
                    title: "Query Count",
                    dataIndex: "queryCount",
                    key: "queryCount",
                    align: "center",
                  },
                  {
                    title: "Complexity",
                    dataIndex: "complexity",
                    key: "complexity",
                    align: "center",
                  },
                  {
                    title: "Status",
                    key: "fileStatus",
                    render: (_, record) => {
                      return fileStatusBadge(record.status);
                    },
                  },
                  {
                    title: "Created Date",
                    key: "createdDate",
                    render: (_, record) => {
                      return changeDateFormat(record.createdDate);
                    },
                  },
                  // createDateTime
                  {
                    title: "Action",
                    key: "action",
                    render: (_, record) => {
                      switch (record.fileStatus) {
                        case "analyze_failed":
                          return (
                            <Space
                              size="middle"
                              style={{ cursor: "not-allowed-" }}
                            >
                              <a
                                style={{ cursor: "not-allowed-" }}
                                onClick={() => {
                                  getErrorDetails(record.fileId);
                                }}
                              >
                                <WarningOutlined /> Errors
                              </a>
                            </Space>
                          );
                        case "convert_failed":
                          return (
                            <Space size="middle">
                              <a
                                onClick={() => {
                                  setIsUserAction(record?.isUserAction);
                                  setAnalyzeDetailsId(record.fileId);
                                  setAnalyzeDetailPageData(record);
                                  setAnalyze(false);
                                }}
                              >
                                <EyeOutlined />
                              </a>
                            </Space>
                          );
                        default:
                          return (
                            <Space size="middle">
                              <a
                                onClick={() => {
                                  setIsUserAction(record?.isUserAction);
                                  setAnalyzeDetailsId(record.fileId);
                                  setAnalyzeDetailPageData(record);
                                  setAnalyze(false);
                                }}
                              >
                                <EyeOutlined />
                              </a>
                            </Space>
                          );
                      }
                    },
                    align: "center",
                  },
                ]}
                dataSource={data.sort((a, b) => a.fileId - b.fileId)}
                pagination={data?.length < 10 ? false : true}
              />
            </div>
            <div className={dataModernizationCss.nextExitBtn}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Row
                  className={dataModernizationCss.generalLastDiv}
                  style={{ marginTop: "10px" }}
                >
                  <Col className={dataModernizationCss.generalLastDiv}>
                    <Space>
                      <Button
                        className={dataModernizationCss.cancelBtn}
                        onClick={() => {
                          router.push(`/dashboard`);
                        }}
                      >
                        exit
                      </Button>
                      <Button className={dataModernizationCss.submitBtn}>
                        Transform
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </Col>
            </div>
          </Col>
        </Row>
      ) : (
        <AnalyzeDetail
          getErrorDetails={getErrorDetails}
          analyzeDetailsId={analyzeDetailsId}
          dataModernizationCss={dataModernizationCss}
          setAnalyze={() => {
            setAnalyze(true);
          }}
          showTop={true}
          showPopUp={false}
          isUserAction={isUserAction}
          analyzeDetailPageData={analyzeDetailPageData}
        />
      )}
    </div>
  );
};

export default AnalyzeHadoop;
