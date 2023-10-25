import React from "react";
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
} from "antd";
import AddEnvironment from "../model/addEnvironment";

const Define = ({ ingestionCss }) => {
  const [form] = Form.useForm();
  const [environment, setEnvironment] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const addEnvironmentAction = (data) => {
    let obj = environment.find((o) => o.name === data?.name);
    if (obj) {
      message.error(
        "Environment Name must be unique. Please specify another Name"
      );
    } else {
      setEnvironment([...environment, data]);
      setIsModalOpen(false);
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
            onFinish={(e) => {
              addEnvironmentAction(e);
            }}
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
              name={"name"}
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
                name={"name"}
                type={"text"}
                placeholder={"Pipeline Description"}
              />
            </Form.Item>

            <Form.Item
              label={"Workspace"}
              labelAlign={"left"}
              name={"name"}
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
                name={"name"}
                type={"text"}
                placeholder={"Workspace"}
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
                        value: e?.name,
                        label: e?.name,
                      };
                    })}
                  />
                </Form.Item>
              </Col>
              {/* <Col span={8}>
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
              </Col> */}
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item
                  label={"Target Engine / Language"}
                  labelAlign={"left"}
                  name={"environment"}
                  rules={[
                    {
                      required: true,
                      message: "Target engine / language is required.",
                    },
                  ]}
                >
                  <Select
                    className="inputSelect"
                    showSearch
                    placeholder="Select target engine / language"
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
              {/* <Col span={8}>
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
              </Col> */}
            </Row>

            <div style={{ display: "flex", justifyContent: "end" }}>
              <Space>
                <Button
                  type="primary"
                  className={ingestionCss.defineSave}
                  htmlType="submit"
                >
                  Save
                </Button>
                <Button
                  type="primary"
                  className={ingestionCss.defineSaveAndBuild}
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
