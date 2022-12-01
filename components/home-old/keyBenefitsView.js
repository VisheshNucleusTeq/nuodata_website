import React from "react";
import { Col, Row, Timeline, Image } from "antd";

export default function KeyBenefitsView({ HomeCss }) {
  return (
    <div className={HomeCss.KeyBenefitView}>
      <h1>Modernize with Confidence</h1>
      <Row>
        <Col offset={3} span={20}>
          <Timeline>
            <Timeline.Item style={{ height: "8%", }}>
              <Row>
                <Col offset={2} xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}>
                  <Image
                    className={HomeCss.KeyBenefitImage}
                    src={"./home/image (1).png"}
                  />
                </Col>
                <Col
                                    xs={16}
                  sm={16}
                  md={16}
                  lg={16}
                  xl={16}
                  xxl={16}
                  className={HomeCss.KeyBenefitsViewText}
                >
                  6-10x faster & 100% accurate conversion
                </Col>
              </Row>
            </Timeline.Item>
            <Timeline.Item style={{ height: "8%" }}>
              <Row>
                <Col offset={2} xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}>
                  <Image
                    className={HomeCss.KeyBenefitImage}
                    src={"./home/image (2).png"}
                  />
                </Col>
                <Col
                                    xs={16}
                  sm={16}
                  md={16}
                  lg={16}
                  xl={16}
                  xxl={16}
                  className={HomeCss.KeyBenefitsViewText}
                >
                  Data driven enterprise enabled through modern data lake
                </Col>
              </Row>
            </Timeline.Item>
            <Timeline.Item style={{ height: "8%" }}>
              <Row>
                <Col offset={2} xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}>
                  <Image
                    className={HomeCss.KeyBenefitImage}
                    src={"./home/image (3).png"}
                  />
                </Col>
                <Col
                                    xs={16}
                  sm={16}
                  md={16}
                  lg={16}
                  xl={16}
                  xxl={16}
                  className={HomeCss.KeyBenefitsViewText}
                >
                  Certified data for enterprise consumption
                </Col>
              </Row>
            </Timeline.Item>
            <Timeline.Item style={{ height: "8%" }}>
              <Row>
                <Col offset={2} xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}>
                  <Image
                    className={HomeCss.KeyBenefitImage}
                    src={"./home/image (4).png"}
                  />
                </Col>
                <Col
                                    xs={16}
                  sm={16}
                  md={16}
                  lg={16}
                  xl={16}
                  xxl={16}
                  className={HomeCss.KeyBenefitsViewText}
                >
                  No redundancies or in-efficiencies
                </Col>
              </Row>
            </Timeline.Item>
            <Timeline.Item style={{ height: "8%" }}>
              <Row>
                <Col offset={2} xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}>
                  <Image
                    className={HomeCss.KeyBenefitImage}
                    src={"./home/image (5).png"}
                  />
                </Col>
                <Col
                                    xs={16}
                  sm={16}
                  md={16}
                  lg={16}
                  xl={16}
                  xxl={16}
                  className={HomeCss.KeyBenefitsViewText}
                >
                  6-10x faster time to market for new reports
                </Col>
              </Row>
            </Timeline.Item>
            <Timeline.Item style={{ height: "8%" }}>
              <Row>
                <Col offset={2} xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}>
                  <Image
                    className={HomeCss.KeyBenefitImage}
                    src={"./home/image (6).png"}
                  />
                </Col>
                <Col
                                    xs={16}
                  sm={16}
                  md={16}
                  lg={16}
                  xl={16}
                  xxl={16}
                  className={HomeCss.KeyBenefitsViewText}
                >
                  Enabling federation of data through self services
                </Col>
              </Row>
            </Timeline.Item>
            <Timeline.Item style={{ height: "8%" }}>
              <Row>
              <Col offset={2} xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}>
                  <Image
                    className={HomeCss.KeyBenefitImage}
                    src={"./home/image (7).png"}
                  />
                </Col>
                <Col
                  // offset={1}
                  xs={16}
                  sm={16}
                  md={16}
                  lg={16}
                  xl={16}
                  xxl={16}
                  className={HomeCss.KeyBenefitsViewText}
                >
                  Single version of truth
                </Col>
              </Row>
            </Timeline.Item>
          </Timeline>
        </Col>
      </Row>
    </div>
  );
}
