import React from "react";
import { Button, Form, Input, Select, Row, Col, message, Image } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import country from "../../helper/country";
import { fetch_retry_post } from "../../../network/api-manager";
import { CONTACT } from "../../../network/apiConstants";
import { loderShowHideAction } from "../../../Redux/action";

function ContactUsLeftNew({ signUpCss, title, buttonText }) {
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
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            router.push("/");
          }}
          className={signUpCss.logo}
        >
          <Image src="/auth/logo-new.png" preview={false} />
        </div>
        <h1 style={{ marginBottom: "25px" }}>
          <b>Sign-up!</b> for a free trial.
        </h1>

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
                name={"firstName"}
                className={signUpCss.formItem}
                rules={[
                  {
                    required: true,
                    message: "Please input your first name.",
                  },
                ]}
              >
                <Input
                  key={"input-first-name"}
                  className={signUpCss.signUpFormInput}
                  placeholder={"First Name"}
                  name={"firstName"}
                  type={"text"}
                />
              </Form.Item>
            </Col>
            <Col xs={0} sm={0} md={0} lg={1} xl={1} xxl={1} />
            <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
              <Form.Item
                name={"lastName"}
                className={signUpCss.formItem}
                rules={[
                  {
                    required: true,
                    message: "Please input your last name.",
                  },
                ]}
              >
                <Input
                  key={"input-last-name"}
                  className={signUpCss.signUpFormInput}
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
                className={signUpCss.formItem}
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
                  className={signUpCss.signUpFormInput}
                  placeholder={"Email"}
                  name={"email"}
                  type={"text"}
                />
              </Form.Item>
            </Col>
            <Col xs={0} sm={0} md={0} lg={1} xl={1} xxl={1} />
            <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
              <Form.Item
                className={signUpCss.formItem}
                style={{
                  // marginBottom: "0px !important",
                  paddingBottom: "0px !important",
                  height: "2.8vw",
                }}
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
                      // marginBottom: "40px !important",
                      paddingBottom: "0px !important",
                    }}
                  >
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                      <Form.Item
                        className={signUpCss.formItem}
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
                          className={signUpCss.inputSelectGroup}
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
                        className={signUpCss.formItem}
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
                          className={signUpCss.signUpFormInput}
                          style={{ borderRadius: "0px 5px 5px 0px !important" }}
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

          <Row justify="center" className={signUpCss.sourceRow}>
            <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
              <Form.Item
                className={signUpCss.formItem}
                name={"sourcePlatform"}
                rules={[
                  {
                    required: true,
                    message: "Source platform is required.",
                  },
                ]}
              >
                <Input
                  key={"input-source-platform"}
                  className={signUpCss.signUpFormInput}
                  placeholder={"Source platform"}
                  name={"sourcePlatform"}
                  type={"text"}
                />
              </Form.Item>
            </Col>
            <Col xs={0} sm={0} md={0} lg={1} xl={1} xxl={1} />
            <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
              <Form.Item
                className={signUpCss.formItem}
                name={"targetPlatform"}
                rules={[
                  {
                    required: true,
                    message: "Target platform is required.",
                  },
                ]}
              >
                <Input
                  key={"input-target-platform"}
                  className={signUpCss.signUpFormInput}
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
                className={signUpCss.formItem}
                name={"sourceLang"}
                rules={[
                  {
                    required: true,
                    message: "Source File Type is required.",
                  },
                ]}
              >
                <Input
                  key={"input-source-platform"}
                  className={signUpCss.signUpFormInput}
                  placeholder={"Source language"}
                  name={"sourceLang"}
                  type={"text"}
                />
              </Form.Item>
            </Col>
            <Col xs={0} sm={0} md={0} lg={1} xl={1} xxl={1} />
            <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
              <Form.Item
                className={signUpCss.formItem}
                name={"targetLang"}
                rules={[
                  {
                    required: true,
                    message: "Target language is required.",
                  },
                ]}
              >
                <Input
                  key={"input-target-platform"}
                  className={signUpCss.signUpFormInput}
                  placeholder={"Target language"}
                  name={"targetLang"}
                  type={"text"}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center">
            <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
              <Form.Item
                className={signUpCss.formItem}
                name={"orgName"}
                rules={[
                  {
                    required: true,
                    message: "Please input your organization Name",
                  },
                ]}
              >
                <Input
                  key={"input-organization-name"}
                  className={signUpCss.signUpFormInput}
                  placeholder={"Organization Name"}
                  name={"orgName"}
                  type={"text"}
                />
              </Form.Item>
            </Col>
            <Col xs={0} sm={0} md={0} lg={1} xl={1} xxl={1} />
            <Col xs={22} sm={22} md={22} lg={11} xl={11} xxl={11}>
              <Form.Item
                className={signUpCss.formItem}
                name={"jobTitle"}
                rules={[
                  {
                    required: true,
                    message: "Please input your Title",
                  },
                ]}
              >
                <Input
                  key={"input-job-title"}
                  className={signUpCss.signUpFormInput}
                  placeholder={"Job Title"}
                  name={"jobTitle"}
                  type={"text"}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center">
            <Col span={23}>
              <Form.Item
                className={signUpCss.formItem}
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
                  className={signUpCss.signUpFormInput}
                  placeholder={"Description"}
                  name={"descr"}
                  type={"text"}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center">
            <Button
              size={"large"}
              className={signUpCss.signUpBtn}
              type="primary"
              block
              htmlType="submit"
            >
              {buttonText}
            </Button>
          </Row>
        </Form>

        <p className={signUpCss.signin}>
          Already have an account?&nbsp;
          <Link href="/new/sign-in">
            <u className={signUpCss.cursorPointer}>Sign in</u>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ContactUsLeftNew;
