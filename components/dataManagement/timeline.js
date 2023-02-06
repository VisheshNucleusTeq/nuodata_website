import { Col, Row, Image } from "antd";
import { useState } from "react";
import { CodeSandboxOutlined } from "@ant-design/icons";

export default function Timeline({ DataManagementCss }) {
  const [data, setData] = useState([
    {
      titleText: "Data Catalog",
      titleImage: "/data_management/image_1.png",
      data: [
        {
          titleText: "Data Catalog",
          titleImage: "/data_management/image_1.png",
        },
        {
          titleText: "Data Catalog",
          titleImage: "/data_management/image_1.png",
        },
        {
          titleText: "Data Catalog",
          titleImage: "/data_management/image_1.png",
        },
      ],
    },
    {
      titleText: "Data Catalog",
      titleImage: "/data_management/image_1.png",
      data: [
        {
          titleText: "Data Catalog",
          titleImage: "/data_management/image_1.png",
        },
        {
          titleText: "Data Catalog",
          titleImage: "/data_management/image_1.png",
        },
        {
          titleText: "Data Catalog",
          titleImage: "/data_management/image_1.png",
        },
      ],
    },
    {
      titleText: "Data Catalog",
      titleImage: "/data_management/image_1.png",
      data: [
        {
          titleText: "Data Catalog",
          titleImage: "/data_management/image_1.png",
        },
        {
          titleText: "Data Catalog",
          titleImage: "/data_management/image_1.png",
        },
        {
          titleText: "Data Catalog",
          titleImage: "/data_management/image_1.png",
        },
      ],
    },
    {
        titleText: "Data Catalog",
        titleImage: "/data_management/image_1.png",
        data: [
          {
            titleText: "Data Catalog",
            titleImage: "/data_management/image_1.png",
          },
          {
            titleText: "Data Catalog",
            titleImage: "/data_management/image_1.png",
          },
          {
            titleText: "Data Catalog",
            titleImage: "/data_management/image_1.png",
          },
        ],
      },
  ]);

  return (
    <div>
      <Row className={DataManagementCss.timelineRow}>
        {data.map((e) => {
          return (
            <>
            <Col
            key={(Math.random() + 1).toString(36).substring(7)}
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={24}
                xxl={24}
                // className={DataManagementCss.createDot}
              >
                <Row>
                  <Col xs={4} sm={4} md={2} lg={2} xl={2} xxl={2} />
                  <Col
                    xs={16}
                    sm={16}
                    md={16}
                    lg={16} 
                    xl={16}
                    xxl={16}
                    className={DataManagementCss.showDotDiv}
                  >
                    <div className={DataManagementCss.showDot}></div>
                  </Col>
                  <Col xs={4} sm={4} md={2} lg={2} xl={2} xxl={2} />
                </Row>
              </Col>
              <Col xs={0} sm={1} md={1} lg={1} xl={2} xxl={2} />
              <Col
                xs={24}
                sm={8}
                md={9}
                lg={9}
                xl={8}
                xxl={8}
                className={DataManagementCss.timelineLeft}
              >
                <div className={DataManagementCss.timelineLeftDiv}>
                  <Image
                    preview={false}
                    src={e.titleImage}
                    className={DataManagementCss.timelineLeftImage}
                  />
                  <p>{e.titleText}</p>
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
              >
                <Row className={DataManagementCss.timelineRightChildRow}>
                  {e.data.map((ee) => {
                    return (
                      <Col
                      key={(Math.random() + 1).toString(36).substring(7)}
                        className={DataManagementCss.timelineRightChildCol}
                        span={24}
                      >
                        <Row>
                          <Col xs={4} sm={6} md={4} lg={4} xl={4} xxl={4}>
                            <div
                              className={
                                DataManagementCss.timelineRightChildColImage
                              }
                            >
                              <Image preview={false} src={ee.titleImage} />
                            </div>
                          </Col>

                          <Col
                            className={
                              DataManagementCss.timelineRightChildColText
                            }
                            xs={20}
                            sm={18}
                            md={20}
                            lg={20}
                            xl={20}
                            xxl={20}
                          >
                            <p>{e.titleText}</p>
                          </Col>
                        </Row>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
              <Col xs={0} sm={1} md={1} lg={1} xl={2} xxl={2} />
            </>
          );
        })}
      </Row>
    </div>
  );
}
