import React, { useState } from "react";
import { Row, Col, Image, Divider } from "antd";
import Draggable from "react-draggable";
import EdgesFlow from "../reactflow";
import Source from "../configView/source/index";

const Build = ({ ingestionCss }) => {
  const [nodeData, setNodeData] = useState([
    {
      text: "Source",
      id: `edges-source`,
      data: { label: "source" },
      position: { x: 0, y: 150 },
      type: "textUpdaterSource",
      key: (Math.random() + 1).toString(36).substring(7),
    },
    {
      text: "Target",
      id: `edges-target`,
      data: { label: "target" },
      position: { x: 180, y: 150 },
      type: "textUpdaterTarget",
      key: (Math.random() + 1).toString(36).substring(7),
    },
  ]);
  const [visible, setVisible] = useState(false);
  const [nodePosition, setNodePosition] = useState({});

  return (
    <>
      <div className={ingestionCss.pipelineSteps}>
        <Row justify="space-between">
          {[
            "Source",
            "Joiner",
            "Normalizer",
            "Router",
            "Rank",
            "Sequence",
            "Sorter",
            "SQL",
            "Union",
            "Lookup",
            "Filter",
            "Expression",
            "Aggregator",
            "Target",
          ].map((e) => {
            return (
              <Draggable
                position={{ x: 0, y: 0 }}
                onStart={(eData) => {
                  console.log("onStart", e);
                }}
                onDrag={(eData) => {
                  console.log("onDrag", e);
                }}
                onStop={(eData) => {
                  if (visible) {
                    setNodeData([
                      ...nodeData,
                      {
                        text: e,
                        id: `edges-${nodeData.length - 2}-${(Math.random() + 1).toString(36).substring(7)}`, //(Math.random() + 1).toString(36).substring(7),
                        nodePosition: nodePosition,
                        key: (Math.random() + 1).toString(36).substring(7),
                      },
                    ]);
                  }
                }}
              >
                <Col className={ingestionCss.pipelineStepTab}>
                  <Row>
                    <Col span={24} className={ingestionCss.pipelineStepTabIcon}>
                      <Image
                        preview={false}
                        src={`/pipelines_icon/${e}.png`}
                        width={"1.8vw"}
                        height={"1.8vw"}
                      />
                    </Col>
                    <Col span={24} className={ingestionCss.pipelineStepTabText}>
                      <span>{e}</span>
                    </Col>
                  </Row>
                </Col>
              </Draggable>
            );
          })}
        </Row>

        <Row
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          <Col span={24} style={{ height: "40vh" }}>
            <EdgesFlow
              nodeData={nodeData}
              setNodeData={setNodeData}
              setNodePosition={(e) => {
                setNodePosition(e);
              }}
            />
          </Col>
        </Row>
        <Divider />
        <Source ingestionCss={ingestionCss} />
      </div>
    </>
  );
};

export default Build;
