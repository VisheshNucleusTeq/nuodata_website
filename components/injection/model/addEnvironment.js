import React from "react";
import { Row, Col, Form, Input, Select, Button, Modal, Checkbox } from "antd";

const AddEnvironment = ({ workspaceCss, addEnvironmentAction }) => {
  const [form] = Form.useForm();

  return (
    <>
      <Row className={workspaceCss.defineForm}>
        <Col offset={3} span={18}>
          <Form
            form={form}
            layout="vertical" //horizontal , vertical
            autoComplete="on"
            // labelCol={{ span: 7 }}
            // wrapperCol={{ span: 18 }}
            onFinish={(e) => {
                addEnvironmentAction(e);
            }}
          >
            <Form.Item
              label={"Runtime Environment Name"}
              labelAlign={"left"}
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "Runtime environment name is required.",
                },
                {
                  max: 100,
                  message:
                    "Runtime environment name cannot be more than 100 characters.",
                },
              ]}
            >
              <Input
                key={"input-runtime-environment-name"}
                className={"input"}
                name={"name"}
                type={"text"}
                placeholder={"Runtime Environment Name"}
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

            <Form.Item
              label={"Engine Type"}
              labelAlign={"left"}
              name={"engine_type"}
              rules={[
                {
                  required: true,
                  message: "Engine type is required.",
                },
              ]}
            >
              <Checkbox.Group
                options={["Spark", "Presto"]}
                defaultValue={["Spark"]}
                onChange={() => {}}
              />

              {/* <Input.TextArea
                key={"input-params"}
                name={"name"}
                type={"text"}
                placeholder={"Params"}
                style={{ minHeight: 100, borderRadius: "10px" }}
              /> */}
            </Form.Item>

            <Form.Item
              label={"Params"}
              labelAlign={"left"}
              name={"params"}
              rules={[
                {
                  required: true,
                  message: "Params is required.",
                },
              ]}
            >
              <Input.TextArea
                key={"input-params"}
                name={"name"}
                type={"text"}
                placeholder={"Params"}
                style={{ minHeight: 100, borderRadius: "10px" }}
              />
            </Form.Item>

            <div>
              <Button
                type="primary"
                danger
                className={workspaceCss.nextBtn}
                htmlType="submit"
              >
                Add Runtime Environment
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AddEnvironment;
