import React from "react";
import { Steps, Popover, Image } from "antd";
import { LineOutlined } from "@ant-design/icons";

export default function ModernizationWorksSteps({ HowItWorkCss, direction }) {
  const customDot = (dot, { status, index }) => (
    <Popover content={<span>step {index + 1}</span>}>
      <span style={{ color: "#FFF" }}>
        {direction !== "vertical" ? "|" : <LineOutlined />}{" "}
      </span>
    </Popover>
  );
  const getContent = (ImageName, title) => {
    return (
      <div style={{ color: "#0c3246", marginTop: "10%" }}>
        <Image
          preview={false}
          width={"50%"}
          src={`/how_it_work/${ImageName}`}
        />
        <p style={{ marginTop: "10%" }}>{title}</p>
      </div>
    );
  };

  return (
    <>
      <Steps
        current={0}
        direction={direction}
        progressDot={customDot}
        className="modernizationWorks"
        items={[
          {
            title: getContent("define-color.png", "Define"),
            description: <p style={{color : "#0c3246"}}>Complete analysis of workloads, code profiling, and dependencies with actionable recommendations</p>
          },
          {
            title: getContent("connect-color.png", "Connect"),
            description: <p style={{color : "#0c3246"}}>Complete analysis of workloads, code profiling, and dependencies with actionable recommendations</p>
          },
          {
            title: getContent("analyze-color.png", "Analyze"),
            description: <p style={{color : "#0c3246"}}>Complete analysis of workloads, code profiling, and dependencies with actionable recommendations</p>
          },
          {
            title: getContent("design-color.png", "Design"),
            description: <p style={{color : "#0c3246"}}>Complete analysis of workloads, code profiling, and dependencies with actionable recommendations</p>
          },
          {
            title: getContent("transform-color.png", "Transform"),
            description: <p style={{color : "#0c3246"}}>Complete analysis of workloads, code profiling, and dependencies with actionable recommendations</p>
          },
          {
            title: getContent("validate-color.png", "Validate"),
            description: <p style={{color : "#0c3246"}}>Complete analysis of workloads, code profiling, and dependencies with actionable recommendations</p>
          },
          {
            title: getContent("rollout-color.png", "Rollout"),
            description: <p style={{color : "#0c3246"}}>Complete analysis of workloads, code profiling, and dependencies with actionable recommendations</p>
          },
        ]}
      />
    </>
  );
}
