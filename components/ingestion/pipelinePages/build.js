import React, { useState, useEffect } from "react";
import { Row, Col, Image, Divider } from "antd";
import Draggable from "react-draggable";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import EdgesFlow from "../reactflow";
import Source from "../configView/source/index";
import {
  fetch_retry_get,
  fetch_retry_post,
} from "../../../network/api-manager";
import { GETPIPELINEGRAPH, CREATENODE } from "../../../network/apiConstants";

const Build = ({ ingestionCss }) => {
  const { query } = useRouter();
  const pipelineData = useSelector((state) => state?.pipeline?.pipeline);
  const [nodeData, setNodeData] = useState([]);
  const [edgeData, setEdgeData] = useState([])
  const [visible, setVisible] = useState(false);
  const [nodePosition, setNodePosition] = useState({});

  const getPiplineGraph = async (id) => {
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
    } else {
      setNodeData(graph?.data?.nodes);
      setEdgeData(graph?.data?.edges)
    }
  };

  const createNode = async (type) => {
    const id = query?.pipeline ? query?.pipeline : pipelineData;
    await fetch_retry_post(`${CREATENODE}`, {
      pipeline_id: id,
      type: 'textUpdater',
      transformation_type: type,
    });
    getPiplineGraph(id);
  };

  useEffect(() => {
    getPiplineGraph(query?.pipeline ? query?.pipeline : pipelineData);
  }, [query?.pipeline ? query?.pipeline : pipelineData]);

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
                  console.log("onStart", e);
                }}
                onDrag={(eData) => {
                  console.log("onDrag", e);
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
                        src={`/pipelines_icon/${e}.png`}
                        width={"1.8vw"}
                        height={"1.8vw"}
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
          <Col span={24} style={{ height: "40vh" }}>
            <EdgesFlow
              nodeData={nodeData}
              edgeData={edgeData}
              setNodeData={setNodeData}
              setNodePosition={(e) => {
                setNodePosition(e);
              }}
              pipeline={query?.pipeline ? query?.pipeline : pipelineData}
            />
          </Col>
        </Row>
        <Divider />
        <Source ingestionCss={ingestionCss} />
      </div>
    </>
  );
};

export default Build;
