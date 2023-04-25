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
  message,
  Badge,
  Tooltip,
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
import PieChart from "./charts/pieChart";
import { DOWNLOADFILE } from "../../network/apiConstants";
import AnalyzeDetailPopup from "./graphView/analyzeDetailPopup";
import {
  SetProjectTransformDetailsAction,
  SetTabTypeAction,
  SetProjectDetailsAction,
} from "../../Redux/action";
import TransformDetails from "./transformDetails";
import AnalyzeDetail from "./analyzeDetail";
import { fileStatusBadge } from "../helper/fileStatus";
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
  const [fileId, setFileId] = useState(0);

  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );

  const projectTransformDetails = useSelector(
    (state) => state.projectTransformDetails.projectTransformDetails
  );

  const designDetails = useSelector(
    (state) => state.designDetails.designDetails
  );

  const getAnalyzeData = async () => {
    const data = await fetch_retry_get(
      `${ANALYZESUMMARY}${query.id ? query.id : projectDetails.projectId}`
    );
    setLoading(false);
    if (data.success) {
      setData(data?.data?.fileDetails);
      const failData = data?.data?.fileDetails.filter((e) => {
        return e.fileStatus === "analyze_failed";
      });
      setAnalyzeDetails({
        convertedFilesCount: failData.length,
        ...data?.data,
      });
      setComplexityGraph(data?.data?.complexityGraph);
    } else {
      // dispatch(SetProjectTransformDetailsAction({}));
      // dispatch(SetTabTypeAction("Connect"));
      // message.error(data?.error ? [data?.error] : "Something went wrong.");
    }
  };

  useEffect(() => {
    getAnalyzeData();
  }, [query.id]);

  return (
    <>
      {isDetails ? (
        <TransformDetails
          dataModernizationCss={dataModernizationCss}
          setIsDetails={setIsDetails}
        />
      ) : (
        <>
          {data.length ? (
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
                      : "--"}
                  </span>
                </h2>
                <h2>
                  You saved
                  <span>
                    {" "}
                    {analyzeDetails?.hoursSaved
                      ? parseFloat(analyzeDetails?.hoursSaved).toFixed(2)
                      : "--"}{" "}
                    {parseFloat(analyzeDetails?.hoursSaved).toFixed(2) > 1
                      ? "Hours"
                      : "hour"}
                  </span>
                  of manual effort
                </h2>
              </Col>
            </Row>
          ) : null}
          {data.length ? (
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
                        {analyzeDetails &&
                        analyzeDetails.manualEffortsEstimateHrs
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
                <Col
                  xs={14}
                  sm={14}
                  md={14}
                  lg={14}
                  xl={14}
                  xxl={14}
                  style={{}}
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
                          <PieChart
                            complexityGraph={complexityGraph}
                            dataModernizationCss={dataModernizationCss}
                            labels={["Converted", "Not converted"]}
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
          ) : null}
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
              <Table
                pagination={false}
                rowKey="fileId"
                expandable={{
                  expandedRowRender: (record) => (
                    // record.fileStatus === true ? (
                    <AnalyzeDetail
                      analyzeDetailsId={record.fileId}
                      dataModernizationCss={dataModernizationCss}
                      isUserAction={record?.isUserAction}
                      showTop={false}
                      showPopUp={record?.isUserAction}
                    />
                  ),
                  // ) : (
                  //   <center style={{color : "#e74860"}}>Please transform this file</center>
                  // ),
                }}
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
                    align: 'center'
                  },
                  {
                    title: "Mappings",
                    dataIndex: "mappings",
                    key: "mappings",
                    align: 'center'
                  },
                  {
                    title: "Transformations",
                    dataIndex: "transformations",
                    key: "transformations",
                    align: 'center'
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
                              style={{ cursor: "not-allowed" }}
                            >
                              <a style={{ cursor: "not-allowed" }}>
                                <EyeOutlined /> View
                              </a>
                            </Space>
                          );
                        default:
                          return record?.isUserAction ? (
                            <Space size="middle">
                              <a
                                onClick={() => {
                                  dispatch(
                                    SetProjectTransformDetailsAction({
                                      analyzeDetailsId: record.fileId,
                                      isUserAction: record.isUserAction,
                                    })
                                  );
                                  setIsDetails(true);
                                }}
                              >
                                <EyeOutlined /> View
                              </a>
                            </Space>
                          ) : (
                            // <Tooltip placement="topLeft" title={"Please transform this file."}>
                            //   <Space
                            //     size="middle"
                            //     style={{ cursor: "not-allowed" }}
                            //   >
                            //     <a style={{ cursor: "not-allowed" }}>
                            //       <EyeOutlined /> View
                            //     </a>
                            //   </Space>
                            // </Tooltip>
                            <Space size="middle">
                              <a
                                onClick={() => {
                                  dispatch(
                                    SetProjectTransformDetailsAction({
                                      analyzeDetailsId: record.fileId,
                                      isUserAction: record.isUserAction,
                                    })
                                  );
                                  setIsDetails(true);
                                }}
                              >
                                <EyeOutlined /> View
                              </a>
                            </Space>
                          );
                      }
                    },
                    align: 'center'
                  },
                ]}
                dataSource={data
                  .sort((a, b) => a.fileId - b.fileId)
                  .filter(
                    (data) => data.fileStatus !== "analyze_failed"
                    // && data.isUserAction === true
                  )}
              />
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
              showPopUp={true}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default Transform;
