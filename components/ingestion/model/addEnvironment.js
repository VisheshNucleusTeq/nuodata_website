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
  Radio,
} from "antd";

const AddEnvironment = ({
  ingestionCss,
  addEnvironmentAction,
  environmentDetails = {},
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (Object.keys(environmentDetails).length > 0) {
      form.setFieldsValue({
        ...environmentDetails,
        params: JSON.stringify(environmentDetails?.params),
      });
    }
  }, [environmentDetails]);

  return (
    <>
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
                key={"input-description"}
                name={"description"}
                type={"text"}
                placeholder={"Description"}
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
              {/* <Radio.Group name="engine_type" defaultValue={1}>
    <Radio value={'spark'}>Spark</Radio>
    <Radio value={'presto'}>Presto</Radio>
   
  </Radio.Group> */}
              <Checkbox.Group
                name="engine_type"
                options={["Spark", "Presto"]}
                defaultValue={["Spark"]}
                onChange={() => {}}
              />
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
                name={"params"}
                type={"text"}
                placeholder={"Params"}
                style={{ minHeight: 100, borderRadius: "10px" }}
              />
            </Form.Item>

            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button
                type="primary"
                danger
                className={ingestionCss.nextBtn}
                htmlType="submit"
              >
                {Object.keys(environmentDetails).length > 0
                  ? "Update Runtime Environment"
                  : " Add Runtime Environment"}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AddEnvironment;
