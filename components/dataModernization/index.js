import dataModernizationCss from "../../styles/dataModernization.module.css";
import { Button, Row, Col } from "antd";
import { useState } from "react";

import Define from "./define";
import Connect from "./connect";
import Analyze from "./analyze";

export default function DataModernization() {
  const [step, setStep] = useState("Define");

  const changeStep = (step) => {
    setStep(step);
  };

  return (
    <>
      {/* <Button
        type="primary"
        danger
        className={dataModernizationCss.newProjectBtn}
      >
        New Project +
      </Button> */}

      <div className={dataModernizationCss.defineSteps}>
        <Row align="middle" className={dataModernizationCss.defineStepsRow}>
          {[
            "Define",
            "Connect",
            "Analyze",
            "Design",
            "Transform",
            "Validate",
            "Rollout",
          ].map((data, i) => {
            return (
              <Col
                onClick={() => {
                  setStep(data);
                }}
                xs={12}
                sm={7}
                md={7}
                lg={3}
                xl={3}
                xxl={3}
                className={`${dataModernizationCss.defineStep} ${
                  step == data && dataModernizationCss.defineStepSelect
                }`}
              >
                {data}
              </Col>
            );
          })}
        </Row>
      </div>

      {step === "Define" && (
        <Define
          dataModernizationCss={dataModernizationCss}
          changeStep={changeStep}
        />
      )}
      {step === "Connect" && (
        <Connect
          dataModernizationCss={dataModernizationCss}
          changeStep={changeStep}
        />
      )}
      {step === "Analyze" && (
        <Analyze
          dataModernizationCss={dataModernizationCss}
          changeStep={changeStep}
        />
      )}
    </>
  );
}
