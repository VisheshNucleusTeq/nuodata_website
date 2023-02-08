import React, { memo, useEffect, useState, useRef } from "react";
import { Handle } from "reactflow";
import { Col, Popover, Row } from "antd";
import dynamic from "next/dynamic";
const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });
import {
  TbTarget,
  TbArrowsJoin,
  TbDatabase,
  TbSortAscending2,
} from "react-icons/tb";
import { VscSourceControl, VscCombine } from "react-icons/vsc";
import {
  RiOpenSourceLine,
  RiFilterLine,
  RiCloseCircleFill,
} from "react-icons/ri";
import { GiRank3 } from "react-icons/gi";
import { RxUpdate } from "react-icons/rx";
import { FaStackExchange } from "react-icons/fa";
import NormalNodeCss from "../styles/NormalNode.module.css";

export default memo(({ data, isConnectable }) => {
  const [transformTypeData, setTransformType] = useState();
  const ref = useRef(null);

  useEffect(() => {
    setTransformType(data.transformationType);
  }, []);

  const status = transformTypeData;
  let icon = null;

  switch (status) {
    case "Source Definition":
      icon = <RiOpenSourceLine />;
      break;

    case "Source Qualifier":
      icon = <VscSourceControl />;
      break;

    case "Expression":
      icon = <FaStackExchange />;
      break;

    case "Update Strategy":
      icon = <RxUpdate />;
      break;

    case "Target Definition":
      icon = <TbTarget />;
      break;

    case "Joiner":
      icon = <TbArrowsJoin />;
      break;

    case "Filter":
      icon = <RiFilterLine />;
      break;

    case "Rank":
      icon = <GiRank3 />;
      break;

    case "Aggregator":
      icon = <VscCombine />;
      break;

    case "Sorter":
      icon = <TbSortAscending2 />;
      break;

    default:
      icon = <TbDatabase />;
      break;
  }

  return (
    <>
      <Handle
        type="target"
        position="left"
        className={NormalNodeCss.nodePoint}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <Popover
        ref={ref}
        title={
          <Row justify={"space-between"}>
            <Col span={20}>
              <strong style={{ color: "#e74860" }}>{data.label}</strong>
            </Col>
            <Col span={4} style={{ textAlign: "end" }}>
              <RiCloseCircleFill
                onClick={() => ref.current.close()}
                style={{
                  fontSize: "20px",
                  color: "#e74860",
                  cursor: "pointer",
                }}
              />
            </Col>
          </Row>
        }
        trigger={data.showPopUp===true?"click":[]}
        content={
          //latest code
          <DynamicReactJson
            style={{ maxWidth: "50vw", padding: "5vh" }}
            // theme={"tube:inverted"}
            src={data.queries}
            theme={{
              base00: "white",
              base01: "#0c3246",
              base02: "#0c3246",
              base03: "#444",
              base04: "#0c3246",
              base05: "#444",
              base06: "#444",
              base07: "#444",
              base08: "#444",
              base09: "#e74860",
              base0A: "#0c3246",
              base0B: "#0c3246",
              base0C: "#0c3246",
              base0D: "#0c3246",
              base0E: "#0c3246",
              base0F: "#0c3246",
            }}
          />
        }
      >
        <div>
          <div className={NormalNodeCss.nodeStyle}>
            <strong className={NormalNodeCss.iconStyle}>{icon}</strong>
            <strong>{data.label}</strong>
          </div>
        </div>
      </Popover>
      <Handle
        type="source"
        position="right"
        id="b"
        className={NormalNodeCss.nodePoint}
        isConnectable={isConnectable}
      />
    </>
  );
});
