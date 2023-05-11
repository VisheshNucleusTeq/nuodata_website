import {
  Row,
  Col,
  Checkbox,
  Table,
  Modal,
  Card,
  Carousel,
  Tooltip,
  Collapse,
} from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  GithubOutlined,
  DatabaseOutlined,
  CheckCircleOutlined,
  LoadingOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useState } from "react";

import PieChart from "./charts/pieChart";
import ValidatePopup from "./validateView/validatePopup";
import {
  ANALYZESUMMARY,
  VALIDATEFILE,
  GITHUBCHECKIN,
  VALIDATEENTITYSUMMARY,
} from "../../network/apiConstants";
import { fetch_retry_get, fetch_retry_post } from "../../network/api-manager";
import { fileStatusBadge } from "../helper/fileStatus";
import { setOpenDetails } from "../../Redux/action";

export default function Validate({ dataModernizationCss }) {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const [open, setOpen] = useState(false);
  const [analyzeDetails, setAnalyzeDetails] = useState();
  const [data, setData] = useState([]);
  const [complexityGraph, setComplexityGraph] = useState();
  const [selectedFile, setSelectedFile] = useState(0);
  const [selectedGitFile, setSelectedGitFile] = useState(0);
  const [popupIp, setPopupIp] = useState(0);
  const [fileId, setFileId] = useState(0);
  const [mappingModelData, setMappingModelData] = useState({});
  const [mappingModelOpen, setMappingModelOpen] = useState(false);
  const [defaultColShow, setDefaultColShow] = useState([
    "mappings",
    "workflows",
    "transformations",
    "status",
  ]);

  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );
  const openDetails = useSelector((state) => state.openDetails.openDetails);

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
      setSelectedGitFile(0);
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

  const githubCheckIn = async (record) => {
    setMappingModelData({ ...record.entitySummary, mappings: record.mappings });
    setPopupIp(record.fileId);
    setMappingModelOpen(true);
  };

  useEffect(() => {
    if (openDetails?.detailId) {
      setFileId(openDetails?.detailId);
      setOpen(true);
      dispatch(setOpenDetails({}));
    }
  }, [openDetails?.detailId]);

  return (
    <>
      <Modal
        destroyOnClose
        centered
        open={open}
        onOk={() => {
          getAnalyzeData();
          setOpen(false);
        }}
        onCancel={() => {
          getAnalyzeData();
          setOpen(false);
        }}
        width={"100vw"}
        cancelText={"Close"}
        okText={"Save"}
        closable={false}
        okButtonProps={{ style: { display: "none" } }}
      >
        <ValidatePopup
          fileId={fileId}
          dataModernizationCss={dataModernizationCss}
        />
      </Modal>

      <Modal
        title={popupIp ? "Check-in Status" : "Mapping Status"}
        centered
        open={mappingModelOpen}
        okButtonProps={{ style: { display: popupIp ? "" : "none" } }}
        okText={"Check-in"}
        cancelText={"Close"}
        onCancel={() => {
          setMappingModelOpen(false);
          setPopupIp(0);
        }}
        onOk={async () => {
          const fileId = JSON.parse(JSON.stringify(popupIp));
          setSelectedGitFile(popupIp);
          setMappingModelOpen(false);
          setPopupIp(0);
          const data = await fetch_retry_post(`${GITHUBCHECKIN}${fileId}`);
          if (data.success) {
            getAnalyzeData();
          }
        }}
        width={"40vw"}
      >
        <Collapse accordion>
          {mappingModelData?.notStarted &&
            mappingModelData?.notStarted.length > 0 && (
              <Collapse.Panel
                header={
                  "Not Started (" + mappingModelData?.notStarted.length + ")"
                }
                key="1"
              >
                <ul
                  style={{
                    maxHeight: "40vh",
                    overflowX: "scroll",
                    overflowX: "hidden",
                  }}
                >
                  {mappingModelData?.notStarted?.map((e) => {
                    return <li>{e}</li>;
                  })}
                </ul>
              </Collapse.Panel>
            )}

          {mappingModelData?.passed && mappingModelData?.passed.length > 0 && (
            <Collapse.Panel
              header={"Passed (" + mappingModelData?.passed.length + ")"}
              key="2"
            >
              <ul
                style={{
                  maxHeight: "40vh",
                  overflowX: "scroll",
                  overflowX: "hidden",
                }}
              >
                {mappingModelData?.passed?.map((e) => {
                  return <li>{e}</li>;
                })}
              </ul>
            </Collapse.Panel>
          )}

          {mappingModelData?.failed && mappingModelData?.failed.length > 0 && (
            <Collapse.Panel
              header={"Failed (" + mappingModelData?.failed.length + ")"}
              key="3"
            >
              <ul
                style={{
                  maxHeight: "40vh",
                  overflowX: "scroll",
                  overflowX: "hidden",
                }}
              >
                {mappingModelData?.failed?.map((e) => {
                  return <li>{e}</li>;
                })}
              </ul>
            </Collapse.Panel>
          )}
        </Collapse>
      </Modal>

      <Row className={dataModernizationCss.validateTab}>
        <Col span={24}>
          <div className={dataModernizationCss.analyzeMain}>
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
          <b>Columns : &nbsp; &nbsp;</b>
          <Checkbox.Group
            options={[
              { label: "Mappings", value: "mappings" },
              { label: "Workflows", value: "workflows" },
              { label: "Transformations", value: "transformations" },
              { label: "Status", value: "status" },
            ]}
            defaultValue={defaultColShow}
            onChange={(e) => {
              setDefaultColShow(e);
              getAnalyzeData();
            }}
          />
        </Col>
        <Col span={24} style={{ marginTop: "2vh" }}>
          <Table
            pagination={false}
            locale={{
              emptyText: "No Record Available",
            }}
            rowKey="fileId"
            columns={[
              {
                title: "File Name",
                dataIndex: "fileName",
                key: "fileName",
                render: (_, record) => {
                  return (
                    <b
                      onClick={() => {
                        setFileId(record.fileId);
                        setOpen(true);
                      }}
                      style={{ cursor: "pointer" }}
                      className={dataModernizationCss.validateFileName}
                    >
                      {record.fileName}
                    </b>
                  );
                },
              },

              {
                hidden: !defaultColShow.includes("mappings"),
                title: "Mappings",
                dataIndex: "mappings",
                key: "mappings",
                align: "center",
                render: (_, record) => {
                  return (
                    <Table
                      className={`${"validatePopupTable"}`}
                      pagination={false}
                      dataSource={[
                        { ...record.entitySummary, mappings: record.mappings },
                      ]}
                      columns={[
                        {
                          title: "Passed",
                          dataIndex: "passedCount",
                          key: "passedCount",
                          align: "center",
                        },
                        {
                          title: "Failed",
                          dataIndex: "failedCount",
                          key: "failedCount",
                          align: "center",
                        },

                        {
                          title: "Not Started",
                          dataIndex: "notStartedCount",
                          key: "notStartedCount",
                          align: "center",
                        },
                        {
                          title: "Total",
                          dataIndex: "mappings",
                          key: "mappings",
                          align: "center",
                        },
                        {
                          title: "Action",
                          render: (_, record) => {
                            return (
                              <a
                                onClick={() => {
                                  setMappingModelData(record);
                                  setMappingModelOpen(true);
                                }}
                                style={{ color: "#e74860" }}
                              >
                                <EyeOutlined />
                                {" View"}
                              </a>
                            );
                          },
                        },
                      ]}
                    />
                  );
                },
              },
              {
                hidden: !defaultColShow.includes("workflows"),
                title: "Workflows",
                dataIndex: "workflows",
                key: "workflows",
                align: "center",
                width: "10vw",
              },
              {
                hidden: !defaultColShow.includes("transformations"),
                title: "Transformations",
                dataIndex: "transformations",
                key: "transformations",
                align: "center",
                width: "10vw",
              },
              {
                hidden: !defaultColShow.includes("status"),
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
                fixed: "right",
                render: (_, record) => {
                  return (
                    <>
                      {record.fileStatus === "converted" &&
                      record.githubStatus === "not_uploaded" &&
                      record.isUserAction ? (
                        <a
                          onClick={() => {
                            githubCheckIn(record);
                          }}
                        >
                          {record.fileId === selectedGitFile ? (
                            <>
                              <LoadingOutlined /> {"Wait..."}
                            </>
                          ) : (
                            <>
                              <GithubOutlined />
                              {" Check-in (GitHub)"}
                            </>
                          )}
                        </a>
                      ) : (
                        <Tooltip
                          placement="topRight"
                          title={
                            record.githubStatus === "not_uploaded"
                              ? "Please transform this file."
                              : "Already check-in"
                          }
                        >
                          <a
                            style={{ color: "#adadad", cursor: "not-allowed" }}
                          >
                            <GithubOutlined />
                            {" Checked-in (GitHub)"}
                          </a>
                        </Tooltip>
                      )}

                      <br />
                      <a style={{ cursor: "not-allowed" }}>
                        <DatabaseOutlined />
                        {" Launch Databricks"}
                      </a>

                      <br />
                      {record.fileStatus != "validated" ? (
                        record?.isUserAction ? (
                          record.githubStatus === "uploaded" ? (
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
                            <Tooltip
                              placement="topRight"
                              title={"Please check-in this file."}
                            >
                              <a
                                style={{
                                  color: "#adadad",
                                  cursor: "not-allowed",
                                }}
                              >
                                <CheckCircleOutlined />
                                {" Mark Validation Completed"}
                              </a>
                            </Tooltip>
                          )
                        ) : (
                          <Tooltip
                            placement="topRight"
                            title={"Please transform this file."}
                          >
                            <a
                              style={{
                                color: "#adadad",
                                cursor: "not-allowed",
                              }}
                            >
                              <CheckCircleOutlined />
                              {" Mark Validation Completed"}
                            </a>
                          </Tooltip>
                        )
                      ) : (
                        <Tooltip
                          placement="topRight"
                          title={"Validation Completed."}
                        >
                          <a
                            style={{ color: "#adadad", cursor: "not-allowed" }}
                          >
                            <CheckCircleOutlined />
                            {" Validation Completed"}
                          </a>
                        </Tooltip>
                      )}
                    </>
                  );
                },
                align: "center",
              },
            ].filter((item) => !item.hidden)}
            scroll={{ x: "max-content", y: 500 }}
            dataSource={data.sort((a, b) => a.fileId - b.fileId)}
          />
        </Col>
      </Row>
    </>
  );
}
