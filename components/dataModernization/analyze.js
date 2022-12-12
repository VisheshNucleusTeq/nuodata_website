import { Row, Col, Table, Space, Card, message, Descriptions } from "antd";
import { useEffect, useState } from "react";

import { GETANALYZEDATA } from "../../network/apiConstants";
import { fetch_retry_get } from "../../network/api-manager";

const Analyze = ({ dataModernizationCss, changeStep }) => {
  const [data, setData] = useState([]);
  const [analyzeDetails, setAnalyzeDetails] = useState();
  const [loading, setLoading] = useState(false);

  const getALLProjects = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const data = await fetch_retry_get(`${GETANALYZEDATA}61`);
    setLoading(false);
    if (data.success) {
      setData([
        {
          ...data?.data?.analysis,
          fileName: data?.data?.outputFiles?.fileName,
        },
      ]);
      setAnalyzeDetails(data?.data?.complexity);
    } else {
      message.error([data?.error]);
    }
  };

  useEffect(() => {
    getALLProjects();
  }, []);

  return (
    <Row className={dataModernizationCss.defineForm}>
      <Col span={24}>
        <Row>
          <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
          <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22}>
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
                      {/* <Tooltip placement="top" title={"Details"}>
                    <a>Details</a>
                  </Tooltip> */}
                      <a>Details</a>
                    </Space>
                  ),
                },
              ]}
              dataSource={data}
            />
          </Col>
          <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
        </Row>
      </Col>
      {analyzeDetails && (
        <Col span={24}>
          <Row>
            <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
            <Col xs={22} sm={22} md={22} lg={22} xl={10} xxl={10}>
              <Card>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <ul style={{ listStyleType: "none" }}>
                      <b>
                        <li>Complexity</li>
                        <li>Conversion</li>
                        <li>Manual effort estimate</li>
                        <li>Effort with x% automation</li>
                        <li>Hours Saved</li>
                      </b>
                    </ul>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <ul style={{ listStyleType: "none" }}>
                      <b>
                        <li>
                          {analyzeDetails && analyzeDetails.complexity
                            ? analyzeDetails.complexity
                            : "NA"}
                        </li>
                        <li>
                          {analyzeDetails && analyzeDetails.conversion
                            ? analyzeDetails.conversion
                            : "NA"}
                        </li>
                        <li>
                          {analyzeDetails &&
                          analyzeDetails.manualEffortsEstimateHrs
                            ? analyzeDetails.manualEffortsEstimateHrs
                            : "NA"}
                        </li>
                        <li>
                          {analyzeDetails &&
                          analyzeDetails.automationEffortPercent
                            ? analyzeDetails.automationEffortPercent
                            : "NA"}
                        </li>
                        <li>
                          {analyzeDetails && analyzeDetails.hoursSaved
                            ? analyzeDetails.hoursSaved
                            : "NA"}
                        </li>
                      </b>
                    </ul>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
          </Row>
        </Col>
      )}
    </Row>
  );
};

export default Analyze;
