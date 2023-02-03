import { Col, Row } from "antd";
import { AnimationOnScroll } from "react-animation-on-scroll";
import Header from "../common/header";

export default function Info({ DataManagementCss }) {
  return (
    <div className={DataManagementCss.mainDiv}>
      <Header />
      <div className={DataManagementCss.detailsDiv}>
        <Row className={DataManagementCss.infoRow}>
          <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />
          <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
            <AnimationOnScroll
              initiallyVisible={true}
              animateIn="animate__fadeInRight"
              animatePreScroll={true}
              animateOnce={true}
            >
              <h1>
                Deliver Impact <span>Faster</span>
              </h1>
              <p>
                <span>Unified Data Management</span> platform for all data
                engineering, analytics & operations needs.
              </p>
            </AnimationOnScroll>
          </Col>
          <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />
        </Row>
      </div>
    </div>
  );
}
