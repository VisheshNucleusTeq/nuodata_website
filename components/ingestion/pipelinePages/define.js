import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
  Modal,
  Checkbox,
  Space,
  message,
  Radio,
} from "antd";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import {
  fetch_retry_get,
  fetch_retry_post,
  fetch_retry_put,
} from "../../../network/api-manager";
import {
  GETWORKSPACEENV,
  ADDWORKSPACE,
  ENVDETAILS,
  CREATEPIPELINE,
} from "../../../network/apiConstants";
import { setPipelineAction, loderShowHideAction } from "../../../Redux/action";
const Define = ({ ingestionCss, workspaceData, workspace, setSelectedTab }) => {
  const route = useRouter();
  const { query } = useRouter();
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [environment, setEnvironment] = React.useState([]);
  const [runtimeEngine, setRuntimeEngine] = React.useState([]);
  const pipelineData = useSelector((state) => state?.pipeline?.pipeline);

  const savePipline = async (type) => {
    try {
      dispatch(loderShowHideAction(true));
      const data = await form.validateFields();
      const authData = JSON.parse(localStorage.getItem("authData"));
      if (pipelineData) {
        const createPipeline = await fetch_retry_put(
          `${CREATEPIPELINE}${pipelineData}?workspace_id=${workspace}`,
          {
            name: data?.name,
            pipeline_description: data?.pipeline_description,
            runtime_env_id: data?.environment,
            runtime_engine: data?.runtime_engine,
          }
        );

        if (createPipeline.success) {
          message.success([createPipeline?.data?.message]);
          if (type == "save") {
            route.push("/ingestion");
          } else {
            setSelectedTab(1);
          }
          dispatch(loderShowHideAction(false));
        } else {
          dispatch(loderShowHideAction(false));
          message.error([createPipeline?.error]);
        }
      } else {
        const createPipeline = await fetch_retry_post(`${CREATEPIPELINE}`, {
          name: data?.name,
          pipeline_description: data?.pipeline_description,
          org_id: authData.orgId,
          workspace_id: workspace,
          runtime_env_id: data?.environment,
          runtime_engine: data?.runtime_engine,
          job_type: "pipeline",
        });

        if (createPipeline.success) {
          message.success([createPipeline?.data?.message]);
          dispatch(setPipelineAction(createPipeline?.data?.data?.id));
          if (type == "save") {
            route.push("/ingestion");
          } else {
            setSelectedTab(1);
          }
          dispatch(loderShowHideAction(false));
        } else {
          dispatch(loderShowHideAction(false));
          message.error([createPipeline?.error]);
        }
      }
    } catch (errors) {
      dispatch(loderShowHideAction(false));
    }
  };

  const updateFormvalue = async () => {
    let defaultValue = {};
    const authData = JSON.parse(localStorage.getItem("authData"));

    defaultValue.workspace = workspaceData.filter(
      (e) => e.workspace_id === workspace
    )[0]?.workspace_name;

    const envList = await fetch_retry_get(
      `${GETWORKSPACEENV}${workspace}?org_id=${authData.orgId}`
    );
    if (envList?.data.length === 0) {
      Modal.confirm({
        title: "warning!",
        content:
          "please add runtime environment",
        okText: "Add Runtime Environment",
        cancelText: "Cancel",
        onOk: async () => {
          route.push(
            "update-workspace?workspace=" + workspace
          );
        },
        onCancel: async () => {
          route.back()
        },
      })
    }
    else {
      setEnvironment(envList?.data);

      const workspaceDetails = await fetch_retry_get(
        `${ADDWORKSPACE}${workspace}?org_id=${authData.orgId}`
      );

      defaultValue.environment = workspaceDetails?.data?.default_runtime_env_id;

      const envDetails = await fetch_retry_get(
        `${ENVDETAILS}${workspaceDetails?.data?.default_runtime_env_id}?org_id=${authData.orgId}&workspace_id=${workspace}`
      );
      setRuntimeEngine(envDetails?.data?.engine_type);
      if (envDetails?.data?.engine_type?.length === 1) {
        form.setFieldsValue({ "runtime_engine": envDetails?.data?.engine_type[0] });
      }
      form.setFieldsValue({ ...defaultValue });
    }
  };

  const setOldPipeline = async (id) => {
    dispatch(setPipelineAction(id));

    const authData = JSON.parse(localStorage.getItem("authData"));

    const pipelineDetails = await fetch_retry_get(`${CREATEPIPELINE}${id}`);

    const envDetails = await fetch_retry_get(
      `${ENVDETAILS}${pipelineDetails?.data?.runtime_env_id}?org_id=${authData.orgId}&workspace_id=${workspace}`
    );
    setRuntimeEngine(envDetails?.data?.engine_type);

    const envList = await fetch_retry_get(
      `${GETWORKSPACEENV}${workspace}?org_id=${authData.orgId}`
    );
    setEnvironment(envList?.data);
    form.setFieldsValue({
      name: pipelineDetails?.data?.pipeline_name,
      pipeline_description: pipelineDetails?.data?.pipeline_description,
      workspace: workspaceData.filter((e) => e.workspace_id === workspace)[0]
        ?.workspace_name,
      environment: pipelineDetails?.data?.runtime_env_id,
      runtime_engine: pipelineDetails?.data?.runtime_engine,
    });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      query?.pipeline || pipelineData
        ? setOldPipeline(query?.pipeline ? query?.pipeline : pipelineData)
        : updateFormvalue();
    }, 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [workspace, query?.pipeline, pipelineData]);

  return (
    <>
      <Row className={ingestionCss.defineForm}>
        <Col offset={3} span={18}>
          <Form
            form={form}
            layout="vertical" //horizontal , vertical
            autoComplete="on"
          >
            <Form.Item
              label={"Pipeline Name"}
              labelAlign={"left"}
              name={"name"}
              tooltip="Accept only alphanumeric with underscore. Ex: Pipeline_v1"
              rules={[
                {
                  required: true,
                  message: "Pipeline name is required.",
                },
                {
                  max: 100,
                  message: "Pipeline name cannot be more than 100 characters.",
                },
                {
                  pattern: /^[a-zA-Z0-9_]*$/,
                  message: "Please enter a valid pipeline name",
                },
              ]}
            >
              <Input
                key={"input-runtime-environment-name"}
                className={"input"}
                name={"name"}
                type={"text"}
                placeholder={"Pipeline Name"}
              />
            </Form.Item>

            <Form.Item
              label={"Pipeline Description"}
              labelAlign={"left"}
              name={"pipeline_description"}
              rules={[
                {
                  required: false,
                  message: "Pipeline description is required.",
                },
              ]}
            >
              <Input
                key={"input-runtime-environment-name"}
                className={"input"}
                name={"pipeline_description"}
                type={"text"}
                placeholder={"Pipeline Description"}
              />
            </Form.Item>

            <Form.Item
              label={"Workspace"}
              labelAlign={"left"}
              name={"workspace"}
              rules={[
                {
                  required: true,
                  message: "Workspace is required.",
                },
              ]}
            >
              <Input
                key={"input-runtime-environment-name"}
                className={"input"}
                name={"workspace"}
                type={"text"}
                placeholder={"Workspace"}
                disabled
                // style={{ color: "#e74860" }}
                style={{ color: "#000" }}

              />
            </Form.Item>

            <Row>
              <Col span={24}>
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
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item
                  label={"Target Engine / Language"}
                  labelAlign={"left"}
                  name={"runtime_engine"}
                  rules={[
                    {
                      required: true,
                      message: "Target engine / language is required.",
                    },
                  ]}
                >
                  {/* {JSON.stringify(runtimeEngine)} */}
                  <Radio.Group name="runtime_engine" >
                    {runtimeEngine?.map((e) => {
                      return <Radio value={e}>{e}</Radio>;
                    })}
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <div style={{ display: "flex", justifyContent: "end" }}>
              <Space>
                <Button
                  type="primary"
                  className={ingestionCss.defineSave}
                  onClick={() => {
                    savePipline("save");
                  }}
                >
                  {pipelineData ? "Update" : "Save"} & exit
                </Button>
                <Button
                  type="primary"
                  className={ingestionCss.defineSaveAndBuild}
                  onClick={() => {
                    savePipline("build");
                  }}
                >
                  {pipelineData ? "Update" : "Save"} & build pipeline
                </Button>
              </Space>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Define;
