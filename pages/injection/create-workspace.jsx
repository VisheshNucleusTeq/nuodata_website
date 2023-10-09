import React from "react";
import workspaceCss from "../../styles/workspace.module.css";
import CreateWorkspace from "../../components/injection/createWorkspace";

const Create_workspace = () => {
  return (
    <>
      <CreateWorkspace workspaceCss={workspaceCss} />
    </>
  );
};

export default Create_workspace;
