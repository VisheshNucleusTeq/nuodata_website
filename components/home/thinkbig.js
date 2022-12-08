import React from "react";
import { Col, Row, Button, Image } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { AnimationOnScroll } from "react-animation-on-scroll";

export default function ThinkBig({ HomeCss }) {
  return (
    <div className={HomeCss.thinkBigMainDiv}>
      <Row>
        <Col xs={1} sm={1} md={2} lg={3} xl={3} xxl={3} />
        <Col xs={22} sm={22} md={20} lg={18} xl={18} xxl={18}>
          <Row className={HomeCss.thinkBigChild}>
            <Col span={24}>
              <AnimationOnScroll animateIn="animate__zoomIn" animateOnce={true}>
                <h1>THINK</h1>
                <h1>BIG.</h1>
              </AnimationOnScroll>
            </Col>

            <Col xs={24} sm={24} md={20} lg={20} xl={18} xxl={18}>
              <AnimationOnScroll
                animateIn="animate__fadeInUp"
                animateOnce={true}
              >
                <h2>
                  <span className={HomeCss.thinkBigChildIcon}>
                    <CaretRightOutlined />
                  </span>
                  Modernize your enterprise data from <span>ANY</span> source to{" "}
                  <span>ANY</span> cloud platform.
                </h2>
              </AnimationOnScroll>
            </Col>
            <Col xs={0} sm={0} md={4} lg={4} xl={6} xxl={6} />

            {/* <Col xs={0} sm={0} md={4} lg={4} xl={6} xxl={6} /> */}
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              {/* <Image src="/home/trans.gif" preview={false} /> */}
            </Col>

            <Col xs={0} sm={0} md={4} lg={4} xl={6} xxl={6} />
            <Col xs={24} sm={24} md={20} lg={20} xl={18} xxl={18}>
              <AnimationOnScroll
                animateIn="animate__fadeInUp"
                animateOnce={true}
                delay={0.3}
              >
                <h2>
                  <span className={HomeCss.thinkBigChildIcon}>
                    <CaretRightOutlined />
                  </span>
                  <span>Data Management</span> platform for all data
                  engineering, analytics & operations needs.
                </h2>
              </AnimationOnScroll>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
