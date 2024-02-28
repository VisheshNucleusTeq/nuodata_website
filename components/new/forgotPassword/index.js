import { Col, Row } from "antd";
import ForgotLeft from "./forgot-left";
import ForgotRight from "./forgot-right";
import loginCss from "../../../styles/Footer.module.css";

export default function ForgotPassword() {
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
          <ForgotLeft loginCss={loginCss} />
        </Col>
        <Col span={12}>
          <ForgotRight loginCss={loginCss} />
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
          <ForgotRight loginCss={loginCss} />
        </Col>
        <Col span={24}>
          <ForgotLeft loginCss={loginCss} />
        </Col>
      </Row>
    </>
  );
}
