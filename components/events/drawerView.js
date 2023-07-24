import React from "react";
import { Col, Row, Button, Form, Input, Select, Image, message } from "antd";
import { useDispatch } from "react-redux";

import country from "../helper/country";
import { EVENTREGISTER } from "../../network/apiConstants";
import { fetch_retry_post } from "../../network/api-manager";
import { loderShowHideAction } from "../../Redux/action";

const DrawerView = ({ EventsCss, singleEventData, setOpen }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (payload) => {
    dispatch(loderShowHideAction(true));
    const postData = {
      eventId: singleEventData?.eventId,
      userName: payload?.firstName + " " + payload?.lastName,
      email: payload?.email,
      mobileNo: payload?.ctryCode + "" + payload?.phone,
      orgName: payload?.orgName,
      designation: payload?.jobTitle,
    };
    const resData = await fetch_retry_post(`${EVENTREGISTER}`, postData);
    if (resData?.data?.message) {
      message.success(resData?.data?.message);
      setOpen(false)
    } else {
      message.error(resData?.error);
    }
    dispatch(loderShowHideAction(false));
  };

  return (
    <div
      style={{
        width: "30vw",
      }}
    >
      {/* {JSON.stringify(singleEventData)} eventId */}
      <div>
        <div
          style={{
            justifyContent: "center",
            alignContent: "center",
            display: "flex",
          }}
        >
          <Image src="/events/regImage.png" width={"30%"} />
        </div>
        <h1 style={{ textAlign: "center" }}>Register Now</h1>

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
                label={"Organization Name"}
                labelAlign={"left"}
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

          <Button
            size={"large"}
            className={EventsCss.signUpBtn}
            type="primary"
            block
            htmlType="submit"
            style={{ marginBottom: "5%" }}
          >
            {"Register"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default DrawerView;
