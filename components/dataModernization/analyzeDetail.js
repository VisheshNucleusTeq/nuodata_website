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
  Badge,
} from "antd";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  GETANALYZEDATA,
  DOWNLOADFILE,
  DESIGN,
  VERSION,
  CONVERTTRANSFORN,
  DOWNLOADZIP,
} from "../../network/apiConstants";
import { fetch_retry_get, fetch_retry_post } from "../../network/api-manager";
import {
  DownloadOutlined,
  EyeOutlined,
  ArrowRightOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  SetTabTypeAction,
  SetAnalyzeDetailAction,
  SetProjectTransformDetailsAction,
  setOpenDetails,
} from "../../Redux/action";

import GraphView from "./analyzeDetail/graphView";
import AnalysisView from "./analyzeDetail/analysisView";
import SqlView from "./analyzeDetail/sqlView";
import axios from "axios";

const AnalyzeDetail = ({
  getErrorDetails,
  dataModernizationCss,
  analyzeDetailsId,
  setAnalyze,
  showTop,
  showPopUp,
  isUserAction,
  analyzeDetailPageData,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingView, setLoadingView] = useState(false);
  const [data, setData] = useState([]);
  const [analyzeDetails, setAnalyzeDetails] = useState(null);
  const [outputFiles, setOutputFiles] = useState([]);
  const [transformationSummary, setTransformationSummary] = useState([]);
  const [open, setOpen] = useState(false);
  const [sqlOpen, setSqlOpen] = useState(false);
  const [transformSql, setTransformSql] = useState();
  const [sourceDdl, setSourceDdl] = useState();
  const [targetDdl, setTargetDdl] = useState();
  const [showDownload, setShowDownload] = useState(false);
  const [activeTab, setActiveTab] = useState("SQL");

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
      setData({
        fileName: data?.data?.fileName,
        ...data?.data?.analysis,
        failureReasons: data?.data?.failureReasons,
      });
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
    setTimeout(() => {
      setOpen(true);
      setLoadingView(false);
    }, 10);
  };

  const updateTransformStatus = async (id) => {
    const data = await fetch_retry_post(`${CONVERTTRANSFORN}${id}`);
    return data;
  };

  const downloadFile = async (url) => {
    const response = await fetch_retry_get(url, { responseType: "blob" });
    const fileNameData = response?.headers["content-disposition"];
    const filename = fileNameData
      .split(";")
      .find((n) => n.includes("fileName=") || n.includes("filename="))
      .replace('fileName="', "")
      .replace("filename=", "")
      .replace('"', "")
      .trim();

    const href = URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = href;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  return (
    <>
      <Modal
        destroyOnClose
        centered
        open={open}
        onOk={() => {
          const file_path = `${process.env.BASE_URL}${DOWNLOADFILE}${showDownload}`;
          const a = document.createElement("A");
          a.href = file_path;
          a.download = file_path.substr(file_path.lastIndexOf("/") + 1);
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }}
        onCancel={() => {
          setOpen(false);
          setShowDownload(false);
        }}
        width={"100vw"}
        okButtonProps={{ style: { display: showDownload ? "" : "none" } }}
        cancelText={"Close"}
        okText={"Download"}
        closable={false}
      >
        <GraphView
          showPopUp={showPopUp}
          analyzeDetailsId={analyzeDetailsId}
          setShowDownload={setShowDownload}
        />
      </Modal>

      <Modal
        destroyOnClose
        centered
        open={sqlOpen}
        onOk={() => {
          const file_path = `${process.env.BASE_URL}${DOWNLOADFILE}${showDownload}`;
          const a = document.createElement("A");
          a.href = file_path;
          a.download = file_path.substr(file_path.lastIndexOf("/") + 1);
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }}
        onCancel={() => {
          setSqlOpen(false);
          setShowDownload(false);
        }}
        width={"100vw"}
        okButtonProps={{ style: { display: showDownload ? "" : "none" } }}
        cancelText={"Close"}
        okText={"Download"}
        closable={false}
      >
        {isUserAction ? (
          <SqlView
            showPopUp={showPopUp}
            analyzeDetailsId={analyzeDetailsId}
            dataModernizationCss={dataModernizationCss}
            setShowDownload={setShowDownload}
            activeTabValue={activeTab}
          />
        ) : (
          <GraphView
            showPopUp={showPopUp}
            analyzeDetailsId={analyzeDetailsId}
            setShowDownload={setShowDownload}
          />
        )}
      </Modal>

      {showTop && (
        <Row>
          <Col span={12}>
            <Badge
              style={{ cursor: "pointer" }}
              count={"< Go Back"}
              color="#0c3246"
              onClick={() => {
                setAnalyze(true);
              }}
            />
          </Col>
          <Col span={12} style={{ display: "flex", justifyContent: "end" }}>
            {data?.failureReasons && data?.failureReasons.length > 0 ? (
              <Badge
                style={{ cursor: "pointer" }}
                count={"! Errors"}
                color="#e74860"
                onClick={() => {
                  getErrorDetails(analyzeDetailsId);
                }}
              />
            ) : (
              ""
            )}
          </Col>
        </Row>
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

                    <Card.Grid hoverable={false}>Mapplets</Card.Grid>
                    <Card.Grid hoverable={false}>
                      {data && data.mapplets ? data.mapplets : "0"}
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
                <Collapse.Panel
                  key={"Source-Graph"}
                  header={"Graph"}
                  extra={
                    <div onClick={(e) => e.stopPropagation()}>
                      <Space
                        onClick={() => {
                          showPopUp
                            ? (setSqlOpen(true), setActiveTab("GRAPH"))
                            : setOpen(true);
                        }}
                        size="middle"
                        className={dataModernizationCss.downloadBtnSpace}
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
                  }
                >
                  <center>Please Click On view</center>
                </Collapse.Panel>

                {showPopUp && isUserAction && (
                  <Collapse.Panel
                    key={"Transformation-SQL"}
                    header={"Transformation SQL"}
                    extra={
                      <div onClick={(e) => e.stopPropagation()}>
                        <Space size="middle" style={{ cursor: "pointer" }}>
                          <span
                            className={dataModernizationCss.downloadBtnSpace}
                            onClick={() => {
                              downloadFile(
                                `${process.env.BASE_URL}${DOWNLOADZIP}${analyzeDetailsId}?type=pyspark&workflowId=0`
                              );
                            }}
                          >
                            <DownloadOutlined /> Download
                          </span>

                          <span
                            className={dataModernizationCss.downloadBtnSpace}
                            onClick={() => {
                              setSqlOpen(true);
                              setActiveTab("SQL");
                            }}
                          >
                            <EyeOutlined /> View
                          </span>
                        </Space>
                      </div>
                    }
                  >
                    <center>Please Click On view</center>
                  </Collapse.Panel>
                )}

                {outputFiles
                  .filter(function (item) {
                    return (
                      item.description !==
                        (showTop ? "Transformation SQL" : "") &&
                      item.description != "Graph Source"
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
                        extra={
                          !e.fileType.includes("_graph_src") ? (
                            <div onClick={(e) => e.stopPropagation()}>
                              {/* <a
                                href={`${process.env.BASE_URL}${DOWNLOADFILE}${e.outputFileId}`}
                              > */}
                              <Space
                                size="middle"
                                className={
                                  dataModernizationCss.downloadBtnSpace
                                }
                                onClick={() => {
                                  downloadFile(
                                    `${process.env.BASE_URL}${DOWNLOADFILE}${e.outputFileId}`
                                  );
                                }}
                              >
                                <DownloadOutlined /> Download
                              </Space>
                              {/* </a> */}
                            </div>
                          ) : (
                            <div onClick={(e) => e.stopPropagation()}>
                              <Space
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
            </Col>
          </Row>
        </div>
      )}
      {!loading && showTop && (
        <div className={dataModernizationCss.nextExitBtn}>
          {isUserAction &&
            analyzeDetailPageData.githubStatus !== "uploaded" && (
              <Button
                type="primary"
                danger
                className={dataModernizationCss.nextBtn}
                htmlType="submit"
                onClick={() => {
                  dispatch(
                    setOpenDetails({
                      detailId: analyzeDetailsId,
                    })
                  );
                  dispatch(SetTabTypeAction("Design"));
                }}
                style={{ marginRight: "2%" }}
              >
                Design Workflow <ArrowRightOutlined />
              </Button>
            )}

          <Button
            type="primary"
            danger
            className={dataModernizationCss.nextBtn}
            htmlType="submit"
            onClick={async () => {
              await updateTransformStatus(analyzeDetailsId);
              dispatch(
                SetProjectTransformDetailsAction({
                  analyzeDetailsId,
                  isUserAction: true,
                })
              );
              dispatch(
                setOpenDetails({
                  detailId: analyzeDetailsId,
                })
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
    </>
  );
};

export default AnalyzeDetail;
