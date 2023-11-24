import React, { useEffect, useState } from "react";
import { Form, Button, Divider, message, Input } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetch_retry_post } from "../../network/api-manager";
import { LOGIN } from "../../network/apiConstants";
import { UserDetailsAction, loderShowHideAction } from "../../Redux/action";
import { useDispatch } from "react-redux";
import { useQueryClient } from "react-query";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

import {
  GoogleLogin,
  GoogleOAuthProvider,
  googleLogout,
} from "@react-oauth/google";

function SignInRight({ loginCss }) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    googleLogout();
  }, []);

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
      router.push("dashboard");
    } else {
      message.error([data?.error]);
    }
    dispatch(loderShowHideAction(false));
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
            <Input.Password
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
          <Divider plain></Divider>
          <a href="/api/auth/login" style={{color : "red"}}>SSO Login</a>
          {/* <GoogleOAuthProvider clientId="995061213404-vbdmb63jpqa8ua22u5jhlc9t9f4r8h3m.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log("credentialResponse", credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              useOneTap
              theme={"filled_blue"}
            />
          </GoogleOAuthProvider> */}

          <Divider plain></Divider>

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
