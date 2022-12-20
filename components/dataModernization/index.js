import dataModernizationCss from "../../styles/dataModernization.module.css";
import { Button, Row, Col } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SetTabTypeAction } from "../../Redux/action";
import Define from "./define";
import Connect from "./connect";
import Analyze from "./analyze";
import Transform from "./transform";

export default function DataModernization() {
  const dispatch = useDispatch();
  const tabType = useSelector((state) => state.tabType.tabType);
  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );

  return (
    <>
      <h1 className={dataModernizationCss.projectName}>
        {projectDetails && projectDetails?.name ? projectDetails.name : ""}
      </h1>
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
                  dispatch(SetTabTypeAction(data));
                }}
                xs={12}
                sm={7}
                md={7}
                lg={3}
                xl={3}
                xxl={3}
                className={`${dataModernizationCss.defineStep} ${
                  tabType == data && dataModernizationCss.defineStepSelect
                }`}
              >
                {data}
              </Col>
            );
          })}
        </Row>
      </div>

      {tabType === "Define" && (
        <Define dataModernizationCss={dataModernizationCss} />
      )}
      {tabType === "Connect" && (
        <Connect dataModernizationCss={dataModernizationCss} />
      )}
      {tabType === "Analyze" && (
        <Analyze dataModernizationCss={dataModernizationCss} />
      )}

      {tabType === "Transform" && (
        <Transform dataModernizationCss={dataModernizationCss} />
      )}
    </>
  );
}
