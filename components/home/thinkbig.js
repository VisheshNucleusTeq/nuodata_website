import React from "react";
import { Col, Row, Button, Image } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { AnimationOnScroll } from "react-animation-on-scroll";

export default function ThinkBig({ HomeCss }) {
  return (
    <div className={HomeCss.thinkBigMainDiv}>
      <Row>
        <Col span={16} offset={4}>
          <Row className={HomeCss.thinkBigChild}>
            <Col span={24}>
              <AnimationOnScroll animateIn="animate__zoomIn" animateOnce={true}>
                <h1>THINK</h1>
                <h1>BIG.</h1>
              </AnimationOnScroll>

              {/* <h1>
                <AnimationOnScroll
                  initiallyVisible={true}
                  animateIn="animate__fadeIn"
                  animatePreScroll={true}
                >
                  THINK
                </AnimationOnScroll>
              </h1>
              <h1>
                <AnimationOnScroll
                  initiallyVisible={true}
                  animateIn="animate__fadeIn"
                  animatePreScroll={false}
                >
                  BIG.
                </AnimationOnScroll>
              </h1> */}
            </Col>

            <Col span={24}>
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
            <Col span={24}>
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
