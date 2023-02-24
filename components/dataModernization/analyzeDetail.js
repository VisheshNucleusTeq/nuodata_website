import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Space,
  Card,
  message,
  Skeleton,
  Collapse,
  Button,
  Divider,
  Modal,
} from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  GETANALYZEDATA,
  DOWNLOADFILE,
  DESIGN,
  VERSION,
} from "../../network/apiConstants";
import { fetch_retry_get } from "../../network/api-manager";
import {
  DownloadOutlined,
  EyeOutlined,
  ArrowLeftOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  SetTabTypeAction,
  SetAnalyzeDetailAction,
  SetProjectTransformDetailsAction,
} from "../../Redux/action";

import GraphView from "./analyzeDetail/graphView";
import AnalysisView from "./analyzeDetail/analysisView";

const AnalyzeDetail = ({
  dataModernizationCss,
  analyzeDetailsId,
  setAnalyze,
  showTop,
  showPopUp,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingView, setLoadingView] = useState(false);
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState();
  const [analyzeDetails, setAnalyzeDetails] = useState(null);
  const [outputFiles, setOutputFiles] = useState([]);
  const [transformationSummary, setTransformationSummary] = useState([]);
  const [open, setOpen] = useState(false);
  const [transformSql, setTransformSql] = useState();
  const [sourceDdl, setSourceDdl] = useState();
  const [targetDdl, setTargetDdl] = useState();

  const getAnalyzeData = async () => {
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
    setLoading(false);
    if (data.success) {
      dispatch(SetAnalyzeDetailAction(data?.data));
      setData({ fileName: data?.data?.fileName, ...data?.data?.analysis });
      setAnalyzeDetails(data?.data?.complexity);
      setOutputFiles(data?.data?.outputFiles);
      setTransformationSummary(data?.data?.transformationSummary);
    } else {
      message.error([data?.error]);
    }
  };

  useEffect(() => {
    getAnalyzeData();
  }, []);

  useEffect(() => {
    outputFiles.forEach(async (e) => {
      if (e.fileType == "graph_src") {
        const data = await fetch_retry_get(`${DESIGN}${e?.outputFileId}`);
        if (data.success) setModalData(data.data);
      }

      if (e.fileType == "transform_sql") {
        const data = await fetch_retry_get(`${DOWNLOADFILE}${e?.outputFileId}`);
        if (data.success) setTransformSql(data.data);
      }

      if (e.fileType == "source_ddl") {
        const data = await fetch_retry_get(`${DOWNLOADFILE}${e?.outputFileId}`);
        if (data.success) setSourceDdl(data.data);
      }

      if (e.fileType == "target_ddl") {
        const data = await fetch_retry_get(`${DOWNLOADFILE}${e?.outputFileId}`);
        if (data.success) setTargetDdl(data.data);
      }
    });
  }, [outputFiles]);

  const preCodeView = (data) => {
    return (
      <pre>
        <code>{data}</code>
      </pre>
    );
  };

  const getProjectData = async (fileId) => {
    const data = await fetch_retry_get(`${DESIGN}${fileId}`);
    if (data.success) return data.data;
  };

  const getDataCall = async (id) => {
    setLoadingView(true);
    let datar = await getProjectData(id);
    setModalData(datar);
    setTimeout(() => {
      setOpen(true);
      setLoadingView(false);
    }, 10);
  };

  return (
    <>
      <Modal
        destroyOnClose
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={"100vw"}
      >
        <GraphView modalData={modalData} showPopUp={showPopUp} />
      </Modal>

      {showTop && (
        <ArrowLeftOutlined
          style={{ fontSize: "1.5vw" }}
          onClick={() => {
            setAnalyze(true);
          }}
        />
      )}

      {loading ? (
        <center>
          <Skeleton active />
        </center>
      ) : (
        <div
          className={dataModernizationCss.analyzeMain}
          style={{
            backgroundColor: "#FFF",
            borderRadius: "25px",
            border: "1px solid #f0f0f0",
          }}
        >
          <Row>
            {showTop && (
              <>
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
                      {data && data.transformations
                        ? data.transformations
                        : "0"}
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
                    {analyzeDetails && analyzeDetails.conversion > 0 && (
                      <>
                        <Card.Grid hoverable={false}>Conversion</Card.Grid>
                        <Card.Grid hoverable={false}>
                          {analyzeDetails && analyzeDetails.conversion
                            ? analyzeDetails.conversion
                            : "0"}
                          %
                        </Card.Grid>
                      </>
                    )}

                    <Card.Grid hoverable={false}>
                      Manual effort estimate
                    </Card.Grid>
                    <Card.Grid hoverable={false}>
                      {analyzeDetails && analyzeDetails.manualEffortsEstimateHrs
                        ? analyzeDetails.manualEffortsEstimateHrs
                        : "0"}{" "}
                      hours
                    </Card.Grid>

                    <Card.Grid hoverable={false}>
                      Automated Effort Hours
                    </Card.Grid>
                    <Card.Grid hoverable={false}>
                      {analyzeDetails &&
                        parseFloat(
                          analyzeDetails.manualEffortsEstimateHrs -
                            (analyzeDetails.manualEffortsEstimateHrs / 100) *
                              analyzeDetails.automationEffortPercent
                        ).toFixed(1)}{" "}
                      hours
                    </Card.Grid>

                    <Card.Grid hoverable={false}>Hours Saved</Card.Grid>
                    <Card.Grid hoverable={false}>
                      {analyzeDetails && analyzeDetails.hoursSaved
                        ? analyzeDetails.hoursSaved
                        : "0"}{" "}
                      hours
                    </Card.Grid>
                  </Card>
                </Col>
              </>
            )}

            <Col span={24} className={dataModernizationCss.analyzeMainDetails}>
              <Collapse ghost accordion>
                {outputFiles
                  .filter(function (item) {
                    return (
                      item.description !== (showTop ? "Transformation SQL" : "")
                    );
                  })
                  .map((e, i) => {
                    return (
                      <Collapse.Panel
                        header={
                          e.description === "Graph Source"
                            ? showPopUp
                              ? "Target Graph"
                              : "Source Graph"
                            : e.description
                        }
                        key={i}
                        style={
                          showTop
                            ? { margin: "2% 0% 2% 0%" }
                            : { margin: "1% 0% 1% 0%" }
                        }
                        collapsible={e.fileType == "graph_src" ? "disabled" : ""}
                        extra={
                          e.fileType != "graph_src" ? (
                            <a
                              target={"_blank"}
                              href={`${"https://api.dev.nuodata.io/"}${DOWNLOADFILE}${
                                e.outputFileId
                              }`}
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
                          ) : (
                            <div onClick={(e) => e.stopPropagation()}>
                              <Space
                                // onClick={() => {
                                //   setOpen(true);
                                // }}
                                onClick={() => {
                                  getDataCall(e.outputFileId);
                                }}
                                size="middle"
                                className={
                                  dataModernizationCss.downloadBtnSpace
                                }
                                style={{ cursor: "pointer" }}
                              >
                                {loadingView ? (
                                  <>
                                    <LoadingOutlined /> Loading
                                  </>
                                ) : (
                                  <>
                                    <EyeOutlined /> View
                                  </>
                                )}
                              </Space>
                            </div>
                          )
                        }
                      >
                        <Row>
                          <Col
                            xs={24}
                            sm={24}
                            md={24}
                            lg={24}
                            xl={24}
                            xxl={24}
                            className={dataModernizationCss.analyzeMainDetails}
                          >
                            {e.fileType === "analysis" && (
                              <AnalysisView
                                transformationSummary={transformationSummary}
                              />
                            )}
                            {e.fileType === "graph_src" && (
                              <GraphView
                                modalData={modalData}
                                showPopUp={showPopUp}
                              />
                            )}
                            {e.fileType === "transform_sql" &&
                              preCodeView(transformSql)}
                            {e.fileType === "source_ddl" &&
                              preCodeView(sourceDdl)}
                            {e.fileType === "target_ddl" &&
                              preCodeView(targetDdl)}
                          </Col>
                        </Row>
                      </Collapse.Panel>
                    );
                  })}
              </Collapse>
              {showTop && (
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
              )}
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default AnalyzeDetail;
