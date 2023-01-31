import React from "react";
import { Button, Form, Input, Row, Col } from "antd";

// import Input from "../common/Input";
import Link from "next/link";

function SignUpRight({ signUpCss }) {

  const onFinish = async (payload) => {
    console.log(payload)
  };

  return (
    <div className={signUpCss.flexView}>
      <div className={signUpCss.signUpForm}>
        <h1 style={{ marginBottom: "25px" }}>
          <b>Sign-up for a free trial</b>
        </h1>
        {/* <Form
          layout="horizontal"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          style={{ width: "100vh" }}
        > */}
        <Form layout="horizontal" autoComplete="off"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        >
          <Form.Item
            label={"Full Name"}
            labelAlign={"left"}
            name={"full_name"}
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input
              key={"input-name"}
              className={"input"}
              placeholder={"Name"}
              name={"name"}
              type={"text"}
            />
          </Form.Item>

          <Form.Item
            label={"Email ID"}
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

          <Form.Item
            label={"Phone Number"}
            labelAlign={"left"}
            name={"phone_number"}
            rules={[
              {
                required: true,
                message: "Please input your Phone Number",
              },
            ]}
          >
            <Input
              key={"input-phone-number"}
              className={"input"}
              placeholder={"xxxxxxxxxx"}
              name={"phone_number"}
              type={"text"}
            />
          </Form.Item>

          <Form.Item
            label={"Company Name"}
            labelAlign={"left"}
            name={"company_name"}
            rules={[
              {
                required: true,
                message: "Please input your Company Name",
              },
            ]}
          >
            <Input
              key={"input-company-name"}
              className={"input"}
              placeholder={"NucleusTeq"}
              name={"company_name"}
              type={"text"}
            />
          </Form.Item>

          <Form.Item
            label={"Title"}
            labelAlign={"left"}
            name={"title"}
            rules={[
              {
                required: true,
                message: "Please input your Title",
              },
            ]}
          >
            <Input
              key={"input-title"}
              className={"input"}
              placeholder={"Ex. Data Modernization"}
              name={"title"}
              type={"text"}
            />
          </Form.Item>

          <Form.Item
            hasFeedback
            label={"Modernization Objective"}
            labelAlign={"left"}
            name={"modernization_objective"}
            // rules={[
            //   {
            //     required: true,
            //     message: "",
            //   },
            // ]}
          >
            <Input.Group>
              <Row>
                <Col xs={24} sm={24} md={11} lg={11} xl={11} xxl={11}>
                  <Form.Item
                    name={"source_platform"}
                    rules={[
                      {
                        required: true,
                        message: "Please input your Source Platform",
                      },
                    ]}
                  >
                    <Input
                      key={"input-source-platform"}
                      className={"input"}
                      placeholder={"Source Platform"}
                      name={"source_platform"}
                      type={"text"}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={11} lg={11} xl={11} xxl={11}>
                  <Form.Item
                    name={"target_platform"}
                    rules={[
                      {
                        required: true,
                        message: "Please input your Target Platform",
                      },
                    ]}
                  >
                    <Input
                      key={"input-target-platform"}
                      className={"input"}
                      placeholder={"Target Platform"}
                      name={"target_platform"}
                      type={"text"}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Input.Group>
          </Form.Item>

          <Button
            size={"large"}
            className={signUpCss.signUpBtn}
            type="primary"
            block
            htmlType="submit"
          >
            Register
          </Button>

          <p className={signUpCss.signup}>
            Have an account? &nbsp;
            <Link href="/sign-in">
              <b className={signUpCss.cursorPointer}>Sign in</b>
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default SignUpRight;
