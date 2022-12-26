import { Col, Row, Button, Image } from "antd";
import { useRouter } from "next/router";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { RiseOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function EnterpriseChallenge({ HomeCss }) {
  const router = useRouter();

  const [enterpriseChallenges, setEnterpriseChallenges] = useState([
    {
      image: "./home/step1.png",
      description: "No SME knowledge to bridge source & target tech-stack.",
    },
    {
      image: "./home/step2.png",
      description: "Time consuming & manual effort.",
    },
    {
      image: "./home/step3.png",
      description: "Majority of the data & queries are redundant.",
    },
    {
      image: "./home/step4.png",
      description: "Dumping everything on cloud is expensive.",
    },
    {
      image: "./home/step5.png",
      description: "Maintainability in the target environment.",
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
      <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />

      <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22}>
        {enterpriseChallenges.map((e, i) => {
          return (
            <AnimationOnScroll
              animateIn={i % 2 ? "animate__fadeInRight" : "animate__fadeInLeft"}
              animateOnce={true}
              key={(Math.random() + 1).toString(36).substring(7)}
            >
              <Row className={HomeCss.childDivNew}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <div className={HomeCss.imageDiv}>
                    <Image height={"100%"} preview={false} src={e.image} />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <div className={HomeCss.textDiv}>
                    <h1>
                      <span>{i + 1}</span>
                      <br />
                      {e.description}
                    </h1>
                  </div>
                </Col>
              </Row>
            </AnimationOnScroll>
          );
        })}
      </Col>
      <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />

      <Col span={24} className={HomeCss.howNuoDataworksBtn}>
        <Button
          onClick={() => {
            router.replace(`how-it-works`);
          }}
        >
          “Explore How NuoData works” <RiseOutlined />
        </Button>
      </Col>
    </Row>
  );
}
