import { Col, Row } from "antd";
import SignInLeft from "./sign-in-left";
import SignInRight from "./sign-in-right";
import loginCss from "../../styles/newStyles/loginNew.module.css";

export default function SignInNew() {
  return (
    <>
      <Row style={{ height: "100vh" }} className={loginCss.desktopView}>
        <Col span={12}>
          <div className={loginCss.pipelineDiv}>
            <iframe
              src="/all-graph/sign_in/pipeline.html"
              style={{ width: "15vw", height: "15vw", border: "none" }}
            />
          </div>
          <SignInLeft loginCss={loginCss} />
        </Col>
        <Col span={12}>
          <SignInRight loginCss={loginCss} />
        </Col>
      </Row>
      <Row style={{ height: "100vh" }} className={loginCss.mobileView}>
        <Col span={24}>
          <div className={loginCss.pipelineDiv}>
            <iframe
              src="/all-graph/sign_in/pipeline.html"
              style={{ width: "35vw", height: "35vw", border: "none" }}
            />
          </div>
          <SignInRight loginCss={loginCss} />
        </Col>
        <Col span={24}>
          <SignInLeft loginCss={loginCss} />
        </Col>
      </Row>
    </>
  );
}
