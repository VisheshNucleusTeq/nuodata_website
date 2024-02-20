import { Carousel as CarouselComponent, Col, Row, Button } from "antd";
import Header from "../header";

export default function InfoNew({ HomeCss }) {
  return (
    <div className={HomeCss.mainDiv}>
      <Header />
      <Row className={HomeCss.mainDivChild} justify={"center"} align={"middle"}>
        <Col xs={24} sm={22} md={22} lg={20} xl={20} xxl={20}>
          <CarouselComponent
            effect={"fade"}
            dots={true}
            autoplay={true}
            draggable={true}
            autoplaySpeed={3000}
            className="home-carousel"
          >
            <Row>
              <div className={HomeCss.pipelineDiv}>
                <iframe
                  src="/all-graph/home/banner/home-pipeline.html"
                  style={{ width: "20vw", height: "20vw", border: "none" }}
                />
              </div>
              <Col
                xs={24}
                sm={22}
                md={18}
                lg={16}
                xl={14}
                xxl={14}
                className={HomeCss.homeInfoText}
              >
                <div>
                  <h1>ONE PLATFORM</h1>
                  <h2>
                    FOR ALL ENTERPRISE DATA
                    <span className={HomeCss.spanText}> MODERNIZATION</span> &
                    <span className={HomeCss.spanText}> MANAGEMENT</span> NEEDS.
                  </h2>
                  <Button className={HomeCss.tryNowBtn}>Try It Now</Button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col
                xs={24}
                sm={22}
                md={18}
                lg={16}
                xl={11}
                xxl={11}
                className={HomeCss.homeInfoText}
              >
                <div>
                  <h2>With a proven</h2>
                  <h1>
                    <span>7-step </span>approach
                  </h1>
                  <h2>
                    NuoData is the only platform to migrate and modernize
                    enterprise data from ANY source to ANY cloud platform.
                  </h2>
                  <Button className={HomeCss.tryNowBtn}>Try It Now</Button>
                </div>
              </Col>
            </Row>
          </CarouselComponent>
        </Col>
      </Row>
    </div>
  );
}
