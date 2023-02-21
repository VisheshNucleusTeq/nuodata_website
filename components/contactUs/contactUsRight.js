import React from "react";
import { Button, Form, Input, Select, Row, Col, message } from "antd";

import { useDispatch, useSelector } from "react-redux";
import country from "../helper/country";
import { fetch_retry_post } from "../../network/api-manager";
import { CONTACT } from "../../network/apiConstants";
import { loderShowHideAction } from "../../Redux/action";

function ContactUsRight({ signUpCss }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = async (payload) => {
    dispatch(loderShowHideAction(true));
    const data = await fetch_retry_post(CONTACT, payload);
    if (data.success) {
      message.success([
        "Thank you for contacting us. We will reach out to you soon.",
      ]);
      form.resetFields();
    } else {
      message.error([data?.error]);
    }
    dispatch(loderShowHideAction(false));
  };

  return (
    <div className={signUpCss.flexView}>
      <div className={signUpCss.contactUsForm}>
        <h1 style={{ marginBottom: "25px" }}>Contact Us.</h1>

        <Form
          form={form}
          layout="verticle"
          autoComplete="off"
          labelCol={{
            xs: { span: 24 },
            sm: { span: 24 },
            md: { span: 24 },
            lg: { span: 24 },
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 24 },
            md: { span: 24 },
            lg: { span: 24 },
          }}
          onFinish={onFinish}
        >
          <Row justify="center">
            <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
              <Form.Item
                label={"First Name"}
                labelAlign={"left"}
                name={"first_name"}
                rules={[
                  {
                    required: true,
                    message: "Please input your first name.",
                  },
                ]}
              >
                <Input
                  key={"input-first-name"}
                  className={"input"}
                  placeholder={"First Name"}
                  name={"first_name"}
                  type={"text"}
                />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
              <Form.Item
                label={"Last Name"}
                labelAlign={"left"}
                name={"last_name"}
                rules={[
                  {
                    required: true,
                    message: "Please input your last name.",
                  },
                ]}
              >
                <Input
                  key={"input-last-name"}
                  className={"input"}
                  placeholder={"Last Name"}
                  name={"last_name"}
                  type={"text"}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center">
            <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
              <Form.Item
                label={"Email"}
                labelAlign={"left"}
                name={"email"}
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input
                  key={"input-email"}
                  className={"input"}
                  placeholder={"Enter your corporate email address"}
                  name={"email"}
                  type={"text"}
                />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
              <Form.Item
                style={{
                  marginBottom: "0px !important",
                  paddingBottom: "0px !important",
                }}
                label={"Phone Number"}
                labelAlign={"left"}
                name={"phone"}
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <Input.Group>
                  <Row
                    style={{
                      marginBottom: "0px !important",
                      paddingBottom: "0px !important",
                    }}
                  >
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                      <Form.Item
                        name={"ctry_code"}
                        rules={[
                          {
                            required: true,
                            message: "Please select country",
                          },
                        ]}
                      >
                        <Select
                          name={"ctry_code"}
                          className="inputSelectGroup"
                          placeholder="Country Code"
                          optionFilterProp="children"
                          initialvalues={""}
                          options={country}
                          showSearch
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                      <Form.Item
                        name={"phone"}
                        rules={[
                          {
                            required: true,
                            message: "Please input your phone number",
                          },
                        ]}
                      >
                        <Input
                          key={"input-phone-number"}
                          className={"inputGroup inputGroupNumber"}
                          placeholder={"Phone Number"}
                          name={"phone"}
                          type={"number"}
                          value={"1111"}
                          onKeyDown={(e) => {
                            e.target.value = e.target.value.replace(/\D/g, "");
                          }}
                          onKeyUp={(e) => {
                            e.target.value = e.target.value.replace(/\D/g, "");
                          }}
                          onChange={(e) => {
                            e.target.value = e.target.value.replace(/\D/g, "");
                          }}
                          onBlur={(e) => {
                            e.target.value = e.target.value.replace(/\D/g, "");
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Input.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center">
            <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
              <Form.Item
                label={"Source Platform"}
                labelAlign={"left"}
                name={"source_platform"}
                rules={[
                  {
                    required: true,
                    message: "Source platform is required.",
                  },
                ]}
              >
                <Select
                  name={"source_platform"}
                  className="inputSelect"
                  placeholder="Select source platform"
                  optionFilterProp="children"
                  initialvalues={""}
                  options={[
                    {
                      value: "informatica",
                      label: "Informatica",
                    },
                    {
                      value: "netezza",
                      label: "Netezza",
                    },
                    {
                      value: "Hadoop",
                      label: "Hadoop",
                    },
                    {
                      value: "Teradata",
                      label: "Teradata",
                    },
                    {
                      value: "Vertica",
                      label: "Vertica",
                    },
                    {
                      value: "Oracle",
                      label: "Oracle",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
              {" "}
              <Form.Item
                label={"Target Platform"}
                labelAlign={"left"}
                name={"target_platform"}
                rules={[
                  {
                    required: true,
                    message: "Target platform is required.",
                  },
                ]}
              >
                <Select
                  name={"target_platform"}
                  className="inputSelect"
                  placeholder="Select target platform"
                  optionFilterProp="children"
                  initialvalues={""}
                  options={[
                    {
                      value: "Databricks-Lakehouse",
                      label: "Databricks-Lakehouse",
                    },
                    {
                      value: "gcp",
                      label: "Google Cloud Platform",
                    },
                    {
                      value: "AWS",
                      label: "AWS",
                    },
                    {
                      value: "Azure",
                      label: "Azure",
                    },
                    {
                      value: "Snowflake",
                      label: "Snowflake",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center">
            <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
              <Form.Item
                label={"Source File Type"}
                labelAlign={"left"}
                name={"source_lang"}
                rules={[
                  {
                    required: true,
                    message: "Source File Type is required.",
                  },
                ]}
              >
                <Select
                  name={"source_lang"}
                  className="inputSelect"
                  placeholder="Select source language"
                  optionFilterProp="children"
                  initialvalues={""}
                  options={[
                    {
                      value: "XML",
                      label: "XML",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
              <Form.Item
                label={"Target Language"}
                labelAlign={"left"}
                name={"target_lang"}
                rules={[
                  {
                    required: true,
                    message: "Target language is required.",
                  },
                ]}
              >
                <Select
                  name={"target_lang"}
                  className="inputSelect"
                  placeholder="Select target language"
                  optionFilterProp="children"
                  initialvalues={""}
                  options={[
                    {
                      value: "sparkSql",
                      label: "Spark SQL",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center">
            <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
              <Form.Item
                label={"Organization Name"}
                labelAlign={"left"}
                name={"org_name"}
                rules={[
                  {
                    required: true,
                    message: "Please input your organization Name",
                  },
                ]}
              >
                <Input
                  key={"input-organization-name"}
                  className={"input"}
                  placeholder={"Your Organization Name"}
                  name={"org_name"}
                  type={"text"}
                />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
              <Form.Item
                label={"Job Title"}
                labelAlign={"left"}
                name={"job_title"}
                rules={[
                  {
                    required: true,
                    message: "Please input your Title",
                  },
                ]}
              >
                <Input
                  key={"input-job-title"}
                  className={"input"}
                  placeholder={"CEO , Product Owner , Manager , Developer "}
                  name={"job_title"}
                  type={"text"}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center">
            <Col span={23}>
              <Form.Item
                label={"Description"}
                labelAlign={"left"}
                name={"descr"}
                rules={[
                  {
                    required: true,
                    message: "Please input your description",
                  },
                ]}
              >
                <Input.TextArea
                  key={"input-description"}
                  className={"input"}
                  placeholder={"message..."}
                  name={"descr"}
                  type={"text"}
                />
              </Form.Item>
            </Col>
          </Row>

          <Button
            size={"large"}
            className={signUpCss.signUpBtn}
            type="primary"
            block
            htmlType="submit"
            style={{ marginBottom: "5%" }}
          >
            Send
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ContactUsRight;
