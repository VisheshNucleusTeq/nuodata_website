import { useState, useRef, useEffect } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow";
import { Image } from "antd";
import "reactflow/dist/style.css";

function ReactFlowInfo(props) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  const [source, setSource] = useState([
    "/home/logos/teradata.png",
    "/home/logos/netezza.png",
    "/home/logos/oracle.png",
    "/home/logos/sql.png",
    "/home/logos/vertica.png",
    "/home/logos/ab-inito.png",
    "/home/logos/ibm.png",
    "/home/logos/informatica.png",
    "/home/logos/sas.png",
    "/home/logos/hadoop.png",
  ]);

  const [target, setTarget] = useState([
    "/home/logos/aws.png",
    "/home/logos/azure.png",
    "/home/logos/cloud.png",
    "/home/logos/snowflake.png",
    "/home/logos/databricks.png",
    "/home/logos/spark.png",
  ]);

  useEffect(() => {
    setInterval(() => {
      setSource(
        source
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      );
      setTarget(
        target
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      );
    }, 1000 * 2);
  }, []);

  useEffect(() => {
    setWidth(ref?.current?.clientWidth);
    setHeight(ref?.current?.clientHeight);

    setNodes([
      {
        className: "dataFlow",
        id: "6",
        sourcePosition: "right",
        targetPosition: "right",
        position: { x: 0, y: (ref?.current?.clientHeight / 6) * 1 },
        data: {
          label: (
            <Image
              preview={false}
              style={{
                width: "100%",
                backgroundColor: "#FFF",
                borderRadius: "10%",
                padding: "0px 5px 0px 5px",
              }}
              src={source[0]}
            />
          ),
        },
      },
      {
        className: "dataFlow",
        id: "7",
        sourcePosition: "right",
        targetPosition: "right",
        position: { x: 20, y: (ref?.current?.clientHeight / 6) * 2 },
        data: {
          label: (
            <Image
              preview={false}
              style={{
                width: "100%",
                backgroundColor: "#FFF",
                borderRadius: "10%",
                padding: "0px 5px 0px 5px",
              }}
              src={source[1]}
            />
          ),
        },
      },
      {
        className: "dataFlow",
        id: "8",
        sourcePosition: "right",
        targetPosition: "right",
        position: { x: 20, y: (ref?.current?.clientHeight / 6) * 3 },
        data: {
          label: (
            <Image
              preview={false}
              style={{
                width: "100%",
                backgroundColor: "#FFF",
                borderRadius: "10%",
                padding: "0px 5px 0px 5px",
              }}
              src={source[2]}
            />
          ),
        },
      },
      {
        className: "dataFlow",
        id: "9",
        sourcePosition: "right",
        targetPosition: "right",
        position: { x: 0, y: (ref?.current?.clientHeight / 6) * 4 },
        data: {
          label: (
            <Image
              preview={false}
              style={{
                width: "100%",
                backgroundColor: "#FFF",
                borderRadius: "10%",
                padding: "0px 5px 0px 5px",
              }}
              src={source[3]}
            />
          ),
        },
      },
      {
        className: "dataFlowNuoData",
        id: "1",
        sourcePosition: "right",
        targetPosition: "left",
        position: {
          x: ref?.current?.clientWidth / 2 - 50,
          y: ref?.current?.clientHeight / 2 - 50,
        },
        data: {
          label: (
            <Image
              preview={false}
              style={{ width: "100%" }}
              src="/assets/images/logo.png"
            />
          ),
        },
      },
      {
        className: "dataFlow",
        id: "2",
        sourcePosition: "left",
        targetPosition: "left",
        position: {
          x: ref?.current?.clientWidth - 120,
          y: (ref?.current?.clientHeight / 6) * 1,
        },
        data: {
          label: (
            <Image
              preview={false}
              style={{
                objectFit: "contain",
                width: "100%",
                backgroundColor: "#FFF",
                borderRadius: "10%",
                padding: "0px 5px 0px 5px",
              }}
              src={target[0]}
            />
          ),
        },
      },
      {
        className: "dataFlow",
        id: "3",
        sourcePosition: "left",
        targetPosition: "left",
        position: {
          x: ref?.current?.clientWidth - 140,
          y: (ref?.current?.clientHeight / 6) * 2,
        },
        data: {
          label: (
            <Image
              preview={false}
              style={{
                width: "100%",
                backgroundColor: "#FFF",
                borderRadius: "10%",
                padding: "0px 5px 0px 5px",
              }}
              src={target[1]}
            />
          ),
        },
      },
      {
        className: "dataFlow",
        id: "4",
        sourcePosition: "left",
        targetPosition: "left",
        position: {
          x: ref?.current?.clientWidth - 140,
          y: (ref?.current?.clientHeight / 6) * 3,
        },
        data: {
          label: (
            <Image
              preview={false}
              style={{
                width: "100%",
                backgroundColor: "#FFF",
                borderRadius: "10%",
                padding: "0px 5px 0px 5px",
              }}
              src={target[2]}
            />
          ),
        },
      },
      {
        className: "dataFlow",
        id: "5",
        sourcePosition: "left",
        targetPosition: "left",
        position: {
          x: ref?.current?.clientWidth - 120,
          y: (ref?.current?.clientHeight / 6) * 4,
        },
        data: {
          label: (
            <Image
              preview={false}
              style={{
                width: "100%",
                backgroundColor: "#FFF",
                borderRadius: "10%",
                padding: "0px 5px 0px 5px",
              }}
              src={target[3]}
            />
          ),
        },
      },
    ]);

    setEdges([
      { id: "e1", source: "1", target: "2", animated: true },
      { id: "e2", source: "1", target: "3", animated: true },
      { id: "e3", source: "1", target: "4", animated: true },
      { id: "e4", source: "1", target: "5", animated: true },
      { id: "e5", source: "6", target: "1", animated: true },
      { id: "e6", source: "7", target: "1", animated: true },
      { id: "e7", source: "8", target: "1", animated: true },
      { id: "e8", source: "9", target: "1", animated: true },
    ]);
  });

  return (
    <div ref={ref} style={{ height: "100%" }}>
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

export default ReactFlowInfo;
