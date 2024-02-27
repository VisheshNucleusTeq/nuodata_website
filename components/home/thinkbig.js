import { Col, Row, Image, Space, Button } from "antd";
import { AnimationOnScroll } from "react-animation-on-scroll";
import Link from "next/link";
export default function ThinkBig({ HomeCss }) {
  return (
    <div id="dataManagement" className={HomeCss.thinkBigMainDiv}>
      <Row
        className={HomeCss.thinkBigChild}
        justify={"center"}
        align={"middle"}
      >
        <Col
          xs={22}
          sm={22}
          md={22}
          lg={22}
          xl={22}
          xxl={22}
        >
          <Row justify={"center"} align={"middle"}>
            <h1>
              Meet<span>NuoData</span>
            </h1>
          </Row>
        </Col>
      </Row>

      <Row
        className={`${HomeCss.thinkBigChild} ${HomeCss.thinkBigChildStstem}`}
        style={{ textAlign: "center", paddingBottom: "5vw" }}
        align="stretch"
        justify={"center"}
      >
        <Col span={22}>
          <h2>
            World’s leading data modernization & management platform and your
            key to revolutionizing your enterprise’s end-to-end data journey.
          </h2>
          <h2>
            Build your next generation data platform on ANY cloud, ANY runtime &
            ANY processing engine of your choice
          </h2>
        </Col>
      </Row>

      <Row
        className={`${HomeCss.thinkBigChild} ${HomeCss.thinkBigChildMobile}`}
        style={{ textAlign: "center", paddingBottom: "5vw" }}
        align="stretch"
        justify={"center"}
      >
        <Col span={22}>
          <h2>
            World’s leading data modernization & management platform and your
            key to revolutionizing your enterprise’s end-to-end data journey.
          </h2>
          <h2>
            Build your next generation data platform on ANY cloud, ANY runtime &
            ANY processing engine of your choice
          </h2>
        </Col>
      </Row>

      <Row
        className={HomeCss.thinkBigChild}
        justify={"center"}
        align={"middle"}
      >
        <Col span={21} className={HomeCss.ReadMoreCol}>
          <AnimationOnScroll animateIn="animate__zoomIn" animateOnce={true}>
            <Row>
              <h1>
                THINK<span>BIG.</span>
              </h1>
            </Row>
          </AnimationOnScroll>
        </Col>
      </Row>

      <Row
        className={`${HomeCss.thinkBigChild} ${HomeCss.thinkBigChildStstem}`}
        align="stretch"
        justify={"center"}
      >
        <Col span={21}>
          <AnimationOnScroll animateIn="animate__fadeInDown" animateOnce={true}>
            <h2>
              Modernize your enterprise data from ANY source to ANY cloud
              platform.
            </h2>
          </AnimationOnScroll>
        </Col>
        <Col span={21} className={HomeCss.ReadMoreCol}>
          <Link prefetch href="/how-it-works">
            <Button className={HomeCss.ReadMoreBtn}>
              <p>Read More</p>
            </Button>
          </Link>
        </Col>

        <Col span={21}>
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
        <Col xs={22} sm={22} md={22} lg={10} xl={10} xxl={10}>
          <AnimationOnScroll animateIn="animate__fadeInDown" animateOnce={true}>
            <h2>
              Modernize your enterprise data from <span>ANY</span> source to{" "}
              <span>ANY</span> cloud platform.
            </h2>
          </AnimationOnScroll>
        </Col>
        <Col span={22} className={HomeCss.ReadMoreCol}>
          <Link prefetch href="/how-it-works">
            <Button className={HomeCss.ReadMoreBtn}>
              <p>Read More</p>
            </Button>
          </Link>
        </Col>

        <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
          <iframe
            src="/all-graph/home/mobile_view/one/demo/one.html"
            style={{ width: "100vw", height: "100vh", border: "none" }}
          />
        </Col>
      </Row>
    </div>
  );
}
