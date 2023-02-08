import { Col, Row, Button, Image } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";

export default function ModernizeWithConfidence({ HomeCss }) {
  const [modernizeData, setModernizeData] = useState([
    { text: "6-10x faster & 100% accurate conversion", ref: useRef(null) },
    {
      text: "Data driven enterprise enabled through modern data lake",
      ref: useRef(null),
    },
    { text: "Certified data for enterprise consumption", ref: useRef(null) },
    { text: "No redundancies", ref: useRef(null) },
    { text: "Single version of truth", ref: useRef(null) },
    {
      text: "Enabling federation of data through self services",
      ref: useRef(null),
    },
  ]);

  const [visibleData, setVisibleData] = useState(0);
  const [innerWidth, setInnerWidth] = useState(400);
  

  useEffect(() => {
    if (window && window?.innerWidth) {
      setInnerWidth(window?.innerWidth / 4);
    }
  }, []);

  return (
    // id="benefitsID"
    <div className={HomeCss.ECmain}> 
      <Row className={HomeCss.mainEnterpriseChallengeDiv}>
        <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />
        <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
          <h2 className={HomeCss.ECTitle}>
            <AnimationOnScroll
              animateOut="animate__fadeOut"
              animateIn="animate__fadeIn"
              animateOnce={true}
            >
              <span>Modernize with Confidence</span>
            </AnimationOnScroll>
          </h2>
        </Col>
        <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />

        {modernizeData.map((e, i) => {
          return (
            <AnimationOnScroll
              key={Math.random().toString(36).substring(2, 7)}
              animateIn={i % 2 ? "animate__fadeInUp" : "animate__fadeInUp"}
              animateOut={i % 2 ? "animate__zoomOut" : "animate__zoomOut"}
              animateOnce={false}
              style={{ width: "100%" }}
              afterAnimatedIn={() => {}}
              offset={innerWidth}
            >
              <Row className={`${HomeCss.MWCTextParent}`}>
                <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />
                <Col
                  xs={20}
                  sm={20}
                  md={20}
                  lg={20}
                  xl={20}
                  xxl={20}
                  className={`${HomeCss.MWCText}`}
                >
                  <h1 ref={e.ref}>{e.text}</h1>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />

                {modernizeData.length > i + 1 && (
                  <>
                    <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />
                    <Col
                      xs={20}
                      sm={20}
                      md={20}
                      lg={20}
                      xl={20}
                      xxl={20}
                      style={{ borderBottom: "2px solid #e74860" }}
                    />
                    <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />
                  </>
                )}
              </Row>
            </AnimationOnScroll>
          );
        })}
      </Row>
    </div>
  );
}