import React, { useEffect, useState, useRef } from "react";
import { Form, Button, Input, Image, Row } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { googleLogout } from "@react-oauth/google";

function ForgotLeft({ loginCss }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    googleLogout();
  }, []);

  const formRef = useRef(null);

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
      router.push("/new/reset-password");
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
          <b>Forgot Password!</b>
        </h1>

        <p className={loginCss.paraStyle}>
          Reset your password by filling in your username or e-mail address.
          <br />
          You will then receive an email with a link that will let you enter a
          new password.
          <br /> If you don't receive the email, please contact
        </p>

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
              name={"email"}
              style={{ marginBottom: "10px" }}
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid email address.",
                },
                {
                  required: true,
                  message: "Email address is required.",
                },
              ]}
            >
              <Input
                key={"input-email"}
                className={loginCss.loginFormInput}
                placeholder={"E-mail address"}
                name={"email"}
                type={"text"}
                disabled={isLoading}
                onChange={handleChange}
              />
            </Form.Item>

            <p className={loginCss.forgotPassword}>Resend code</p>

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
              Request reset link
            </Button>

            <p className={loginCss.signup}>
              Back to&nbsp;
              <Link href="/new/sign-in">
                <u className={loginCss.cursorPointer}>Sign in</u>
              </Link>
            </p>
          </Form>
        </Row>
      </div>
    </div>
  );
}

export default ForgotLeft;
