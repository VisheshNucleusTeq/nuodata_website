import { Col, Row, Button } from "antd";
import { AnimationOnScroll } from "react-animation-on-scroll";
import ReactFlowInfo from "./reactflowinfo";
import Header from "../../common/newLayout/header";

export default function InfoNew({ HomeCss }) {
  return (
    <div className={HomeCss.mainDiv}>
      <Header />
      <div className={HomeCss.pipelineDiv}>
        <iframe
          src="/all-graph/home/banner/home-pipeline.html"
          style={{ width: "20vw", height: "20vw", border: "none" }}
        />
      </div>
      <Row className={HomeCss.mainDivChild}>
        <Col xs={0} sm={2} md={2} lg={2} xl={2} xxl={2}></Col>
        <Col
          xs={24}
          sm={22}
          md={18}
          lg={16}
          xl={10}
          xxl={10}
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



        
        {/* <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}></Col>
        <Col
          xs={10}
          sm={10}
          md={10}
          lg={6}
          xl={10}
          xxl={10}
        >
          <div className={HomeCss.infoPipeline}>
            <div>
              <iframe
                src="/all-graph/home/banner/home-pipeline.html"
                style={{
                  border: "none",
                  width: "25vw",
                  height: "25vw",
                }}
              />
            </div>
          </div>
        </Col> */}
      </Row>
    </div>
  );
}
