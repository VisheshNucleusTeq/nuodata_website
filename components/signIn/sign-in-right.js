import React from "react";
import { Image, Form, Button, Divider, message, Input } from "antd";
import { useRouter } from 'next/router'

import Link from "next/link";
// import Input from "../common/Input";
import { fetch_retry_post } from "../../network/api-manager";
import { LOGIN } from "../../network/apiConstants";

function SignInRight({ loginCss }) {
  const router = useRouter()


  const onFinish = async (payload) => {
    const data = await fetch_retry_post(LOGIN, payload);
    if (data.success) {
      message.success("Login successfully.");
      router.push('dashboard')
    } else {
      message.error([data?.error]);
    }
  };

  const validatePassword = (rule, value, callback) => {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
    if (value && !re.test(value)) {
      callback(
        "Password must be 8 to 15 characters including number, Upper, Lower And one special character."
      );
    } else {
      callback();
    }
  };

  return (
    <div className={loginCss.flexView}>
      <div className={loginCss.loginForm}>
        <h1>
          <b>Hello! Welcome back.</b>
        </h1>
        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label={"E-mail address"}
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
              placeholder={"example@gmail.com"}
              name={"email"}
              type={"text"}
            />
          </Form.Item>

          <Form.Item
            label={"Password"}
            labelAlign={"left"}
            name={"password"}
            rules={[
              { required: true, message: "Please input your Password!" },
              { validator: validatePassword },
            ]}
          >
            <Input
              key={"input-password"}
              className={"input"}
              placeholder={"Enter password"}
              name={"password"}
              type={"password"}
            />
          </Form.Item>

          <p className={loginCss.forgotPassword}>
            <b>Forget Password?</b>
          </p>

          <Button
            size={"large"}
            className={loginCss.loginBtn}
            type="primary"
            block
            htmlType="submit"
          >
            Login
          </Button>

          <Divider plain>Or</Divider>
          <Button
            size={"large"}
            className={loginCss.googleLoginBtn}
            type=""
            block
          >
            <Image
              width={"4%"}
              src="../assets/images/google.png"
              preview={false}
            />
            &nbsp; Login with Google
          </Button>
          <p className={loginCss.signup}>
            Don’t have an account? &nbsp;
            <Link href="/sign-up">
              <b className={loginCss.cursorPointer}>Sign up</b>
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default SignInRight;
