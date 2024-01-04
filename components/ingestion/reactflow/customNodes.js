import { Col, Image, Row } from "antd";
import { Handle, Position } from "reactflow";
import ingestionCss from "../../../styles/ingestion.module.css";

function CustomNodes({ data, isConnectable, type, selected }) {
  const getFileName = (type) => {
    switch (type) {
      case "snowflake":
        return "Snowflake";
        break;
      case "postgres":
        return "Postgres";
        break;
      case "s3bucket":
        return "S3Bucket";
        break;
      case "mongodb":
        return "MongoDB";
        break;
      case "mysql":
        return "MySQL";
        break;
        case "hive":
        return "Hive";
        break;
      default:
        return null;
        break;
    }
  };

  return (
    <div
      className={ingestionCss.pipelineStepTabEdge}
      style={{
        border: `${selected ? 2 : 1}px solid #e74860`,
        display: "flex",
        alignItems: "center",
      }}
    >
      {data?.label != "Source" && (
        <Handle
          type="target" // LEFT
          position={Position.Left}
          isConnectable={isConnectable}
        />
      )}
      <Row>
        <Col span={24} className={ingestionCss.pipelineStepTabIconEdge}>
          {data?.connection_type && getFileName(data?.connection_type) ? (
            <>
              {/* {data?.connection_type} */}
              <Image
                alt={data?.connection_type}
                src={`/db_icon/${getFileName(data?.connection_type)}.png`}
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
      {data?.label != "Target" && (
        <Handle
          type="source" // RIGHT
          position={Position.Right}
          isConnectable={isConnectable}
        />
      )}
    </div>
  );
}

export default CustomNodes;
