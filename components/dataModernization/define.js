import { useEffect, useState } from "react";
import { Button, Row, Col, Form, Input, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";

import {
  fetch_retry_post,
  fetch_retry_get,
  fetch_retry_put,
} from "../../network/api-manager";
import { BUSINESSUNITLIST } from "../../network/default-data";
import { DEFINE, GETPROJECT, UPDATEPROJECT } from "../../network/apiConstants";
import { SetProjectDetailsAction, SetTabTypeAction } from "../../Redux/action";

const Define = ({ dataModernizationCss }) => {
  const queryClient = useQueryClient();
  const { query } = useRouter();
  const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );

  useEffect(() => {
    form.setFieldsValue(projectDetails);
  }, [form, projectDetails]);

  const onFinishDefine = async (payload) => {
    if (projectDetails && projectDetails.name) {
      queryClient.refetchQueries({ queryKey: ["PROJECT_DATA"] });
      dispatch(SetTabTypeAction("Connect"));
    } else {
      setLoading(true);
      const authData = JSON.parse(localStorage.getItem("authData"));
      const data = await fetch_retry_post(DEFINE, {
        orgId: authData.orgId,
        createdBy: authData.userId,
        name: payload.name,
        businessUnit: payload.businessUnit,
        sourcePlatform: payload.sourcePlatform,
        sourceLang: payload.sourceLang,
        targetPlatform: payload.targetPlatform,
        targetLang: payload.targetLang,
      });
      setLoading(false);
      if (data.success) {
        queryClient.refetchQueries({ queryKey: ["PROJECT_DATA"] });
        dispatch(SetProjectDetailsAction(data.data));
        dispatch(SetTabTypeAction("Connect"));
      } else {
        message.error([data?.error]);
      }
    }
  };

  const onUpdateProject = async (payload) => {
    setLoading(true);
    const data = await fetch_retry_put(
      `${UPDATEPROJECT}${query?.id ? query?.id : projectDetails?.projectId}`,
      {
        name: payload.name,
        businessUnit: payload.businessUnit,
        sourcePlatform: payload.sourcePlatform,
        sourceLang: payload.sourceLang,
        targetPlatform: payload.targetPlatform,
        targetLang: payload.targetLang,
      }
    );
    setLoading(false);
    if (data.success) {
      queryClient.refetchQueries({ queryKey: ["PROJECT_DATA"] });
      dispatch(SetProjectDetailsAction(data.data));
      router.push(`/dashboard`);
    } else {
      message.error([data?.error]);
    }
  };

  const getProjectData = async () => {
    const data = await fetch_retry_get(
      `${GETPROJECT}${query?.id ? query?.id : projectDetails?.projectId}`
    );
    dispatch(SetProjectDetailsAction(data.data));
  };

  useEffect(() => {
    if (query?.id ? query?.id : projectDetails?.projectId) {
      getProjectData(query?.id ? query?.id : projectDetails?.projectId);
    }
  }, [query?.id ? query?.id : projectDetails?.projectId]);

  return (
    <Row className={dataModernizationCss.defineForm}>
      <Col offset={3} span={18}>
        <Form
          form={form}
          layout="horizontal"
          autoComplete="on"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 18 }}
          onFinish={
            (query?.id ? query?.id : projectDetails?.projectId)
              ? onUpdateProject
              : onFinishDefine
          }
          initialValues={{
            businessUnit:
              projectDetails && projectDetails.businessUnit
                ? projectDetails.businessUnit
                : "",
            name:
              projectDetails && projectDetails.name ? projectDetails.name : "",
            sourcePlatform:
              projectDetails && projectDetails.sourcePlatform
                ? projectDetails.sourcePlatform
                : "",
            sourceLang:
              projectDetails && projectDetails.sourceLang
                ? projectDetails.sourceLang
                : "",
            targetPlatform:
              projectDetails && projectDetails.targetPlatform
                ? projectDetails.targetPlatform
                : "",
            targetLang:
              projectDetails && projectDetails.targetLang
                ? projectDetails.targetLang
                : "",
          }}
        >
          <Form.Item
            label={"Select Business Unit"}
            labelAlign={"left"}
            name={"businessUnit"}
            rules={[
              {
                required: true,
                message: "Business unit is required.",
              },
            ]}
          >
            <Select
              className="inputSelect"
              showSearch
              placeholder="Select a Business unit"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={BUSINESSUNITLIST.sort((a, b) =>
                a.label.localeCompare(b.label)
              )}
              initialvalues={
                projectDetails && projectDetails.businessUnit
                  ? projectDetails.businessUnit
                  : ""
              }
            />
          </Form.Item>

          <Form.Item
            label={"Project Name"}
            labelAlign={"left"}
            name={"name"}
            rules={[
              {
                required: true,
                message: "Project name is required.",
              },
              {
                max: 100,
                message: "Project name cannot be more than 100 characters.",
              },
            ]}
          >
            <Input
              key={"input-project-name"}
              className={"input"}
              name={"name"}
              type={"text"}
              disabled={isLoading}
              placeholder={"Project Name"}
              initialvalues={
                projectDetails && projectDetails.name ? projectDetails.name : ""
              }
            />
          </Form.Item>

          <Form.Item
            label={"Source Platform"}
            labelAlign={"left"}
            name={"sourcePlatform"}
            rules={[
              {
                required: true,
                message: "Source platform is required.",
              },
            ]}
          >
            <Select
              className="inputSelect"
              showSearch
              placeholder="Select source platform"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              initialvalues={
                projectDetails && projectDetails.sourcePlatform
                  ? projectDetails.sourcePlatform
                  : ""
              }
              options={[
                {
                  value: "informatica",
                  label: "Informatica",
                },
                {
                  value: "netezza",
                  label: "Netezza",
                },
                {
                  value: "Hadoop",
                  label: "Hadoop",
                },
                {
                  value: "Teradata",
                  label: "Teradata",
                },
                {
                  value: "Vertica",
                  label: "Vertica",
                },
                {
                  value: "Oracle",
                  label: "Oracle",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label={"Source File Type"}
            labelAlign={"left"}
            name={"sourceLang"}
            rules={[
              {
                required: true,
                message: "Source File Type is required.",
              },
            ]}
          >
            <Select
              className="inputSelect"
              showSearch
              placeholder="Select source language"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              initialvalues={
                projectDetails && projectDetails.sourceLang
                  ? projectDetails.sourceLang
                  : ""
              }
              options={[
                {
                  value: "XML",
                  label: "XML",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label={"Target Platform"}
            labelAlign={"left"}
            name={"targetPlatform"}
            rules={[
              {
                required: true,
                message: "Target platform is required.",
              },
            ]}
          >
            <Select
              className="inputSelect"
              showSearch
              placeholder="Select target platform"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              initialvalues={
                projectDetails && projectDetails.targetPlatform
                  ? projectDetails.targetPlatform
                  : ""
              }
              options={[
                {
                  value: "Databricks-Lakehouse",
                  label: "Databricks-Lakehouse",
                },
                {
                  value: "gcp",
                  label: "Google Cloud Platform",
                },
                {
                  value: "AWS",
                  label: "AWS",
                },
                {
                  value: "Azure",
                  label: "Azure",
                },
                {
                  value: "Snowflake",
                  label: "Snowflake",
                },
                {
                  value: "IBM Watsonx.data",
                  label: "IBM Watsonx.data",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label={"Target Language"}
            labelAlign={"left"}
            name={"targetLang"}
            rules={[
              {
                required: true,
                message: "Target language is required.",
              },
            ]}
          >
            <Select
              className="inputSelect"
              showSearch
              placeholder="Select target language"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              initialvalues={
                projectDetails && projectDetails.targetLang
                  ? projectDetails.targetLang
                  : ""
              }
              options={[
                {
                  value: "sparkSql",
                  label: "Spark SQL",
                },
                {
                  value: "presto",
                  label: "Presto",
                },
              ]}
            />
          </Form.Item>

          <div className={dataModernizationCss.nextExitBtn}>
            <Button
              type="primary"
              danger
              className={dataModernizationCss.nextBtn}
              htmlType="submit"
            >
              {(query?.id ? query?.id : projectDetails?.projectId)
                ? "Update"
                : "Next"}
            </Button>

            <Button
              type="primary"
              danger
              className={dataModernizationCss.exitBtn}
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
  );
};

export default Define;
