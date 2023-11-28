import React, {useEffect} from "react";
import { Form, Input, Button } from "antd";

import { CREATENODE } from "../../../../network/apiConstants";
import { fetch_retry_put } from "../../../../network/api-manager";
const General = ({ ingestionCss, nodeId, sourceData, setSourceData }) => {
  const [form] = Form.useForm();

  const onFinish = async (e) => {
    await fetch_retry_put(`${CREATENODE}/${nodeId}`, {
      ...sourceData,
      ...e,
    });
    setSourceData({
      ...sourceData,
      ...e,
    })
  };

  useEffect(()=>{
    form.setFieldsValue({
      ...sourceData
    })
  },[sourceData])

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label={"Transformation Name"}
          name={"transformation_name"}
          rules={[
            {
              required: true,
              message: "Transformation name is required.",
            },
            {
              max: 100,
              message: "Name cannot be more than 100 characters.",
            },
            {
              pattern: /^[a-zA-Z0-9_]*$/,
              message: "Please enter a valid transformation name",
            },
          ]}
        >
          <Input
            key={"input-transformation-name"}
            className={"input"}
            name={"transformation_name"}
            placeholder="Transformation Name"
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
          <Button
            type="primary"
            htmlType="submit"
            className={ingestionCss.submitBtn}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default General;
