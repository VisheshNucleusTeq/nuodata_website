import { useCallback, useState } from "react";
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
} from "react-flow-renderer";
import { ArrowRightOutlined } from "@ant-design/icons";

function EnterpriseChallengeDesktopChart({ HomeCss }) {
  const node = (text) => {
    return (
      <div className={HomeCss.node}>
        <div className={HomeCss.nodesChild}>
          <div className={HomeCss.nodesText} style={{ height: "20%" }}></div>
          <div className={HomeCss.nodesText} style={{ height: "60%" }}>
            {text}
          </div>
          <div className={HomeCss.nodesText} style={{ height: "20%" }}>
            <ArrowRightOutlined style={{ color: "#e74860" }} />
          </div>
        </div>
      </div>
    );
  };

  const [nodes, setNodes] = useState([
    {
      id: "1",
      type: "input",
      data: {
        label: node("No SME knowledge to bridge source & target tech-stack"),
      },
      position: { x: -200, y: 0 },
      sourcePosition: "right",
      targetPosition: "left",
      className: "circle",
    },
    {
      id: "2",
      data: {
        label: node("Time consuming, manual & error prone"),
      },
      position: { x: 0, y: 0 },
      sourcePosition: "right",
      targetPosition: "left",
      className: "circle",
    },
    {
      id: "3",
      data: {
        label: node(
          "Majority of the data, ETL & queries are not used, redundant or duplicate"
        ),
      },
      position: { x: 200, y: 0 },
      sourcePosition: "right",
      targetPosition: "left",
      className: "circle",
    },
    {
      id: "4",
      data: {
        label: node("There is no merit in simply dumping the data to cloud"),
      },
      position: { x: 400, y: 0 },
      sourcePosition: "right",
      targetPosition: "left",
      className: "circle",
    },
    {
      id: "5",
      type: "output",
      data: {
        label: node("Maintainability in the target environment"),
      },
      position: { x: 600, y: 0 },
      sourcePosition: "right",
      targetPosition: "left",
      className: "circle",
    },
  ]);

  const [edges, setEdges] = useState([
    { id: "e1-1", source: "1", target: "2", animated: true },
    { id: "e2-2", source: "2", target: "3", animated: true },
    { id: "e2-3", source: "3", target: "4", animated: true },
    { id: "e2-4", source: "4", target: "5", animated: true },
  ]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      style={{}}
      nodes={nodes}
      edges={edges}
      // onNodesChange={onNodesChange}
      // onEdgesChange={onEdgesChange}
      fitView
      panOnDrag={false}
      zoomOnScroll={false}
      zoomOnPinch={false}
      zoomOnDoubleClick={false}
      preventScrolling={false}
      attributionPosition="bottom-left"
    />
  );
}

export default EnterpriseChallengeDesktopChart;