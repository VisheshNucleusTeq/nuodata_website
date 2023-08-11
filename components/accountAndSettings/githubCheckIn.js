import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import accountAndSettings from "../../styles/accountAndSettings.module.css";
import { Button, Row, Col, Form, Input, message } from "antd";
import { ADDGITDATA, GETGITDATA } from "../../network/apiConstants";
import {
  fetch_retry_get,
  fetch_retry_post,
  fetch_retry_put,
} from "../../network/api-manager";
import { loderShowHideAction } from "../../Redux/action";

const GithubCheckIn = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState({
    github_url: "",
    github_username: "",
  });

  const [showForm, setShowForm] = useState(false);

  const addGitData = async (payload) => {
    dispatch(loderShowHideAction(true));
    const authData = JSON.parse(localStorage.getItem("authData"));
    const fetch_retry_method =
      initialValues?.github_url === "" && initialValues?.github_username === ""
        ? fetch_retry_post
        : fetch_retry_put;
    const data = await fetch_retry_method(`${ADDGITDATA}`, {
      orgId: authData?.orgId,
      userId: authData?.userId,
      keyvalues: Object.keys(payload)
        .map((key) => {
          return {
            key,
            value: payload[key],
          };
        })
        .filter((e) => e.value),
    });
    message.success(data?.data?.message);
    await gitConfigData();
    dispatch(loderShowHideAction(false));
  };

  const gitConfigData = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const resData = await fetch_retry_get(
      `${GETGITDATA}${authData?.orgId}?type=github`
    );
    resData?.data?.configs ? setInitialValues(resData?.data?.configs) : null;
    setShowForm(true);
  };

  useEffect(() => {
    gitConfigData();
  }, []);

  return (
    <>
      <h1 className={accountAndSettings.settingTitle}>Git Configuration</h1>
      <Row className={accountAndSettings.formBg}>
        {showForm && (
          <Col offset={3} span={18}>
            <Form
              form={form}
              layout="horizontal"
              autoComplete="on"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              onFinish={(e) => {
                addGitData(e);
              }}
              initialValues={initialValues}
            >
              <Form.Item
                label={"Github Url"}
                labelAlign={"left"}
                name={"github_url"}
                rules={[
                  {
                    required: true,
                    message: "Url is required.",
                  },
                ]}
              >
                <Input
                  key={"input-git-repo"}
                  className={"input"}
                  name={"github_url"}
                  type={"text"}
                  placeholder={"Ex.: https://github.com/org-name/repo-name.git"}
                />
              </Form.Item>

              <Form.Item
                label={"Github User Name"}
                labelAlign={"left"}
                name={"github_username"}
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
                  name={"github_username"}
                  type={"text"}
                  placeholder={"User Name"}
                />
              </Form.Item>

              <Form.Item
                label={"Personal Access Token"}
                labelAlign={"left"}
                name={"github_personal_access_token"}
                rules={
                  initialValues?.github_url === "" &&
                  initialValues?.github_username === ""
                    ? [
                        {
                          required: true,
                          message: "Personal access token is required.",
                        },
                      ]
                    : []
                }
              >
                <Input
                  key={"input-access-token"}
                  className={"input"}
                  name={"github_personal_access_token"}
                  type={"text"}
                  placeholder={"Access Token"}
                />
              </Form.Item>

              <div className={accountAndSettings.nextExitBtn}>
                <Button
                  type="primary"
                  danger
                  className={accountAndSettings.nextBtn}
                  htmlType="submit"
                >
                  {initialValues?.github_url === "" &&
                  initialValues?.github_username === ""
                    ? "Add"
                    : "Update"}
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
        )}
      </Row>
    </>
  );
};

export default GithubCheckIn;
