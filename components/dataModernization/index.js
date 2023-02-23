import dataModernizationCss from "../../styles/dataModernization.module.css";

import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";

import Define from "./define";
import Connect from "./connect";
import Analyze from "./analyze";
import Transform from "./transform";
import Design from "./design";
import Validate from "./validate";
import Rollout from "./Rollout";

import {
  SetTabTypeAction,
  SetProjectTransformDetailsAction,
} from "../../Redux/action";
import { useRouter } from "next/router";

export default function DataModernization() {
  const { query } = useRouter();

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
                key={(Math.random() + 1).toString(36).substring(7)}
                onClick={() => {
                  if (query?.id ? query?.id : projectDetails?.projectId) {
                    dispatch(SetProjectTransformDetailsAction({}));
                    dispatch(SetTabTypeAction(data));
                  }
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
      {tabType === "Design" && (
        <Design dataModernizationCss={dataModernizationCss} />
      )}
      {tabType === "Transform" && (
        <Transform dataModernizationCss={dataModernizationCss} />
      )}
      {tabType === "Validate" && (
        <Validate dataModernizationCss={dataModernizationCss} />
      )}
      {tabType === "Rollout" && (
        <Rollout dataModernizationCss={dataModernizationCss} />
      )}
    </>
  );
}
