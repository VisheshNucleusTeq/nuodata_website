import { Col, Row } from "antd";
import signUpCss from "../../styles/signUp.module.css";
import SignUpLeft from "./contactUsLeft";
import SignUpRight from "./contactUsRight";

export default function SignUp() {
  return (
    <>
      <Row style={{ height: "100vh" }} className={signUpCss.desktopView}>
        <Col span={8}>
          <SignUpLeft signUpCss={signUpCss} />
        </Col>
        <Col  style={{marginTop:"5rem"}}span={16}>
          {/* <AuthHeader /> */}
          <SignUpRight signUpCss={signUpCss} />
        </Col>
      </Row>
      <Row style={{ height: "100vh" }} className={signUpCss.mobileView}>
        <Col span={24}>
          {/* <AuthHeader /> */}
          <SignUpRight signUpCss={signUpCss} />
        </Col>
      </Row>
    </>
  );
}
