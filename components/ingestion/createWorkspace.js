import React from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
  Modal,
  message,
  Space,
} from "antd";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import AddEnvironment from "./model/addEnvironment";
import { fetch_retry_post, fetch_retry_put } from "../../network/api-manager";
import { ADDWORKSPACE, ADDRUNTIMEENV } from "../../network/apiConstants";
import { loderShowHideAction } from "../../Redux/action";
const CreateWorkspace = ({ ingestionCss }) => {
  const dispatch = useDispatch();
  const route = useRouter();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [environment, setEnvironment] = React.useState([]);

  const addEnvironmentAction = (data) => {
    let obj = environment.find((o) => o.name === data?.name);
    if (obj) {
      message.error(
        "Environment Name must be unique. Please specify another Name"
      );
    } else {
      console.log(data);
      setEnvironment([...environment, data]);
      setIsModalOpen(false);
    }
  };

  const createWorkspace = async (data) => {
    dispatch(loderShowHideAction(true))
    const authData = JSON.parse(localStorage.getItem("authData"));
    let defaultEnvData = {};
    const workspaceData = await fetch_retry_post(ADDWORKSPACE, {
      org_id: authData.orgId,
      created_by: authData.userId,
      name: data?.name,
      description: data?.description,
    });
    if (workspaceData.success) {
      await Promise.all(
        environment.map(async (singleEnv) => {
          return new Promise(async (resolve, reject) => {
            const evnData = await fetch_retry_post(`${ADDRUNTIMEENV}`, {
              org_id: authData.orgId,
              created_by: authData.userId,
              workspace_id: workspaceData?.data?.data?.id,
              name: singleEnv?.name,
              description: singleEnv?.description,
              engine_type: singleEnv?.engine_type,
              params: {},
            });

            if (evnData.success && data?.environment == singleEnv?.name) {
              defaultEnvData = {
                id: evnData?.data?.data?.id,
                engine_type: singleEnv?.engine_type,
              };
            }
            resolve({ evnData });
          });
        })
      );
      if (defaultEnvData && defaultEnvData?.id) {
        const workspaceUpdateData = await fetch_retry_put(
          `${ADDWORKSPACE}${workspaceData?.data?.data?.id}`,
          {
            org_id: authData.orgId,
            name: data?.name,
            description: data?.description,
            default_engine_type: defaultEnvData?.engine_type,
            default_runtime_env_id: defaultEnvData?.id,
          }
        );
        dispatch(loderShowHideAction(false))
        if (workspaceUpdateData.success) {
          message.success([workspaceData?.data?.message])
        }
      } else {
        dispatch(loderShowHideAction(false))
        message.error(["Something went wrong"]);
      }
    } else {
      dispatch(loderShowHideAction(false))
      message.error([workspaceData?.error]);
    }
  };

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
        <Col offset={3} span={18}>
          <Form
            form={form}
            layout="vertical" //horizontal , vertical
            autoComplete="on"
            // labelCol={{ span: 7 }}
            // wrapperCol={{ span: 18 }}
            onFinish={(e) => {
              createWorkspace(e);
            }}
          >
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
                  message: "Workspace name cannot be more than 100 characters.",
                },
              ]}
            >
              <Input
                key={"input-workspace-name"}
                className={"input"}
                name={"name"}
                type={"text"}
                placeholder={"Workspace Name"}
              />
            </Form.Item>

            <Form.Item
              label={"Desciption"}
              labelAlign={"left"}
              name={"description"}
              rules={[
                {
                  required: true,
                  message: "Desciption is required.",
                },
              ]}
            >
              <Input.TextArea
                key={"input-desciption"}
                name={"description"}
                type={"text"}
                placeholder={"Desciption"}
                style={{ minHeight: 100, borderRadius: "10px" }}
              />
            </Form.Item>

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
                        value: e?.name,
                        label: e?.name,
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
                  htmlType="submit"
                >
                  Add Workspace
                </Button>
              </Space>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default CreateWorkspace;
