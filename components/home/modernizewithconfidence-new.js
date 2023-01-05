import { Col, Row, Button, Image } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";

export default function ModernizeWithConfidenceNew({ HomeCss }) {
  const [modernizeData, setModernizeData] = useState([
    { text: "6-10x faster & 100% accurate conversion", cls: HomeCss.textPos1 },
    {
      text: "Data driven enterprise enabled through modern data lake",
      cls: HomeCss.textPos2,
    },
    {
      text: "Certified data for enterprise consumption",
      cls: HomeCss.textPos3,
    },
    { text: "No redundancies", cls: HomeCss.textPos4 },
    { text: "Single version of truth", cls: HomeCss.textPos5 },
    {
      text: "Enabling federation of data through self services",
      cls: HomeCss.textPos6,
    },
  ]);

  return (
    <div className={HomeCss.ECmainNew}>
      <div className={HomeCss.ECmainNewChild}>
        {modernizeData.map((e, i) => {
          return (
            <Row className={HomeCss.ECmainNewRow}>
              <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                <AnimationOnScroll
                  animateIn="animate__bounceIn"
                  animateOnce={true}
                >
                  <AnimationOnScroll
                    animateIn="animate__fadeInUp"
                    animateOnce={true}
                  >
                    <h1 className={e.cls}>{e.text}</h1>
                  </AnimationOnScroll>
                </AnimationOnScroll>
              </Col>
              {modernizeData.length > i + 1 && (
                <>
                  <Col
                    xs={18}
                    sm={18}
                    md={18}
                    lg={18}
                    xl={18}
                    xxl={18}
                    style={{ borderBottom: "1px solid gray" }}
                  />
                  <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} />
                </>
              )}
            </Row>
          );
        })}
      </div>
    </div>
  );
}
