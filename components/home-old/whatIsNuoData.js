import { Col, Row, Button } from "antd";

export default function WhatIsNuoData({ HomeCss }) {
  const nuoDataInfoData = () => {
    return (
      <div className={HomeCss.nuoDataInfo}>
        <h1>What is NuoData?</h1>
        <div>
          <p>
            NuoData is a unified platform that enables enterprise data
            modernization from any source to any cloud platform
          </p>
          <p>
            Data management platform for all data engineering, analytics &
            operational needs
          </p>
        </div>
        <Button size={"large"} className={HomeCss.contactUsBtn}>
          Read More
        </Button>
      </div>
    );
  };

  return (
    <Row>
      <Col span={24} className={HomeCss.bgImage}>
        <Col offset={4} span={16} className={HomeCss.infoRowSystem} >
          {nuoDataInfoData()}
        </Col>
        <Col offset={1} span={22} className={HomeCss.infoRowMobile}>
          {nuoDataInfoData()}
        </Col>
      </Col>
    </Row>
  );
}
