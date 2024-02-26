import { Col, Row, Image } from "antd";
import { AnimationOnScroll } from "react-animation-on-scroll";
import Header from "../common/header";

export default function Info({ DataManagementCss }) {
  return (
    <div className={DataManagementCss.mainDiv}>
      <div className={DataManagementCss.mainDivBackground}>
        <Header />
        <div className={DataManagementCss.detailsDiv}>
          <Row
            className={DataManagementCss.infoRow}
            justify={"center"}
            align={"middle"}
          >
            <Col xs={20} sm={20} md={10} lg={10} xl={10} xxl={10}>
              <AnimationOnScroll
                initiallyVisible={true}
                animateIn="animate__bounceIn"
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
            <Col xs={20} sm={20} md={10} lg={10} xl={10} xxl={10}>
              <Image
                src="/Data Management/Deliver Impact Faster.png"
                preview={false}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
