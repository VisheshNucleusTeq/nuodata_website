import { useEffect, useState } from "react";
import { Row, Col, Table, Space, Card, message, Modal } from "antd";

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

const AnalyzeDetail = ({
  dataModernizationCss,
  analyzeDetailsId,
  setAnalyze,
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState();
  const [analyzeDetails, setAnalyzeDetails] = useState(null);
  const [outputFiles, setOutputFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [outputFileId, setOutputFileId] = useState();

  const getAnalyzeData = async () => {
    setLoading(true);
    const data = await fetch_retry_get(`${GETANALYZEDATA}${analyzeDetailsId}`);
    setLoading(false);
    if (data.success) {
      setData([
        {
          fileName: data?.data?.fileName,
          ...data?.data?.analysis,
        },
      ]);
      setAnalyzeDetails(data?.data?.complexity);
      setOutputFiles(data?.data?.outputFiles);
    } else {
      message.error([data?.error]);
    }
  };
  const getProjectData = async (fileId) => {
    const data = await fetch_retry_get(`${DESIGN}${fileId}`);
    if (data.success) return data.data;
    // setData(data);
    // console.log(data);
  };

  const getDataCall = async (id) => {
    let datar = await getProjectData(id);
    console.log("data from here", datar);
    setModalData(datar);

    setTimeout(() => {
      setOpen(true);
    }, 1000);
  };
  
  useEffect(() => {
    getAnalyzeData();
  }, []);

  return (
    <div className={dataModernizationCss.analyzeMain}>
      <ArrowLeftOutlined
        style={{ fontSize: "1.5vw" }}
        onClick={() => {
          setAnalyze(true);
        }}
      />

      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
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

                {
                  title: "Action",
                  key: "action",
                  render: (_, record) => (
                    <Space size="middle">
                      <a>Details</a>
                    </Space>
                  ),
                },
              ]}
              dataSource={data}
            />
          </div>
        </Col>

        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
          <Card className={dataModernizationCss.cardView}>
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
                        : "0"}
                    </li>
                    <li>
                      {analyzeDetails && analyzeDetails.conversion
                        ? analyzeDetails.conversion
                        : "0"}{" "}
                      %
                    </li>
                    <li>
                      {analyzeDetails && analyzeDetails.manualEffortsEstimateHrs
                        ? analyzeDetails.manualEffortsEstimateHrs
                        : "0"}{" "}
                      hours
                    </li>

                    <li>
                      {analyzeDetails && analyzeDetails.automationEffortPercent
                        ? analyzeDetails.automationEffortPercent
                        : "0"}{" "}
                      %
                    </li>
                    <li>
                      {analyzeDetails && analyzeDetails.manualEffortsEstimateHrs
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

        <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
          <Modal
            // title="Modal 1000px width"
            destroyOnClose
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={"100vw"}
          >
            {/* <p>{ Date.now() }</p> */}
            <AnalyzeDetailPopup outputFileId={outputFileId} data={modalData} />
          </Modal>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <div className={dataModernizationCss.analyzeMain}>
            {/* {JSON.stringify(outputFiles)} */}
            <Table
              pagination={false}
              className="demo"
              columns={[
                {
                  title: "",
                  dataIndex: "fileName",
                  key: "fileName",
                },
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
                            setOutputFileId(record.outputFileId);
                            getDataCall(record.outputFileId);
                          }}
                        >
                          <Space size="middle" style={{ cursor: "pointer" }}>
                            <EyeOutlined /> View
                          </Space>
                        </a>
                      );
                    } else {
                      return (
                        //http://3.109.185.25:8080/core/v1/download/155
                        <a
                          target={"_blank"}
                          href={`${DOWNLOADFILE}${record.outputFileId}`}
                        >
                          <Space size="middle" style={{ cursor: "pointer" }}>
                            <DownloadOutlined /> Download
                          </Space>
                        </a>
                      );
                    }
                  },
                },
              ]}
              dataSource={outputFiles}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AnalyzeDetail;
