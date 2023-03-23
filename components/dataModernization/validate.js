import { Row, Col, Badge, Table, Space, Card, Carousel } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DownloadOutlined,
  GithubOutlined,
  DatabaseOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import { useState } from "react";
import PieChart from "./charts/pieChart";

export default function Validate({ dataModernizationCss }) {
  const [selectedTab, setSelecterTab] = useState("uploadTestData");

  return (
    <Row className={dataModernizationCss.validateTab}>
      <Col span={24}>
        <h1>Demo_Test</h1>
      </Col>
      <Col span={24}>
        <div className={dataModernizationCss.analyzeMain}>
          <Row>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
              <Card className={dataModernizationCss.cardView}>
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
                <Card.Grid style={{ color: "#09bd21" }}>Hours Saved</Card.Grid>
                <Card.Grid>
                  <span style={{ color: "#09bd21" }}>450.30 hours</span>
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
                    <PieChart
                      complexityGraph={[]}
                      dataModernizationCss={dataModernizationCss}
                      labels={["Converted", "Not converted"]}
                      data={[10, 10]}
                    />
                  </div>
                </Carousel>
              </Card>
            </Col>
          </Row>
        </div>
      </Col>

      <Col span={24}>
        <Table
          pagination={false}
          showHeader={false}
          locale={{
            emptyText: "No Record Available",
          }}
          className="demo"
          rowKey="fileId"
          columns={[
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
              render: (_, record) => {
                return <b style={{ color: "#0c3246" }}>{record.name}</b>;
              },
            },

            {
              title: "Status",
              key: "fileStatus",
              render: (_, record) => {
                switch (record.fileStatus) {
                  case "active":
                    return <Badge count={"Active"} color="green" />;
                  case "uploadedSuccessfully":
                    return (
                      <Badge count={"uploaded Successfully"} color="orange" />
                    );
                  default:
                    return <Badge count={"Inactive"} color="red" />;
                }
              },
            },
            {
              title: "Action",
              key: "action",
              render: (_, record) => {
                return (
                  <>
                    <Space size="middle" style={{ cursor: "pointer" }}>
                      <a style={{ cursor: "pointer" }}>
                        <EyeOutlined /> Edit
                      </a>

                      <a style={{ cursor: "pointer" }}>
                        <EditOutlined /> View
                      </a>
                    </Space>
                  </>
                );
              },
            },
          ]}
          dataSource={[
            { name: "Test Environment (Databricks)", fileStatus: "active" },
            { name: "Test Data", fileStatus: "uploadedSuccessfully" },
          ]}
        />
      </Col>

      <Col span={24} style={{ marginTop: "2vh" }}>
        <Table
          pagination={false}
          locale={{
            emptyText: "No Record Available",
          }}
          className="demo"
          rowKey="fileId"
          expandable={{
            expandedRowRender: (record) => {
              return (
                <Row className={dataModernizationCss.expandableTableCss}>
                  <Col span={16}>
                    <h2>Transformed Workflow</h2>
                  </Col>
                  <Col span={8}>
                    <>
                      <Space size="middle" style={{ cursor: "pointer" }}>
                        <a style={{ cursor: "pointer" }}>
                          <EyeOutlined /> Edit
                        </a>

                        <a style={{ cursor: "pointer" }}>
                          <EditOutlined /> View
                        </a>

                        <a style={{ cursor: "pointer" }}>
                          <DownloadOutlined /> Download
                        </a>
                      </Space>
                    </>
                  </Col>

                  <Col span={24} style={{ marginTop: "2%" }}>
                    <Row className={dataModernizationCss.tabViewPar}>
                      <Col span={24}>
                        <Row>
                          <Col
                            span={11}
                            className={`${dataModernizationCss.tabView} ${dataModernizationCss.tabViewActiveValidation}`}
                          >
                            QA Completed
                          </Col>
                          <Col span={2} />
                          <Col
                            span={11}
                            className={`${dataModernizationCss.tabView} ${dataModernizationCss.tabViewActiveValidation}`}
                          >
                            UAT Completed
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24} style={{ marginTop: "2%" }}>
                        <Row>
                          <Col span={11}>
                            <div>
                              <p>Email</p>
                              <p>View/upload test results </p>
                            </div>
                          </Col>
                          <Col span={2} />
                          <Col span={11}>
                            <div>
                              <p>Email</p>
                              <p>View/upload test results </p>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              );
            },
          }}
          columns={[
            {
              title: "File",
              dataIndex: "file",
              key: "file",
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

            // {
            //   title: "Type",
            //   dataIndex: "type",
            //   key: "type",
            // },

            {
              title: "Status",
              key: "status",
              render: (_, record) => {
                switch (record.status) {
                  case "validationCompleted":
                    return (
                      <Badge count={"Validation Completed"} color="green" />
                    );
                  default:
                    return <Badge count={"Inactive"} color="red" />;
                }
              },
            },
            {
              title: "Action",
              key: "action",
              render: (_, record) => {
                return (
                  <>
                    {/* <Space size="middle" style={{ cursor: "pointer" }}> */}
                      <a style={{ cursor: "pointer" }}>
                        <GithubOutlined /> {"Check-in (GitHub)"}
                      </a>
                      <br/>
                      <a style={{ cursor: "pointer" }}>
                      <DatabaseOutlined /> {"Launch Databricks"}
                      </a>
                      <br/>
                      <a style={{ cursor: "pointer" }}>
                      <CheckCircleOutlined /> {"Mark Validation Completed"}
                      </a>
                    {/* </Space> */}
                  </>
                );
              },
            },
          ]}
          dataSource={[
            {
              fileId: 1,
              file: "demo1.XML",
              workflows: 1,
              mappings: 36,
              transformations: 25,
              type: "workflow",
              status: "validationCompleted",
            },
            {
              fileId: 2,
              file: "demo2.XML",
              workflows: 2,
              mappings: 86,
              transformations: 54,
              type: "workflow",
              status: "validationCompleted",
            },
          ]}
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
  );
}
