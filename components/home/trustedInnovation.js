import React from "react";
import { Row, Col, Image } from "antd";
export default function TrustedInnovation({ HomeCss }) {
  const imageSources = [
    "/trusted/aws.png",
    "/trusted/googlecloud.png",
    "/trusted/azure.png",
    "/trusted/databricks.png",
    "/trusted/ibm.png",
    "/trusted/snowflake.png",
    "/trusted/salesforce.png",
    // "/trusted/americanExpress.png",
  ];

  return (
    <div className={HomeCss.thinkBigMainDiv}>
      <Row justify={"center"} align={"middle"}>
        <Col
          xs={22}
          sm={22}
          md={22}
          lg={20}
          xl={20}
          xxl={20}
          style={{ paddingBottom: "4vh" }}
        >
          <Row
            justify={"center"}
            align={"middle"}
            className={`${HomeCss.thinkBigChild} ${HomeCss.thinkBigChildStstem}`}
          >
            <h1>
              Trusted by Innovative<span>Companies</span>
            </h1>
          </Row>
          <Row
            justify={"center"}
            align={"middle"}
            className={`${HomeCss.thinkBigChild} ${HomeCss.thinkBigChildMobile}`}
          >
            <h1>Trusted by Innovative</h1>
            <h1>
              <span>Companies</span>
            </h1>
          </Row>
        </Col>
        <Col xs={22} sm={22} md={22} lg={20} xl={20} xxl={20}>
          <Row align={"middle"} justify={"center"}>
            {imageSources.map((src, index) => (
              <Col key={index} xs={22} sm={12} md={3} align={"center"}>
                <Image
                  src={src}
                  preview={false}
                  className={HomeCss.trustedImg}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
