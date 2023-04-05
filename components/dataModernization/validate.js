import { Row, Col, Badge, Table, Modal, Card, Carousel,Tooltip } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  GithubOutlined,
  DatabaseOutlined,
  CheckCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import PieChart from "./charts/pieChart";
import ValidatePopup from "./validateView/validatePopup";
import {
  ANALYZESUMMARY,
  VALIDATEFILE,
  GITHUBCHECKIN,
} from "../../network/apiConstants";
import { fetch_retry_get, fetch_retry_post } from "../../network/api-manager";
import { SetTabTypeAction, loderShowHideAction } from "../../Redux/action";
import { fileStatusBadge } from "../helper/fileStatus";
export default function Validate({ dataModernizationCss }) {
  const { query } = useRouter();
  const dispatch = useDispatch();

  const [selectedTab, setSelecterTab] = useState("uploadTestData");
  const [open, setOpen] = useState(false);
  const [analyzeDetails, setAnalyzeDetails] = useState();
  const [data, setData] = useState([]);
  const [complexityGraph, setComplexityGraph] = useState();
  const [selectedFile, setSelectedFile] = useState(0);
  const [fileId, setFileId] = useState(0);

  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );

  const getAnalyzeData = async () => {
    const data = await fetch_retry_get(
      `${ANALYZESUMMARY}${query.id ? query.id : projectDetails.projectId}` //?type=transform
    );
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
      setSelectedFile(0);
    } else {
      // dispatch(SetProjectTransformDetailsAction({}));
      // dispatch(SetTabTypeAction("Connect"));
      // message.error(data?.error ? [data?.error] : "Something went wrong.");
    }
  };

  useEffect(() => {
    getAnalyzeData();
  }, [query.id]);

  const updateFileValidationStatus = async (fileId) => {
    setSelectedFile(fileId);
    const data = await fetch_retry_post(`${VALIDATEFILE}${fileId}`);
    if (data.success) {
      getAnalyzeData();
    }
  };

  const githubCheckIn = async (fileId) => {
    setSelectedFile(fileId);
    const data = await fetch_retry_post(`${GITHUBCHECKIN}${fileId}`);
    if (data.success) {
      getAnalyzeData();
    }
  };

  return (
    <>
      <Modal
        destroyOnClose
        centered
        open={open}
        onOk={() => {
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        width={"100vw"}
        // okButtonProps={{ style: { display: "none" } }}
        cancelText={"Close"}
        okText={"Save"}
        closable={false}
      >
        <ValidatePopup fileId={fileId}/>
      </Modal>

      <Row className={dataModernizationCss.validateTab}>
        <Col span={24}>
          <h1>Demo_Test</h1>
        </Col>
        <Col span={24}>
          <div className={dataModernizationCss.analyzeMain}>
            <Row>
              <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                {/* <Card className={dataModernizationCss.cardView}>
                  <Card.Grid>Total Files</Card.Grid>
                  <Card.Grid>1</Card.Grid>
                  <Card.Grid>Transformations</Card.Grid>
                  <Card.Grid>200</Card.Grid>
                  <Card.Grid>Mappings</Card.Grid>
                  <Card.Grid>36</Card.Grid>
                  <Card.Grid>Validation Completed</Card.Grid>
                  <Card.Grid>75%</Card.Grid>
                  <Card.Grid>Manual Effort</Card.Grid>
                  <Card.Grid>
                    <span>123.50 hours</span>
                  </Card.Grid>
                  <Card.Grid style={{ color: "#09bd21" }}>
                    Hours Saved
                  </Card.Grid>
                  <Card.Grid>
                    <span style={{ color: "#09bd21" }}>450.30 hours</span>
                  </Card.Grid>
                </Card> */}
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
                  <Card.Grid>Validation</Card.Grid>
                  <Card.Grid>
                    {analyzeDetails && analyzeDetails.validation
                      ? analyzeDetails.validation
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
        </Col>

        <Col span={24} style={{ marginTop: "2vh" }}>
          <Table
            pagination={false}
            locale={{
              emptyText: "No Record Available",
            }}
            rowKey="fileId"
            // expandable={{
            //   expandedRowRender: (record) => {
            //     return <ValidatePopup />;
            //   },
            // }}
            columns={[
              {
                title: "File Name",
                dataIndex: "fileName",
                key: "fileName",
                render: (_, record) => {
                  return (
                    <b
                      onClick={() => {
                        // dispatch(
                        //   SetProjectTransformDetailsAction({
                        //     analyzeDetailsId: record.fileId,
                        //     isUserAction: record.isUserAction,
                        //   })
                        // );
                        setFileId(record.fileId)
                        console.log(record);
                        setOpen(true);
                      }}
                      style={{ cursor: "pointer", color: "#e74860" }}
                    >
                      {record.fileName}
                    </b>
                  );
                },
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
                title: "Status",
                key: "fileStatus",
                render: (_, record) => {
                  // switch (record.fileStatus) {
                  //   case "validated":
                  //     return <Badge count={"Validated"} color="green" />;
                  //   default:
                  //     return <Badge count={"Not Validated"} color="orange" />;
                  // }
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
                  return (
                    <>
                      {/* <Space size="middle" style={{ cursor: "pointer" }}> */}
                      <a
                        onClick={() => {
                          githubCheckIn(record.fileId);
                        }}
                        // style={{ cursor: "not-allowed" }}
                      >
                        <GithubOutlined />
                        {" Check-in (GitHub)"}
                      </a>
                      <br />
                      <a style={{ cursor: "not-allowed" }}>
                        <DatabaseOutlined />
                        {" Launch Databricks"}
                      </a>
                      <br />
                      {record.fileStatus != "validated" ? (
                        record?.isUserAction ? (
                          <a
                            onClick={() => {
                              updateFileValidationStatus(record.fileId);
                            }}
                          >
                            {record.fileId === selectedFile ? (
                              <>
                                <LoadingOutlined /> {"Validating"}
                              </>
                            ) : (
                              <>
                                <CheckCircleOutlined />
                                {" Mark Validation Completed"}
                              </>
                            )}
                          </a>
                        ) : (
                          <Tooltip placement="topLeft" title={"Please transform this file."}>

                          <a style={{ cursor: "not-allowed" }}>
                            <CheckCircleOutlined />
                            {" Mark Validation Completed"}
                          </a>
                          </Tooltip>
                        )
                      ) : (
                        <a style={{ color: "#adadad", cursor: "not-allowed" }}>
                          <CheckCircleOutlined />
                          {" Validation Completed"}
                        </a>
                      )}

                      {/* </Space> */}
                    </>
                  );
                },
              },
            ]}
            dataSource={data.sort((a, b) => a.fileId - b.fileId)}
          />
        </Col>

        {/* <Row className={dataModernizationCss.validateTab}>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          className={dataModernizationCss.validateTabFirst}
          onClick={() => {
            setSelecterTab("uploadTestData");
          }}
        >
          Upload Test Data
        </Col>

        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          className={dataModernizationCss.validateTabSecond}
          onClick={() => {
            setSelecterTab("validate");
          }}
        >
          Validate
        </Col>
      </Row>
      {selectedTab === "uploadTestData" && (
        <>
          <Row className={dataModernizationCss.validateTab}>
            <Col span={24} className={dataModernizationCss.downloadData}>
              <Button type="default">
                Download Data Input Sheet <DownloadOutlined />
              </Button>
            </Col>
          </Row>

          <Row className={dataModernizationCss.validateTab}>
            <Col span={24}>
              <Table
                pagination={false}
                className="demo"
                columns={[
                  {
                    title: "Table",
                    dataIndex: "table",
                    key: "table",
                  },
                  {
                    title: "Acct Name",
                    dataIndex: "acctName",
                    key: "acctName",
                  },
                  {
                    title: "Acct Nbr",
                    dataIndex: "acctNbr",
                    key: "acctNbr",
                  },
                  {
                    title: "Acct Addr",
                    dataIndex: "acctAddr",
                    key: "acctAddr",
                  },
                  {
                    title: "Acct Zip",
                    dataIndex: "acctZip",
                    key: "acctZip",
                  },
                ]}
                dataSource={[
                  {
                    table: "AcctNbr_table1",
                    acctName: "String",
                    acctNbr: "String",
                    acctAddr: "String",
                    acctZip: "String",
                  },
                ]}
              />
            </Col>
          </Row>

          <Row className={dataModernizationCss.validateTab}>
            <Col span={24}>
              <Table
                pagination={false}
                className="demo"
                columns={[
                  {
                    title: "Table",
                    dataIndex: "table",
                    key: "table",
                  },
                  {
                    title: "Acct Name",
                    dataIndex: "acctName",
                    key: "acctName",
                  },
                  {
                    title: "Acct Nbr",
                    dataIndex: "acctNbr",
                    key: "acctNbr",
                  },
                  {
                    title: "Acct Addr",
                    dataIndex: "acctAddr",
                    key: "acctAddr",
                  },
                  {
                    title: "Acct Zip",
                    dataIndex: "acctZip",
                    key: "acctZip",
                  },
                ]}
                dataSource={[
                  {
                    table: "AcctNbr_table1",
                    acctName: "String",
                    acctNbr: "String",
                    acctAddr: "String",
                    acctZip: "String",
                  },
                ]}
              />
            </Col>
          </Row>
        </>
      )}

      {selectedTab === "validate" && <p>Validate</p>} */}
      </Row>
    </>
  );
}
