import React from "react";
import IngestionDashboard from "../../components/ingestion/ingestionDashboard";
import ingestionCss from "../../styles/ingestion.module.css";
const Index = () => {
  return (
    <div>
      <title>NuoData | Pipeline</title>
      <IngestionDashboard ingestionCss={ingestionCss} />
    </div>
  );
};

export default Index;
