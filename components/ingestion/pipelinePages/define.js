import React, { useEffect } from "react";
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

import {
  fetch_retry_get,
  fetch_retry_post,
} from "../../../network/api-manager";
import {
  GETWORKSPACEENV,
  ADDWORKSPACE,
  ENVDETAILS,
  CREATEPIPELINE,
} from "../../../network/apiConstants";
import { useRouter } from "next/router";

const Define = ({ ingestionCss, workspaceData, workspace, setSelectedTab }) => {
  const route = useRouter();

  const [form] = Form.useForm();
  const [environment, setEnvironment] = React.useState([]);
  const [runtimeEngine, setRuntimeEngine] = React.useState([]);

  const updateFormvalue = async () => {
    let defaultValue = {};
    const authData = JSON.parse(localStorage.getItem("authData"));

    defaultValue.workspace = workspaceData.filter(
      (e) => e.workspace_id === workspace
    )[0]?.workspace_name;

    const envList = await fetch_retry_get(
      `${GETWORKSPACEENV}${workspace}?org_id=${authData.orgId}`
    );
    setEnvironment(envList?.data);

    const workspaceDetails = await fetch_retry_get(
      `${ADDWORKSPACE}${workspace}?org_id=${authData.orgId}`
    );

    defaultValue.environment = workspaceDetails?.data?.default_runtime_env_id;

    const envDetails = await fetch_retry_get(
      `${ENVDETAILS}${workspaceDetails?.data?.default_runtime_env_id}?org_id=${authData.orgId}&workspace_id=${workspace}`
    );
    setRuntimeEngine(envDetails?.data?.engine_type);
    // defaultValue.runtime_engine = envDetails?.data?.engine_type;

    form.setFieldsValue({ ...defaultValue });
  };

  const savePipline = async (type) => {
    try {
      const data = await form.validateFields();
      const authData = JSON.parse(localStorage.getItem("authData"));

      const createPipeline = await fetch_retry_post(`${CREATEPIPELINE}`, {
        name: data?.name,
        org_id: authData.orgId,
        workspace_id: workspace,
        runtime_env_id: data?.environment,
        runtime_engine: data?.runtime_engine[0],
        job_type: "pipeline",
      });

      if (createPipeline.success) {
        message.success([createPipeline?.data?.message]);
        if (type == "save") {
          route.push("/ingestion")
        } else {
          setSelectedTab(1);
        }
      } else {
        message.error([createPipeline?.error]);
      }
    } catch (errors) {}
  };

  useEffect(() => {
    updateFormvalue();
  }, [workspace]);

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
              rules={[
                {
                  required: true,
                  message: "Pipeline name is required.",
                },
                {
                  max: 100,
                  message: "Pipeline name cannot be more than 100 characters.",
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
              name={"description"}
              rules={[
                {
                  required: true,
                  message: "Pipeline description is required.",
                },
              ]}
            >
              <Input
                key={"input-runtime-environment-name"}
                className={"input"}
                name={"description"}
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
                style={{ color: "#e74860" }}
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
                  <Radio.Group name="runtime_engine">
                    {runtimeEngine.map((e) => {
                      return <Radio value={e}>{e}</Radio>;
                    })}
                    {/* <Radio value={'spark'}>Spark</Radio>
    <Radio value={'presto'}>Presto</Radio> */}
                  </Radio.Group>
                  {/* <Checkbox.Group
                    name="runtime_engine"
                    options={["Spark", "Presto"]}
                    onChange={() => {}}
                  /> */}
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
                  Save
                </Button>
                <Button
                  type="primary"
                  className={ingestionCss.defineSaveAndBuild}
                  onClick={() => {
                    savePipline("build");
                  }}
                >
                  Save & Build pipeline
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
