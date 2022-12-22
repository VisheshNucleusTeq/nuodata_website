import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Row,
  Col,
  Card,
  Carousel,
  Collapse,
  Space,
  Table,
  Modal,
  Tag,
} from "antd";
const { Panel } = Collapse;
import { useRouter } from "next/router";
import {
  EyeOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { fetch_retry_get } from "../../network/api-manager";
import { ANALYZESUMMARY, DESIGN } from "../../network/apiConstants";
import BarChart from "./charts/barChart";
import PieChart from "./charts/pieChart";
import LineChart from "./charts/lineChart";
import { DOWNLOADFILE } from "../../network/apiConstants";
import AnalyzeDetailPopup from "./analyzeDetailPopup";
import { SetProjectTransformDetailsAction } from "../../Redux/action";
import TransformDetails from "./transformDetails";

const Transform = ({ dataModernizationCss }) => {
  const { query } = useRouter();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [analyzeDetails, setAnalyzeDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [complexityGraph, setComplexityGraph] = useState();
  const [modalData, setModalData] = useState();
  const [open, setOpen] = useState(false);
  const [isDetails, setIsDetails] = useState(false);

  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );

  const projectTransformDetails = useSelector(
    (state) => state.projectTransformDetails.projectTransformDetails
  );

  const getAnalyzeData = async () => {
    const data = await fetch_retry_get(
      `${ANALYZESUMMARY}${query.id ? query.id : projectDetails.projectId}`
    );
    setLoading(false);
    if (data.success) {
      setData(data?.data?.fileDetails);
      setAnalyzeDetails({ convertedFilesCount: 2, ...data?.data });
      setComplexityGraph(data?.data?.complexityGraph);
    } else {
      message.error([data?.error]);
    }
  };

  useEffect(() => {
    getAnalyzeData();
  }, [query.id]);

  const getProjectData = async (fileId) => {
    const data = await fetch_retry_get(`${DESIGN}${fileId}`);
    if (data.success) return data.data;
  };

  const getDataCall = async (id) => {
    let datar = await getProjectData(id);
    setModalData(datar);
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  };

  useEffect(() => {
    if (projectTransformDetails && projectTransformDetails.analyzeDetailsId) {
      setIsDetails(true);
    } else {
      setIsDetails(false);
    }
  }, [projectTransformDetails.analyzeDetailsId]);

  return (
    <>
      {isDetails ? (
        <TransformDetails dataModernizationCss={dataModernizationCss} />
      ) : (
        <>
          <Row className={dataModernizationCss.defineForm}>
            <Col
              xs={23}
              sm={23}
              md={23}
              lg={23}
              xl={23}
              xxl={23}
              className={dataModernizationCss.transform}
            >
              <h1>Congratulations !</h1>
              <h2>
                Transformation Completed for
                <span>
                  {projectDetails && projectDetails?.name
                    ? projectDetails.name
                    : ""}
                </span>
              </h2>
              <h2>
                You saved{" "}
                <span>
                  {analyzeDetails?.hoursSaved}{" "}
                  {analyzeDetails?.hoursSaved > 1 ? "Hours" : "hour"}
                </span>
                of manual effort
              </h2>
            </Col>
          </Row>
          <div className={dataModernizationCss.analyzeMain}>
            <Row>
              <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
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
                  <Card.Grid>Conversion</Card.Grid>
                  <Card.Grid>
                    {analyzeDetails && analyzeDetails.conversions
                      ? analyzeDetails.conversions
                      : "0"}{" "}
                    %
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
                  <Card.Grid style={{ color: "#09bd21" }}>
                    Hours Saved
                  </Card.Grid>
                  <Card.Grid>
                    <span style={{ color: "#09bd21" }}>
                      {analyzeDetails && analyzeDetails.hoursSaved
                        ? parseFloat(analyzeDetails.hoursSaved).toFixed(2)
                        : "0"}{" "}
                      hours
                    </span>
                  </Card.Grid>
                </Card>
              </Col>
              <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}></Col>
              <Col xs={14} sm={14} md={14} lg={14} xl={14} xxl={14} style={{}}>
                <Card className={dataModernizationCss.cardViewGraphs}>
                  <Carousel autoplay draggable>
                    {/* <div className={dataModernizationCss.cardViewGraph}>
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
                    </div> */}

                    <div className={dataModernizationCss.cardViewGraph}>
                      {complexityGraph && (
                        <PieChart
                          complexityGraph={complexityGraph}
                          dataModernizationCss={dataModernizationCss}
                          labels={["Not Converted", "converted"]}
                          data={[
                            analyzeDetails.totalFiles -
                              (analyzeDetails?.convertedFilesCount
                                ? analyzeDetails.convertedFilesCount
                                : 0),
                            analyzeDetails?.convertedFilesCount
                              ? analyzeDetails.convertedFilesCount
                              : 0,
                          ]}
                        />
                      )}
                    </div>
                  </Carousel>
                </Card>
              </Col>
            </Row>
          </div>
          <Row className={dataModernizationCss.defineForm}>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              xxl={24}
              className={dataModernizationCss.analyzeMainDetails}
            >
              <Collapse defaultActiveKey="" ghost accordion>
                {data.map((e, i) => {
                  return (
                    <Panel
                      key={i}
                      header={e.fileName}
                      style={{ margin: "2% 0% 2% 0%" }}
                      extra={
                        <Space
                          size="middle"
                          className={dataModernizationCss.downloadBtnSpace}
                          onClick={() => {
                            dispatch(
                              SetProjectTransformDetailsAction({
                                analyzeDetailsId: e.fileId,
                              })
                            );
                          }}
                        >
                          {" "}
                          <EyeOutlined /> View
                          {i != 1 ? (
                            <Tag icon={<CheckCircleOutlined />} color="success">
                              {"Transformed Successfully"}
                            </Tag>
                          ) : (
                            <Tag
                              icon={<ExclamationCircleOutlined />}
                              color="warning"
                            >
                              {"Transformation Pending"}
                            </Tag>
                          )}
                        </Space>
                      }
                    >
                      <Table
                        pagination={false}
                        columns={[
                          {
                            title: "",
                            dataIndex: "description",
                            key: "description",
                          },
                          {
                            title: "",
                            key: "action",
                            render: (_, record) => {
                              if (record.fileType == "graph_src") {
                                return (
                                  <a
                                    onClick={async () => {
                                      getDataCall(record.outputFileId);
                                    }}
                                  >
                                    <Space
                                      size="middle"
                                      style={{ cursor: "pointer" }}
                                    >
                                      <EyeOutlined /> View
                                    </Space>
                                  </a>
                                );
                              } else {
                                return (
                                  <a
                                    target={"_blank"}
                                    href={`${DOWNLOADFILE}${record.outputFileId}`}
                                  >
                                    <Space
                                      size="middle"
                                      style={{ cursor: "pointer" }}
                                    >
                                      <DownloadOutlined /> Download
                                    </Space>
                                  </a>
                                );
                              }
                            },
                          },
                        ]}
                        dataSource={e?.outputFiles}
                      />
                    </Panel>
                  );
                })}
              </Collapse>
            </Col>
          </Row>
          <Modal
            destroyOnClose
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={"100vw"}
          >
            <AnalyzeDetailPopup
              outputFileId={"outputFileId"}
              data={modalData}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default Transform;
