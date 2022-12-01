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
      <div style={{ color: "#FFF", marginTop: "10%" }}>
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
            title: getContent("define.png", "Define"),
            description:
              "Complete analysis of workloads, code profiling, and dependencies with actionable recommendations",
          },
          {
            title: getContent("connect.png", "Connect"),
            description:
              "Complete analysis of workloads, code profiling, and dependencies with actionable recommendations",
          },
          {
            title: getContent("analyze.png", "Analyze"),
            description:
              "Complete analysis of workloads, code profiling, and dependencies with actionable recommendations",
          },
          {
            title: getContent("design.png", "Design"),
            description:
              "Complete analysis of workloads, code profiling, and dependencies with actionable recommendations",
          },
          {
            title: getContent("transform.png", "Transform"),
            description:
              "Complete analysis of workloads, code profiling, and dependencies with actionable recommendations",
          },
          {
            title: getContent("validate.png", "Validate"),
            description:
              "Complete analysis of workloads, code profiling, and dependencies with actionable recommendations",
          },
          {
            title: getContent("rollout.png", "Rollout"),
            description:
              "Complete analysis of workloads, code profiling, and dependencies with actionable recommendations",
          },
        ]}
      />
    </>
  );
}
