import { Col, Row, Image, Button } from "antd";
import Header from "../newPages/header";
// import Header from "../common/header";

export default function Info({ HowItWorkCss }) {
  return (
    <div className={HowItWorkCss.mainDiv}>
      <Header />
      <div className={HowItWorkCss.detailsDiv}>
        <Row align={"middle"} justify={"center"}>
          <div className={HowItWorkCss.pipelineDiv}>
            <iframe
              src="/all-graph/sign_in/pipeline.html"
              style={{ width: "15vw", height: "15vw", border: "none" }}
            />
          </div>
          <Col
            xs={22}
            sm={22}
            md={9}
            lg={9}
            xl={9}
            xxl={9}
            className={HowItWorkCss.infoText}
          >
            <div>
              <h1>
                How it <span>Works </span>
              </h1>
              <p>
                NuoData brings intelligence and automation to the modernization
                process for data warehouses, ETL, and analytics systems
                improving speed and accuracy while lowering risks and costs.
              </p>
            </div>
          </Col>

          <Col
            xs={22}
            sm={22}
            md={9}
            lg={9}
            xl={9}
            xxl={9}
            className={HowItWorkCss.infoImage}
          >
            <iframe
              src="/all-graph/how it works/banner-gif/demo/data.html"
              style={{ width: "100%", height: "80vh", border: "none" }}
            />
            {/* <Image
            className={HowItWorkCss.infoImageTag}
            preview={false}
            src="/how_it_work/how-it-works.gif"
          /> */}
          </Col>
        </Row>
      </div>
    </div>
  );
}
