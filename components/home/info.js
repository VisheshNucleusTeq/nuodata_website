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
          <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />
          <Col
            xs={20}
            sm={20}
            md={20}
            lg={20}
            xl={20}
            xxl={20}
          >
            <AnimationOnScroll
              initiallyVisible={true}
              animateIn="animate__fadeIn"
              animatePreScroll={true}
              animateOnce={false}
            >
              <p style={{color : "red"}}>{process.env.BASE_URL}</p>
              <h1>
                <span className={HomeCss.spanText}>ONE PLATFORM</span> FOR ALL
                ENTERPRISE DATA <br />
                <span className={HomeCss.spanText}>MODERNIZATION</span> &{" "}
                <span className={HomeCss.spanText}>MANAGEMENT</span> NEEDS.
              </h1>
            </AnimationOnScroll>
          </Col>
          <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />
        </Row>
      </div>
    </div>
  );
}
