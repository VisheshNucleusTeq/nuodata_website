import {
  Button,
  Divider,
  Modal,
  Select,
  message,
  Row,
  Col,
  Tooltip,
  Image,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setWorkspaceAction } from "../../../Redux/action";
import { fetch_retry_get } from "../../../network/api-manager";
import {
  GETWORKSPACE,
  GETWORKSPACEENV,
  INGESTIONTEMPLATES,
} from "../../../network/apiConstants";

import ConnectionTable from "./connectionTable";

const ConnectionsList = ({ ingestionCss }) => {
  const dispatch = useDispatch();
  const [accountListArr, setAccountListArr] = useState([]);
  const [workspace, setWorkspace] = React.useState("");
  const [connectionType, setConnectionType] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [addConnModal, setAddConnModal] = React.useState(false);
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
      <Button
        className={ingestionCss.backButton}
        onClick={() => {
          setAddConnModal(true);
        }}
      >
        Add New connection
      </Button>

      <Modal
        title="Select Connection Type"
        open={addConnModal}
        onOk={() => {
          setAddConnModal(false);
        }}
        onCancel={() => {
          setAddConnModal(false);
        }}
        footer={null}
        closable={true}
        // width={"50%"}
      >
        <Row align={"center"}>
          {accountListArr &&
            accountListArr.length > 0 &&
            accountListArr.map((e, i) => {
              return (
                <Col span={5} key={"sourceCol" + i}>
                  <div
                    style={{
                      borderRadius: "10px",
                      margin: "10px",
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                    key={"sourceDiv" + i}
                  >
                    <div
                      onClick={() => {
                        setConnectionType(e.type);
                        setAddConnModal(false);
                      }}
                    >
                      <Tooltip title={e.title} color="#0c3246">
                        <Image
                          alt={e.title}
                          src={`/db_icon/${e.title}.png`}
                          preview={false}
                        />
                      </Tooltip>
                    </div>
                  </div>
                </Col>
              );
            })}
          {accountListArr.length <= 0 && (
            <Col span={24} style={{ marginTop: "4vw" }}>
              <h3 style={{ textAlign: "center" }}>No record found</h3>
            </Col>
          )}
        </Row>
      </Modal>

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
        accountListArr.length > 0 &&
        accountListArr.map((e) => {
          return (
            <>
              <ConnectionTable
                {...{
                  ...e,
                  workspace,
                  ingestionCss,
                  connectionType,
                  setConnectionType,
                }}
              />
            </>
          );
        })}
    </div>
  );
};

export default ConnectionsList;
