import React, {useState, useEffect} from "react";
import { MutatingDots } from "react-loader-spinner";

const FullPageLoader = () => {
  const [loading, setLoading] = useState(true);
  
  return (
    <div className="loader-container">
      <div
        className="loader"
        style={{
          backgroundColor: "rgba(250, 250, 250, 0.4)",
          width: "100vw",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          position: "fixed",
          zIndex: "999",
        }}
      >
        <MutatingDots
          height="100"
          width="100"
          color="#E74860"
          secondaryColor="#0C3246"
          radius="15"
          ariaLabel="mutating-dots-loading"
          visible={loading}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default FullPageLoader;
