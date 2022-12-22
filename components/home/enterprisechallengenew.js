import { Col, Row, Button, Image } from "antd";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { RiseOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function EnterpriseChallenge({ HomeCss }) {
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

      <Col xs={22} sm={22} md={22} lg={20} xl={18} xxl={18}>
        <AnimationOnScroll animateIn="animate__fadeInRight" animateOnce={true}>
          <Row className={HomeCss.childDivNew}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <div className={HomeCss.imageDiv}>
                <Image
                  height={"100%"}
                  preview={false}
                  src="./home/step1.png"
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <div className={HomeCss.textDiv}>
                <h1>
                  <span>1</span>
                  <br />
                  No SME knowledge to bridge source & target tech-stack
                </h1>
              </div>
            </Col>
          </Row>
        </AnimationOnScroll>

        <AnimationOnScroll animateIn="animate__fadeInLeft" animateOnce={true}>
          <Row className={HomeCss.childDivNew}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <div className={HomeCss.imageDiv}>
                <Image
                  height={"100%"}
                  preview={false}
                  src="./home/step2.png"
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <div className={HomeCss.textDiv}>
                <h1>
                  <span>2</span>
                  <br />
                  Time consuming, manual & error prone
                </h1>
              </div>
            </Col>
          </Row>
        </AnimationOnScroll>

        <AnimationOnScroll animateIn="animate__fadeInRight" animateOnce={true}>
          <Row className={HomeCss.childDivNew}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <div className={HomeCss.imageDiv}>
                <Image
                  height={"100%"}
                  preview={false}
                  src="./home/step3.png"
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <div className={HomeCss.textDiv}>
                <h1>
                  <span>3</span>
                  <br />
                  Majority of the data, ETL & queries are not used, redundant or
                  duplicate
                </h1>
              </div>
            </Col>
          </Row>
        </AnimationOnScroll>

        <AnimationOnScroll animateIn="animate__fadeInLeft" animateOnce={true}>
          <Row className={HomeCss.childDivNew}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <div className={HomeCss.imageDiv}>
                <Image
                  height={"100%"}
                  preview={false}
                  src="./home/step4.png"
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <div className={HomeCss.textDiv}>
                <h1>
                  <span>4</span>
                  <br />
                  There is no merit in simply dumping the data to cloud
                </h1>
              </div>
            </Col>
          </Row>
        </AnimationOnScroll>

        <AnimationOnScroll animateIn="animate__fadeInRight" animateOnce={true}>
          <Row className={HomeCss.childDivNew}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <div className={HomeCss.imageDiv}>
                <Image
                  height={"100%"}
                  preview={false}
                  src="./home/step5.png"
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <div className={HomeCss.textDiv}>
                <h1>
                  <span>5</span>
                  <br />
                  Maintainability in the target environment
                </h1>
              </div>
            </Col>
          </Row>
        </AnimationOnScroll>
      </Col>
      <Col
        xs={22}
        sm={22}
        md={22}
        lg={20}
        xl={24}
        xxl={24}
        className={HomeCss.howNuoDataworksBtn}
      >
        <Link prefetch href="/how-it-works">
          <Button>
            “Explore How NuoData works” <RiseOutlined />
          </Button>
        </Link>
      </Col>
    </Row>
  );
}

