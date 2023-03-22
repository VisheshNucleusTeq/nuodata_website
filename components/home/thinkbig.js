import { Col, Row, Image } from "antd";
import { AnimationOnScroll } from "react-animation-on-scroll";
export default function ThinkBig({ HomeCss }) {
  return (
    <div id="dataManagement" className={HomeCss.thinkBigMainDiv}>
      <Row className={HomeCss.thinkBigChild}>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
        <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22}>
          <AnimationOnScroll animateIn="animate__zoomIn" animateOnce={true}>
            <h1>THINK</h1>
            <h1>BIG.</h1>
          </AnimationOnScroll>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
      </Row>

      {/* <Row className={HomeCss.thinkBigChild} align="stretch" justify={"center"}>
        <Col span={20}>
          <AnimationOnScroll animateIn="animate__fadeInDown" animateOnce={true}>
            <h2>
              Modernize your enterprise data from <span>ANY</span> source to{" "}
              <span>ANY</span> cloud platform.
            </h2>
          </AnimationOnScroll>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />

        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
        <Col span={18}>
          <iframe
            src="all-graph/home/one/demo/one.html"
            style={{ width: "100%", height: "40vw", border: "none" }}
          />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
      </Row> */}

      <Row
        className={`${HomeCss.thinkBigChild} ${HomeCss.thinkBigChildStstem}`}
        align="stretch"
        justify={"center"}
      >
        <Col span={20}>
          <AnimationOnScroll animateIn="animate__fadeInDown" animateOnce={true}>
            <h2>
              Modernize your enterprise data from <span>ANY</span> source to{" "}
              <span>ANY</span> cloud platform.
            </h2>
          </AnimationOnScroll>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />

        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
        <Col span={16}>
          <iframe
            src="all-graph/home/one/demo/one.html"
            style={{ width: "100%", height: "40vw", border: "none" }}
          />
          {/* <Image src="/home/new-video.gif" preview={false} /> */}
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
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
            src="all-graph/home/mobile_view/one/demo/one.html"
            style={{ width: "100vw", height: "100vw", border: "none" }}
          />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
      </Row>

      <Row style={{ marginTop: "5%" }} align="stretch" justify={"center"}>
        <Col span={12} style={{ borderTop: "1px solid #e74860" }}></Col>
      </Row>

      <Row
        className={`${HomeCss.thinkBigChild} ${HomeCss.thinkBigChildStstem}`}
        align="stretch"
        justify={"center"}
      >
        <Col span={20}>
          <AnimationOnScroll animateIn="animate__fadeInDown" animateOnce={true}>
            <h2>
              Unified <span>Data Management</span> platform for all data
              engineering, analytics, operation needs.
            </h2>
          </AnimationOnScroll>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />

        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
        <Col span={16}>
          <iframe
            src="all-graph/home/two/demo/two.html"
            style={{ width: "100%", height: "40vw", border: "none" }}
          />
          {/* <Image src="/home/new-video.gif" preview={false} /> */}
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
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
            src="all-graph/home/mobile_view/two/demo/two.html"
            style={{ width: "100%", height: "100vw", border: "none" }}
          />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
      </Row>
    </div>
  );
}
