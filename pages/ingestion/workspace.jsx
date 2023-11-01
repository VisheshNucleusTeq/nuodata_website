import React from "react";
import WorkspaceList from "../../components/ingestion/workspaceList";
import ingestionCss from "../../styles/ingestion.module.css";

const Workspace = () => {
  return (
    <>
      <title>NuoData | Workspace</title>
      <WorkspaceList ingestionCss={ingestionCss} />
    </>
  );
};

export default Workspace;
