import { Col, Row, Image, Button } from "antd";
import Header from "../common/header";

export default function Info({ HowItWorkCss }) {
  return (
    <div className={HowItWorkCss.mainDiv}>
      <Header />
      <Row>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />

        <Col
          xs={22}
          sm={22}
          md={10}
          lg={10}
          xl={10}
          xxl={10}
          className={HowItWorkCss.infoText}
        >
          <div>
            <h1>
              How it <span>Works </span>
            </h1>
            <p>
              NuoData brings intelligence and automation to the modernization
              process for data warehouses, ETL, and analytics systems improving
              speed and accuracy while lowering risks and costs.
            </p>
          </div>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />

        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
        <Col
          xs={22}
          sm={22}
          md={10}
          lg={10}
          xl={10}
          xxl={10}
          className={HowItWorkCss.infoImage}
        >
          <Image
            className={HowItWorkCss.infoImageTag}
            preview={false}
            src="/how_it_work/ezgif.com-crop.gif"
          />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
      </Row>
    </div>
  );
}
