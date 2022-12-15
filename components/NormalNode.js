/* eslint-disable react/display-name */
import React, { memo } from "react";

import { Handle } from "reactflow";

export default memo(({ data, isConnectable }) => {
  console.log("this is the data", data);
  return (
    <>
      <Handle
        type="target"
        position="top"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div
        style={{
          background: "#fff",
          padding: "1rem",
          borderStyle: "solid",
          borderRadius: "5px",
          borderColor: "#e74860",
        }}
      >
        <strong>{data.label}</strong>
      </div>
      <Handle
        type="source"
        position="bottom"
        id="b"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
    </>
  );
});
