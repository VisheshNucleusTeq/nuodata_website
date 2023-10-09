import React from "react";
import { Row, Col, Form, Input, Select, Button, Modal, message } from "antd";
import AddEnvironment from "./model/addEnvironment";
const CreateWorkspace = ({ workspaceCss }) => {
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
      setEnvironment([...environment, data]);
      setIsModalOpen(false)
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
      >
        <AddEnvironment
          workspaceCss={workspaceCss}
          addEnvironmentAction={addEnvironmentAction}
        />
      </Modal>

      <Row className={workspaceCss.defineForm}>
        <Col offset={3} span={18}>
          <Form
            form={form}
            layout="vertical" //horizontal , vertical
            autoComplete="on"
            // labelCol={{ span: 7 }}
            // wrapperCol={{ span: 18 }}
            onFinish={(e) => {
              console.log(e);
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
              name={"desciption"}
              rules={[
                {
                  required: true,
                  message: "Desciption is required.",
                },
              ]}
            >
              <Input.TextArea
                key={"input-desciption"}
                name={"name"}
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
                    options={
                      environment.map((e) => {
                        return {
                          value: e?.name,
                          label: e?.name,
                        };
                      })
                      //     [
                      //   {
                      //     value: "informatica",
                      //     label: "Informatica",
                      //   },
                      //   {
                      //     value: "netezza",
                      //     label: "Netezza",
                      //   },
                      //   {
                      //     value: "Hadoop",
                      //     label: "Hadoop",
                      //   },
                      //   {
                      //     value: "Teradata",
                      //     label: "Teradata",
                      //   },
                      //   {
                      //     value: "Vertica",
                      //     label: "Vertica",
                      //   },
                      //   {
                      //     value: "Oracle",
                      //     label: "Oracle",
                      //   },
                      // ]
                    }
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
                    className={workspaceCss.exitBtn}
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    Add new runtime environment
                  </Button>
                </Form.Item>
              </Col>
            </Row>

            <div>
              <Button
                type="primary"
                danger
                className={workspaceCss.nextBtn}
                htmlType="submit"
              >
                Add Workspace
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default CreateWorkspace;
