import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Table, Space, Card, message, Carousel, Button } from "antd";
import { useRouter } from "next/router";
import { ArrowRightOutlined } from "@ant-design/icons";

import { GETPROJECT, ANALYZESUMMARY } from "../../network/apiConstants";
import { fetch_retry_get } from "../../network/api-manager";
import BarChart from "./charts/barChart";
import LineChart from "./charts/lineChart";
import PieChart from "./charts/pieChart";
import AnalyzeDetail from "./analyzeDetail";
import {
  SetProjectDetailsAction,
  SetTabTypeAction,
  SetProjectTransformDetailsAction,
} from "../../Redux/action";

const Analyze = ({ dataModernizationCss }) => {
  const dispatch = useDispatch();
  const { query } = useRouter();

  const [data, setData] = useState([]);
  const [analyzeDetails, setAnalyzeDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [complexityGraph, setComplexityGraph] = useState();
  const [analyze, setAnalyze] = useState(true);
  const [analyzeDetailsId, setAnalyzeDetailsId] = useState(0);

  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );

  const getAnalyzeData = async () => {
    const data = await fetch_retry_get(
      `${ANALYZESUMMARY}${query.id ? query.id : projectDetails.projectId}`
    );
    setLoading(false);
    if (data.success) {
      setData(data?.data?.fileDetails);
      setAnalyzeDetails(data?.data);
      setComplexityGraph(data?.data?.complexityGraph);
    } else {
      message.error([data?.error]);
    }
  };

  const getProjectData = async (projectId) => {
    const data = await fetch_retry_get(`${GETPROJECT}${query.id}`);
    dispatch(SetProjectDetailsAction(data.data));
  };

  useEffect(() => {
    if (query.id) {
      getProjectData(query.id);
    }
    getAnalyzeData();
  }, [query.id]);

  return (
    <div className={dataModernizationCss.analyzeMain}>
      {analyze ? (
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
              <Card.Grid style={{ color: "#09bd21" }}>Hours Saved</Card.Grid>
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

          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
            xxl={24}
            className={`${dataModernizationCss.validateTab} ${dataModernizationCss.downloadData}`}
          >
            <Button type="default">Download all output .zip file</Button>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <div className={dataModernizationCss.analyzeMain}>
              <Table
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
                            setAnalyzeDetailsId(record.fileId);
                            setAnalyze(false);
                          }}
                        >
                          Details
                        </a>
                      </Space>
                    ),
                  },
                ]}
                dataSource={data}
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
                Transform <ArrowRightOutlined />
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
      ) : (
        <AnalyzeDetail
          analyzeDetailsId={analyzeDetailsId}
          dataModernizationCss={dataModernizationCss}
          setAnalyze={() => {
            setAnalyze(true);
          }}
        />
      )}
    </div>
  );
};

export default Analyze;
