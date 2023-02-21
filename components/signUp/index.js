import { Col, Row } from "antd";
import signUpCss from "../../styles/signUp.module.css";
import ContactUsLeft from "../contactUs/contactUsLeft";
import ContactUsRight from "../contactUs/contactUsRight";

export default function SignUp() {
  return (
    <>
      <Row style={{ height: "100vh" }} className={signUpCss.desktopView}>
        <Col span={8}>
          <ContactUsLeft signUpCss={signUpCss} />
        </Col>
        <Col span={16}>
          <ContactUsRight title={"Sign-up for a free trial."} buttonText={"Sign-Up"} signUpCss={signUpCss} />
        </Col>
      </Row>
      <Row style={{ height: "100vh" }} className={signUpCss.mobileView}>
        <Col span={24}>
          <ContactUsRight title={"Sign-up for a free trial."} buttonText={"Sign-Up"} signUpCss={signUpCss} />
        </Col>
      </Row>
    </>
  );
}
