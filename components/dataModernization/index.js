import { Col, Row } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

// import Define from "./define";
// import Connect from "./connect";
// import Analyze from "./analyze";
// import Transform from "./transform";
// import Design from "./design";
// import Validate from "./validate";
// import Rollout from "./rollout";

import Loading from "./loading";
const Define = dynamic(() => import("./define"), {
  loading: () => <Loading />,
});
const Connect = dynamic(() => import("./connect"), {
  loading: () => <Loading />,
});
const Analyze = dynamic(() => import("./analyze"), {
  loading: () => <Loading />,
});
const Transform = dynamic(() => import("./transform"), {
  loading: () => <Loading />,
});
const Design = dynamic(() => import("./design"), {
  loading: () => <Loading />,
});
const Validate = dynamic(() => import("./validate"), {
  loading: () => <Loading />,
});
const Rollout = dynamic(() => import("./rollout"), {
  loading: () => <Loading />,
});

import { SetTabTypeAction } from "../../Redux/action";
import dataModernizationCss from "../../styles/dataModernization.module.css";

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
