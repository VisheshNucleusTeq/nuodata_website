import React, { useEffect, useState, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Controls,
  Background,
} from "reactflow";
import dagre from "dagre";
import NormalNode from "../components/NormalNode";
import * as data from "../public/wf_OMS_SLA_JSON.json";

const getNodeId = () => `randomnode_${+new Date()}`;
const initialNodes = data.Nodes;
const initialEdges = data.Edges;
const nodeTypes = {
  normalNode: NormalNode,
};
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const nodeWidth = 400;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);
const Design = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [rfInstance, setRfInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [jsonNode, setJson] = useState(null);

  const [name, SetName] = useState(null);
  const [isActive, setIsActive] = useState("");
  const { setViewport } = useReactFlow();
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );
  return (
    <>
      <div className="controls">
        <button onClick={() => onLayout("TB")}>vertical layout</button>
        <button onClick={() => onLayout("LR")}>horizontal layout</button>
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          height: "80vh",
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          title="Test Data"
          fitView
          attributionPosition="bottom-left"
          onConnect={onConnect}
          onInit={setRfInstance}
          onNodeClick={(value, node) => {
            SetName(node?.data?.queries);
            setSelectedNode(value);
            setJson(node);
          }}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
};

export default () => (
  <ReactFlowProvider>
    <Design />
  </ReactFlowProvider>
);
