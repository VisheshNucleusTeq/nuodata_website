import React from "react";
import { Spin } from "antd";
const Loading = () => {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin tip="Please Wait" size="large" style={{ color: "#0c3246" }} />
      </div>
    </>
  );
};

export default Loading;
