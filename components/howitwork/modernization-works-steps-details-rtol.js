import { useState, useRef, useEffect } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow";
import { Image } from "antd";
import "reactflow/dist/style.css";

function ModernizationWorksStepsDetailsRtol(props) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);

    setNodes([
      {
        className: "textBoxMain",
        id: "1",
        sourcePosition: "right",
        position: { x: 0, y: 0 },
        data: {
          label: <Image src="./how_it_work/step.png" />,
        },
      },
      {
        className: "textBox",
        id: "2",
        targetPosition: "left",
        position: {
          x: ref.current.clientWidth - (ref.current.clientWidth / 100) * 30,
          y: 0,
        },
        data: { label: "Analyzes workloads and identifies interdependencies" },
      },
      {
        className: "textBox",
        id: "3",
        targetPosition: "left",
        position: {
          x: ref.current.clientWidth - (ref.current.clientWidth / 100) * 30,
          y: 90,
        },
        data: { label: "Analyzes workloads and identifies interdependencies" },
      },

      {
        className: "textBox",
        id: "4",
        targetPosition: "left",
        position: {
          x: ref.current.clientWidth - (ref.current.clientWidth / 100) * 30,
          y: 210,
        },
        data: { label: "Analyzes workloads and identifies interdependencies" },
      },
    ]);

    setEdges([
      { id: "e1", source: "1", target: "2", animated: true },
      { id: "e2", source: "1", target: "3", animated: true },
      { id: "e3", source: "1", target: "4", animated: true },
    ]);
  });

  return (
    <div ref={ref} style={{ height: "50vh" }}>
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

export default ModernizationWorksStepsDetailsRtol;