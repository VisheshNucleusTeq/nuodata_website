import { Col, Row, Image, Button } from "antd";
import Header from "../common/header";

export default function Info({ HowItWorkCss }) {
  return (
    <div className={HowItWorkCss.mainDiv}>
      <Header />
      <Row>
        <Col
          xs={1}
          sm={1}
          md={1}
          lg={1}
          xl={1}
          xxl={1}
          
        />

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
        <Col
          xs={1}
          sm={1}
          md={1}
          lg={1}
          xl={1}
          xxl={1}
          
        />

        <Col
          xs={1}
          sm={1}
          md={1}
          lg={1}
          xl={1}
          xxl={1}
          
        />
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
            src="/home/ezgif.com-crop.gif"
          />
        </Col>

        <Col
          xs={1}
          sm={1}
          md={1}
          lg={1}
          xl={1}
          xxl={1}
          
        />
      </Row>
      {/* <div className={HowItWorkCss.mainDivOP}>
        <Header />
        <Row>
          <Col span={22} offset={1}>
            <Row className={HowItWorkCss.infoTextImage}>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={11}
                xxl={11}
                className={HowItWorkCss.infoText}
              >
                <div>
                  <h1>
                    How it <span>Works </span>
                  </h1>
                  <p>
                    NuoData brings intelligence and automation to the
                    modernization process for data warehouses, ETL, and
                    analytics systems improving speed and accuracy while
                    lowering risks and costs.
                  </p>
                </div>
                
              </Col>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={13}
                xxl={13}
                className={HowItWorkCss.infoImage}
              >
                <Image preview={false} src="/home/platform gif.gif" />
              </Col>
            </Row>
          </Col>
        </Row>
      </div> */}
    </div>
  );
}
