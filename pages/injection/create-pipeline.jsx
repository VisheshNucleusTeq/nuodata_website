import React from "react";
import CreatePipline from "../../components/injection/createPipline";
import injectionPipelineCss from "../../styles/injectionPipeline.module.css";

const Create_pipeline = () => {
  return (
    <>
      <CreatePipline injectionPipelineCss={injectionPipelineCss}/>
    </>
  );
};

export default Create_pipeline;
