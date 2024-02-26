import { Button, Col, Form, Input, Row, Select, message } from "antd";
import React, { useState } from "react";
import { loderShowHideAction } from "../../../../Redux/action";
import { fetch_retry_post } from "../../../../network/api-manager";
import { ADDFIELDNAME } from "../../../../network/apiConstants";
import { useDispatch } from "react-redux";
function AddNewFieldExp({
  ingestionCss,
  nodeId,
  pipeline,
  getNodeRecord,
  setIsModalOpen,
}) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const fieldTypeOptions = [
    "INTEGER",
    "BIGINT",
    "STRING",
    "TEXT",
    "BINARY",
    "DECIMAL",
    "DOUBLE",
    "DATE/TIME",
  ].map((e) => {
    return {
      value: e.toLowerCase(),
      label: e.toLowerCase(),
    };
  });

  const customCols = {
    labelCol: {
      xs: { span: 5 },
      sm: { span: 5 },
      md: { span: 5 },
      lg: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 19 },
      sm: { span: 19 },
      md: { span: 19 },
      lg: { span: 19 },
    },
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      dispatch(loderShowHideAction(true));
      const data = await form.validateFields();
      const submitData = {
        pipeline_id: pipeline,
        node_id: nodeId,
        fields: [
          {
            ...data,
            field_type: "Normal",
            port_type: "output",
          },
        ],
      };

      const resultData = await fetch_retry_post(ADDFIELDNAME, submitData);
      if (resultData.success) {
        getNodeRecord(nodeId);
        message.success(resultData?.data?.message);
        form.resetFields();
        setIsModalOpen(false);
      }
      dispatch(loderShowHideAction(false));
    } catch (error) {
      console.log(error);
    }

    // Add your submit logic here
  };

  return (
    <Form form={form} layout="horizontal" onFinish={handleSubmit}>
      <Row gutter={[6, 0]} justify="start">
        <Col span={24}>
          <Form.Item
            label="Name:"
            labelAlign="left"
            {...customCols}
            className={ingestionCss.antFormItem}
            rules={[
              {
                required: true,
                message: "Name is required.",
              },
            ]}
            name={"name"}
          >
            <Input className={ingestionCss.input} placeholder="Dev" />
          </Form.Item>

          <Form.Item
            label="Field Type:"
            labelAlign="left"
            {...customCols}
            className={ingestionCss.antFormItem}
            name={"type"}
            rules={[
              {
                required: true,
                message: "Type is required.",
              },
            ]}
          >
            <Select
              style={{ borderRadius: "5px" }}
              className={ingestionCss.inputSelect}
              placeholder="Select Field Type"
              options={fieldTypeOptions}
            />
          </Form.Item>

          <Form.Item
            label="Precision"
            labelAlign="left"
            {...customCols}
            className={ingestionCss.antFormItem}
            rules={[
              {
                required: true,
                message: "Precision is required.",
              },
            ]}
            name={"precision"}
          >
            <Input className={ingestionCss.input} placeholder="100" />
          </Form.Item>

          <Form.Item
            label="Scale:"
            labelAlign="left"
            {...customCols}
            className={ingestionCss.antFormItem}
            name={"scale"}
            rules={[
              {
                required: true,
                message: "Scale is required.",
              },
            ]}
          >
            <Input className={ingestionCss.input} placeholder="0" />
          </Form.Item>
        </Col>
      </Row>
      <Row align={"end"}>
        <Col className={ingestionCss.expBtnGrp}>
          <Button
            type="primary"
            className={`${ingestionCss.expCancelBtn} ${ingestionCss.draftBtn}`}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            // type="primary"
            htmlType="submit"
            className={`${ingestionCss.expSubmitBtn} ${ingestionCss.saveBtn}`}
            // onClick={handleSubmit}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default AddNewFieldExp;
