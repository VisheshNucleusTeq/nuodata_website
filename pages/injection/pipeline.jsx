import React from "react";
import InjectionPipeline from "../../components/injection/injectionPipeline";
import injectionPipelineCss from "../../styles/injectionSource.module.css";

const Pipeline = () => {
  return (
    <>
      <InjectionPipeline injectionPipelineCss={injectionPipelineCss} />
    </>
  );
};

export default Pipeline;
