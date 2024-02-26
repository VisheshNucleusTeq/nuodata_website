import { Col, Row, Image, Space } from "antd";
import { AnimationOnScroll } from "react-animation-on-scroll";
import DataInnovation from "./datainnovation";
export default function ThinkBigNew({ HomeCss }) {
  return (
    <div id="dataManagement" className={HomeCss.thinkBigMainDiv}>
      <Row className={HomeCss.thinkBigChild}>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
        <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22}>
          <AnimationOnScroll animateIn="animate__zoomIn" animateOnce={true}>
            <Row>
              <h1>THINK</h1>
              <h1>BIG.</h1>
            </Row>
          </AnimationOnScroll>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
      </Row>

      <Row
        className={`${HomeCss.thinkBigChild} ${HomeCss.thinkBigChildStstem}`}
        align="stretch"
        justify={"center"}
      >
        <Col span={22}>
          <AnimationOnScroll animateIn="animate__fadeInDown" animateOnce={true}>
            <h2>
              Modernize your enterprise data from ANY source to ANY cloud
              platform.
            </h2>
          </AnimationOnScroll>
        </Col>

        <Col span={22}>
          <iframe
            src="/all-graph/home/one/one.html"
            style={{ width: "100%", height: "40vw", border: "none" }}
          />
        </Col>
      </Row>

      <Row
        className={`${HomeCss.thinkBigChild} ${HomeCss.thinkBigChildMobile}`}
        align="center"
      >
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
        <Col xs={22} sm={22} md={22} lg={10} xl={10} xxl={10}>
          <AnimationOnScroll animateIn="animate__fadeInDown" animateOnce={true}>
            <h2>
              Modernize your enterprise data from <span>ANY</span> source to{" "}
              <span>ANY</span> cloud platform.
            </h2>
          </AnimationOnScroll>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />

        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
        <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
          <iframe
            src="/all-graph/home/mobile_view/one/demo/one.html"
            style={{ width: "100vw", height: "100vh", border: "none" }}
          />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
      </Row>

      <DataInnovation HomeCss={HomeCss} />

      <Row
        className={`${HomeCss.thinkBigChild} ${HomeCss.thinkBigChildStstem}`}
        align="stretch"
        justify={"center"}
        style={{ marginTop: "6.25rem" }}
      >
        <Col span={22}>
          <AnimationOnScroll animateIn="animate__fadeInDown" animateOnce={true}>
            <h2>
              Unified Data Management platform for all data engineering,
              analytics, operation needs.
            </h2>
          </AnimationOnScroll>
        </Col>

        <Col span={22}>
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
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
        <Col xs={22} sm={22} md={22} lg={10} xl={10} xxl={10}>
          <AnimationOnScroll animateIn="animate__fadeInDown" animateOnce={true}>
            <h2>
              Unified <span>Data Management</span> platform for all data
              engineering, analytics & operational needs.
            </h2>
          </AnimationOnScroll>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />

        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
        <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
          <iframe
            src="/all-graph/home/mobile_view/two/demo/two.html"
            style={{ width: "100%", height: "100vh", border: "none" }}
          />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
      </Row>
    </div>
  );
}
