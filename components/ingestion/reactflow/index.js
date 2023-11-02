import "reactflow/dist/style.css";
import { useEffect, useRef } from "react";
import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
  MarkerType,
} from "reactflow";
import { Button, Col, Row, Modal, Menu, Tabs, Space } from "antd";
const { confirm } = Modal;

import {
  DeleteOutlined,
  ScissorOutlined,
  CopyOutlined,
} from "@ant-design/icons";

import dagre from "dagre";
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const nodeWidth = 100;
const nodeHeight = 50;

import CustomNodes from "./customNodes";
import CustomEdge from "./customEdge";
import { CREATEEDGE } from "../../../network/apiConstants";
import { fetch_retry_post } from "../../../network/api-manager";

const nodeTypes = {
  textUpdater: CustomNodes,
  textUpdaterSource: CustomNodes,
  textUpdaterTarget: CustomNodes,
};

const edgeTypes = {
  custom: CustomEdge,
};

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "TB";
  dagreGraph.setGraph({ rankdir: direction });
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
    });
  });

  edges.forEach((edge,i) => {
    edges[i].source = edge.source_node_id;
    edges[i].target = edge.target_node_id;
    dagreGraph.setEdge(edge.source_node_id, edge.target_node_id);
  });
  dagre.layout(dagreGraph);
  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    node.data = { label: node?.transformation_type };
    return node;
  });
  return { nodes, edges };
};

