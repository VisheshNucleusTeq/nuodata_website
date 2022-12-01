import React from "react";
import { Col, Row, Image } from "antd";

export default function EnterpriseChallengeView({ HomeCss }) {
  return (
    <div className={HomeCss.enterpriseChallengeView}>
      <Row>
        <Col offset={2} span={20}>
          <Row>
            <Col span={8}>
              <h1 className={HomeCss.enterpriseChallengeTitle}>
                Enterprise Challenge
              </h1>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={4}> 1 </Col>
                <Col span={20}>
                  <div className={HomeCss.enterpriseChallengeDiv}>data</div>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={4}> 2 </Col>
                <Col span={20}>
                <div className={HomeCss.enterpriseChallengeDiv}>data</div>
                </Col>
              </Row>
            </Col>

            {/* <Col span={8}>1</Col>
            <Col span={8}>2</Col>
            <Col span={8}>3</Col>

            <Col span={8}>1</Col>
            <Col span={8}>2</Col>
            <Col span={8}>3</Col> */}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
