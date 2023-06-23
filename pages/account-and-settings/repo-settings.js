import React from "react";
import RepoSettings from "../../components/accountAndSettings/repoSettings";
import RepoSettingsCss from "../../styles/repoSettings.module.css";
const Repo_settings = () => {
  return (
    <>
      <title>NuoData | Repo Settings</title>
      <RepoSettings RepoSettingsCss={RepoSettingsCss}/>
    </>
  );
};

export default Repo_settings;
