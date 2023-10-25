import { useCallback } from "react";
import { Handle, Position } from "reactflow";

import { Row, Col, Image } from "antd";

import ingestionCss from "../../../styles/ingestion.module.css";

const handleStyle = { left: 10 };

function CustomNodes({ data, isConnectable, type, selected }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div
      className={ingestionCss.pipelineStepTabEdge}
      style={{
        border: `${selected ? 2 : 1}px solid #e74860`,
        display: "flex",
        alignItems: "center",
      }}
    >
      {type != "textUpdaterSource" && (
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
        />
      )}
      <Row>
        <Col span={24} className={ingestionCss.pipelineStepTabIconEdge}>
          <Image
            preview={false}
            src={`/pipelines_icon/${data.label}.png`}
            width={"1vw"}
            height={"1vw"}
          />
        </Col>
        <Col span={24} className={ingestionCss.pipelineStepTabTextEdge}>
          <span>{data.label}</span>
        </Col>
      </Row>
      {/* {data.label} */}
      {type != "textUpdaterTarget" && (
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
