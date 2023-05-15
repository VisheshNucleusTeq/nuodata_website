import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Table,
  Space,
  Card,
  message,
  Carousel,
  Button,
  Modal,
} from "antd";
import { useRouter } from "next/router";
import {
  ArrowRightOutlined,
  EyeOutlined,
  WarningOutlined,
} from "@ant-design/icons";

import {
  GETPROJECT,
  ANALYZESUMMARY,
  VERSION,
  GETANALYZEDATA,
  CONVERTTRANSFORN,
} from "../../network/apiConstants";
import { fetch_retry_get, fetch_retry_post } from "../../network/api-manager";
import BarChart from "./charts/barChart";
import LineChart from "./charts/lineChart";
import PieChart from "./charts/pieChart";
import AnalyzeDetail from "./analyzeDetail";
import {
  SetProjectDetailsAction,
  SetTabTypeAction,
  SetProjectTransformDetailsAction,
  loderShowHideAction,
} from "../../Redux/action";
import { fileStatusBadge } from "../helper/fileStatus";

const Analyze = ({ dataModernizationCss }) => {
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
    const data = await fetch_retry_get(
      `${ANALYZESUMMARY}${query.id ? query.id : projectDetails.projectId}`
    );
    if (data.success) {
      setData(data?.data?.fileDetails);
      setAnalyzeDetails(data?.data);
      setComplexityGraph(data?.data?.complexityGraph);
    } else {
      dispatch(SetProjectTransformDetailsAction({}));
      dispatch(SetTabTypeAction("Connect"));
      message.error([data?.error]);
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

  return (
    <div className={dataModernizationCss.analyzeMain}>
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
        <Row>
          <Col
            xs={8}
            sm={8}
            md={8}
            lg={8}
            xl={8}
            xxl={8}
            style={{ paddingRight: ".5%" }}
          >
            <Card className={dataModernizationCss.cardView}>
              <Card.Grid>Total Files</Card.Grid>
              <Card.Grid>
                {analyzeDetails && analyzeDetails.totalFiles
                  ? analyzeDetails.totalFiles
                  : "0"}
              </Card.Grid>
              <Card.Grid>Transformations</Card.Grid>
              <Card.Grid>
                {analyzeDetails && analyzeDetails.transformations
                  ? analyzeDetails.transformations
                  : "0"}
              </Card.Grid>
              <Card.Grid>Mappings</Card.Grid>
              <Card.Grid>
                {analyzeDetails && analyzeDetails.mappings
                  ? analyzeDetails.mappings
                  : "0"}
              </Card.Grid>
              <Card.Grid>Manual Effort</Card.Grid>
              <Card.Grid>
                <span>
                  {analyzeDetails && analyzeDetails.manualEffortsEstimateHrs
                    ? parseFloat(
                        analyzeDetails.manualEffortsEstimateHrs
                      ).toFixed(2)
                    : "0"}{" "}
                  hours
                </span>
              </Card.Grid>

              <Card.Grid>Workflows</Card.Grid>
              <Card.Grid>
                <span>
                  {analyzeDetails && analyzeDetails.workflows
                    ? analyzeDetails.workflows
                    : "0"}
                </span>
              </Card.Grid>

              <Card.Grid>Automation Effort</Card.Grid>
              <Card.Grid>
                <span>
                  {analyzeDetails &&
                    parseFloat(
                      analyzeDetails.manualEffortsEstimateHrs -
                        analyzeDetails.hoursSaved
                    ).toFixed(2)}{" "}
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
            xs={16}
            sm={16}
            md={16}
            lg={16}
            xl={16}
            xxl={16}
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
            <div className={dataModernizationCss.analyzeMain}>
              <Table
                locale={{
                  emptyText: "No Record Available",
                }}
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
                      return fileStatusBadge(
                        record.fileStatus,
                        record?.isUserAction
                      );
                    },
                  },
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
                                <EyeOutlined /> View
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
                                <EyeOutlined /> View
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
              <Button
                type="primary"
                danger
                className={dataModernizationCss.nextBtn}
                htmlType="submit"
                onClick={() => {
                  dispatch(SetTabTypeAction("Design"));
                }}
                style={{ marginRight: "2%" }}
              >
                Design Workflow <ArrowRightOutlined color="red" />
              </Button>
              {data.filter((e) => e.isUserAction === false).length ? (
                <Button
                  type="primary"
                  danger
                  className={dataModernizationCss.nextBtn}
                  htmlType="submit"
                  onClick={async () => {
                    await updateTransformStatus();
                  }}
                >
                  Transform <ArrowRightOutlined />
                </Button>
              ) : null}
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

export default Analyze;
