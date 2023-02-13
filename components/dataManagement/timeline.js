import { Col, Row, Image } from "antd";
import { useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";

export default function Timeline({ DataManagementCss }) {
  const [data, setData] = useState([
    {
      titleText: "Data Catalog",
      titleImage: "/data_management/Title icons/1st.png",
      data: [
        {
          titleText: "Metadata Management",
          titleImage: "/data_management/small icons/1.png",
        },
        {
          titleText: "Data Discovery",
          titleImage: "/data_management/small icons/2.png",
        },
        {
          titleText: "Data Lineage",
          titleImage: "/data_management/small icons/3.png",
        },
      ],
    },
    {
      titleText: "Data Security",
      titleImage: "/data_management/Title icons/2nd.png",
      data: [
        {
          titleText: "Role Based Access",
          titleImage: "/data_management/small icons/4.png",
        },
        {
          titleText: "Compliance & PLL",
          titleImage: "/data_management/small icons/5.png",
        },
        {
          titleText: "Policy Admin",
          titleImage: "/data_management/small icons/6.png",
        },
      ],
    },
    {
      titleText: "Data Governanace",
      titleImage: "/data_management/Title icons/3rd.png",
      data: [
        {
          titleText: "Data Stewardship",
          titleImage: "/data_management/small icons/7.png",
        },
        {
          titleText: "Data Policy",
          titleImage: "/data_management/small icons/8.png",
        },
        {
          titleText: "Workflow",
          titleImage: "/data_management/small icons/9.png",
        },
      ],
    },
    {
      titleText: "Data Lineage",
      titleImage: "/data_management/Title icons/4th.png",
      data: [
        {
          titleText: "Graph Lineage",
          titleImage: "/data_management/small icons/10.png",
        },
        {
          titleText: "Code Lineage",
          titleImage: "/data_management/small icons/11.png",
        },
        {
          titleText: "Impact Analysis",
          titleImage: "/data_management/small icons/12.png",
        },
      ],
    },
    {
      titleText: "Data Quality",
      titleImage: "/data_management/Title icons/5th.png",
      data: [
        {
          titleText: "Data Profiling",
          titleImage: "/data_management/small icons/13.png",
        },
        {
          titleText: "Data Analysis",
          titleImage: "/data_management/small icons/14.png",
        },
        {
          titleText: "Data Validation",
          titleImage: "/data_management/small icons/15.png",
        },
      ],
    },
    {
      titleText: "Ingestion",
      titleImage: "/data_management/Title icons/6th.png",
      data: [
        {
          titleText: "Batch Ingestion",
          titleImage: "/data_management/small icons/16.png",
        },
        {
          titleText: "Real-time ingestion",
          titleImage: "/data_management/small icons/17.png",
        },
        {
          titleText: "IOT",
          titleImage: "/data_management/small icons/18.png",
        },
      ],
    },
    {
      titleText: "Transformation",
      titleImage: "/data_management/Title icons/7th.png",
      data: [
        {
          titleText: "No-Code Pipelines",
          titleImage: "/data_management/small icons/19.png",
        },
        {
          titleText: "Wrangling",
          titleImage: "/data_management/small icons/20.png",
        },
        {
          titleText: "Refinement",
          titleImage: "/data_management/small icons/21.png",
        },
      ],
    },
    {
      titleText: "Operations",
      titleImage: "/data_management/Title icons/8th.png",
      data: [
        {
          titleText: "Observability",
          titleImage: "/data_management/small icons/22.png",
        },
        {
          titleText: "DevOps / CICD",
          titleImage: "/data_management/small icons/23.png",
        },
        {
          titleText: "AI / ML Ops",
          titleImage: "/data_management/small icons/24.png",
        },
      ],
    },
    {
      titleText: "Federation",
      titleImage: "/data_management/Title icons/9th.png",
      data: [
        {
          titleText: "APIs Dockers / EKS",
          titleImage: "/data_management/small icons/25.png",
        },
        {
          titleText: "BI / Reporting",
          titleImage: "/data_management/small icons/26.png",
        },
        {
          titleText: "Self Service",
          titleImage: "/data_management/small icons/27.png",
        },
      ],
    },
  ]);

  return (
    <div>
      <Row className={DataManagementCss.timelineRow}>
        {data.map((e) => {
          return (
            <Col span={24} key={(Math.random() + 1).toString(36).substring(7)}>
              <Row>
                <Col
                  key={(Math.random() + 1).toString(36).substring(7)}
                  xs={0}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={24}
                  xxl={24}
                >
                  <Row>
                    <Col
                      key={(Math.random() + 1).toString(36).substring(7)}
                      xs={4}
                      sm={4}
                      md={2}
                      lg={2}
                      xl={2}
                      xxl={2}
                    />
                    <Col
                      xs={24}
                      sm={10}
                      md={16}
                      lg={16}
                      xl={16}
                      xxl={16}
                      className={DataManagementCss.showDotDiv}
                      key={(Math.random() + 1).toString(36).substring(7)}
                    >
                      <div className={DataManagementCss.showDot}></div>
                    </Col>
                    <Col
                      xs={4}
                      sm={4}
                      md={2}
                      lg={2}
                      xl={2}
                      xxl={2}
                      key={(Math.random() + 1).toString(36).substring(7)}
                    />
                  </Row>
                </Col>
                <Col
                  key={(Math.random() + 1).toString(36).substring(7)}
                  xs={0}
                  sm={1}
                  md={1}
                  lg={1}
                  xl={2}
                  xxl={2}
                />
                <Col
                  xs={24}
                  sm={8}
                  md={9}
                  lg={9}
                  xl={8}
                  xxl={8}
                  className={DataManagementCss.timelineLeft}
                  key={(Math.random() + 1).toString(36).substring(7)}
                >
                  <div
                    className={DataManagementCss.timelineLeftDiv}
                    key={(Math.random() + 1).toString(36).substring(7)}
                  >
                    <AnimationOnScroll
                      animateOut="animate__fadeOut"
                      animateIn="animate__fadeIn"
                      animateOnce={false}
                      key={(Math.random() + 1).toString(36).substring(7)}
                    >
                      <Image
                        preview={false}
                        src={e.titleImage}
                        className={DataManagementCss.timelineLeftImage}
                        key={(Math.random() + 1).toString(36).substring(7)}
                      />
                      <p key={(Math.random() + 1).toString(36).substring(7)}>
                        {e.titleText}
                      </p>
                    </AnimationOnScroll>
                  </div>
                </Col>
                <Col
                  xs={24}
                  sm={14}
                  md={13}
                  lg={13}
                  xl={12}
                  xxl={12}
                  className={DataManagementCss.timelineRight}
                  key={(Math.random() + 1).toString(36).substring(7)}
                >
                  <Row
                    className={DataManagementCss.timelineRightChildRow}
                    key={(Math.random() + 1).toString(36).substring(7)}
                  >
                    {e.data.map((ee) => {
                      return (
                        <AnimationOnScroll
                          animateOut="animate__fadeOut"
                          animateIn="animate__fadeIn"
                          animateOnce={0}
                          className={DataManagementCss.timelineRightChildCol}
                          key={(Math.random() + 1).toString(36).substring(7)}
                        >
                          <Col
                            key={(Math.random() + 1).toString(36).substring(7)}
                            span={24}
                          >
                            <Row
                              key={(Math.random() + 1)
                                .toString(36)
                                .substring(7)}
                            >
                              <Col
                                xs={4}
                                sm={6}
                                md={4}
                                lg={4}
                                xl={4}
                                xxl={4}
                                key={(Math.random() + 1)
                                  .toString(36)
                                  .substring(7)}
                              >
                                <div
                                  className={
                                    DataManagementCss.timelineRightChildColImage
                                  }
                                  key={(Math.random() + 1)
                                    .toString(36)
                                    .substring(7)}
                                >
                                  <Image
                                    preview={false}
                                    src={ee.titleImage}
                                    key={(Math.random() + 1)
                                      .toString(36)
                                      .substring(7)}
                                  />
                                </div>
                              </Col>

                              <Col
                                xs={20}
                                sm={18}
                                md={20}
                                lg={20}
                                xl={20}
                                xxl={20}
                                key={(Math.random() + 1)
                                  .toString(36)
                                  .substring(7)}
                              >
                                <div
                                  className={
                                    DataManagementCss.timelineRightChildColText
                                  }
                                >
                                  <span
                                    key={(Math.random() + 1)
                                      .toString(36)
                                      .substring(7)}
                                  >
                                    {ee.titleText}
                                  </span>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </AnimationOnScroll>
                      );
                    })}
                  </Row>
                </Col>
                <Col
                  key={(Math.random() + 1).toString(36).substring(7)}
                  xs={0}
                  sm={1}
                  md={1}
                  lg={1}
                  xl={2}
                  xxl={2}
                />
              </Row>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
