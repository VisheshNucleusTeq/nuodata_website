import {
  Col,
  Row,
  Badge,
  Button,
  Divider,
  Drawer,
  Space,
  Form,
  Input,
  Select,
  Image,
} from "antd";
import React, { useState } from "react";
import Header from "../common/header";
import {
  MailOutlined,
  MobileOutlined,
  GlobalOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import country from "../helper/country";

const Event = ({ EventsCss }) => {
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [displayDiv, setDisplayDiv] = useState(true);

  const onFinish = async (payload) => {};

  return (
    <div
      className={EventsCss.mainDiv}
      style={{
        background: 'url("/home/sequence.gif") no-repeat center center',
      }}
    >
      <Drawer
      contentWrapperStyle={{border : ".5vw solid #e74860", borderRadius : "0 204px 0 0", backgroundColor : "transparent"}}
        height={"90vh"}
        placement="lefft"
        width={500}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        className={EventsCss.drawer}
        closeIcon={false}


        // bodyStyle={{backgroundColor : "red", }}
        // headerStyle={{backgroundColor : "red",}}
      >
        <div
          style={
            {
              width: "30vw",
            }
          }
        >
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
                                e.target.value = e.target.value.replace(
                                  /\D/g,
                                  ""
                                );
                              }}
                              onKeyUp={(e) => {
                                e.target.value = e.target.value.replace(
                                  /\D/g,
                                  ""
                                );
                              }}
                              onChange={(e) => {
                                e.target.value = e.target.value.replace(
                                  /\D/g,
                                  ""
                                );
                              }}
                              onBlur={(e) => {
                                e.target.value = e.target.value.replace(
                                  /\D/g,
                                  ""
                                );
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
                {"buttonText"}
              </Button>
            </Form>
          </div>
        </div>
      </Drawer>

      <Header />
      <div className={EventsCss.detailsDiv}>
        <div
          className={`${
            open ? EventsCss.modelButonOpen : EventsCss.modelButonClose
          } ${
            displayDiv ? EventsCss.displayDivShow : EventsCss.displayDivHide
          }`}
          onClick={() => {
            setDisplayDiv(false);
            setTimeout(() => {
              setDisplayDiv(true);
            }, 1000);
            setOpen(!open);
          }}
        >
          <div>
            <span>{open ? "Close" : "Open"}</span>
            <br />
            <p
              style={{
                textAlign: "center",
                lineHeight: "0",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            >
              {open ? <LeftOutlined /> : <RightOutlined />}
            </p>
          </div>
        </div>

        <Row className={EventsCss.infoRow}>
          <Col span={19} className={EventsCss.leftEvent}>
            <Row>
              <Col span={24} className={EventsCss.leftEventFirstDiv}>
                <div>
                  <h1>Big Data Summit</h1>
                  <p>
                    Watch all the keynotes, 250+ breakouts and more from the
                    global event for the data and AI community — available until
                    July 14.
                  </p>
                </div>
              </Col>
              <Col span={24} className={EventsCss.leftEventSecondDiv}>
                <Row>
                  <Col span={2}></Col>
                  <Col span={20}>
                    <Row className={EventsCss.leftEventBottom}>
                      <Col span={6} className={EventsCss.leftEventBottomBadge}>
                        <Button
                          onClick={() => {
                            setOpen(true);
                          }}
                          danger
                        >
                          Reach Us At
                        </Button>
                      </Col>
                      <Col span={6} className={EventsCss.bottomText}>
                        <span>
                          <MailOutlined />
                          &nbsp;&nbsp;info@nucleusteq.com
                        </span>
                      </Col>
                      <Col span={1} className={EventsCss.bottomText}>
                        <Divider
                          type="vertical"
                          style={{ backgroundColor: "#FFF", height: "4vh" }}
                        />
                      </Col>
                      <Col span={5} className={EventsCss.bottomText}>
                        <span>
                          <MobileOutlined />
                          &nbsp;&nbsp;+91 9876543210
                        </span>
                      </Col>
                      <Col span={1} className={EventsCss.bottomText}>
                        <Divider
                          type="vertical"
                          style={{ backgroundColor: "#FFF", height: "4vh" }}
                        />
                      </Col>
                      <Col span={5} className={EventsCss.bottomText}>
                        <span>
                          <GlobalOutlined />
                          &nbsp;&nbsp;nucleusteq.com
                        </span>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={2}></Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={5}>
            {/* <Timeline
              style={{
                border: "1px solid red",
                width: "100%",
              }}
              mode={"left"}
            >
              {Array(3)
                .fill(undefined)
                .map(() => {
                  return (
                    <Timeline.Item
                      key={(Math.random() + 1).toString(36).substring(7)}
                      style={{ height: 80 / 3 + "vh", fontSize: "16px" }}
                      label={<>demo item</>}
                    >
                     <p> 22-05-19995 <br/> to <br/>22-05-19995</p>
                    </Timeline.Item>
                  );
                })}
            </Timeline> */}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Event;
