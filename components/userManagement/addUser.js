import React, { useEffect, useState } from "react";
import { Button, Input, Form, message, Row, Col, Select } from "antd";
import { useDispatch } from "react-redux";
import {
  GETROLES,
  GETORGANIZATION,
  SIGNUP,
  UPDATEUSER,
} from "../../network/apiConstants";
import { loderShowHideAction } from "../../Redux/action";
import {
  fetch_retry_get,
  fetch_retry_post,
  fetch_retry_put,
} from "../../network/api-manager";
import country from "../helper/country";

const AddUser = ({
  userManagementCss,
  setShowAddModel,
  setAddType,
  updateUserData,
  getUserList,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [roles, setRoles] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [addOrgBtn, setAddOrgBtn] = useState(false);
  const [bizStatus, setBizStatus] = useState(false);

  const getRoles = async (type) => {
    dispatch(loderShowHideAction(true));
    const data = await fetch_retry_get(`${GETROLES}${type}`);
    setRoles(
      data?.data?.map((e) => {
        return {
          value: e?.roleId,
          label: e?.roleName,
        };
      })
    );
    form.resetFields(["role"]);
    dispatch(loderShowHideAction(false));
  };

  const updateUserAction = async (payload) => {
    dispatch(loderShowHideAction(true));
    const data = await fetch_retry_put(
      `${UPDATEUSER}${updateUserData?.userId}`,
      {
        ...payload,
      }
    );
    if (data.success) {
      getUserList();
      message.success([data?.data?.message]);
      form.resetFields();
      setAddType(null);
      setShowAddModel(false);
    } else {
      message.error([data?.error]);
    }
    dispatch(loderShowHideAction(false));
  };

  const addUserAction = async (payload) => {
    dispatch(loderShowHideAction(true));
    const data = await fetch_retry_post(SIGNUP, {
      ...payload,
      mobileNo: payload?.phone,
    });
    if (data.success) {
      getUserList();
      message.success([data?.data?.message]);
      form.resetFields();
      setAddType(null);
      setShowAddModel(false);
    } else {
      message.error([data?.error]);
    }
    dispatch(loderShowHideAction(false));
  };

  const onFinish = async (payload) => {
    if (updateUserData?.firstName) {
      updateUserAction(payload);
    } else {
      addUserAction(payload);
    }
  };

  const getOrganization = async () => {
    const delay = (delayInms) => {
      return new Promise((resolve) => setTimeout(resolve, delayInms));
    };

    const data = await fetch_retry_get(`${GETORGANIZATION}`);
    let orgData = data?.data?.map((e) => {
      return {
        value: e?.orgId,
        label: e?.orgName,
      };
    });
    setOrganization(orgData);
    let initialValues = {};
    if (updateUserData?.firstName) {
      let objOrgId = orgData.find((o) => o.label === updateUserData?.orgName);
      if (objOrgId?.value) {
        initialValues = {
          orgId: objOrgId?.value,
        };
      }
      form.setFieldsValue(initialValues);
    }
  };

  const addUpdateData = async () => {
    if (updateUserData?.firstName) {
      let initialValues = {
        ...updateUserData,
        phone: updateUserData?.mobileNo,
      };

      const userType =
        updateUserData?.userType == "Nuodata"
          ? "nuodata"
          : updateUserData?.userType == "Business"
          ? "biz"
          : updateUserData?.userType == "Individual"
          ? "ind"
          : "";
      initialValues = {
        ...initialValues,
        userType: userType,
      };
      await getRoles(userType);

      let objRoleId = roles.find((o) => o.label === updateUserData?.roleName);
      if (objRoleId?.value) {
        initialValues = {
          ...initialValues,
          roleId: objRoleId?.value,
        };
      }

      let objOrgId = organization.find(
        (o) => o.label === updateUserData?.orgName
      );
      if (objOrgId?.value) {
        initialValues = {
          ...initialValues,
          orgId: objOrgId?.value,
        };
      }
      form.setFieldsValue(initialValues);
    } else {
      // form.resetFields();
    }
  };

  useEffect(() => {
    if (roles.length && updateUserData?.userType) {
      let objRoleId = roles.find((o) => o.label === updateUserData?.roleName);
      form.setFieldsValue({
        roleId: objRoleId?.value,
      });
    }
  }, [roles]);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (["nuodata_admin"].includes(authData?.roleName)) {
      getOrganization();
      setAddOrgBtn(true);
    }

    if (["biz_master_admin"].includes(authData?.roleName)) {
      getRoles("biz");
      form.setFieldsValue({
        userType: "biz",
      });
      setOrganization([
        {
          value: authData?.orgId,
          label: authData?.orgName,
        },
      ]);
      form.setFieldsValue({
        orgId: authData?.orgId,
      });
      setBizStatus(true);
    }
  }, []);

  useEffect(() => {
    addUpdateData();
  }, [updateUserData, form]);

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
        <Row gutter={[6, 0]}>
          <Col span={12}>
            <Form.Item
              name={"userType"}
              rules={[
                {
                  required: true,
                  message: "Please select user type",
                },
              ]}
              label={"User Type"}
              labelAlign={"left"}
            >
              <Select
                disabled={bizStatus}
                name={"userType"}
                className="inputSelect"
                placeholder="Select user type"
                options={[
                  {
                    value: "nuodata",
                    label: "NuoData User",
                  },
                  {
                    value: "biz",
                    label: "Company User",
                  },
                  // {
                  //   value: "ind",
                  //   label: "Individual User",
                  // },
                ]}
                onChange={(e) => {
                  getRoles(e);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"roleId"}
              rules={[
                {
                  required: true,
                  message: "Please select role",
                },
              ]}
              label={"Select Role"}
              labelAlign={"left"}
            >
              <Select
                name={"roleId"}
                className="inputSelect"
                placeholder="Select role"
                options={roles}
              />
            </Form.Item>
          </Col>

          <Col span={12} align="left">
            <Form.Item
              name={"orgId"}
              rules={[
                {
                  required: true,
                  message: "Please select organization",
                },
              ]}
              label={"Organization"}
              labelAlign={"left"}
            >
              <Select
                name={"orgId"}
                className="inputSelect"
                placeholder="Select Organization"
                options={organization}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={"Job Title"}
              labelAlign={"left"}
              name={"jobTitle"}
              rules={[
                {
                  required: true,
                  message: "Please input job Title",
                },
                {
                  max: 30,
                  message: "Job title cannot be more than 30 character.",
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

          {!updateUserData?.firstName && (
            <>
              <Col span={12} align="left">
                <Form.Item
                  label={"First Name"}
                  labelAlign={"left"}
                  name={"firstName"}
                  rules={[
                    {
                      required: true,
                      message: "Please input first name.",
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
              <Col span={12} align="">
                <Form.Item
                  label={"Last Name"}
                  labelAlign={"left"}
                  name={"lastName"}
                  rules={[
                    {
                      required: true,
                      message: "Please input last name.",
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
              <Col span={12}>
                <Form.Item
                  key={"input-email"}
                  label={"Email"}
                  labelAlign={"left"}
                  name={"email"}
                  rules={[
                    {
                      required: true,
                      message: "Please input email.",
                    },
                    {
                      type: "email",
                      message: "Email is not valid.",
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
                    placeholder={"Email "}
                    name={"email"}
                    type={"text"}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={"Password"}
                  labelAlign={"left"}
                  name={"password"}
                  rules={
                    updateUserData?.firstName
                      ? []
                      : [
                          {
                            required: true,
                            message: "Please input password.",
                          },
                        ]
                  }
                >
                  <Input
                    key={"input-password"}
                    className={"input"}
                    placeholder={"Password"}
                    name={"password"}
                    type={"text"}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  style={{
                    height: "2.8vw",
                    marginBottom: "4vw",
                  }}
                  label={"Contact Number"}
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
                    <Row>
                      <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item
                          name={"ctryCode"}
                          rules={
                            updateUserData?.firstName
                              ? []
                              : [
                                  {
                                    required: true,
                                    message: "Please select country",
                                  },
                                ]
                          }
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
                              message: "Please input phone number",
                            },
                            {
                              min: 8,
                              message: "Contact number must be between 8-15 digit",
                            },
                            {
                              max: 15,
                              message: "Contact number must be between 8-15 digit",
                            },
                          ]}
                        >
                          <Input
                            key={"input-phone-number"}
                            className={"inputGroup inputGroupNumber"}
                            placeholder={"Phone Number"}
                            name={"phone"}
                            type={"number"}
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
            </>
          )}

          {updateUserData?.firstName && (
            <Col span={24}>
              <Form.Item
                name={"status"}
                rules={[
                  {
                    required: true,
                    message: "Please select status",
                  },
                ]}
                label={"User Status"}
                labelAlign={"left"}
              >
                <Select
                  name={"status"}
                  className="inputSelect"
                  placeholder="Select status"
                  options={[
                    {
                      value: "active",
                      label: "Active",
                    },
                    {
                      value: "inactive",
                      label: "Inactive",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          )}

          <Col span={24} align="left">
            <Form.Item
              name={"modules"}
              rules={[
                {
                  required: true,
                  message: "Please select modules",
                },
              ]}
              label={"Modules"}
              labelAlign={"left"}
            >
              <Select
                mode="tags"
                name={"modules"}
                className="inputSelectMultiple"
                placeholder="Select Modules"
                options={[
                  "Modernize",
                  "Governance",
                  "Ingest",
                  "Monitor",
                  "Catalog",
                ].map((e) => {
                  return {
                    key: e,
                    value: e,
                  };
                })}
              />
            </Form.Item>
          </Col>
        </Row>
        <Button
          size={"large"}
          className={userManagementCss.button}
          type="primary"
          block
          htmlType="submit"
          style={{ marginBottom: "5%" }}
        >
          {updateUserData?.firstName ? "Update User" : "Add User"}
        </Button>
      </Form>
    </div>
  );
};

export default AddUser;
