import { Button, Divider, Modal, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setWorkspaceAction } from "../../../Redux/action";
import { fetch_retry_get } from "../../../network/api-manager";
import {
  GETWORKSPACE,
  GETWORKSPACEENV,
  INGESTIONTEMPLATES
} from "../../../network/apiConstants";

import ConnectionTable from "./connectionTable";

const ConnectionsList = ({ ingestionCss }) => {
  const dispatch = useDispatch();
  const [accountListArr, setAccountListArr] = useState([]);
  const [workspace, setWorkspace] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [workspaceData, setWorkspaceData] = React.useState([]);

  const setOldData = async () => {
    if (typeof window !== "undefined") {
      if (!workspace && !("workspace" in localStorage)) {
        getWorkSpaceData();
        setIsModalOpen(true);
      } else {
        getRecord();
        const workspaceValue = localStorage.getItem("workspace");
        setWorkspace(workspaceValue);
        dispatch(setWorkspaceAction(workspaceValue));
        setIsModalOpen(false);
      }
    }
  };

  const getRecord = async () => {
    const result = await fetch_retry_get(INGESTIONTEMPLATES);
    if (result.success) {
      setAccountListArr(result.data);
    } else {
      message.error(result.error);
    }
  };

  const getWorkSpaceData = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (authData && authData?.orgId) {
      const data = await fetch_retry_get(`${GETWORKSPACE}${authData?.orgId}`);
      if (data.success) {
        setWorkspaceData(data.data);
      } else {
        setWorkspaceData([]);
        message.error([data?.error]);
      }
    }
  };

  useEffect(() => {
    setOldData();
  }, [workspace, typeof window !== "undefined"]);


  return (
    <div>
      <Modal
        title="Workspace"
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          // setIsModalOpen(workspace ? false : true);
          setIsModalOpen(workspace ? false : false);
        }}
        footer={null}
        // closable={workspace ? true : false}
        closable={workspace ? true : true}
      >
        <>
          <div className={ingestionCss.addNewWorkspace}>
            <Button
              onClick={() => {
                router.push("/ingestion/create-workspace");
              }}
            >
              Add new workspace
            </Button>
          </div>
          {/* {JSON.stringify(workspaceData)} */}
          <Select
            defaultValue={workspace ? workspace : null}
            placeholder="Select Workspace"
            style={{
              width: "100%",
            }}
            onChange={async (e) => {
              const authData = JSON.parse(localStorage.getItem("authData"));
              const envList = await fetch_retry_get(
                `${GETWORKSPACEENV}${e}?org_id=${authData.orgId}`
              );
              if (envList?.data && envList?.data.length) {
                localStorage.setItem("workspace", e);
                dispatch(setWorkspaceAction(e));
                setWorkspace(e);
                setIsModalOpen(false);
              } else {
                message.warning("Please add environment for this workspace.");
              }
            }}
            options={[
              ...workspaceData.map((e) => {
                return {
                  value: e?.workspace_id,
                  label: e?.workspace_name,
                };
              }),
            ]}
          />
        </>
      </Modal>
      {workspace &&
        accountListArr &&
        accountListArr.length &&
        accountListArr.map((e) => {
          return (
            <>
              <ConnectionTable {...{ ...e, workspace: workspace, ingestionCss : ingestionCss }} />
              <Divider style={{ borderColor: "#FFF" }}></Divider>
            </>
          );
        })}
    </div>
  );
};

export default ConnectionsList;
