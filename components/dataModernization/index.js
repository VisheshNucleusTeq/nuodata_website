import { Col, Divider, Row, Space } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

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
import { CheckCircleFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import ConnectNew from "./connect-new";
import AnalyzeHadoop from "./analyzeHadoop";

export default function DataModernization() {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const tabType = useSelector((state) => state.tabType.tabType);
  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );

  const [tabs, setTabs] = useState([
    "Define",
    "Connect",
    "Analyze",
    "Design",
    "Transform",
    "Validate",
    "Rollout",
  ]);

  useEffect(() => {
    if (query?.tab) {
      dispatch(SetTabTypeAction(query?.tab));
    }
  }, [query?.tab]);
  return (
    <>
      <div
        className={dataModernizationCss.main}
        style={{ borderRadius: "5px" }}
      >
        <Row>
          {projectDetails && projectDetails?.name && (
            <Col span={24} className={dataModernizationCss.projectName}>
              <span>
                Name:&nbsp;
                <a>{projectDetails?.name}</a>
              </span>
            </Col>
          )}
          <Divider style={{ margin: "0vh 0vh 1vh 0vh" }}></Divider>
          <Col span={24} className={dataModernizationCss.projectStepsRow}>
            <Row align={"space-between"} style={{ width: "100%" }}>
              {tabs.map((data, i) => {
                return (
                  <>
                    <Col
                      className={dataModernizationCss.stepsIcon}
                      onClick={() => {
                        if (query?.id ? query?.id : projectDetails?.projectId) {
                          dispatch(SetTabTypeAction(data));
                        }
                      }}
                      style={{
                        width: `10%`,
                        border: `1px solid ${
                          tabs.indexOf(tabType) >= i ? "green" : "gray"
                        }`,
                      }}
                    >
                      <Space className={dataModernizationCss.stepsIcon_text}>
                        <CheckCircleFilled
                          style={{
                            fontSize: "1vw",
                            color:
                              tabs.indexOf(tabType) >= i ? "green" : "gray",
                          }}
                          twoToneColor="#fff"
                        />
                        <span
                          style={{
                            fontSize: "1vw",
                            color:
                              tabs.indexOf(tabType) >= i ? "green" : "gray",
                          }}
                        >
                          {data}
                        </span>
                      </Space>
                    </Col>
                    {[0, 1, 2, 3, 4, 5].includes(i) ? (
                      <Col
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: `${30 / 6}%`,
                        }}
                      >
                        <div
                          style={{
                            border: `1px dashed ${
                              tabs.indexOf(tabType) > i ? "green" : "gray"
                            }`,
                            width: "100%",
                          }}
                        ></div>
                      </Col>
                    ) : null}
                  </>
                );
              })}
            </Row>
          </Col>
          <Divider style={{ margin: "0vh 0vh 1vh 0vh" }}></Divider>
          <Col span={24}>
            {tabType === "Define" && (
              <Define dataModernizationCss={dataModernizationCss} />
            )}
            {tabType === "Connect" &&
              (/hadoop/i.test(projectDetails?.sourcePlatform) ? (
                <ConnectNew dataModernizationCss={dataModernizationCss} />
              ) : (
                <Connect dataModernizationCss={dataModernizationCss} />
              ))}
            {tabType === "Analyze" &&
              (/hadoop/i.test(projectDetails?.sourcePlatform) ? (
                <AnalyzeHadoop dataModernizationCss={dataModernizationCss} />
              ) : (
                <Analyze dataModernizationCss={dataModernizationCss} />
              ))}
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
          </Col>
        </Row>
      </div>
    </>
    // <>
    //   <h1 className={dataModernizationCss.projectName}>
    //     {projectDetails && projectDetails?.name ? projectDetails.name : ""}
    //   </h1>
    //   <div className={dataModernizationCss.defineSteps}>
    //     <Row align="middle" className={dataModernizationCss.defineStepsRow}>
    //       {[
    //         "Define",
    //         "Connect",
    //         "Analyze",
    //         "Design",
    //         "Transform",
    //         "Validate",
    //         "Rollout",
    //       ].map((data, i) => {
    //         return (
    //           <Col
    //             key={(Math.random() + 1).toString(36).substring(7)}
    //             onClick={() => {
    //               if (query?.id ? query?.id : projectDetails?.projectId) {
    //                 dispatch(SetTabTypeAction(data));
    //               }
    //             }}
    //             xs={12}
    //             sm={7}
    //             md={7}
    //             lg={3}
    //             xl={3}
    //             xxl={3}
    //             className={`${dataModernizationCss.defineStep} ${
    //               tabType == data && dataModernizationCss.defineStepSelect
    //             }`}
    //           >
    //             {data}
    //           </Col>
    //         );
    //       })}
    //     </Row>
    //   </div>

    //   {tabType === "Define" && (
    //     <Define dataModernizationCss={dataModernizationCss} />
    //   )}
    //   {tabType === "Connect" && (
    //     <Connect dataModernizationCss={dataModernizationCss} />
    //   )}
    //   {tabType === "Analyze" && (
    //     <Analyze dataModernizationCss={dataModernizationCss} />
    //   )}
    //   {tabType === "Design" && (
    //     <Design dataModernizationCss={dataModernizationCss} />
    //   )}
    //   {tabType === "Transform" && (
    //     <Transform dataModernizationCss={dataModernizationCss} />
    //   )}
    //   {tabType === "Validate" && (
    //     <Validate dataModernizationCss={dataModernizationCss} />
    //   )}
    //   {tabType === "Rollout" && (
    //     <Rollout dataModernizationCss={dataModernizationCss} />
    //   )}
    // </>
  );
}
