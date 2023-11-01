import React from "react";
import UpdateWorkspace from "../../components/ingestion/updateWorkspace";
import ingestionCss from "../../styles/ingestion.module.css";
const Update_workspace = () => {
  return (
    <>
      <title>NuoData | Update Pipeline</title>
      <UpdateWorkspace ingestionCss={ingestionCss} />
    </>
  );
};

export default Update_workspace;
