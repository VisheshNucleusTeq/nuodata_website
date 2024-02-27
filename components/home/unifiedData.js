import { Col, Row, Image, Space, Button } from "antd";
import { AnimationOnScroll } from "react-animation-on-scroll";
export default function UnifiedData({ HomeCss }) {
  return (
    <div id="dataManagement" className={HomeCss.thinkBigMainDiv}>
      <Row
        className={`${HomeCss.thinkBigChild} ${HomeCss.thinkBigChildStstem}`}
        justify={"center"}
        align={"middle"}
        style={{ marginTop: "6.25rem" }}
      >
        <Col span={20}>
          <Row justify={"center"} align={"middle"}>
            <h1>
              Unified
              <span>Data</span>
              Management
            </h1>
          </Row>
        </Col>
      </Row>
      <Row
        className={`${HomeCss.thinkBigChild} ${HomeCss.thinkBigChildStstem}`}
        align="stretch"
        justify={"center"}
      >
        <Col span={20} align={"center"}>
          <AnimationOnScroll animateIn="animate__fadeInDown" animateOnce={true}>
            <h2>
              Platform for all data engineering, analytics, operation needs.
            </h2>
          </AnimationOnScroll>
        </Col>

        <Col span={20}>
          <iframe
            src="/all-graph/home/two/demo/two.html"
            style={{ width: "100%", height: "40vw", border: "none" }}
          />
        </Col>
      </Row>

      <Row
        className={`${HomeCss.thinkBigChild} ${HomeCss.thinkBigChildMobile}`}
        align="center"
      >
        <Col xs={22} sm={22} md={22} lg={10} xl={10} xxl={10}>
          <AnimationOnScroll animateIn="animate__fadeInDown" animateOnce={true}>
            <h2>
              Unified <span>Data Management</span> platform for all data
              engineering, analytics & operational needs.
            </h2>
          </AnimationOnScroll>
        </Col>

        <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
          <iframe
            src="/all-graph/home/mobile_view/two/demo/two.html"
            style={{ width: "100%", height: "100vh", border: "none" }}
          />
        </Col>
      </Row>
    </div>
  );
}
