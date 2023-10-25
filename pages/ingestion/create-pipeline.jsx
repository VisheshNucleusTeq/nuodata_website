import React from "react";
import CreatePipeline from "../../components/ingestion/createPipeline";
import ingestionCss from "../../styles/ingestion.module.css";
const Create_pipeline = () => {
  return (
    <>
      <title>NuoData | Create Pipeline</title>
      <CreatePipeline ingestionCss={ingestionCss} />
    </>
  );
};

export default Create_pipeline;
