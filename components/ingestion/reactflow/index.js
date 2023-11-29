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
import {
  CREATEEDGE,
  CREATENODE,
  DELETEEDGE,
} from "../../../network/apiConstants";
import {
  fetch_retry_post,
  fetch_retry_delete,
} from "../../../network/api-manager";

const nodeTypes = {
  textUpdater: CustomNodes,
  textUpdaterSource: CustomNodes,
  textUpdaterTarget: CustomNodes,
};

const edgeTypes = {
  custom: CustomEdge,
};

const getLayoutedElements = (nodes, edges, direction = "LR") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
    });
  });

  edges.forEach((edge, i) => {
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

function EdgesFlow({
  nodeData,
  edgeData,
  setNodeData,
  setNodePosition,
  pipeline,
  setSelectedNode,
}) {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
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

  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodeData,
      edgeData
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
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
          // alert(deleteInfo?.id)
          await fetch_retry_delete(`${CREATENODE}/${deleteInfo?.id}`);
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
          await fetch_retry_delete(`${DELETEEDGE}${pipeline}`, {
            data: {
              edge_ids: [deleteInfo?.id],
            },
          });
          setEdges(edges.filter((edge) => edge.id !== deleteInfo?.id));
        },
        onCancel() {},
        okText: "Delete",
      });
    }
  };

  useEffect(() => {
    if (deleteInfo && deleteInfo.type == "nodes") {
      setSelectedNode(deleteInfo);
    } else {
      setSelectedNode({});
    }
  }, [deleteInfo?.id]);

  return (
    <>
      <Row style={{ width: "100%", height: "100%" }}>
        <Col
          span={24}
          style={{ width: "100%", height: "100%" }}
          ref={reactFlowWrapper}
        >
          <ReactFlow
            fitView
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
            elementsSelectable={true}
            onNodeClick={(e, node) => {
              setDeleteInfo({
                id: node?.id,
                data: node?.data?.label,
                type: "nodes",
              });
            }}
            onEdgeClick={(e, edge) => {
              setDeleteInfo({
                id: edge?.id,
                type: "edges",
              });
            }}
            onPaneClick={(e, i) => {
              setDeleteInfo({});
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

export default ({
  nodeData,
  setNodeData,
  setNodePosition,
  pipeline,
  edgeData,
  setSelectedNode,
}) => (
  <ReactFlowProvider>
    <EdgesFlow
      nodeData={nodeData}
      edgeData={edgeData}
      setNodeData={setNodeData}
      setNodePosition={setNodePosition}
      pipeline={pipeline}
      setSelectedNode={setSelectedNode}
    />
  </ReactFlowProvider>
);
