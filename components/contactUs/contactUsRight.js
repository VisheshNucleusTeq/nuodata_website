import React from "react";
import { Button, Form, Input, Select, Row, Col, message } from "antd";

import { useDispatch, useSelector } from "react-redux";
import country from "../helper/country";
import { fetch_retry_post } from "../../network/api-manager";
import { CONTACT } from "../../network/apiConstants";
import { loderShowHideAction } from "../../Redux/action";

function ContactUsRight({ signUpCss, title, buttonText }) {
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
      // message.error([data?.error]);
      console.log([data?.error])
    }
    dispatch(loderShowHideAction(false));
  };

  return (
    <div className={signUpCss.flexView}>
      <div className={signUpCss.contactUsForm}>
        <h1 style={{ marginBottom: "25px" }}>{title}</h1>

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
                name={"firstName"}
                rules={[
                  {
                    required: true,
                    message: "Please input your first name.",
                  },
                  {
                    max: 20,
                    message: "First name cannot be more than 20 characters.",
                  },
                ]}
              >
                <Input
                  key={"input-first-name"}
                  className={"input"}
                  placeholder={"First Name"}
                  name={"firstName"}
                  type={"text"}
                />
              </Form.Item>
            </Col>
            <Col xs={0} sm={0} md={0} lg={1} xl={1} xxl={1} />
            <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
              <Form.Item
                label={"Last Name"}
                labelAlign={"left"}
                name={"lastName"}
                rules={[
                  {
                    required: true,
                    message: "Please input your last name.",
                  },
                  {
                    max: 20,
                    message: "Last name cannot be more than 20 characters.",
                  },
                ]}
              >
                <Input
                  key={"input-last-name"}
                  className={"input"}
                  placeholder={"Last Name"}
                  name={"lastName"}
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
                  {
                    max: 80,
                    message: "Email cannot be more than 80 characters.",
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
            <Col xs={0} sm={0} md={0} lg={1} xl={1} xxl={1} />
            <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
              <Form.Item
                style={{
                  marginBottom: "0px !important",
                  paddingBottom: "0px !important",
                  height: "2.8vw",
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
                        name={"ctryCode"}
                        rules={[
                          {
                            required: true,
                            message: "Please select country",
                          },
                        ]}
                      >
                        <Select
                          name={"ctryCode"}
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
                          {
                            min: 8,
                            message: "phone number must be between 8-15 digit.",
                          },
                          {
                            max: 15,
                            message: "phone number must be between 8-15 digit.",
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
                name={"sourcePlatform"}
                rules={[
                  {
                    required: true,
                    message: "Source platform is required.",
                  },
                  {
                    max: 40,
                    message:
                      "Source platform name cannot be more than 40 characters.",
                  },
                ]}
              >
                {/* <Select
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
                /> */}
                <Input
                  key={"input-source-platform"}
                  className={"input"}
                  placeholder={"Source platform"}
                  name={"sourcePlatform"}
                  type={"text"}
                />
              </Form.Item>
            </Col>
            <Col xs={0} sm={0} md={0} lg={1} xl={1} xxl={1} />
            <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
              <Form.Item
                label={"Target Platform"}
                labelAlign={"left"}
                name={"targetPlatform"}
                rules={[
                  {
                    required: true,
                    message: "Target platform is required.",
                  },
                  {
                    max: 40,
                    message:
                      "Target platform name cannot be more than 40 characters.",
                  },
                ]}
              >
                {/* <Select
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
                /> */}
                <Input
                  key={"input-target-platform"}
                  className={"input"}
                  placeholder={"Target platform"}
                  name={"targetPlatform"}
                  type={"text"}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center">
            <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
              <Form.Item
                label={"Source File Type"}
                labelAlign={"left"}
                name={"sourceLang"}
                rules={[
                  {
                    required: true,
                    message: "Source File Type is required.",
                  },
                  {
                    max: 40,
                    message:
                      "Source langauge cannot be more than 40 characters.",
                  },
                ]}
              >
                {/* <Select
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
                /> */}
                <Input
                  key={"input-source-platform"}
                  className={"input"}
                  placeholder={"Source language Ex. xml"}
                  name={"sourceLang"}
                  type={"text"}
                />
              </Form.Item>
            </Col>
            <Col xs={0} sm={0} md={0} lg={1} xl={1} xxl={1} />
            <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
              <Form.Item
                label={"Target Language"}
                labelAlign={"left"}
                name={"targetLang"}
                rules={[
                  {
                    required: true,
                    message: "Target language is required.",
                  },
                  {
                    max: 40,
                    message:
                      "Target language cannot be more than 40 characters.",
                  },
                ]}
              >
                {/* <Select
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
                /> */}

                <Input
                  key={"input-target-platform"}
                  className={"input"}
                  placeholder={"Target language Ex. Spark SQL"}
                  name={"targetLang"}
                  type={"text"}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center">
            <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
              <Form.Item
                label={"Organization Name"}
                labelAlign={"left"}
                name={"orgName"}
                rules={[
                  {
                    required: true,
                    message: "Please input your organization Name",
                  },
                  {
                    max: 80,
                    message:
                      "Organization name cannot be more than 80 characters.",
                  },
                ]}
              >
                <Input
                  key={"input-organization-name"}
                  className={"input"}
                  placeholder={"Your Organization Name"}
                  name={"orgName"}
                  type={"text"}
                />
              </Form.Item>
            </Col>
            <Col xs={0} sm={0} md={0} lg={1} xl={1} xxl={1} />
            <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
              <Form.Item
                label={"Job Title"}
                labelAlign={"left"}
                name={"jobTitle"}
                rules={[
                  {
                    required: true,
                    message: "Please input your Title",
                  },
                  {
                    max: 30,
                    message: "Job title cannot be more than 30 characters.",
                  },
                ]}
              >
                <Input
                  key={"input-job-title"}
                  className={"input"}
                  placeholder={"CEO , Product Owner , Manager , Developer "}
                  name={"jobTitle"}
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
            {buttonText}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ContactUsRight;
