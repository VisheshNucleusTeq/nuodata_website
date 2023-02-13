import { Col, Row } from "antd";
// import AuthHeader from "../common/AuthHeader";
import SignInLeft from "./sign-in-left";
import SignInRight from "./sign-in-right";
import loginCss from "../../styles/login.module.css";

export default function SignIn() {
  return (
    <>
      <Row style={{ height: "100vh" }} className={loginCss.desktopView}>
        <Col span={9}>
          <SignInLeft loginCss={loginCss} />
        </Col>
        <Col span={15}>
          {/* <AuthHeader /> */}
          <SignInRight loginCss={loginCss} />
        </Col>
      </Row>
      <Row style={{ height: "100vh" }} className={loginCss.mobileView}>
        <Col span={24}>
          {/* <AuthHeader /> */}
          <SignInRight loginCss={loginCss} />
        </Col>
      </Row>
    </>
  );
}
