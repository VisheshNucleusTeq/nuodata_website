import { Col, Row } from "antd";
import signUpCss from "../../styles/signUp.module.css";
import SignUpLeft from "./contactUsLeft";
import ContactUsRight from "./contactUsRight";

export default function SignUp() {
  return (
    <>
      <Row style={{ height: "100vh" }} className={signUpCss.desktopView}>
        <Col span={8}>
          <SignUpLeft signUpCss={signUpCss} />
        </Col>
        <Col span={16}>
          <ContactUsRight title={"Contact Us."} buttonText={"Send"} signUpCss={signUpCss} />
        </Col>
      </Row>
      <Row style={{ height: "100vh" }} className={signUpCss.mobileView}>
        <Col span={24}>
          <ContactUsRight title={"Contact Us."} buttonText={"Send"} signUpCss={signUpCss} />
        </Col>
      </Row>
    </>
  );
}
