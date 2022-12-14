import { DESIGN } from "../../network/apiConstants";
import { fetch_retry_get } from "../../network/api-manager";
import { useEffect } from "react";
const AnalyzeDetailPopup = ({ outputFileId }) => {
  
    const getProjectData = async (fileId) => {
    const data = await fetch_retry_get(`${DESIGN}${fileId}`);
    console.log(data);
  };

  useEffect(() => {
    getProjectData(outputFileId);
  }, []);

  return <p>{outputFileId}</p>;
};

export default AnalyzeDetailPopup;
