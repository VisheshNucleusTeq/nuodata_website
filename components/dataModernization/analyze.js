import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Table, Space, Card, message, Carousel } from "antd";
import { useRouter } from "next/router";

import {  GETPROJECT, ANALYZESUMMARY } from "../../network/apiConstants";
import { fetch_retry_get } from "../../network/api-manager";
import BarChart from "./charts/barChart";
import LineChart from "./charts/lineChart";
import AnalyzeDetail from "./analyzeDetail";
import { SetProjectDetailsAction } from "../../Redux/action";

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
  }


  useEffect(() => {
    if(query.id){
      getProjectData(query.id)
    }
    getAnalyzeData();
  }, [query.id]);

  

  return (
    <div className={dataModernizationCss.analyzeMain}>
      {analyze ? (
        <Row>
          <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
            <Card className={dataModernizationCss.cardView}>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <ul style={{ listStyleType: "none" }}>
                    <b>
                      <li>Total Files</li>
                      <li>Transformations</li>
                      <li>Mappings</li>
                      <li>Conversion</li>
                      <li>Manual Effort</li>
                      <li>Hours Saved</li>
                    </b>
                  </ul>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <ul style={{ listStyleType: "none" }}>
                    <b>
                      <li>
                        {analyzeDetails && analyzeDetails.totalFiles
                          ? analyzeDetails.totalFiles
                          : "0"}
                      </li>
                      <li>
                        {analyzeDetails && analyzeDetails.transformations
                          ? analyzeDetails.transformations
                          : "0"}
                      </li>
                      <li>
                        {analyzeDetails && analyzeDetails.mappings
                          ? analyzeDetails.mappings
                          : "0"}
                      </li>

                      <li>
                        {analyzeDetails && analyzeDetails.conversions
                          ? analyzeDetails.conversions
                          : "0"} %
                      </li>
                      <li>
                        {analyzeDetails &&
                        analyzeDetails.manualEffortsEstimateHrs
                          ? analyzeDetails.manualEffortsEstimateHrs
                          : "0"}{" "}
                        hours
                      </li>
                      <li>
                        {analyzeDetails && analyzeDetails.hoursSaved
                          ? analyzeDetails.hoursSaved
                          : "0"}{" "}
                        hours
                      </li>
                    </b>
                  </ul>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}></Col>
          <Col xs={14} sm={14} md={14} lg={14} xl={14} xxl={14} style={{}}>
            <Card className={dataModernizationCss.cardView}>
              <Carousel autoplay draggable>
                <div className={dataModernizationCss.cardViewGraph}>
                  {complexityGraph && (
                    <BarChart
                      complexityGraph={complexityGraph}
                      dataModernizationCss={dataModernizationCss}
                    />
                  )}
                </div>
                <div className={dataModernizationCss.cardViewGraph}>
                  {complexityGraph && (
                    <LineChart
                      complexityGraph={complexityGraph}
                      dataModernizationCss={dataModernizationCss}
                    />
                  )}
                </div>
              </Carousel>
            </Card>
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
