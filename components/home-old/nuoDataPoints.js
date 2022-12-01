import React from "react";
import { Col, Row, Image } from "antd";

export default function NuoDataPoints({ HomeCss }) {
  return (
    <div className={HomeCss.pointsView}>
      <Row>
        <Col offset={3} span={18}>
          {Array(3)
            .fill(undefined)
            .map(() => {
              return (
                <Row className={HomeCss.pointDetails}>
                  <Col xs={24} sm={24} md={2} lg={2} xl={2} xxl={2}  className={HomeCss.pointImageDiv} >
                    <Image className={HomeCss.pointImage} src="../home/point.png" />
                  </Col>
                  <Col xs={24} sm={24} md={20} lg={20} xl={20} xxl={20}>
                    <h1 className={HomeCss.pointText}>
                      NuoData is a unified platform that enables enterprise data
                      modernization from any source to any cloud platform
                    </h1>
                  </Col>
                </Row>
              );
            })}
        </Col>
      </Row>
    </div>
  );
}
