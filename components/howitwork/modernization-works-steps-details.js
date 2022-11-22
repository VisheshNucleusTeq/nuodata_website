import { useState, useRef, useEffect } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow";
import { Image } from "antd";

import "reactflow/dist/style.css";

const initialNodes = [
  {
    className: "textBoxMain",
    id: "1",
    sourcePosition: "right",
    position: { x: 0, y: 0 },
    data: {
      label: <Image src="./\how_it_work/step.png" />,
    },
  },
  {
    className: "textBox",
    id: "2",
    targetPosition: "left",
    position: { x: 800, y: 25 },
    data: { label: "Analyzes workloads and identifies interdependencies" },
  },
  {
    className: "textBox",
    id: "3",
    targetPosition: "left",
    position: { x: 800, y: 125 },
    data: { label: "Analyzes workloads and identifies interdependencies" },
  },
  {
    className: "textBox",
    id: "4",
    targetPosition: "left",
    position: { x: 800, y: 200 },
    data: { label: "Analyzes workloads and identifies interdependencies" },
  },

    {
      className: "textBoxMain",
      id: "5",
      sourcePosition: "left",
      position: { x: 680, y: 400 },
      data: {
        label: <Image src="./\how_it_work/step.png" />,
      },
    },

    {
      className: "textBox",
      id: "6",
      targetPosition: "right",
      position: { x: 0, y: 425 },
      data: { label: "Analyzes workloads and identifies interdependencies" },
    },
    {
      className: "textBox",
      id: "7",
      targetPosition: "right",
      position: { x: 0, y: 525 },
      data: { label: "Analyzes workloads and identifies interdependencies" },
    },
    {
      className: "textBox",
      id: "8",
      targetPosition: "right",
      position: { x: 0, y: 600 },
      data: { label: "Analyzes workloads and identifies interdependencies" },
    },
];

const initialEdges = [
  { id: "e1", source: "1", target: "2", animated: true },
  { id: "e2", source: "1", target: "3", animated: true },
  { id: "e3", source: "1", target: "4", animated: true },

  { id: "e4", source: "5", target: "6", animated: true },
  { id: "e5", source: "5", target: "7", animated: true },
  { id: "e6", source: "5", target: "8", animated: true },
];

export default function ModernizationWorksStepsDetails() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setWidth(ref.current.clientWidth);
  });

  return (
    <div ref={ref} style={{ height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
      />
    </div>
  );
}
