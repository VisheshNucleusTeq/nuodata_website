import React from "react";
import { Col, Image, Row, Button, Space } from "antd";
import ingestionCss from "../../../styles/ingestion.module.css";
import { Handle, Position } from "reactflow";
import { TbArrowsJoin } from "react-icons/tb";
import { getFileName } from "../../helper/getFileName";
function CustomNodes({ data, isConnectable, type, selected }) {
  const isJoiner = data.label === "Joiner";

  return (
    <div
      className={ingestionCss.pipelineStepTabEdge}
      style={{
        border: `${selected ? 2 : 1}px solid ${
          data?.status == "valid" ? "green" : "#e74860"
        }`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: isJoiner ? "10vw" : "4vw",
        position: "relative",
      }}
    >
      {data?.label != "Source" && data?.label != "Joiner" && (
        <Handle
          style={{
            backgroundColor: "#FFF",
            height: ".6vw",
            width: ".6vw",
            border: `1px solid ${data?.status == "valid" ? "green" : "#e74860"}`,
          }}
          type="target" // LEFT
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
        {isJoiner && (
          <>
            <Handle
              type="target"
              position={Position.Left}
              isConnectable={isConnectable}
              id="Master"
              style={{
                backgroundColor: "#FFF",
                height: ".6vw",
                width: ".6vw",
                border: `1px solid ${data?.status == "valid" ? "green" : "#e74860"}`,
                top: "48%",
              }}
            />
            <Handle
              type="target"
              position={Position.Left}
              isConnectable={isConnectable}
              id="Details"
              style={{
                backgroundColor: "#FFF",
                height: ".6vw",
                width: ".6vw",
                border: `1px solid ${data?.status == "valid" ? "green" : "#e74860"}`,
                top: "68%",
              }}
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
          style={{
            backgroundColor: "#FFF",
            height: ".6vw",
            width: ".6vw",
            border: `1px solid ${data?.status == "valid" ? "green" : "#e74860"}`,
          }}
          type="source" // RIGHT
          position={Position.Right}
          isConnectable={isConnectable}
        />
      )}
    </div>
  );
}

export default CustomNodes;

// import { Col, Image, Row } from "antd";
// import { Handle, Position } from "reactflow";
// import ingestionCss from "../../../styles/ingestion.module.css";
// import { getFileName } from "../../helper/getFileName";
// function CustomNodes({ data, isConnectable, type, selected }) {
//   // const getFileName = (type) => {
//   //   switch (type) {
//   //     case "snowflake":
//   //       return "Snowflake";
//   //       break;
//   //     case "postgres":
//   //       return "Postgres";
//   //       break;
//   //     case "s3bucket":
//   //       return "S3Bucket";
//   //       break;
//   //     case "mongodb":
//   //       return "MongoDB";
//   //       break;
//   //     case "mysql":
//   //       return "MySQL";
//   //       break;
//   //       case "hive":
//   //       return "Hive";
//   //       break;
//   //     default:
//   //       return null;
//   //       break;
//   //   }
//   // };

//   const getBorderColor = (type) => {
//     // return "#e74860"

//     let color = "yellow";
//     switch (type) {
//       case "valid":
//         color = "green";
//         break;
//       case "invalid":
//         color = "red";
//         break;
//       case "partially valid":
//         color = "orange";
//         break;
//       case "partially_valid":
//         color = "orange";
//         break;
//       default:
//         color = "yellow";
//         break;
//     }
//     return color;
//   };

//   return (
//     <div
//       className={ingestionCss.pipelineStepTabEdge}
//       style={{
//         border: `${selected ? 2 : 1}px solid ${getBorderColor(data?.status)}`,
//         display: "flex",
//         alignItems: "center",
//       }}
//     >
//       {data?.label != "Source" && (
//         <Handle
//           style={{
//             backgroundColor: "#FFF",
//             height: ".6vw",
//             width: ".6vw",
//             border: `1px solid ${getBorderColor(data?.status)}`,
//           }}
//           type="target" // LEFT
//           position={Position.Left}
//           isConnectable={isConnectable}
//         />
//       )}
//       <Row>
//         <Col span={24} className={ingestionCss.pipelineStepTabIconEdge}>
//           {data?.connection_type && getFileName(data?.connection_type) ? (
//             <>
//               <Image
//                 alt={data?.connection_type}
//                 src={`/db_icon/${getFileName(data?.connection_type)}.png`}
//                 preview={false}
//                 width={"1vw"}
//                 height={"1vw"}
//               />
//               &nbsp;
//             </>
//           ) : (
//             <Image
//               preview={false}
//               src={`/pipelines_icons/${data.label}.png`}
//               width={"1vw"}
//               height={"1vw"}
//             />
//           )}
//         </Col>
//         <Col span={24} className={ingestionCss.pipelineStepTabTextEdge1}>
//           <div>
//             <span>{data.label}</span>
//           </div>
//         </Col>
//         <Col span={24} className={ingestionCss.pipelineStepTabTextEdge2}>
//           <span>
//             {data?.transformation_name
//               .split("", 10)
//               .reduce(
//                 (o, c) => (o.length === 9 ? `${o}${c}...` : `${o}${c}`),
//                 ""
//               )}
//           </span>
//         </Col>
//       </Row>
//       {data?.label != "Target" && (
//         <Handle
//           style={{
//             backgroundColor: "#FFF",
//             height: ".6vw",
//             width: ".6vw",
//             // border: "1px solid #e74860",
//             border: `1px solid ${getBorderColor(data?.status)}`,

//           }}
//           type="source" // RIGHT
//           position={Position.Right}
//           isConnectable={isConnectable}
//         />
//       )}
//     </div>
//   );
// }

// export default CustomNodes;
