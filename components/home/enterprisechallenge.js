import { Col, Row, Button, Image } from "antd";
import { useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { RiseOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function EnterpriseChallenge({ HomeCss }) {
  const [EnterpriseChallenge] = useState([
    {
      image: "/home/enterpriseChallenge/1_new.png",
      text: "No SME knowledge to bridge source & target tech-stack",
    },
    {
      image: "/home/enterpriseChallenge/2_new.png",
      text: "Time consuming and Labor-Intensive",
    },
    {
      image: "/home/enterpriseChallenge/3_new.png",
      text: "Majority of the data & queries are redundant",
    },
    {
      image: "/home/enterpriseChallenge/4_new.png",
      text: "Dumping everything on cloud is expensive",
    },
    {
      image: "/home/enterpriseChallenge/5_new.png",
      text: "Maintainability in the target environment",
    },
  ]);

  const [hoverColor, setHoverColor] = useState(0);

  return (
    <div className={HomeCss.ECmain}>
      <Row className={HomeCss.mainEnterpriseChallengeDiv}>
        <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />
        <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
          <h2 className={HomeCss.ECTitle}>
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
              <AnimationOnScroll
                animateIn={
                  i % 2 ? "animate__fadeInDown" : "animate__fadeInDown"
                }
                animateOnce={true}
                key={(Math.random() + 1).toString(36).substring(7)}
              >
                <Row className={HomeCss.ECmainRow}>
                  <Col
                    xs={12}
                    sm={8}
                    md={8}
                    lg={8}
                    xl={8}
                    xxl={8}
                    className={HomeCss.ECimageCol}
                  >
                    <Image
                      className={HomeCss.ECColimage}
                      preview={false}
                      src={e.image}
                    />
                  </Col>
                  <Col
                    xs={12}
                    sm={16}
                    md={16}
                    lg={16}
                    xl={16}
                    xxl={16}
                    className={HomeCss.ECnumberCol}
                  >
                    <h1>{i + 1} &nbsp; &nbsp;</h1>
                  </Col>

                  <Col xs={2} sm={8} md={8} lg={8} xl={8} xxl={8} />
                  <Col
                    xs={24}
                    sm={14}
                    md={14}
                    lg={14}
                    xl={14}
                    xxl={14}
                    className={HomeCss.ECtextCol}
                  >
                    <h1>{e.text}</h1>
                  </Col>
                  <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />

                  {i < 4 && (
                    <Col
                      className={HomeCss.mainEnterpriseChallengeDottedLine}
                      xs={10}
                      sm={8}
                      md={8}
                      lg={8}
                      xl={8}
                      xxl={8}
                    />
                  )}
                </Row>
              </AnimationOnScroll>
            );
          })}
        </Col>
        <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />
      </Row>
    </div>
  );
}