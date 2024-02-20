import React, { useEffect, useState } from "react";
import { Form, Button, Divider, message, Input, Image, Row } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetch_retry_post } from "../../network/api-manager";
import { LOGIN } from "../../network/apiConstants";
import { UserDetailsAction, loderShowHideAction } from "../../Redux/action";
import { useDispatch } from "react-redux";
import { useQueryClient } from "react-query";
import useSocketConnectionStatus from "../../hooks/useSocketConnectionStatus";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  googleLogout,
} from "@react-oauth/google";

function SignInLeft({ loginCss }) {
  const isConnect = useSocketConnectionStatus();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // alert(isConnect)
    googleLogout();
  }, [isConnect]);

  const onFinish = async (payload) => {
    setLoading(true);
    dispatch(loderShowHideAction(true));
    const data = await fetch_retry_post(LOGIN, payload);
    setLoading(false);
    if (data.success) {
      const expiryTime =
        Date.now() + data?.headers["x-auth-nuodata-expiry"] * 1000;
      localStorage.setItem("authToken", data?.headers["x-auth-nuodata-code"]);
      localStorage.setItem(
        "refreshToken",
        data?.headers["x-auth-nuodata-refresh-code"]
      );
      localStorage.setItem("expiryTime", expiryTime);
      localStorage.setItem("authData", JSON.stringify(data.data));
      queryClient.clear();
      dispatch(UserDetailsAction(true));
      router.push("ingestion/workspace/");
    }
    dispatch(loderShowHideAction(false));
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
          <Image src="/auth/login-logo.png" preview={false} />
        </div>
        <h1 className={loginCss.titleStyle}>
          <b>Hello!</b> Welcome back.
        </h1>
        <Row
          style={{ justifyContent: "center", display: "flex", width: "100%" }}
        >
          <Form layout="vertical" onFinish={onFinish} autoComplete="off">
            <Form.Item
              labelAlign={"left"}
              name={"email"}
              style={{ marginBottom: "20px" }}
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
              />
            </Form.Item>

            <Form.Item
              labelAlign={"left"}
              name={"password"}
              style={{ marginBottom: "10px" }}
              rules={[{ required: true, message: "Password is required." }]}
            >
              <Input.Password
                key={"input-password"}
                className={loginCss.loginFormInput}
                placeholder={"Password"}
                name={"password"}
                type={"password"}
                disabled={isLoading}
              />
            </Form.Item>

            <p className={loginCss.forgotPassword}>Forgot Password?</p>

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

            <p className={loginCss.signup}>
              Don’t have an account? &nbsp;
              <Link href="/sign-up">
                <u className={loginCss.cursorPointer}>Sign up</u>
              </Link>
            </p>
          </Form>
        </Row>
      </div>
    </div>
  );
}

export default SignInLeft;
