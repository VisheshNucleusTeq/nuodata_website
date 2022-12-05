import { Col, Row, Button } from "antd";

export default function WhatIsNuoData({ HowItWorkCss }) {
  const nuoDataInfoData = () => {
    return (
      <div className={HowItWorkCss.nuoDataInfo}>
        <h1>Up to <span>95% automation</span> brings more accuracy with lower chance <br/> of business disruption</h1>
        <div>
          <p>
            NuoData is a unified platform that enables enterprise data
            modernization from any source to any cloud platform
          </p>
        </div>
      </div>
    );
  };

  return (
    <Row>
      <Col span={24} className={HowItWorkCss.bgImage}>
        <Col offset={4} span={16} className={HowItWorkCss.infoRowSystemView} >
          {nuoDataInfoData()}
        </Col>
        <Col offset={1} span={22} className={HowItWorkCss.infoRowMobileView}>
          {nuoDataInfoData()}
        </Col>
      </Col>
    </Row>
  );
}


{/*  */}