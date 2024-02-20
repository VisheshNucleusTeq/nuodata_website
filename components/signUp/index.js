import { Col, Row } from "antd";
import signUpCss from "../../styles/newStyles/signUpNew.module.css";
import ContactUsLeft from "./sign-up-left";
import ContactUsRight from "./sign-up-right";

export default function SignUp() {
  return (
    <>
      <Row style={{ height: "100vh" }} className={signUpCss.desktopView}>
        <Col span={12}>
          <div className={signUpCss.pipelineDiv}>
            <iframe
              src="/all-graph/sign_in/pipeline.html"
              style={{ width: "15vw", height: "15vw", border: "none" }}
            />
          </div>
          <ContactUsLeft
            title={"Sign-Up"}
            buttonText={"Sign-Up"}
            signUpCss={signUpCss}
          />
        </Col>
        <Col span={12}>
          <ContactUsRight signUpCss={signUpCss} />
        </Col>
      </Row>
      <Row style={{ height: "100vh" }} className={signUpCss.mobileView}>
        <Col span={24}>
          <div className={signUpCss.pipelineDiv}>
            <iframe
              src="/all-graph/sign_in/pipeline.html"
              style={{ width: "35vw", height: "35vw", border: "none" }}
            />
          </div>
          <ContactUsRight signUpCss={signUpCss} />
        </Col>
        <Col span={24}>
          <ContactUsLeft
            title={"Sign-Up"}
            buttonText={"Sign-Up"}
            signUpCss={signUpCss}
          />
        </Col>
      </Row>
    </>
  );
}
