import { Handle, Position } from "reactflow";
import { Col, Image, Row } from "antd";
import ingestionCss from "../../../styles/ingestion.module.css";

function CustomNodes({ data, isConnectable, type, selected }) {
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
