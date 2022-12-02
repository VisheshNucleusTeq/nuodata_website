import { Col, Row } from "antd";
import { AnimationOnScroll } from "react-animation-on-scroll";

export default function ModernizeWithConfidence({ HomeCss }) {
  return (
    <div className={HomeCss.bgImage}>
      <Row className={HomeCss.modernizeWithConfidenceMain}>
        <Col offset={4} span={9} className={HomeCss.ModernData}>
          6-10x faster & 100% accurate conversion
        </Col>

        <Col span={12} className={HomeCss.ModernDataDev} />

        <Col offset={11} span={9} className={HomeCss.ModernData}>
          Data driven enterprise enabled through modern data lake
        </Col>
        <Col span={12} className={HomeCss.ModernDataDev} />

        <Col offset={4} span={9} className={HomeCss.ModernData}>
          Certified data for enterprise consumption
        </Col>
        <Col span={12} className={HomeCss.ModernDataDev} />

        <Col offset={11} span={9} className={HomeCss.ModernData}>
          No redundancies or in-efficiencies
        </Col>
        <Col span={12} className={HomeCss.ModernDataDev} />

        <Col offset={4} span={9} className={HomeCss.ModernData}>
          6-10x faster time to market for new reports{" "}
        </Col>
        <Col span={12} className={HomeCss.ModernDataDev} />

        <Col offset={11} span={9} className={HomeCss.ModernData}>
          Enabling federation of data through self services{" "}
        </Col>
        <Col span={12} className={HomeCss.ModernDataDev} />

        <Col offset={4} span={9} className={HomeCss.ModernData}>
          Single version of truth
        </Col>
      </Row>
    </div>
  );
}
