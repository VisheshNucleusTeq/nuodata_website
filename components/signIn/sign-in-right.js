import React from "react";
import { Image, Form, Button, Divider } from "antd";

import Link from "next/link";
import Input from "../common/Input";

function SignInRight({ loginCss }) {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const validatePassword = (rule, value, callback) => {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if(value && !re.test(value)){
      callback("password must be a minimum of 8 characters including number, Upper, Lower And one special character.");
    }else{
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
          onFinishFailed={onFinishFailed}
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
              { validator: validatePassword }
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
