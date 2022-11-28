import React from "react";
import { Image, Form, Button, Divider } from "antd";

import Link from "next/link";
import Input from "../common/Input";
import { fetch_retry_post } from "../../network/api-manager";

function SignInRight({ loginCss }) {

  const onFinish = async (values) => {
    const data = await fetch_retry_post("https://reqres.in/api/login", {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    })

    localStorage.setItem('accessToken', data.data.token);
    console.log(data.data.token)
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
        <Form
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Input
            name="email"
            placeholder="example@gmail.com"
            lable="E-mail address"
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
          />
          <Input
            name="password"
            placeholder="Enter password"
            lable="Password"
            rules={[
              { required: true, message: "Please input your Password!" },
              { validator: validatePassword },
            ]}
          />

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
