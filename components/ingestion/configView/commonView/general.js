import React, { useEffect } from "react";
import { Form, Input, Button, Space, message } from "antd";
import { useDispatch } from "react-redux";

import { CREATENODE } from "../../../../network/apiConstants";
import { fetch_retry_put } from "../../../../network/api-manager";
import { loderShowHideAction } from "../../../../Redux/action";
import { useRouter } from "next/router";
const General = ({
  ingestionCss,
  nodeId,
  sourceData,
  setSourceData,
  setActiveKey,
  name,
  nextTab,
  nextButtonText,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const route = useRouter();
  const savePipline = async (type) => {
    try {
      const data = await form.validateFields();
      dispatch(loderShowHideAction(true));
      const result = await fetch_retry_put(`${CREATENODE}/${nodeId}`, {
        ...sourceData,
        ...data,
      });
      setSourceData({
        ...sourceData,
        ...data,
      });
      if (result?.success) {
        message.success(result?.data?.message);
        if (type == "save") {
          route.push("/ingestion");
        } else {
          setActiveKey(nextTab);
        }
      }
      dispatch(loderShowHideAction(false));
    } catch (error) {}
  };

  useEffect(() => {
    form.setFieldsValue({
      ...sourceData,
    });
  }, [sourceData]);

  return (
    <>
      <Form form={form} layout="vertical">
        <Form.Item
          label={`${name} name`}
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
              required: false,
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
        {/* <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={ingestionCss.submitBtn}
          >
            Save
          </Button>
        </Form.Item> */}
        <div
          className={ingestionCss.generalLastDiv}
        >
          <Space>
            <Button
              type="primary"
              className={ingestionCss.defineSave}
              onClick={() => {
                savePipline("save");
              }}
            >
              Save & exit
            </Button>
            <Button
              type="primary"
              className={ingestionCss.defineSaveAndBuild}
              onClick={() => {
                savePipline("build");
              }}
            >
              {nextButtonText}
            </Button>
          </Space>
        </div>
      </Form>
    </>
  );
};

export default General;
