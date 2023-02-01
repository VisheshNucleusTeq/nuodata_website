import React, { useState } from "react";
import { Image, Form, Button, Divider, message, Input } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetch_retry_post } from "../../network/api-manager";
import { LOGIN } from "../../network/apiConstants";
import {
  UserDetailsAction
} from "../../Redux/action";
import { useDispatch } from "react-redux";

function SignInRight({ loginCss }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const onFinish = async (payload) => {
    setLoading(true);
    const data = await fetch_retry_post(LOGIN, payload);
    setLoading(false);
    if (data.success) {
      localStorage.setItem("authData", JSON.stringify(data.data));
      dispatch(UserDetailsAction(true));
      router.push("dashboard");
    } else {
      message.error([data?.error]);
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
              className={"input"}
              placeholder={"example@gmail.com"}
              name={"email"}
              type={"text"}
              style={{ minWidth: "40vw" }}
              disabled={isLoading}
            />
          </Form.Item>

          <Form.Item
            label={"Password"}
            labelAlign={"left"}
            name={"password"}
            rules={[{ required: true, message: "Password is required." }]}
          >
            <Input
              key={"input-password"}
              className={"input"}
              placeholder={"Enter password"}
              name={"password"}
              type={"password"}
              disabled={isLoading}
            />
          </Form.Item>

          <p className={loginCss.forgotPassword}>
            <b>Forgot Password?</b>
          </p>

          <Button
            size={"large"}
            className={loginCss.loginBtn}
            type="primary"
            block
            htmlType="submit"
            loading={isLoading}
            disabled={isLoading}
          >
            Login
          </Button>

          <Divider plain>NuoData</Divider>
          {/* <Button
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
          </Button> */}
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
