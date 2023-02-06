import React, { memo, useEffect, useState } from "react";
import { Handle } from "reactflow";
import { TbTarget, TbArrowsJoin, TbDatabase, TbSortAscending2} from 'react-icons/tb';
import { VscSourceControl, VscCombine } from 'react-icons/vsc';
import { RiOpenSourceLine, RiFilterLine } from 'react-icons/ri';
import { GiRank3 } from 'react-icons/gi';
import {RxUpdate} from 'react-icons/rx';
import {FaStackExchange} from 'react-icons/fa';
import NormalNodeCss from "../styles/NormalNode.module.css";

export default memo(({ data, isConnectable }) => {
  const [transformTypeData, setTransformType] = useState();

  console.log("this is the data", data);

  useEffect(() => {
    setTransformType(data.transformationType);
  }, []);
  console.log("this is for node icon ", transformTypeData);

  const status = transformTypeData;
  let icon = null;

  switch (status) {
    case "Source Definition":
      icon = <RiOpenSourceLine/>;
      break;

    case "Source Qualifier":
      icon = <VscSourceControl/>;
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
      <div>
        <div
         className={NormalNodeCss.nodeStyle}
        >
          <strong className={NormalNodeCss.iconStyle}>{icon}</strong>
          <strong>{data.label}</strong>
        </div>
      </div>
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
