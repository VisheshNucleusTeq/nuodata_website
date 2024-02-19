import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";
import cronstrue from "cronstrue";
import React, { useEffect, useState } from "react";
import { fetch_retry_get } from "../../../network/api-manager";
import { ENVDETAILS, GETWORKSPACEENV } from "../../../network/apiConstants";
import { compareObjects } from "../../helper/compareObject";
import timeZone from "../../helper/timeZone";

const Configure = ({
  ingestionCss,
  setSelectedTab,
  pipelineDetails,
  workspace,
}) => {
  const [runOnSchedule, SetRunOnSchedule] = useState(true);
  const [startDate, setStartDate] = useState();
  const [environmentDetails, setEnvironmentDetails] = useState({});
  const [environmentList, setEnvironmentList] = useState([]);
  const [selectedRuntimeEnvironmentId, setSelectedRuntimeEnvironmentId] =
    useState(pipelineDetails?.runtime_env_id);
  const [cronExpression, setCronExpression] = useState("");
  const [isCronExpressionValid, setIsCronExpressionValid] = useState(
    cronExpression != ""
  );
  const [description, setDescription] = useState("");
  const [scheduleTimezone, setScheduleTimezone] = useState();
  const [selectedScheduleOption, setSelectedScheduleOption] = useState("Day");
  const scheduleOption = ["Day", "Custom", "Minute", "Hour", "Week"];
  const [selectedOptionValue, setSelectedOptionValue] = useState({
    Day: { hour: "0", minute: "0" },
    Custom: "",
    Minute: { minute: "0" },
    Hour: { minute: "0" },
    Week: { hour: "0", minute: "0", dayOfWeek: "0" },
  });

  const [dateFormat] = useState("YYYY-MM-DD");
  const [params, setParams] = useState({});
  const hoursOptions = Array.from({ length: 24 }, (_, i) => ({
    label: i.toString().padStart(2, "0"),
    value: i.toString().padStart(2, "0"),
  }));
  const minutesOptions = Array.from({ length: 60 }, (_, i) => ({
    label: i.toString().padStart(2, "0"),
    value: i.toString().padStart(2, "0"),
  }));
  const daysOfWeekOptions = [
    { label: "Sunday", value: 0 },
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
  ];

  const handleParse = () => {
    try {
      const description = cronstrue.toString(cronExpression);
      setIsCronExpressionValid(true);
      setDescription(description);
    } catch (error) {
      if (cronExpression !== "") {
        setDescription("Invalid expression");
        setIsCronExpressionValid(false);
      }
    }
  };
  const handleHourChange = (value) => {
    setSelectedOptionValue({
      ...selectedOptionValue,
      [selectedScheduleOption]: {
        ...selectedOptionValue[selectedScheduleOption],
        hour: value,
      },
    });

    switch (selectedScheduleOption) {
      case "Day":
        setCronExpression(
          `${selectedOptionValue[selectedScheduleOption]["minute"]} ${value} * * *`
        );
        break;
      case "Week":
        setCronExpression(
          `${selectedOptionValue[selectedScheduleOption]["minute"]} ${value} * * ${selectedOptionValue[selectedScheduleOption]["dayOfWeek"]}`
        );
        break;
      default:
        break;
    }
  };

  const handleMinuteChange = (value) => {
    setSelectedOptionValue({
      ...selectedOptionValue,
      [selectedScheduleOption]: {
        ...selectedOptionValue[selectedScheduleOption],
        minute: value,
      },
    });

    switch (selectedScheduleOption) {
      case "Day":
        setCronExpression(
          `${value} ${selectedOptionValue[selectedScheduleOption]["hour"]} * * *`
        );
        break;
      case "Hour":
        setCronExpression(`${value} * * * *`);
        break;
      case "Minute":
        setCronExpression(`*/${value} * * * *`);
        break;
      case "Week":
        setCronExpression(
          `${value} ${selectedOptionValue[selectedScheduleOption]["hour"]} * * ${selectedOptionValue[selectedScheduleOption]["dayOfWeek"]}`
        );
        break;
      default:
        break;
    }
  };

  const handleDayChange = (e) => {
    const value = e.target.value;
    setSelectedOptionValue({
      ...selectedOptionValue,
      [selectedScheduleOption]: {
        ...selectedOptionValue[selectedScheduleOption],
        dayOfWeek: value,
      },
    });

    if (selectedScheduleOption === "Week") {
      setCronExpression(
        `${selectedOptionValue[selectedScheduleOption]["minute"]} ${selectedOptionValue[selectedScheduleOption]["hour"]} * * ${value}`
      );
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
              onChange={handleHourChange}
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
              onChange={handleMinuteChange}
              options={minutesOptions}
              value={selectedOptionValue[selectedScheduleOption]["Minute"]}
            />
          </Form.Item>
        </Col>
        {/* <Col offset={2} span={4}>
          <Form.Item
            className={ingestionCss.antFormItem}
            label={"Start Date"}
            labelAlign={"left"}
            required
          >
            <DatePicker
              className={ingestionCss.textInput}
              name="startDate"
              format={"YYYY-MM-DD"}
            />
          </Form.Item>
        </Col> */}
      </>
    ),
    Custom: (
      <>
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
              onChange={(e) => setCronExpression(e.target.value)}
            />
          </Form.Item>
        </Col>
        {/* <Col offset={2} span={4}>
          <Form.Item
            className={ingestionCss.antFormItem}
            label={"Start Date"}
            labelAlign={"left"}
            required
          >
            <DatePicker
              className={ingestionCss.textInput}
              name="startDate"
              format={"YYYY-MM-DD"}
            />
          </Form.Item>
        </Col> */}
      </>
    ),
    Minute: (
      <>
        <Col span={4}>
          <Form.Item
            className={ingestionCss.antFormItem}
            label={"Minute"}
            labelAlign={"left"}
            required
          >
            <Select
              className={ingestionCss.inputSelect}
              onChange={handleMinuteChange}
              options={minutesOptions}
              value={selectedOptionValue[selectedScheduleOption]["Minute"]}
            />
          </Form.Item>
        </Col>
        {/* <Col offset={2} span={4}>
          <Form.Item
            className={ingestionCss.antFormItem}
            label={"Start Date"}
            labelAlign={"left"}
            required
          >
            <DatePicker
              className={ingestionCss.textInput}
              name="startDate"
              format={"YYYY-MM-DD"}
            />
          </Form.Item>
        </Col> */}
      </>
    ),
    Hour: (
      <>
        <Col span={4}>
          <Form.Item
            className={ingestionCss.antFormItem}
            label={"Minute"}
            labelAlign={"left"}
            value={selectedOptionValue[selectedScheduleOption]["Minute"]}
            required
          >
            <Select
              className={ingestionCss.inputSelect}
              onChange={handleMinuteChange}
              options={minutesOptions}
            />
          </Form.Item>
        </Col>
        {/* <Col offset={2} span={4}>
          <Form.Item
            className={ingestionCss.antFormItem}
            label={"Start Date"}
            labelAlign={"left"}
            required
          >
            <DatePicker
              className={ingestionCss.textInput}
              name="startDate"
              format={"YYYY-MM-DD"}
            />
          </Form.Item>
        </Col> */}
      </>
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
              onChange={handleHourChange}
              options={hoursOptions}
              value={selectedOptionValue[selectedScheduleOption]["Hour"]}
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
              onChange={handleMinuteChange}
              options={minutesOptions}
              value={selectedOptionValue[selectedScheduleOption]["Minute"]}
            />
          </Form.Item>
        </Col>
        {/* <Col offset={2} span={4}>
          <Form.Item
            className={ingestionCss.antFormItem}
            label={"Start Date"}
            labelAlign={"left"}
            required
          >
            <DatePicker
              className={ingestionCss.textInput}
              name="startDate"
              format={"YYYY-MM-DD"}
            />
          </Form.Item>
        </Col> */}
        <Col span={24}>
          <Form.Item
            className={ingestionCss.antFormItem}
            label={"Day"}
            labelAlign={"left"}
            required
          >
            <Radio.Group
              value={selectedOptionValue[selectedScheduleOption]["dayOfWeek"]}
              onChange={handleDayChange}
            >
              {daysOfWeekOptions.map((day) => (
                <Radio key={day.value} value={day.value}>
                  {day.label}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </Col>
      </>
    ),
  };
  const handleSaveNDeploy = () => {
    let saveNDeployData = {
      runtime_env_id: selectedRuntimeEnvironmentId,
      runtime_engine: pipelineDetails?.runtime_engine,
    };
    if (runOnSchedule && isCronExpressionValid) {
      if (!compareObjects(params, environmentDetails?.params)) {
        saveNDeployData.params = params;
      }
      saveNDeployData.start_date = startDate;
      saveNDeployData.schedule_cron_expression = cronExpression;
      saveNDeployData.schedule_timezone = scheduleTimezone;
    }
    console.log(saveNDeployData);
  };

  const getEnvList = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const envList = await fetch_retry_get(
      `${GETWORKSPACEENV}${workspace}?org_id=${authData.orgId}`
    );
    setEnvironmentList(envList?.data);
  };
  const getEnvData = async () => {
    const envDetails = await fetch_retry_get(
      `${ENVDETAILS}${selectedRuntimeEnvironmentId}`
    );
    if (envDetails.success) {
      setEnvironmentDetails(envDetails?.data);
      setParams(envDetails?.data?.params);
    }
  };

  useEffect(() => {
    handleParse();
  }, [cronExpression]);
  useEffect(() => {
    getEnvList();
  }, []);
  useEffect(() => {
    if (selectedRuntimeEnvironmentId !== undefined) getEnvData();
  }, [selectedRuntimeEnvironmentId]);
  return (
    <>
      <Row className={ingestionCss.configureFormHeadingRow}>
        <Col>
          <Typography.Text className={ingestionCss.configureFormHeading}>
            Engine:
            <span style={{ color: "var(--Primary)" }}>
              {pipelineDetails?.runtime_engine}
            </span>
          </Typography.Text>
        </Col>
      </Row>
      <Form layout="vertical" className={ingestionCss.configureForm}>
        <Row style={{ marginBottom: "10px" }}>
          <Col span={24}>
            <Typography.Text
              style={{ fontSize: "16px", fontWeight: 500 }}
              className={ingestionCss.configureFormHeading}
            >
              Schedule Pipeline{" "}
            </Typography.Text>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              className={ingestionCss.antFormItem}
              label={"Run on a schedule (Recommended)"}
              labelAlign={"left"}
            >
              <Switch
                style={{ width: "4vw", height: "1.75vw" }}
                defaultChecked
                onChange={(checked) => {
                  SetRunOnSchedule(checked);
                }}
              ></Switch>
            </Form.Item>
          </Col>
          {runOnSchedule && (
            <>
              <Col span={24}>
                <Row gutter={16}>
                  <Col span={7}>
                    <Form.Item
                      className={ingestionCss.antFormItem}
                      label={"Start Date"}
                      labelAlign={"left"}
                      // required
                    >
                      <DatePicker
                        className={ingestionCss.textInput}
                        format={dateFormat}
                        onChange={(date) => {
                          setStartDate(date?.toDate());
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col offset={1} span={8}>
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
                        onChange={(option) => {
                          setCronExpression("");
                          setSelectedScheduleOption(option);
                        }}
                        options={scheduleOption.map((val) => {
                          return { label: val, value: val };
                        })}
                      />
                    </Form.Item>
                  </Col>
                  {optionChild[selectedScheduleOption]}
                  <Col span={24} style={{ marginBottom: "8px" }}>
                    <Space size={8}>
                      <Typography.Text className={ingestionCss.cronDescription}>
                        {isCronExpressionValid && cronExpression !== "" && (
                          <>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 9.17407L7.14645 11.4451C7.34171 11.6516 7.65829 11.6516 7.85355 11.4451L13 6M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
                                stroke="#309133"
                                stroke-linecap="round"
                              />
                            </svg>
                            Scheduled to run
                          </>
                        )}
                        <span
                          style={{
                            color: isCronExpressionValid ? "" : "#FF0000",
                          }}
                        >
                          {description}
                        </span>
                      </Typography.Text>
                    </Space>
                  </Col>
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
                    value={scheduleTimezone}
                    onChange={(value) => {
                      setScheduleTimezone(value);
                    }}
                    options={timeZone}
                  />
                </Form.Item>
              </Col>
            </>
          )}
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
                value={selectedRuntimeEnvironmentId}
                onChange={(value) => {
                  setSelectedRuntimeEnvironmentId(value);
                }}
                options={environmentList.map((val) => {
                  return {
                    label: val?.runtime_env_name,
                    value: val?.runtime_env_id,
                  };
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
        <div className={ingestionCss.generalLastDiv}>
          <Space>
            <Button className={ingestionCss.defineSave}>Save & exit</Button>
            <Button
              className={ingestionCss.defineSaveAndBuild}
              onClick={handleSaveNDeploy}
            >
              Save & Deploy
            </Button>
          </Space>
        </div>
      </Form>
    </>
  );
};

export default Configure;
