import { Col, Row, Image, Space, Button } from "antd";
import DataManagementCss from "../styles/dataManagement.module.css";

export default function ArcCard({ mainImage, mainTitle, arcData }) {
  return (
    <div className={DataManagementCss.arcCardMainDiv}>
      <Space direction="vertical" className={DataManagementCss.arcCardSpace}>
        {mainImage && <Image src={mainImage} preview={false} />}
        <h1 className={DataManagementCss.arcTitle}>{mainTitle}</h1>
        <Image
          src="/Data Management/yellow-horizontal-pipeline.png"
          preview={false}
        />

        <div
          className={DataManagementCss.arcDiv}
          style={{
            background: `linear-gradient(#FF8860 10%, #FFF28100, #FFFFFF )`,
          }}
        >
          <Row className={DataManagementCss.arcRow}>
            {arcData.map((item) => (
              <Col
                key={item.title}
                xs={24}
                sm={24}
                md={12}
                lg={8}
                xl={8}
                className={DataManagementCss.arcCol}
              >
                <Row
                  justify={"center"}
                  align={"middle"}
                  className={DataManagementCss.arcGradientCard}
                  style={{ minHeight: item.text ? "80vh" : "30vh" }}
                >
                  <Col xs={24} sm={24} md={24} lg={11} xl={11} align={"center"}>
                    <Image src={item.imageSrc} preview={false} />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={13} xl={13}>
                    <h1 className={DataManagementCss.arcGradientTitle}>
                      {item.title}
                    </h1>
                  </Col>
                  {item.text && (
                    <>
                      <Col span={24} align={"left"}>
                        <p className={DataManagementCss.arcGradientText}>
                          {item.text}
                        </p>
                      </Col>
                      <Col
                        span={24}
                        align={"left"}
                        style={{ height: "100%", alignItems: "baseline" }}
                      >
                        <Button className={DataManagementCss.arcContactBtn}>
                          Contact Us
                        </Button>
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
            ))}
          </Row>
        </div>
      </Space>
    </div>
  );
}