function EdgesFlow({ nodeData,edgeData, setNodeData, setNodePosition, pipeline }) {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [hoverEdge, setHoverEdge] = useState({});
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState({});

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => {
      return setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => {
      createEdge(connection);
      return setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  const createEdge = async (connection) => {
    await fetch_retry_post(`${CREATEEDGE}`, {
      pipeline_id: pipeline,
      edge: {
        transformation_type: "edge",
        source_node_id: connection?.source,
        target_node_id: connection?.target,
      },
    });
  };

  // useEffect(() => {
  //   setHoverEdge({});
  //   const nodesData = nodeData.map((e, i) => {
  //     if (nodeData.length == i + 1 && hoverEdge?.key) {
  //       setEdges([
  //         ...edges.filter((edge) => edge.id !== hoverEdge?.id),
  //         {
  //           id: `${hoverEdge?.source}-${e?.id}`,
  //           source: hoverEdge?.source,
  //           target: e?.id,
  //           key: (Math.random() + 1).toString(36).substring(7),
  //         },
  //         {
  //           id: `${e?.id}-${hoverEdge?.source}`,
  //           source: e?.id,
  //           target: hoverEdge?.target,
  //           key: (Math.random() + 1).toString(36).substring(7),
  //         },
  //       ]);
  //     }

  //     return {
  //       id: e.id ? e.id : `edges-${i}`,
  //       data: { label: e.text },
  //       // position: nodes[i]?.position
  //       //   ? nodes[i]?.position
  //       //   : e?.nodePosition
  //       //   ? e?.nodePosition
  //       //   : { x: 180 * (i + 1), y: 150 },
  //       sourcePosition: "right",
  //       targetPosition: "left",
  //       type: e.type ? e.type : "textUpdater",
  //       key: e.key ? e.key : (Math.random() + 1).toString(36).substring(7),
  //     };
  //   });
  //   setNodes(nodesData);
  // }, [nodeData]);

  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodeData,
      edgeData
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges)
  }, [nodeData]);

  const onConnectStart = (e, p) => {
    console.log(JSON.stringify(p));
  };

  const deleteNodeOrEdge = () => {
    if (deleteInfo && deleteInfo.type == "nodes") {
      confirm({
        title: "Do you want to delete this node?",
        content: "Are you sure you want to delete?",
        async onOk() {
          setEdges(
            edges.filter(
              (edge) =>
                edge.source !== deleteInfo?.id && edge.target !== deleteInfo?.id
            )
          );
          setNodes(nodes.filter((node) => node?.id !== deleteInfo?.id));
          setNodeData(nodeData.filter((e) => e?.id !== deleteInfo?.id));
        },
        onCancel() {},
        okText: "Delete",
      });
    }
    if (deleteInfo && deleteInfo.type == "edges") {
      confirm({
        title: "Do you want to delete this edge?",
        content: "Are you sure you want to delete?",
        async onOk() {
          setEdges(edges.filter((edge) => edge.id !== deleteInfo?.id));
        },
        onCancel() {},
        okText: "Delete",
      });
    }
  };

  return (
    <>
      <Row style={{ width: "100%", height: "100%" }}>
        {/* {JSON.stringify(edgeData)} */}
        <Col
          span={24}
          style={{ width: "100%", height: "100%" }}
          ref={reactFlowWrapper}
        >
          <ReactFlow
            onConnectStart={onConnectStart}
            onInit={setReactFlowInstance}
            nodes={[...nodes]}
            edges={[
              ...edges.map((e) => {
                return {
                  ...e,
                  markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 15,
                    height: 15,
                    color: "#FF0072",
                  },
                };
              }),
            ]}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
            elementsSelectable={true}
            onSelectionChange={(e) => {
              if (
                e?.nodes &&
                e?.nodes.length &&
                (!deleteInfo?.type || deleteInfo?.type == "edges")
              ) {
                setDeleteInfo({
                  id: e?.nodes[0].id,
                  type: "nodes",
                  key: e?.nodes[0].key,
                });
              }
              if (
                e?.edges &&
                e?.edges.length &&
                (!deleteInfo?.type || deleteInfo?.type == "nodes")
              ) {
                setDeleteInfo({
                  id: e?.edges[0].id,
                  type: "edges",
                });
              }
              if (
                !(e?.nodes && e?.nodes.length) &&
                !(e?.edges && e?.edges.length) &&
                deleteInfo?.type
              ) {
                setDeleteInfo({});
              }
            }}
            onMouseMove={(event) => {
              const reactFlowBounds =
                reactFlowWrapper.current.getBoundingClientRect();
              const position = reactFlowInstance?.project({
                x:
                  event.clientX -
                  reactFlowBounds.left -
                  window.screen.width * 0.07,
                y:
                  event.clientY -
                  reactFlowBounds.top -
                  window.screen.height * 0.04,
              });
              setNodePosition(position);
            }}
            onEdgeMouseEnter={(e, i) => {
              setHoverEdge(i);
            }}
            onEdgeMouseLeave={(e, i) => {
              setHoverEdge({});
            }}
          >
            {deleteInfo && deleteInfo.id ? (
              <div
                style={{
                  height: "6vh",
                  marginTop: "4vh",
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "8vw",
                    height: "5vh",
                    backgroundColor: "#0c3246",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "5px",
                    zIndex: 999999999,
                  }}
                >
                  <Space>
                    <DeleteOutlined
                      onClick={deleteNodeOrEdge}
                      style={{ width: "2vw", color: "#FFF", cursor: "pointer" }}
                    />
                    <ScissorOutlined
                      style={{
                        width: "2vw",
                        color: "#FFF",
                        cursor: "not-allowed",
                      }}
                    />
                    <CopyOutlined
                      style={{
                        width: "2vw",
                        color: "#FFF",
                        cursor: "not-allowed",
                      }}
                    />
                  </Space>
                </div>
              </div>
            ) : null}
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </Col>
      </Row>
    </>
  );
}

// export default EdgesFlow;

export default ({ nodeData, setNodeData, setNodePosition, pipeline, edgeData }) => (
  <ReactFlowProvider>
    <EdgesFlow
      nodeData={nodeData}
      edgeData={edgeData}
      setNodeData={setNodeData}
      setNodePosition={setNodePosition}
      pipeline={pipeline}
    />
  </ReactFlowProvider>
);
