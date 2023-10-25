import React from "react";
import CreateWorkspace from "../../components/ingestion/createWorkspace";
import ingestionCss from "../../styles/ingestion.module.css";

const Create_workspace = () => {
  return <>
  <title>NuoData | Create Workspace</title>
  <CreateWorkspace ingestionCss={ingestionCss} />
  </>;
};

export default Create_workspace;
