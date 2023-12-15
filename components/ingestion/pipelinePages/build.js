import { Col, Divider, Image, Row } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";

import Expression from "../configView/expression/expression";
import Filter from "../configView/filter/index";
import Source from "../configView/source/index";
import Target from "../configView/target/target";
import EdgesFlow from "../reactflow";

import {
  fetch_retry_get,
  fetch_retry_post,
} from "../../../network/api-manager";
import { CREATENODE, GETPIPELINEGRAPH } from "../../../network/apiConstants";
var timer;

const Build = ({ ingestionCss }) => {
  const { query } = useRouter();
  const messagesEndRef = useRef(null);
  const pipelineData = useSelector((state) => state?.pipeline?.pipeline);
  const [nodeData, setNodeData] = useState([]);
  const [edgeData, setEdgeData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedNode, setSelectedNode] = useState({});
  const [nodePosition, setNodePosition] = useState({});
  const [updateble, setUpdateble] = useState(true);

  const getPiplineGraph = async (id) => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const graph = await fetch_retry_get(`${GETPIPELINEGRAPH}${id}`);
      if (!graph?.data?.nodes.length) {
        await fetch_retry_post(`${CREATENODE}`, {
          pipeline_id: id,
          type: "textUpdaterSource",
          transformation_type: "Source",
        });
        await fetch_retry_post(`${CREATENODE}`, {
          pipeline_id: id,
          type: "textUpdaterTarget",
          transformation_type: "Target",
        });
        getPiplineGraph(id);
      } else {
        setNodeData(graph?.data?.nodes);
        setEdgeData(graph?.data?.edges);
      }
    }, 1000);
  };

  const createNode = async (type) => {
    const id = query?.pipeline ? query?.pipeline : pipelineData;
    await fetch_retry_post(`${CREATENODE}`, {
      pipeline_id: id,
      type: "textUpdater",
      transformation_type: type,
    });
    getPiplineGraph(id);
  };

  useEffect(() => {
    getPiplineGraph(query?.pipeline ? query?.pipeline : pipelineData);
  }, [query?.pipeline ? query?.pipeline : pipelineData]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    const dataHave = edgeData.find((e) => {
      return (
        e?.source_node_id == selectedNode?.id ||
        e?.target_node_id == selectedNode?.id
      );
    });

    if (dataHave) {
      setUpdateble(false);
    } else {
      setUpdateble(true);
    }
  }, [selectedNode?.id, nodeData, edgeData]);

  return (
    <>
      <div className={ingestionCss.pipelineSteps}>
        <Row justify="space-between">
          {[
            "Source",
            "Joiner",
            "Normalizer",
            "Router",
            "Rank",
            "Sequence",
            "Sorter",
            "SQL",
            "Union",
            "Lookup",
            "Filter",
            "Expression",
            "Aggregator",
            "Target",
          ].map((e) => {
            return (
              <Draggable
                position={{ x: 0, y: 0 }}
                onStart={(eData) => {
                }}
                onDrag={(eData) => {
                }}
                onStop={(eData) => {
                  if (visible) {
                    createNode(e);
                  }
                }}
              >
                <Col className={ingestionCss.pipelineStepTab}>
                  <Row>
                    <Col span={24} className={ingestionCss.pipelineStepTabIcon}>
                      <Image
                        preview={false}
                        src={`/pipelines_icons/${e}.png`}
                        width={"1.5vw"}
                        height={"1.5vw"}
                      />
                    </Col>
                    <Col span={24} className={ingestionCss.pipelineStepTabText}>
                      <span>{e}</span>
                    </Col>
                  </Row>
                </Col>
              </Draggable>
            );
          })}
        </Row>

        <Row
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          <Col span={24} style={{ height: "50vh" }}>
            <EdgesFlow
              nodeData={nodeData}
              edgeData={edgeData}
              setNodeData={setNodeData}
              setNodePosition={(e) => {
                setNodePosition(e);
              }}
              setSelectedNode={setSelectedNode}
              pipeline={query?.pipeline ? query?.pipeline : pipelineData}
              getPiplineGraph={getPiplineGraph}
            />
          </Col>
        </Row>
        <Divider />
        {/* {JSON.stringify(selectedNode?.data)} Expression */}
        {selectedNode?.data == "Source" && (
          <Source
            ingestionCss={ingestionCss}
            nodeId={selectedNode?.id}
            key={`source${selectedNode?.id}`}
            updateble={updateble}
            edgeData={edgeData}
            pipeline={query?.pipeline ? query?.pipeline : pipelineData}
            getPiplineGraph={getPiplineGraph}
          />
        )}
        {selectedNode?.data == "Filter" && (
          <Filter
            ingestionCss={ingestionCss}
            nodeId={selectedNode?.id}
            nodeData={nodeData}
            edgeData={edgeData}
            key={`filter${selectedNode?.id}`}
          />
        )}
        {selectedNode?.data == "Target" && (
          <Target
            ingestionCss={ingestionCss}
            nodeId={selectedNode?.id}
            key={`target${selectedNode?.id}`}
          />
        )}
        {selectedNode?.data == "Expression" && (
          <Expression
            ingestionCss={ingestionCss}
            nodeId={selectedNode?.id}
            key={`expression${selectedNode?.id}`}
          />
        )}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
};

export default Build;
