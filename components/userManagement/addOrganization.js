import React from "react";
import { Button, Input, Form, message, Row, Col, Select } from "antd";
import { useDispatch } from "react-redux";
import { ADDORGANIZATION } from "../../network/apiConstants";
import { loderShowHideAction } from "../../Redux/action";
import { fetch_retry_post } from "../../network/api-manager";
import country from "../helper/country";
import { InfoCircleTwoTone } from "@ant-design/icons";

const AddOrganization = ({
  userManagementCss,
  setShowAddModel,
  setAddType,
  getOrganization,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (payload) => {
    dispatch(loderShowHideAction(true));
    const data = await fetch_retry_post(ADDORGANIZATION, {
      ...payload,
    });
    if (data.success) {
      message.success([data?.data?.message]);
      form.resetFields();
      setTimeout(() => {
        setAddType(null);
        setShowAddModel(false);
        getOrganization();
      }, 1000);
    } else {
      // message.error([data?.error]);
      console.log([data?.error])
    }
    dispatch(loderShowHideAction(false));
  };

  return (
    <div>
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
        <Form.Item
          name="firstName"
          rules={[
            { required: true, message: "First name is required" },
            {
              max: 20,
              message: "First name cannot be more than 20 characters.",
            },
          ]}
          label={"First name"}
          labelAlign={"left"}
        >
          <Input
            name="firstName"
            style={{ width: "100%" }}
            placeholder="First Name"
            className={userManagementCss.input}
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            { required: true, message: "Last name is required" },
            {
              max: 20,
              message: "Last name cannot be more than 20 characters.",
            },
          ]}
          label={"Last name"}
          labelAlign={"left"}
        >
          <Input
            name="lastName"
            style={{ width: "100%" }}
            placeholder="Last Name"
            className={userManagementCss.input}
          />
        </Form.Item>
        <Form.Item
          name="orgName"
          rules={[
            { required: true, message: "Organization name is required" },
            {
              max: 80,
              message: "Organization name cannot be more than 80 characters.",
            },
          ]}
          label={"organization Name"}
          labelAlign={"left"}
        >
          <Input
            name="orgName"
            style={{ width: "100%" }}
            placeholder="Organization Name"
            className={userManagementCss.input}
          />
        </Form.Item>
        <Form.Item
          tooltip={{
            title: "icon msg",
            // icon: <InfoCircleTwoTone />,
          }}
          name="email"
          rules={[
            { required: true, message: "Email is required." },
            {
              type: "email",
              message: "Email is not valid.",
            },
            {
              max: 80,
              message: "Email cannot be more than 80 characters.",
            },
          ]}
          label={"Email"}
          labelAlign={"left"}
        >
          <Input
            name="email"
            style={{ width: "100%" }}
            placeholder="Email Address"
            className={userManagementCss.input}
          />
        </Form.Item>
        <Form.Item
          style={{
            height: "2.8vw",
            marginBottom: "4vw",
          }}
          label={"Contact Number"}
          labelAlign={"left"}
          name={"contact"}
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
        >
          <Input.Group>
            <Row>
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
                  name={"contact"}
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number",
                    },
                    {
                      max: 15,
                      message: "Contact number must be between 8-15 digit",
                    },
                    {
                      min: 8,
                      message: "Contact number must be between 8-15 digit",
                    },
                  ]}
                >
                  <Input
                    key={"input-phone-number"}
                    className={"inputGroup inputGroupNumber"}
                    placeholder={"Phone Number"}
                    name={"contact"}
                    type={"number"}
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
        <Form.Item>
          <Button
            type="danger"
            className={userManagementCss.button}
            htmlType="submit"
            style={{ width: "100%" }}
          >
            Add Organization
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddOrganization;
