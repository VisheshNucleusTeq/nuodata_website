import { Row, Col } from "antd";
import HowItWorkCss from "../../styles/HowItWork.module.css";
import Info from "./info";
import LeftTextComp from "./left-text-component";
import RightTextComp from "./right-text-component";
import Footer from "../common/footer";

export default function HowItWork() {
  const leftTextData = [
    {
      bgColor1: "#ff8860",
      bgColor2: "#fff281",
      iconSrc: "/all-graph/how_it_work/define/demo/define-icon.html",
      title: "Define",
      description:
        "Create modernization projects at business unit level(s) Select any source and any target platform for your modernization",
      pipelineImgSrc: "/how_it_work/yellow-pipeline.png",
      graphSrc: "/all-graph/how_it_work/define/demo/define.html",
    },
    {
      bgColor1: "#6015E2",
      bgColor2: "#FB4794",
      iconSrc: "/all-graph/how_it_work/connect/demo/connect-icon.html",
      title: "Connect",
      description:
        "Connect with source platform(s) Upload ETLs & configuration files",
      pipelineImgSrc: "/how_it_work/purple-pipeline.png",
      graphSrc: "/all-graph/how_it_work/connect/demo/data.html",
    },
    {
      bgColor1: "#ff8860",
      bgColor2: "#fff281",
      iconSrc: "/all-graph/how_it_work/analyze/analyze-icon/demo/data.html",
      title: "Analyze",
      description:
        "Analyze workloads & transformations Identify cost & effort savings",
      pipelineImgSrc: "/how_it_work/yellow-pipeline.png",
      graphSrc: "/all-graph/how_it_work/analyze/demo/data.html",
    },
    {
      bgColor1: "#29D5A6",
      bgColor2: "#29B8EF",
      iconSrc: "/all-graph/how_it_work/design/design-icon/demo/data.html",
      title: "Design",
      description:
        "Create a single version of truth Optimize queries & ETLs with self service UI",
      pipelineImgSrc: "/how_it_work/green-pipeline.png",
      graphSrc: "/all-graph/how_it_work/design/demo/data.html",
    },
    {
      bgColor1: "#ff8860",
      bgColor2: "#fff281",
      iconSrc: "/all-graph/how_it_work/transform/demo/transform-icon.html",
      title: "Transform",
      description:
        "Create modernization projects at business unit evel(s) Select any source and any target platform for your modernization",
      pipelineImgSrc: "/how_it_work/yellow-pipeline.png",
      graphSrc: "/all-graph/how_it_work/transform/demo/data.html",
    },
    {
      bgColor1: "#6015E2",
      bgColor2: "#FB4794",
      iconSrc: "/all-graph/how_it_work/validate/demo/validate-icon.html",
      title: "Validate",
      description:
        "Validate your transformation and check out exceptions, if any",
      pipelineImgSrc: "/how_it_work/purple-pipeline.png",
      graphSrc: "/all-graph/how_it_work/validate/demo/data.html",
    },
    {
      bgColor1: "#29D5A6",
      bgColor2: "#29B8EF",
      iconSrc: "/all-graph/how_it_work/rollout/demo/rollout-icon.html",
      title: "Rollout",
      description:
        "Get ready to deploy directly in the target platform of choice",
      pipelineImgSrc: "/how_it_work/green-pipeline.png",
      graphSrc: "/all-graph/how_it_work/rollout/demo/data.html",
    },
  ];

  return (
    <>
      <Info HowItWorkCss={HowItWorkCss} />
      {/* <ModernizationWorks HowItWorkCss={HowItWorkCss} /> */}
      <Row justify={"center"} align={"middle"}>
        <Col
          xs={22}
          sm={22}
          md={22}
          lg={20}
          xl={20}
          className={HowItWorkCss.mainCol}
        >
          <h1>
            Industry Leading <span>Modernization.</span>
          </h1>

          {leftTextData.map((data, index) => {
            const Component = index % 2 === 0 ? LeftTextComp : RightTextComp;
            return (
              <Component
                key={index}
                iconSrc={data.iconSrc}
                title={data.title}
                description={data.description}
                pipelineImgSrc={data.pipelineImgSrc}
                graphSrc={data.graphSrc}
                bgColor1={data.bgColor1}
                bgColor2={data.bgColor2}
              />
            );
          })}
        </Col>
      </Row>
      <Footer />
    </>
  );
}
