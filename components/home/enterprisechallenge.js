import { Col, Row, Button, Image } from "antd";
import { useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";

export default function EnterpriseChallenge({ HomeCss }) {
  const [EnterpriseChallenge] = useState([
    {
      image: "./home/enterpriseChallenge/image5.png",
      text : "No SME knowledge to bridge source & target tech-stack"
    },
    {
      image: "./home/enterpriseChallenge/image2.png",
      text : "Time consuming & manual effort"
    },
    {
      image: "./home/enterpriseChallenge/image3.png",
      text : "Majority of the data & queries are redundant"
    },
    {
      image: "./home/enterpriseChallenge/image4.png",
      text : "Dumping everything on cloud is expensive"
    },
    {
      image: "./home/enterpriseChallenge/image5.png",
      text : "Maintainability in the target environment"
    },
  ]);
  return (
    <Row className={HomeCss.mainEnterpriseChallenge}>
      <h2>
        <AnimationOnScroll
          animateOut="animate__fadeOut"
          animateIn="animate__fadeIn"
          animateOnce={true}
        >
          <span>Enterprise Challenges</span>
        </AnimationOnScroll>
      </h2>
      {EnterpriseChallenge.map((e, i) => {
        return (
          <Col span={24} className={HomeCss.enterpriseChallengeList}>
            <Row>
              <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />

              <Col
                xs={1}
                sm={1}
                md={1}
                lg={6}
                xl={6}
                xxl={6}
                className={HomeCss.mainEnterpriseChallengeImageDiv}
              >
                <Image
                  className={HomeCss.mainEnterpriseChallengeImage}
                  preview={false}
                  src={e.image}
                />
              </Col>

              <Col
                xs={1}
                sm={1}
                md={1}
                lg={14}
                xl={14}
                xxl={14}
                className={HomeCss.mainEnterpriseChallengeTextDiv}
              >
                <h1 className={HomeCss.mainEnterpriseChallengeNumber}>
                  {i + 1} &nbsp; &nbsp;
                </h1>
                <h1 className={HomeCss.mainEnterpriseChallengeText}>
                  {e.text}
                </h1>
              </Col>

              <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />
            </Row>
          </Col>
        );
      })}
    </Row>
  );
}
