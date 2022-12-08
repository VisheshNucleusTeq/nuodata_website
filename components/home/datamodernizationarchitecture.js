import { Col, Row, Button } from "antd";
import { AnimationOnScroll } from "react-animation-on-scroll";

export default function DataModernizationArchitecture({ HomeCss }) {
  return (
    <Row>
      <Col
        offset={1}
        span={22}
        className={HomeCss.dataModernizationArchitectureTtile}
      >
        <h1>
          <span>Data Modernization Architecture</span>
        </h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </p>
      </Col>
      <Col offset={1} span={22} className={HomeCss.infoRowSystemView}>
        <div className={HomeCss.infoRowSystemTextView}>
          {/* <Image src="" /> */}
          {/* <AnimationOnScroll animateIn="animate__zoomIn" animateOnce={true}>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </p>
          </AnimationOnScroll> */}
        </div>
      </Col>
    </Row>
  );
}
