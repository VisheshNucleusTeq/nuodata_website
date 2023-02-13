import React, { useEffect, useState, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Controls,
  Background,
  MiniMap,
  MarkerType
} from "reactflow";
import dagre from "dagre";
import NormalNode from "../NormalNode";
import { DESIGN } from "../../network/apiConstants";
import { fetch_retry_get } from "../../network/api-manager";
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';

const nodeTypes = {
  normalNode: NormalNode,
};
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const nodeWidth = 400;
const nodeHeight = 80;
const getLayoutedElements = (nodes, edges, showPopUp, direction = "LR") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes?.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
    });
  });

  edges?.forEach((edge) => {
    if (edge.source != null && edge.source != "") {
      dagreGraph.setEdge(edge.source, edge.target);
    }
  });

  dagre.layout(dagreGraph);

  nodes?.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";
    node.data.showPopUp = showPopUp;
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

const AnalyzeDetailPopup = ({ outputFileId, data,showPopUp }) => {

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    data?.Nodes,
    data?.Edges,
    showPopUp
  );


  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes?.map(e => {
    return {
      ...e,
    }
  }));
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges?.map(e => {
    return {
      ...e,
      label: e.transformationType,
      animated: true,
      type: "smoothstep",
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: "#e74860",
      },
      style: {
        stroke: "#e74860",
        strokeWidth: "1px",
      },
    };
  }));
  const [rfInstance, setRfInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [jsonNode, setJson] = useState(null);

  const [name, SetName] = useState(null);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: false,  type: "straight",
    style: {
      stroke: "rgba(116, 166, 192, 1)",
      strokeWidth: "2px",
    }, }, eds)),
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
      <div
        style={{
          display: "flex",
          flex: 1,
          height: "90vh",
        }}
      >
        <ReactFlow
        
          panOnScroll
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          title="NuoData"
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
          <MiniMap/>
        </ReactFlow>
      </div>
    </>
  );
};

export default ({ data, showPopUp }) => (
  <ReactFlowProvider>
    <AnalyzeDetailPopup data={data} showPopUp={showPopUp} />
  </ReactFlowProvider>
);
