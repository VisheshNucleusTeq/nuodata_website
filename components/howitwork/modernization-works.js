import { Col, Row, Button, Image } from "antd";
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
          </div>
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
            {[
              {
                firstHead: "Define",
                secondHead: "Connect",
                firstImage: "define-red.png",
                secondImage: "connect-red.png",
                firstData: {
                  image : "/how_it_work/image (3).png",
                  first:
                    "Create modernization projects at business unit level(s)",
                  second:
                    "Select any source and any target platform for your modernization",
                },
                secondData: {
                  image : "/how_it_work/image (4).png",
                  first: "Connect with source platform(s)",
                  second: "Upload ETLs, & configuration files",
                },
              },
              {
                firstHead: "Analyze",
                secondHead: "Design",
                firstImage: "analyze-red.png",
                secondImage: "design-red.png",
                firstData: {
                  image : "/how_it_work/image (7).png",
                  first: "Analyze workloads & transformations",
                  second: "Identify cost & effort savings",
                },
                secondData: {
                  image : "/how_it_work/image (8).png",
                  first: "Create single version of truth",
                  second: "Optimize queries & ETLs with self service UI",
                },
              },
              {
                firstHead: "Transform",
                secondHead: "Validate",
                firstImage: "transform-red.png",
                secondImage: "validate-red.png",
                firstData: {
                  image : "/how_it_work/image 11.png",
                  first: "Transform workloads to your choice of cloud",
                  second: "Optimize queries on target platform(s)",
                },
                secondData: {
                  image : "/how_it_work/image (10).png",
                  first: "Self service validation of transformed workloads",
                  second: "UI driven workflow for QA",
                },
              },
              {
                firstHead: "Rollout",
                firstImage: "rollout-red.png",
                firstData: {
                  image : "/how_it_work/step.png",
                  first: "Transform workloads to your choice of cloud",
                  second: "Optimize queries on target platform(s)",
                },
              },
            ].map((e) => {
              return (
                <>
                  {e.firstData && (
                    <Col
                      key={(Math.random() + 1).toString(36).substring(7)}
                      offset={1}
                      span={18}
                      className={HowItWorkCss.ModernizationWorksStepsDetails}
                    >
                      <h1 style={{ color: "#E74860", fontWeight: "600" }}>
                        <Image
                          width={40}
                          src={`/how_it_work/${e.firstImage}`}
                        />
                        <span style={{ marginLeft: "1%" }}>
                          <i>{e.firstHead}</i>
                        </span>
                      </h1>
                      <ModernizationWorksStepsDetailsRtol
                        HowItWorkCss={HowItWorkCss}
                        data={e.firstData}
                      />
                    </Col>
                  )}
                  {e.secondHead && (
                    <Col
                      key={(Math.random() + 1).toString(36).substring(7)}
                      offset={1}
                      span={22}
                      className={HowItWorkCss.ModernizationWorksStepsDetails}
                    >
                      <h1
                        style={{
                          color: "#E74860",
                          fontWeight: "600",
                          textAlign: "right",
                        }}
                      >
                        <Image
                          width={40}
                          src={`/how_it_work/${e.secondImage}`}
                        />
                        <span style={{ marginLeft: "1%" }}>
                          <i>{e.secondHead}</i>
                        </span>
                      </h1>
                      <ModernizationWorksStepsDetailsLtoR
                        HowItWorkCss={HowItWorkCss}
                        data={e.secondData}
                      />
                    </Col>
                  )}
                </>
              );
            })}
          </Row>

          <Row className={HowItWorkCss.modernizationMobileiew}>
            {[
              {
                header: "Define",
                data: {
                  first:
                    "Create modernization projects at business unit level(s)",
                  second:
                    "Select any source and any target platform for your modernization",
                },
              },
              {
                header: "Connect",
                data: {
                  first: "Connect with source platform(s)",
                  second: "Upload ETLs, & configuration files",
                },
              },
              {
                header: "Analyze",
                data: {
                  first: "Analyze workloads & transformations",
                  second: "Identify cost & effort savings",
                },
              },
              {
                header: "Design",
                data: {
                  first: "Create single version of truth",
                  second: "Optimize queries & ETLs with self service UI",
                },
              },
              {
                header: "Transform",
                data: {
                  first: "Transform workloads to your choice of cloud",
                  second: "Optimize queries on target platform(s)",
                },
              },
              {
                header: "Validate",
                data: {
                  first: "Self service validation of transformed workloads",
                  second: "UI driven workflow for QA",
                },
              },
              {
                header: "Rollout",
                data: {
                  first: "Transform workloads to your choice of cloud",
                  second: "Optimize queries on target platform(s)",
                },
              },
            ].map((e) => {
              return (
                <>
                  <Col
                    offset={1}
                    span={22}
                    className={HowItWorkCss.ModernizationWorksStepsDetails}
                  >
                    <h2
                      style={{
                        color: "#E74860",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      <Image
                        width={40}
                        src={`/how_it_work/${e.header}-red.png`}
                      />
                      <span style={{ marginLeft: "1%" }}>
                        <i>{e.header}</i>
                      </span>
                    </h2>
                    <ModernizationWorksStepsDetailsTtob
                      HowItWorkCss={HowItWorkCss}
                      data={e.data}
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
            <Button className={HowItWorkCss.enterpriseChallengeColFooterButton}>
              Book a free Demo
            </Button>
          </div>
        </Col>
      </div>
    </Row>
  );
}
