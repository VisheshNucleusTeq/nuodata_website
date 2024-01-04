import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  message,
} from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { loderShowHideAction } from "../../Redux/action";
import {
  fetch_retry_get,
  fetch_retry_post,
  fetch_retry_put,
} from "../../network/api-manager";
import {
  ADDRUNTIMEENV,
  ADDWORKSPACE,
  ENVDETAILS,
  GETWORKSPACEENV,
} from "../../network/apiConstants";
import AddEnvironment from "./model/addEnvironment";
const UpdateWorkspace = ({ ingestionCss }) => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const route = useRouter();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [environment, setEnvironment] = React.useState([]);
  const [environmentList, setEnvironmentList] = React.useState([]);
  const [workspaceId, setWorkspaceId] = React.useState(0);
  const [workspaceName, setWorkspaceName] = React.useState("");

  const addEnvironmentAction = async (data) => {
    let obj = environment.find((o) => o.name === data?.name);
    if (obj) {
      message.error(
        "Environment Name must be unique. Please specify another Name"
      );
    } else {
      let params = {};
      try {
        params = JSON.parse(data?.params);
      } catch (error) {
        params = data?.params;
      }
      dispatch(loderShowHideAction(true));
      const authData = JSON.parse(localStorage.getItem("authData"));
      await fetch_retry_post(`${ADDRUNTIMEENV}`, {
        org_id: authData.orgId,
        created_by: authData.userId,
        workspace_id: query?.workspace,
        name: data?.name,
        description: data?.description,
        engine_type: data?.engine_type,
        params: params,
      });
      dispatch(loderShowHideAction(false));
      getEnvList();
      setIsModalOpen(false);
    }
  };

  const getWorkspaceDetails = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const workspaceDetails = await fetch_retry_get(
      `${ADDWORKSPACE}${query?.workspace}?org_id=${authData.orgId}`
    );
    form.setFieldsValue({
      name: workspaceDetails?.data?.workspace_name,
      description: workspaceDetails?.data?.description,
      environment: workspaceDetails?.data?.default_runtime_env_id,
    });
  };

  const getEnvList = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const envList = await fetch_retry_get(
      `${GETWORKSPACEENV}${query?.workspace}?org_id=${authData.orgId}`
    );
    setEnvironment(envList?.data);
    getWorkspaceDetails();
  };

  const updateWorkspaceAction = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    try {
      const data = await form.validateFields();
      dispatch(loderShowHideAction(true));

      const envDetails = await fetch_retry_get(
        `${ENVDETAILS}${data?.environment}?org_id=${authData.orgId}&workspace_id=${query?.workspace}`
      );

      if (envDetails?.data?.engine_type) {
        const updateResult = await fetch_retry_put(
          `${ADDWORKSPACE}${query?.workspace}`,
          {
            org_id: authData.orgId,
            name: data?.name,
            description: data?.description,
            default_engine_type: envDetails?.data?.engine_type,
            default_runtime_env_id: data?.environment,
          }
        );
        if (updateResult.success) {
          message.success([updateResult?.data?.message]);
        } else {
          message.error([updateResult?.error]);
        }
        route.back();
      } else {
        message.error("Something Going Wrong");
      }
      dispatch(loderShowHideAction(false));
    } catch (errors) {
      dispatch(loderShowHideAction(false));
    }
  };

  useEffect(() => {
    query?.workspace && getEnvList();
  }, [query?.workspace]);

  return (
    <>
      <Modal
        title="Add Runtime Environment"
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
        width={"80%"}
        destroyOnClose
        centered
      >
        <AddEnvironment
          ingestionCss={ingestionCss}
          addEnvironmentAction={addEnvironmentAction}
        />
      </Modal>

      <Row className={ingestionCss.defineForm}>
        {workspaceId != 0 && (
          <Col offset={3} span={21}>
            <h2 style={{ color: "#e74860" }}>{workspaceName}</h2>
          </Col>
        )}
        <Col offset={3} span={18}>
          <Form
            form={form}
            layout="vertical" //horizontal , vertical
            autoComplete="on"
          >
            <>
              <Form.Item
                label={"Workspace Name"}
                labelAlign={"left"}
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Workspace name is required.",
                  },
                  {
                    max: 100,
                    message:
                      "Workspace name cannot be more than 100 characters.",
                  },
                ]}
              >
                <Input
                  key={"input-workspace-name"}
                  className={"input"}
                  name={"name"}
                  type={"text"}
                  placeholder={"Workspace Name"}
                  onChange={(e) => {
                    setWorkspaceName(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                label={"Description"}
                labelAlign={"left"}
                name={"description"}
                rules={[
                  {
                    required: true,
                    message: "Description is required.",
                  },
                ]}
              >
                <Input.TextArea
                  key={"input-Description"}
                  name={"description"}
                  type={"text"}
                  placeholder={"Description"}
                  style={{ minHeight: 100, borderRadius: "10px" }}
                />
              </Form.Item>
            </>
            <>
              <Row>
                <Col span={16}>
                  <Form.Item
                    label={"Runtime Environment"}
                    labelAlign={"left"}
                    name={"environment"}
                    rules={[
                      {
                        required: true,
                        message: "Environment is required.",
                      },
                    ]}
                  >
                    <Select
                      className="inputSelect"
                      showSearch
                      placeholder="Select runtime environment"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={environment.map((e) => {
                        return {
                          value: e?.runtime_env_id,
                          label: e?.runtime_env_name,
                        };
                      })}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={" "}
                    labelAlign={"left"}
                    name={"addenvironment"}
                  >
                    <Button
                      type="primary"
                      danger
                      className={ingestionCss.addnewEnv}
                      onClick={() => {
                        setIsModalOpen(true);
                      }}
                    >
                      Add new runtime environment
                    </Button>
                  </Form.Item>
                </Col>
              </Row>

              <div style={{ display: "flex", justifyContent: "end" }}>
                <Space>
                  <Button
                    type="primary"
                    className={ingestionCss.exitBtn}
                    onClick={() => {
                      route.back();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    className={ingestionCss.nextBtn}
                    onClick={async () => {
                      updateWorkspaceAction();
                    }}
                  >
                    Update Workspace
                  </Button>
                </Space>
              </div>
            </>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default UpdateWorkspace;
