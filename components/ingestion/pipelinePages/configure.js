import {
  Input,
  Select,
  Row,
  Col,
  Form,
  Button,
  Typography,
  Space,
  Radio,
} from "antd";
import React, { useEffect, useState } from "react";
import cronstrue from "cronstrue";
import timeZone from "../../helper/timeZone";
import { SlackCircleFilled } from "@ant-design/icons";

const Configure = ({ ingestionCss }) => {
  const [cronExpression, setCronExpression] = useState("");
  const [description, setDescription] = useState("");
  const [selectedScheduleOption, setSelectedScheduleOption] = useState("");
  const scheduleOption = ["Day", "Custom", "Minute", "Hour", "Week"];
  const [params, setParams] = useState({
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
  const hoursOptions = Array.from({ length: 24 }, (_, i) => ({
    label: i.toString().padStart(2, "0"),
    value: i.toString().padStart(2, "0"),
  }));
  const minutesOptions = Array.from({ length: 60 }, (_, i) => ({
    label: i.toString().padStart(2, "0"),
    value: i.toString().padStart(2, "0"),
  }));
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const handleInputChange = (event) => {
    setCronExpression(event.target.value);
  };

  const handleParse = () => {
    try {
      const description = cronstrue.toString(cronExpression);
      setDescription(description);
    } catch (error) {
      setDescription(`Error parsing cron expression: ${error.message}`);
    }
  };

  const optionChild = {
    Day: (
      <>
        <Col span={2}>
          <Form.Item
            className={ingestionCss.antFormItem}
            label={"Hour"}
            labelAlign={"left"}
            required
          >
            <Select
              className={ingestionCss.inputSelect}
              onChange={handleInputChange}
              options={hoursOptions}
            />
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item
            className={ingestionCss.antFormItem}
            label={"Minute"}
            labelAlign={"left"}
            required
          >
            <Select
              className={ingestionCss.inputSelect}
              onChange={handleInputChange}
              options={minutesOptions}
            />
          </Form.Item>
        </Col>
      </>
    ),
    Custom: (
      <Col span={4}>
        <Form.Item
          className={ingestionCss.antFormItem}
          label={"Cron"}
          labelAlign={"left"}
          required
        >
          <Input
            placeholder="****?"
            className={ingestionCss.input}
            onChange={handleInputChange}
          />
        </Form.Item>
      </Col>
    ),
    Minute: (
      <Col span={4}>
        <Form.Item
          className={ingestionCss.antFormItem}
          label={"Minute"}
          labelAlign={"left"}
          required
        >
          <Select
            className={ingestionCss.inputSelect}
            onChange={handleInputChange}
            options={minutesOptions}
          />
        </Form.Item>
      </Col>
    ),
    Hour: (
      <Col span={4}>
        <Form.Item
          className={ingestionCss.antFormItem}
          label={"Minute"}
          labelAlign={"left"}
          required
        >
          <Select
            className={ingestionCss.inputSelect}
            onChange={handleInputChange}
            options={minutesOptions}
          />
        </Form.Item>
      </Col>
    ),
    Week: (
      <>
        <Col span={2}>
          <Form.Item
            className={ingestionCss.antFormItem}
            label={"Hour"}
            labelAlign={"left"}
            required
          >
            <Select
              className={ingestionCss.inputSelect}
              onChange={handleInputChange}
              options={hoursOptions}
            />
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item
            className={ingestionCss.antFormItem}
            label={"Minute"}
            labelAlign={"left"}
            required
          >
            <Select
              className={ingestionCss.inputSelect}
              onChange={handleInputChange}
              options={minutesOptions}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            className={ingestionCss.antFormItem}
            label={"Day"}
            labelAlign={"left"}
            required
          >
            <Radio.Group defaultValue="Sunday">
              {daysOfWeek.map((day) => (
                <Radio key={day} value={day}>
                  {day}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </Col>
      </>
    ),
  };
  useEffect(() => {
    handleParse();
  }, [cronExpression]);

  return (
    <>
      <Form layout="vertical" className={ingestionCss.configureForm}>
        <Row>
          <Col span={24}>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  className={ingestionCss.antFormItem}
                  label={"Schedule"}
                  labelAlign={"left"}
                  required
                >
                  <Select
                    className={ingestionCss.inputSelect}
                    value={selectedScheduleOption}
                    placeholder={"select"}
                    onChange={(option) => setSelectedScheduleOption(option)}
                    options={scheduleOption.map((val) => {
                      return { label: val, value: val };
                    })}
                  />
                </Form.Item>
              </Col>
              {optionChild[selectedScheduleOption]}
            </Row>
          </Col>
          <Col span={24}>
            <Form.Item
              className={ingestionCss.antFormItem}
              label={"Time zone (Choose a time zone for the schedule)"}
              labelAlign={"left"}
              required
            >
              <Select
                className={ingestionCss.inputSelect}
                style={{ width: "100%" }}
                showSearch
                options={timeZone}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              className={ingestionCss.antFormItem}
              label={"Runtime Environment"}
              labelAlign={"left"}
              required
            >
              <Select
                className={ingestionCss.inputSelect}
                style={{ width: "100%" }}
                showSearch
                options={scheduleOption.map((val) => {
                  return { label: val, value: val };
                })}
              />
            </Form.Item>
          </Col>
          <Col span={18}>
            <Form.Item
              className={ingestionCss.antFormItem}
              label={"Runtime Parameters"}
              labelAlign={"left"}
              name={"params"}
              rules={[
                {
                  required: true,
                  message: "Params is required.",
                },
              ]}
            >
              {Object.keys(params).map((e, i) => {
                return (
                  <Row style={{ marginBottom: "8px" }}>
                    <Col span={10}>
                      <Input
                        key={"input-runtime-environment-key"}
                        className={ingestionCss.input}
                        name={"name"}
                        type={"text"}
                        placeholder={"Runtime Environment Key"}
                        value={e}
                        onChange={(key) => {
                          let paramsObj = JSON.parse(JSON.stringify(params));
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
                        className={ingestionCss.input}
                        name={"name"}
                        type={"text"}
                        placeholder={"Runtime Environment Value"}
                        value={params[e]}
                        onChange={(key) => {
                          let paramsObj = JSON.parse(JSON.stringify(params));
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
                        className={ingestionCss.rmBtn}
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <rect
                              width="16"
                              height="16"
                              rx="8"
                              fill="#333333"
                            />
                            <path
                              d="M12.061 8L3.57569 8"
                              stroke="white"
                              stroke-linecap="round"
                            />
                          </svg>
                        }
                        onClick={() => {
                          let paramsObj = JSON.parse(JSON.stringify(params));
                          delete paramsObj[e];
                          setParams(paramsObj);
                        }}
                      />
                    </Col>
                  </Row>
                );
              })}
              <Row>
                <Col span={24}>
                  <Button
                    className={ingestionCss.cnfSubmitBtn}
                    style={{ float: "left" }}
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
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Configure;
