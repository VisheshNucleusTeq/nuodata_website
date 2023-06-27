import React from "react";
import TargetPlatform from "../../components/accountAndSettings/targetPlatform";
import RepoSettingsCss from "../../styles/repoSettings.module.css";

const Target_platform = () => {
  return (
    <>
      <title>NuoData | Target Platform</title>
      <TargetPlatform RepoSettingsCss={RepoSettingsCss}/>
    </>
  );
};

export default Target_platform;
