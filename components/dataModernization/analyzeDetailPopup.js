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
const getLayoutedElements = (nodes, edges, direction = "LR") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes?.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges?.forEach((edge) => {
    if (edge.source != null && edge.source != "") {
      dagreGraph.setEdge(edge.source, edge.target);
    }
  });
  console.log("dagre", dagreGraph);
  dagre.layout(dagreGraph);

  nodes?.forEach((node) => {
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

const AnalyzeDetailPopup = ({ outputFileId, data }) => {
  console.log(data);
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    data?.Nodes,
    data?.Edges
  );

  console.log("layoutedEdges --",layoutedEdges)
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes.map(e => {
    return {
      ...e,
    }
  }));
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges.map(e => {
    return {
      ...e,
      label: e.transformationType,
      animated: true,
      type: 'straight',
    }
  }));
  const [rfInstance, setRfInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [jsonNode, setJson] = useState(null);

  const [name, SetName] = useState(null);
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
  // const getProjectData = async (fileId) => {
  //   const data = await fetch_retry_get(`${DESIGN}${fileId}`);
  //   // setData(data);
  //   // console.log(data);
  // };

  // useEffect(() => {
  //   getProjectData(outputFileId);
  // }, []);

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
          title="Test Data"
          fitView
          attributionPosition="bottom-left"
          onConnect={onConnect}
          onInit={setRfInstance}
          onNodeClick={(value, node) => {
            console.log("value", value, node);
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

export default ({ data }) => (
  <ReactFlowProvider>
    <AnalyzeDetailPopup data={data} />
  </ReactFlowProvider>
);
