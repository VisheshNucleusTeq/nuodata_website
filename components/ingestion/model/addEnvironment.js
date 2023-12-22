import { Button, Checkbox, Col, Form, Input, Row, Space } from "antd";
import React, { useEffect, useState } from "react";

import { MinusCircleOutlined } from "@ant-design/icons";

const AddEnvironment = ({
  ingestionCss,
  addEnvironmentAction,
  environmentDetails = {},
}) => {
  const [form] = Form.useForm();

  const [params, setParams] = useState({
    // "spark.executor.cores": "4",
    // "spark.executor.memory": "14G",
    // "spark.driver.memory": "14G",
    // "spark.driver.cores": "4",
    // "spark.executor.instances": "3",
    // "spark.app.name": "SparkApp",
  });

  const [paramsView, setParamsVaew] = useState("JSON");

  useEffect(() => {
    if (Object.keys(environmentDetails).length > 0) {
      form.setFieldsValue({
        ...environmentDetails,
        params: JSON.stringify(environmentDetails?.params),
      });
      setParams(environmentDetails?.params);
    } else {
      setParams({
        "spark.executor.cores": "4",
        "spark.executor.memory": "14G",
        "spark.driver.memory": "14G",
        "spark.driver.cores": "4",
        "spark.executor.instances": "3",
        "spark.dynamicAllocation.maxExecutors": "100",
        "spark.emr-serverless.driver.disk": "20G",
        "spark.emr-serverless.executor.disk": "20G",
        "spark.dynamicAllocation.minExecutors": "0",
        "spark.dynamicAllocation.maxExecutors": "100",
        "spark.dynamicAllocation.initialExecutors": "3",
      });
    }
  }, [environmentDetails]);

  useEffect(() => {
    form.setFieldValue("params", JSON.stringify(params));
  }, [params]);

  return (
    <>
      <Row className={ingestionCss.defineForm}>
        <Col offset={3} span={18}>
          <Form
            form={form}
            layout="vertical" //horizontal , vertical
            autoComplete="on"
            onFinish={(e) => {
              addEnvironmentAction({ ...e, params: params });
            }}
          >
            <Form.Item
              label={"Runtime Environment Name"}
              labelAlign={"left"}
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "Runtime environment name is required.",
                },
                {
                  max: 100,
                  message:
                    "Runtime environment name cannot be more than 100 characters.",
                },
              ]}
            >
              <Input
                key={"input-runtime-environment-name"}
                className={"input"}
                name={"name"}
                type={"text"}
                placeholder={"Runtime Environment Name"}
              />
            </Form.Item>

            <Form.Item
              label={"Description"}
              labelAlign={"left"}
              name={"description"}
              rules={[
                {
                  required: true,
                  message: "Description is required.",
                },
              ]}
            >
              <Input.TextArea
                key={"input-description"}
                name={"description"}
                type={"text"}
                placeholder={"Description"}
                style={{ minHeight: 100, borderRadius: "10px" }}
              />
            </Form.Item>

            <Form.Item
              label={"Engine Type"}
              labelAlign={"left"}
              name={"engine_type"}
              rules={[
                {
                  required: true,
                  message: "Engine type is required.",
                },
              ]}
            >
              <Checkbox.Group
                name="engine_type"
                options={["Spark", "Presto"]}
                defaultValue={["Spark"]}
                onChange={() => {}}
              />
            </Form.Item>

            <Row style={{ margin: "2vh 0vh 2vh 0vh" }}>
              <Col span={24}>
                <Space style={{ float: "right" }}>
                  <Button
                    style={{
                      float: "right",
                      border: `1px solid ${
                        paramsView == "JSON" ? "#e74860" : "#0c3246"
                      }`,
                      color: paramsView == "JSON" ? "#FFF" : "#0c3246",
                      background: paramsView == "JSON" ? "#e74860" : "",
                      boxShadow:
                        "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                    }}
                    type="primary1"
                    onClick={() => {
                      setParamsVaew("JSON");
                    }}
                  >
                    <b>{"JSON"}</b>
                  </Button>
                  <Button
                    style={{
                      float: "right",
                      border: `1px solid ${
                        paramsView == "FORM" ? "#e74860" : "#0c3246"
                      }`,
                      color: paramsView == "FORM" ? "#FFF" : "#0c3246",
                      background: paramsView == "FORM" ? "#e74860" : "",
                      // boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                      boxShadow:
                        "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                    }}
                    type="primary1"
                    onClick={() => {
                      setParamsVaew("FORM");
                    }}
                  >
                    <b>{"FORM"}</b>
                  </Button>
                </Space>
              </Col>
            </Row>
            {paramsView == "JSON" && (
              <>
                <Form.Item
                  label={"Params"}
                  labelAlign={"left"}
                  name={"params"}
                  rules={[
                    {
                      required: true,
                      message: "Params is required.",
                    },
                    {
                      validator: (rule, value, callback, source, options) => {
                        try {
                          setParams(JSON.parse(value));
                          callback();
                        } catch (error) {
                          callback("Not a valid object");
                        }
                      },
                    },
                  ]}
                >
                  <Input.TextArea
                    key={"input-params"}
                    name={"params"}
                    type={"text"}
                    placeholder={"Params"}
                    style={{ minHeight: 100, borderRadius: "10px" }}
                  />
                </Form.Item>
              </>
            )}
            {paramsView == "FORM" && (
              <>
                <Form.Item
                  label={"Params"}
                  labelAlign={"left"}
                  name={"params"}
                  rules={[
                    {
                      required: true,
                      message: "Params is required.",
                    },
                    {
                      validator: (rule, value, callback, source, options) => {
                        try {
                          setParams(JSON.parse(value));
                          callback();
                        } catch (error) {
                          callback("Not a valid object");
                        }
                      },
                    },
                  ]}
                >
                  {Object.keys(params).map((e, i) => {
                    return (
                      <Row style={{ marginBottom: "1vh" }}>
                        <Col span={10}>
                          <Input
                            key={"input-runtime-environment-key"}
                            className={"input"}
                            name={"name"}
                            type={"text"}
                            placeholder={"Runtime Environment Key"}
                            value={e}
                            onChange={(key) => {
                              let paramsObj = JSON.parse(
                                JSON.stringify(params)
                              );
                              const value = paramsObj[e];
                              delete paramsObj[e];
                              paramsObj[key.target.value] = value;
                              setParams({
                                ...paramsObj,
                              });
                            }}
                          />
                        </Col>
                        <Col span={1} />
                        <Col span={11}>
                          <Input
                            key={"input-runtime-environment-value"}
                            className={"input"}
                            name={"name"}
                            type={"text"}
                            placeholder={"Runtime Environment Value"}
                            value={params[e]}
                            onChange={(key) => {
                              let paramsObj = JSON.parse(
                                JSON.stringify(params)
                              );
                              paramsObj[e] = key.target.value;
                              setParams({
                                ...paramsObj,
                              });
                            }}
                          />
                        </Col>
                        <Col
                          span={2}
                          style={{
                            display: "flex",
                            justifyContent: "right",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            style={{ float: "right" }}
                            type="primary"
                            icon={<MinusCircleOutlined />}
                            onClick={() => {
                              let paramsObj = JSON.parse(
                                JSON.stringify(params)
                              );
                              delete paramsObj[e];
                              setParams(paramsObj);
                            }}
                          />
                        </Col>
                      </Row>
                    );
                  })}
                </Form.Item>
                <Row>
                  <Col span={24} style={{ margin: "2vh 0vh 2vh 0vh" }}>
                    <Button
                      style={{ float: "right" }}
                      type="primary"
                      icon={<MinusCircleOutlined />}
                      onClick={() => {
                        setParams({
                          ...params,
                          "": "",
                        });
                      }}
                    >
                      Add more
                    </Button>
                  </Col>
                </Row>
              </>
            )}

            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button
                type="primary"
                danger
                className={ingestionCss.nextBtn}
                htmlType="submit"
              >
                {Object.keys(environmentDetails).length > 0
                  ? "Update Runtime Environment"
                  : " Add Runtime Environment"}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AddEnvironment;
