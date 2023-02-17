import { useState, useRef, useEffect } from "react";
import ReactFlow from "reactflow";
import { Image } from "antd";
import "reactflow/dist/style.css";

function ModernizationWorksStepsDetailsTtob({data, HowItWorkCss,image}) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setWidth(ref?.current?.clientWidth);
    setHeight(ref?.current?.clientHeight);

    setNodes([
      {
        className: "textBoxMain",
        id: "1",
        sourcePosition: "bottom",
        position: { x: 0, y: 0 },
        data: {
          label: <Image src={image} />,
        },
      },
      {
        className: "textBox",
        id: "2",
        targetPosition: "top",
        sourcePosition:"bottom",
        position: {
          x: 0,
          y: width-120,
        },
        data: { label: <p style={{fontWeight : "bold"}} className={HowItWorkCss.textBoxText}>{data?.first}</p> },
      },
      {
        className: "textBox",
        id: "3",
        targetPosition: "top",
        sourcePosition:"top",
        position: {
          x: 0,
          y: width ,
        },
        data: { label: <p style={{fontWeight : "bold"}} className={HowItWorkCss.textBoxText}>{data?.second}</p> },
      }
    ]);

    setEdges([
      {
        id: "e1",
        source: "1",
        target: "2",
        animated: true,
        type: "smoothstep",
        style: { stroke: '#E74860' },
      },
      {
        id: "e2",
        source: "2",
        target: "3",
        animated: true,
        type: "smoothstep",
        style: { stroke: '#E74860' },
      }
    ]);
  },[ref.current]);

  return (
    <div ref={ref} style={{ height: "60vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        attributionPosition="none"
      />
    </div>
  );
}

export default ModernizationWorksStepsDetailsTtob;
