import React from "react";
import { Form, Input, Button } from "antd";
const General = ({ ingestionCss }) => {
  const [form] = Form.useForm();

  return (
    <>
      <Form form={form} layout="vertical">
        <Form.Item
          label={"Name"}
          name={"name"}
          rules={[
            {
              required: true,
              message: "Name is required.",
            },
            {
              max: 100,
              message: "Name cannot be more than 100 characters.",
            },
          ]}
        >
          <Input
            key={"input-name"}
            className={"input"}
            name={"name"}
            placeholder="Name"
          />
        </Form.Item>
        <Form.Item
          label={"Description"}
          name={"description"}
          rules={[
            {
              required: true,
              message: "Description is required.",
            },
            {
              max: 100,
              message: "Description cannot be more than 100 characters.",
            },
          ]}
        >
          <Input
            key={"input-description"}
            className={"input"}
            name={"description"}
            placeholder="Description"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default General;
