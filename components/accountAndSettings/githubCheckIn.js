import React from "react";
import { useRouter } from "next/router";

import accountAndSettings from "../../styles/accountAndSettings.module.css";
import { Button, Row, Col, Form, Input, message } from "antd";

const GithubCheckIn = () => {
    const router = useRouter();

  const [form] = Form.useForm();
  return (
    <>
    <h1 className={accountAndSettings.settingTitle}>Git Configuration</h1>
    <Row className={accountAndSettings.formBg}>
      <Col offset={3} span={18}>
        <Form
          form={form}
          layout="horizontal"
          autoComplete="on"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          onFinish={(e) => {
            console.log(e);
          }}
          initialValues={{
            gitRepo: "https://github.com/datocms/nextjs-demo.git",
            userName: "data-cms",
            accessToken: "073afe7909ffdd6f10ef06a00bc3bc88",
          }}
        >
          <Form.Item
            label={"Git Repo"}
            labelAlign={"left"}
            name={"gitRepo"}
            rules={[
              {
                required: true,
                message: "Repo is required.",
              },
            ]}
          >
            <Input
              key={"input-git-repo"}
              className={"input"}
              name={"gitRepo"}
              type={"text"}
              placeholder={"Ex.: https://github.com/org-name/repo-name.git"}
            />
          </Form.Item>

          <Form.Item
            label={"User Name"}
            labelAlign={"left"}
            name={"userName"}
            rules={[
              {
                required: true,
                message: "User name is required.",
              },
            ]}
          >
            <Input
              key={"input-user-name"}
              className={"input"}
              name={"userName"}
              type={"text"}
              placeholder={"User Name"}
            />
          </Form.Item>

          <Form.Item
            label={"Access Tokan"}
            labelAlign={"left"}
            name={"accessToken"}
            rules={[
              {
                required: true,
                message: "Access token is required.",
              },
            ]}
          >
            <Input
              key={"input-access-tokan"}
              className={"input"}
              name={"accessToken"}
              type={"text"}
              placeholder={"Access Tokan"}
            />
          </Form.Item>


          <div className={accountAndSettings.nextExitBtn}>
            <Button
              type="primary"
              danger
              className={accountAndSettings.nextBtn}
              htmlType="submit"
            >
              Update
            </Button>

            <Button
              type="primary"
              danger
              className={accountAndSettings.exitBtn}
              onClick={() => {
                router.push(`/dashboard`);
              }}
            >
              Exit
            </Button>
          </div>

        </Form>
      </Col>
    </Row>
    </>
  );
};

export default GithubCheckIn;
