import { useState, useRef, useEffect } from "react";
import ReactFlow from "reactflow";
import { Image } from "antd";
import "reactflow/dist/style.css";

function ModernizationWorksStepsDetailsLtoR({data, HowItWorkCss}) {
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
        sourcePosition: "left",
        targetPosition:"left",
        position: { x: ref.current.clientWidth - (ref.current.clientWidth / 100) * 45, y: 0 },
        data: {
          label: <Image src={data?.image} />,
        },
      },
      {
        className: "textBox",
        id: "2",
        sourcePosition: "right",
        targetPosition: "right",
        position: {
          x: 50,
          y: 0,
        },
        data: { label: <p style={{fontWeight : "bold"}} className={HowItWorkCss.textBoxText}>{data?.first}</p> },
      },
      {
        className: "textBox",
        id: "4",
        sourcePosition: "right",
        targetPosition: "right",
        position: {
          x: 0,
          y: 170,
        },
        data: { label: <p style={{fontWeight : "bold"}} className={HowItWorkCss.textBoxText}>{data?.second}</p> },
      }
    ]);

    setEdges([
      { id: "e1", source: "1", target: "2", animated: true, style: { stroke: '#E74860' }, },
      { id: "e2", source: "1", target: "3", animated: true, style: { stroke: '#E74860' }, },
      { id: "e3", source: "1", target: "4", animated: true, style: { stroke: '#E74860' }, }
    ]);
  },[]);

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
        attributionPosition="none"
      />
    </div>
  );
}

export default ModernizationWorksStepsDetailsLtoR;