import { Col, Row } from "antd";
import ResetLeft from "./reset-left";
import ResetRight from "./reset-right";
import loginCss from "../../../styles/login.module.css";

export default function ResetPassword() {
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
          <ResetLeft loginCss={loginCss} />
        </Col>
        <Col span={12}>
          <ResetRight loginCss={loginCss} />
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
          <ResetRight loginCss={loginCss} />
        </Col>
        <Col span={24}>
          <ResetLeft loginCss={loginCss} />
        </Col>
      </Row>
    </>
  );
}
