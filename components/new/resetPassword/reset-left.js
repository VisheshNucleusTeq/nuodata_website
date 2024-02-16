import React, { useEffect, useState, useRef } from "react";
import { Form, Button, Input, Image, Row, message } from "antd";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { googleLogout } from "@react-oauth/google";

function ResetLeft({ loginCss }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const formRef = useRef(null);

  useEffect(() => {
    googleLogout();
  }, []);

  const handleButtonClick = () => {
    const formInstance = formRef.current;

    formInstance.validateFields().then((values) => {
      const formErrors = formInstance
        .getFieldsError()
        .filter(({ errors }) => errors.length);

      if (errorMessage || formErrors.length > 0) {
        return;
      }
      setLoading(true);
      router.push("/new/sign-in");
      message.success("Password is reset successfully.");
    });
  };

  const handleChange = () => {
    setErrorMessage(null);
    const formInstance = formRef.current;
    formInstance.validateFields();
  };

  const onFinishFailed = (errorInfo) => {
    setErrorMessage(errorInfo.errorFields[0]?.errors[0] || null);
  };

  const confirmNewPasswordValidator = (_, value) => {
    const formInstance = formRef.current;
    const newPassword = formInstance.getFieldValue("new_password");
    if (value && newPassword && value !== newPassword) {
      return Promise.reject("Passwords do not match.");
    }
    return Promise.resolve();
  };

  return (
    <div className={loginCss.flexView}>
      <div className={loginCss.loginForm}>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            router.push("/");
          }}
          className={loginCss.logo}
        >
          <Image src="/auth/logo-new.png" preview={false} />
        </div>
        <h1 className={loginCss.titleStyle}>
          <b>Reset Your Password</b>
        </h1>

        <Row
          style={{ justifyContent: "center", display: "flex", width: "100%" }}
        >
          <Form
            layout="vertical"
            autoComplete="off"
            onFinishFailed={onFinishFailed}
            ref={formRef}
          >
            <Form.Item
              name={"new_password"}
              style={{ marginBottom: "20px" }}
              rules={[
                {
                  required: true,
                  message: "New Password is required.",
                },
              ]}
            >
              <Input.Password
                key={"new-password"}
                className={loginCss.loginFormInput}
                placeholder={"Enter New Password"}
                name={"new_password"}
                type={"text"}
                disabled={isLoading}
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item
              name={"confirm_password"}
              className={loginCss.resetConfirmPassword}
              rules={[
                {
                  required: true,
                  message: "Confirm Password is required.",
                },
                {
                  validator: confirmNewPasswordValidator,
                  message: "Passwords do not match.",
                },
              ]}
            >
              <Input.Password
                key={"confirm-password"}
                className={loginCss.loginFormInput}
                placeholder={"Confirm New Password"}
                name={"confirm_password"}
                type={"text"}
                disabled={isLoading}
                onChange={handleChange}
              />
            </Form.Item>

            <Button
              size={"large"}
              className={loginCss.loginBtn}
              type="primary"
              block
              htmlType="submit"
              loading={isLoading}
              disabled={isLoading}
              onClick={handleButtonClick}
            >
              Reset Password
            </Button>
          </Form>
        </Row>
      </div>
    </div>
  );
}

export default ResetLeft;
