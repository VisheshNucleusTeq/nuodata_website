import { Col, Row } from "antd";
import signUpCss from "../../styles/signUp.module.css";
import SignUpLeft from "./sign-up-left";
import SignUpRight from "./sign-up-right";

export default function SignUp() {
  return (
    <>
      <Row style={{ height: "100vh" }} className={signUpCss.desktopView}>
        <Col span={8}>
          <SignUpLeft signUpCss={signUpCss} />
        </Col>
        <Col span={16}>
          <SignUpRight signUpCss={signUpCss} />
        </Col>
      </Row>
      <Row style={{ height: "100vh" }} className={signUpCss.mobileView}>
        <Col span={24}>
          <SignUpRight signUpCss={signUpCss} />
        </Col>
      </Row>
    </>
  );
}
