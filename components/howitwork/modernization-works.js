import { Col, Row } from "antd";
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
            <h1>
              How our end-to-end <br /> modernization works:
            </h1>
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

        <Row className={HowItWorkCss.modernizationDesktopView}>
          {Array(3)
            .fill(undefined)
            .map(() => {
              return (
                <>
                  <Col
                    offset={3}
                    span={18}
                    className={HowItWorkCss.ModernizationWorksStepsDetails}
                  >
                    <ModernizationWorksStepsDetailsRtol
                      HowItWorkCss={HowItWorkCss}
                    />
                  </Col>
                  <Col
                    offset={3}
                    span={18}
                    className={HowItWorkCss.ModernizationWorksStepsDetails}
                  >
                    <ModernizationWorksStepsDetailsLtoR
                      HowItWorkCss={HowItWorkCss}
                    />
                  </Col>
                </>
              );
            })}
        </Row>

        <Row className={HowItWorkCss.modernizationMobileiew}>
          {Array(6)
            .fill(undefined)
            .map(() => {
              return (
                <>
                  <Col
                    offset={3}
                    span={18}
                    className={HowItWorkCss.ModernizationWorksStepsDetails}
                  >
                    <ModernizationWorksStepsDetailsTtob
                      HowItWorkCss={HowItWorkCss}
                    />
                  </Col>
                </>
              );
            })}
        </Row>
      </div>
    </Row>
  );
}
