import { Col, Row, Button } from "antd";
import ModernizationWorksSteps from "./modernization-works-steps";
import ModernizationWorksStepsDetailsRtol from "./modernization-works-steps-details-rtol";
import ModernizationWorksStepsDetailsLtoR from "./modernization-works-steps-details-ltor";
import ModernizationWorksStepsDetailsTtob from "./modernization-works-steps-details-ttob";

export default function ModernizationWorks({ HowItWorkCss }) {
  return (
    <Row className={HowItWorkCss.ModernizationWorks}>
      <div className={HowItWorkCss.mainDivMW}>
        <Col span={24} className={HowItWorkCss.enterpriseChallengeColTitle}>
          <div>
            <h1>Industry Leading Modernization</h1>
            <p>Select a step to dive deepe</p>
          </div>
        </Col>

        <Col offset={1} span={22} className={HowItWorkCss.stepToDivDesktop}>
          <ModernizationWorksSteps
            HowItWorkCss={HowItWorkCss}
            direction={"horizontal"}
          />
        </Col>
        <Col offset={1} span={22} className={HowItWorkCss.stepToDivMobile}>
          <ModernizationWorksSteps
            HowItWorkCss={HowItWorkCss}
            direction={"vertical"}
          />
        </Col>

        <div
          style={{
            border: "1px solid black",
            margin: "5%",
            borderRadius: "30px",
            backgroundColor: "black",
          }}
        >
          <Row className={HowItWorkCss.modernizationDesktopView}>
            {[{"firstHead" : "Define", "secondHead" : "Connect"}, {"firstHead" : "Analyze", "secondHead" : "Design"}, {"firstHead" : "Transform", "secondHead" : "Validate"}]
              .map((e) => {
                return (
                  <>
                    <Col
                      offset={3}
                      span={18}
                      className={HowItWorkCss.ModernizationWorksStepsDetails}
                    >
                      <h1 style={{color: '#E74860', fontWeight: '600'}}><i>{e.firstHead}</i></h1>
                      <ModernizationWorksStepsDetailsRtol
                        HowItWorkCss={HowItWorkCss}
                      />
                    </Col>
                    <Col
                      offset={3}
                      span={18}
                      className={HowItWorkCss.ModernizationWorksStepsDetails}
                    >
                      <h1 style={{color: '#E74860', fontWeight: '600', textAlign: 'right'}}><i>{e.secondHead}</i></h1>
                      <ModernizationWorksStepsDetailsLtoR
                        HowItWorkCss={HowItWorkCss}
                      />
                    </Col>
                  </>
                );
              })}
          </Row>

          <Row className={HowItWorkCss.modernizationMobileiew}>
            {[{"header": "Define"}, {"header": "Connect"}, {"header": "Analyze"}, {"header": "Design"}, {"header": "Transform"}, {"header": "Validate"}]
              .map((e) => {
                return (
                  <>
                    <Col
                      offset={3}
                      span={18}
                      className={HowItWorkCss.ModernizationWorksStepsDetails}
                    >
                      <h2 style={{color: '#E74860', fontWeight: '600', textAlign:'center'}}><i>{e.header}</i></h2>
                      <ModernizationWorksStepsDetailsTtob
                        HowItWorkCss={HowItWorkCss}
                      />
                    </Col>
                  </>
                );
              })}
          </Row>
        </div>

        <Col span={24} className={HowItWorkCss.enterpriseChallengeColFooter}>
          <div>
            <h1>
              Experience transformation for your data warehouse, ETL, or
              analytics system
            </h1>
            <Button danger className={HowItWorkCss.enterpriseChallengeColFooterButton}>
              Book a free Demo
            </Button>
          </div>
        </Col>
      </div>
    </Row>
  );
}
