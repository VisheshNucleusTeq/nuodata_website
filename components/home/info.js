import { Col, Row } from "antd";
import { AnimationOnScroll } from "react-animation-on-scroll";
import ReactFlowInfo from "./reactflowinfo";
import Header from "../common/header";

export default function Info({ HomeCss }) {
  return (
    <div className={HomeCss.mainDiv}>
      <Header />
      <div className={HomeCss.detailsDiv}>
        <Row className={HomeCss.infoRow}>
          <Col offset={2} span={10} className={HomeCss.infoRowSystem}>
            <AnimationOnScroll
              initiallyVisible={true}
              animateIn="animate__fadeInRight"
              animatePreScroll={true}
              animateOnce={true}
            >
              <h1>
                <span className={HomeCss.spanText}>One platform</span> for all
                enterprise Data Modernization and Management needs
              </h1>
            </AnimationOnScroll>
          </Col>

          

          <Col offset={2} span={20} className={HomeCss.infoRowMobile}>
            <h1>
              <span>One platform</span> for all enterprise Data Modernization
              and Management needs
            </h1>
          </Col>

          <Col offset={1} span={10} style={{ height: "100%" }} className={HomeCss.infoRowSystem}>
            <ReactFlowInfo HomeCss={HomeCss} />
          </Col>

        </Row>
      </div>
    </div>
  );
}
