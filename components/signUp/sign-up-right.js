import React from "react";
import { Button, Form } from "antd";

import Input from "../common/Input";
import Link from "next/link";

function SignUpRight({ signUpCss }) {
  return (
    <div className={signUpCss.flexView}>
          <div className={signUpCss.signUpForm}>
            <h1 style={{ marginBottom: "25px" }}>
              <b>Sign-up for a free trial</b>
            </h1>
            <Form
              layout="horizontal"
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 20 }}
              initialValues={{ remember: true }}
            >
              <Input lable="Full Name" placeholder="Name" />
              <Input
                lable="Email ID"
                placeholder="Enter your corporate email address"
              />
              <Input lable="Phone Number" placeholder="9xxxxxxxxx" />
              <Input lable="Company Name" placeholder="NucleusTeq" />
              <Input lable="Title" placeholder="Data Modernization" />
              <Input
                lable="Modernization Objective"
                placeholder1="Source Platform"
                placeholder2="Target Platform"
                inputGroup={true}
              />

              <Button
                size={"large"}
                className={signUpCss.signUpBtn}
                type="primary"
                block
              >
                Register
              </Button>
              
              <p className={signUpCss.signup}>
                Have an account? &nbsp;
                <Link href="/sign-in">
                  <b className={signUpCss.cursorPointer}>Sign in</b>
                </Link>
              </p>
            </Form>
          </div>
        </div>
  );
}

export default SignUpRight;
