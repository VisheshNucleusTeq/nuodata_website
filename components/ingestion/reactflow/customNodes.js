import React from "react";
import { Col, Image, Row, Button, Space } from "antd";
import ingestionCss from "../../../styles/ingestion.module.css";
import { Handle, Position } from "reactflow";
import { TbArrowsJoin } from "react-icons/tb";

function CustomNodes({ data, isConnectable, type, selected }) {
  const isJoiner = data.label === "Joiner";

  const joinerHandleStyle = (top) => ({
    top: `${top}%`,
  });

  return (
    <div
      className={ingestionCss.pipelineStepTabEdge}
      style={{
        border: `${selected ? 2 : 1}px solid #e74860`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: isJoiner ? "8vw" : "4vw",
        position: "relative",
      }}
    >
      {data?.label != "Source" && data?.label != "Joiner" && (
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
        />
      )}
      <Row>
        <Col span={24} className={ingestionCss.pipelineStepTabIconEdge}>
          {data?.connection_type ? (
            <>
              <Image
                alt={data?.connection_type}
                src={`/db_icon/${data?.connection_type}.png`}
                preview={false}
                width={"1vw"}
                height={"1vw"}
              />
              &nbsp;
            </>
          ) : (
            <Image
              preview={false}
              src={`/pipelines_icons/${data.label}.png`}
              width={"1vw"}
              height={"1vw"}
            />
          )}
        </Col>
        <Col span={24} className={ingestionCss.pipelineStepTabTextEdge1}>
          <div>
            <span>{data.label}</span>
          </div>
        </Col>
        {isJoiner && (
          <>
            <Handle
              type="target"
              position={Position.Left}
              isConnectable={isConnectable}
              id="1"
              style={joinerHandleStyle(48)}
            />
            <Handle
              type="target"
              position={Position.Left}
              isConnectable={isConnectable}
              id="2"
              style={joinerHandleStyle(68)}
            />

            <Row style={{ width: "100%" }} justify={"center"} align={"middle"}>
              <Space
                direction="vertical"
                className={ingestionCss.customNodeSpace}
              >
                <Button className={ingestionCss.joinerButton}>Master</Button>
                <Button className={ingestionCss.joinerButton}>Details</Button>
              </Space>
            </Row>
          </>
        )}
        <Col span={24} className={ingestionCss.pipelineStepTabTextEdge2}>
          <span>
            {data?.transformation_name
              .split("", 10)
              .reduce(
                (o, c) => (o.length === 9 ? `${o}${c}...` : `${o}${c}`),
                ""
              )}
          </span>
        </Col>
      </Row>
      {data?.label != "Target" && (
        <Handle
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
        />
      )}
    </div>
  );
}

export default CustomNodes;
