import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Typography,
  message,
} from "antd";
import cronstrue from "cronstrue";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { fetch_retry_get, fetch_retry_put } from "../../../network/api-manager";
import {
  CREATEPIPELINE,
  ENVDETAILS,
  GETWORKSPACEENV,
} from "../../../network/apiConstants";
import { compareObjects } from "../../helper/compareObject";
import timeZone from "../../helper/timeZone";
import { useDispatch } from "react-redux";
import { loderShowHideAction } from "../../../Redux/action";

const configure = ({
  pipelineId,
  ingestionCss,
  setSelectedTab,
  pipelineDetails,
  workspace,
}) => {
  const dispatch = useDispatch();
  const [environmentList, setEnvironmentList] = useState([]);
  const [envId, setEnvId] = useState(pipelineDetails?.runtime_env_id);
  const [params, setParams] = useState({});
  const [orgParams, setOrgParams] = useState({});
  const [isCronExpressionValid, setIsCronExpressionValid] = useState(false);
  const [description, setDescription] = useState(null);

  const [startDate, setStartDate] = useState();
  const [schedule, setSchedule] = useState("Custom");
  const [hour, setHour] = useState(null);
  const [minute, setMinute] = useState(null);
  const [week, setWeek] = useState([]);
  const [timeZoneValue, setTimeZoneValue] = useState(null);
  const [cronExpression, setCronExpression] = useState(null);
  const [environment, setEnvironment] = useState(null);

  const getEnvList = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const envList = await fetch_retry_get(
      `${GETWORKSPACEENV}${workspace}?org_id=${authData.orgId}`
    );
    setEnvironmentList(envList?.data);
  };

  const getEnvData = async () => {
    const envDetails = await fetch_retry_get(`${ENVDETAILS}${envId}`);
    if (envDetails.success) {
      if (
        pipelineDetails?.overriden_runtime_params &&
        Object.keys(pipelineDetails?.overriden_runtime_params) &&
        Object.keys(pipelineDetails?.overriden_runtime_params).length
      ) {
        setParams(pipelineDetails?.overriden_runtime_params);
      } else {
        setParams(envDetails?.data?.params);
      }
      setOrgParams(envDetails?.data?.params);
    }
  };

  const handleParse = () => {
    try {
      if (cronExpression) {
        const description = cronstrue.toString(cronExpression);
        setIsCronExpressionValid(true);
        setDescription(description);
      } else {
        setDescription("");
        setIsCronExpressionValid(false);
      }
    } catch (error) {
      if (cronExpression !== "") {
        setDescription("Invalid expression");
        setIsCronExpressionValid(false);
      } else {
        setDescription("");
      }
    }
  };

  const createCronJob = () => {
    switch (schedule) {
      case "Custom":
        break;
      case "Day":
        setCronExpression(
          `${minute ? minute : "*"} ${hour ? hour : "*"} * * *`
        );
        break;
      case "Minute":
        setCronExpression(`*${Number(minute) ? "/" + minute : " *"} * * * *`);
        break;
      case "Hour":
        setCronExpression(`${minute ? minute : "*"} * * * *`);
        break;
      case "Week":
        setCronExpression(
          `${minute ? minute : "*"} ${hour ? hour : "*"} * * ${
            week.length ? week.toString() : "*"
          }`
        );
        break;
      default:
        break;
    }
  };

  const submitCronData = async () => {
    let cronObj = {
      cron_details: {},
    };
    let payload = {};

    let msgShow = true;
    if (startDate) {
      cronObj["start_date"] = moment(
        startDate?.format(`YYYY-MM-DD:HH:mm:ss`)
      ).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    }

    if (schedule) {
      cronObj["cron_details"] = {
        ...cronObj["cron_details"],
        type: schedule,
      };
    } else {
      msgShow = false;
      message.error("Please select schedule");
    }

    switch (schedule) {
      case "Custom":
        if (cronExpression) {
          cronObj["cron_expression"] = cronExpression;
        } else {
          msgShow && message.error("Please input cron");
          msgShow = false;
        }
        break;
      case "Day":
        if (hour) {
          cronObj["cron_details"] = {
            ...cronObj["cron_details"],
            hour: hour,
          };
        } else {
          msgShow && message.error("Please select hour");
          msgShow = false;
        }
        if (minute) {
          cronObj["cron_details"] = {
            ...cronObj["cron_details"],
            minute: minute,
          };
        } else {
          msgShow && message.error("Please select minute");
          msgShow = false;
        }
        break;
      case "Minute":
        if (minute) {
          cronObj["cron_details"] = {
            ...cronObj["cron_details"],
            minute: minute,
          };
        } else {
          msgShow && message.error("Please select minute");
          msgShow = false;
        }
        break;
      case "Hour":
        if (minute) {
          cronObj["cron_details"] = {
            ...cronObj["cron_details"],
            minute: minute,
          };
        } else {
          msgShow && message.error("Please select minute");
          msgShow = false;
        }
        break;
      case "Week":
        if (hour) {
          cronObj["cron_details"] = {
            ...cronObj["cron_details"],
            hour: hour,
          };
        } else {
          msgShow && message.error("Please select hour");
          msgShow = false;
        }
        if (minute) {
          cronObj["cron_details"] = {
            ...cronObj["cron_details"],
            minute: minute,
          };
        } else {
          msgShow && message.error("Please select minute");
          msgShow = false;
        }
        if (week.length) {
          cronObj["cron_details"] = {
            ...cronObj["cron_details"],
            week: week,
          };
        } else {
          msgShow && message.error("Please select week days");
          msgShow = false;
        }
        break;
      default:
        break;
    }

    if (cronExpression) {
      cronObj["cron_expression"] = cronExpression;
    } else {
      msgShow && message.error("Please input cron");
      msgShow = false;
    }

    if (timeZoneValue) {
      cronObj["timezone"] = timeZoneValue;
    } else {
      msgShow && message.error("Please select timezone");
      msgShow = false;
    }

    if (!isCronExpressionValid) {
      msgShow && message.error("Please input valid cron");
      msgShow = false;
    }

    if (!compareObjects(params, orgParams)) {
      payload["overriden_runtime_params"] = params;
    }

    payload["name"] = pipelineDetails?.pipeline_name
      ? pipelineDetails.pipeline_name
      : "NA";
    payload["pipeline_description"] = pipelineDetails?.pipeline_description
      ? pipelineDetails.pipeline_description
      : "";
    payload["runtime_env_id"] = envId;
    payload["runtime_engine"] = pipelineDetails?.runtime_engine
      ? pipelineDetails.runtime_engine
      : "";
    payload["user_schedule"] = cronObj;

    if (msgShow) {
      dispatch(loderShowHideAction(true));
      const updateData = await fetch_retry_put(
        `${CREATEPIPELINE}${pipelineId}`,
        payload
      );
      if (updateData.success) {
        message.success(updateData?.data?.message);
      }
      dispatch(loderShowHideAction(false));
    }
  };

  useEffect(() => {
    getEnvList();
  }, []);

  useEffect(() => {
    if (envId) {
      getEnvData();
    }
  }, [envId]);

  useEffect(() => {
    handleParse();
  }, [cronExpression]);

  useEffect(() => {
    createCronJob();
  }, [hour, minute, week]);

  useEffect(() => {
    try {
      dispatch(loderShowHideAction(true));
      if (pipelineDetails?.runtime_env_id) {
        setEnvironment(pipelineDetails?.runtime_env_id);
      }

      if (pipelineDetails?.user_schedule?.start_date) {
        setStartDate(moment(pipelineDetails?.user_schedule?.start_date));
      }

      if (pipelineDetails?.user_schedule?.start_date) {
        setStartDate(moment(pipelineDetails?.user_schedule?.start_date));
      }

      if (pipelineDetails?.user_schedule?.cron_details?.type) {
        setSchedule(pipelineDetails?.user_schedule?.cron_details?.type);
      }

      if (pipelineDetails?.user_schedule?.cron_expression) {
        setCronExpression(pipelineDetails?.user_schedule?.cron_expression);
      }

      if (pipelineDetails?.user_schedule?.timezone) {
        setTimeZoneValue(pipelineDetails?.user_schedule?.timezone);
      }

      if (pipelineDetails?.user_schedule?.cron_details?.hour) {
        setHour(pipelineDetails?.user_schedule?.cron_details?.hour);
      }

      if (pipelineDetails?.user_schedule?.cron_details?.minute) {
        setMinute(pipelineDetails?.user_schedule?.cron_details?.minute);
      }

      if (
        pipelineDetails?.user_schedule?.cron_details?.week &&
        pipelineDetails?.user_schedule?.cron_details?.week.length
      ) {
        setWeek(pipelineDetails?.user_schedule?.cron_details?.week);
      }

      if (
        pipelineDetails?.overriden_runtime_params &&
        Object.keys(pipelineDetails?.overriden_runtime_params) &&
        Object.keys(pipelineDetails?.overriden_runtime_params).length
      ) {
        setParams(pipelineDetails?.overriden_runtime_params);
      }
      dispatch(loderShowHideAction(false));
    } catch (error) {
      dispatch(loderShowHideAction(false));
    }
  }, []);

  return (
    <>
      <Row>
        <Col span={24} className={ingestionCss.configureFormHeadingRow}>
          <Typography.Text className={ingestionCss.configureFormHeading}>
            Engine:
            <span style={{ color: "var(--Primary)" }} onClick={submitCronData}>
              {pipelineDetails?.runtime_engine}
            </span>
          </Typography.Text>
        </Col>
        <Col span={24} className={ingestionCss.configureFormSecondHeadingRow}>
          <h3>Schedule Pipeline</h3>
          <h4>Run on a schedule (Recommended)</h4>
          <br />
          <Switch
            style={{ width: "60px", height: "23.2px" }}
            defaultChecked
            onChange={(checked) => {
              // SetRunOnSchedule(checked);
            }}
          />
          <br />
          <br />

          <Row justify={"space-between"}>
            <Col span={7}>
              <span style={{ fontWeight: "600" }}> Start Date</span>
              <p></p>
              <DatePicker
                className={ingestionCss.textInput}
                format={"YYYY-MM-DD"}
                onChange={(date) => {
                  if (date !== null) {
                    setStartDate(date);
                  } else {
                    setStartDate();
                  }
                }}
                value={startDate}
              />
            </Col>
            <Col span={7}>
              <span style={{ fontWeight: "600" }}>
                <span style={{ color: "red" }}>*</span> schedule
              </span>
              <p></p>
              <Select
                className={ingestionCss.scheduleSelect}
                placeholder={"select schedule type"}
                onChange={(option) => {
                  setSchedule(option);
                  setCronExpression(null);
                  setHour(null);
                  setMinute(null);
                }}
                options={["Custom", "Day", "Minute", "Hour", "Week"].map(
                  (val) => {
                    return { label: val, value: val };
                  }
                )}
                value={schedule}
              />
            </Col>
            <Col span={9}>
              <Row justify={"start"}>
                {["Day", "Week"].includes(schedule) && (
                  <Col span={8}>
                    <>
                      <span style={{ fontWeight: "600" }}>
                        <span style={{ color: "red" }}>*</span> Hour
                      </span>
                      <p></p>
                      <Select
                        className={ingestionCss.scheduleSelect}
                        placeholder={"select Hour"}
                        onChange={(option) => {
                          setHour(option);
                        }}
                        options={Array.from({ length: 24 }, (_, i) => ({
                          label: i.toString().padStart(2, "0"),
                          value: i.toString().padStart(2, "0"),
                        }))}
                        value={hour}
                      />
                    </>
                  </Col>
                )}
                <Col span={1} />
                {["Day", "Minute", "Hour", "Week"].includes(schedule) && (
                  <Col span={8}>
                    <>
                      <span style={{ fontWeight: "600" }}>
                        <span style={{ color: "red" }}>*</span> Minute
                      </span>
                      <p></p>
                      <Select
                        className={ingestionCss.scheduleSelect}
                        placeholder={"select Minute"}
                        onChange={(option) => {
                          setMinute(option);
                        }}
                        options={Array.from({ length: 60 }, (_, i) => ({
                          label: i.toString().padStart(2, "0"),
                          value: i.toString().padStart(2, "0"),
                        }))}
                        value={minute}
                      />
                    </>
                  </Col>
                )}

                {["Custom"].includes(schedule) && (
                  <Col span={8}>
                    <>
                      <span style={{ fontWeight: "600" }}>
                        <span style={{ color: "red" }}>*</span> Cron
                      </span>
                      <p></p>
                      <Input
                        placeholder="* * * * ?"
                        className={ingestionCss.textInput}
                        onChange={(e) => setCronExpression(e.target.value)}
                        value={cronExpression}
                      />
                    </>
                  </Col>
                )}
              </Row>
            </Col>
            {["Week"].includes(schedule) && (
              <Col span={24} style={{ marginTop: "1.5vw" }}>
                <span style={{ fontWeight: "600" }}>
                  <span style={{ color: "red" }}>*</span> Day
                </span>
                <p></p>
                <Checkbox.Group
                  onChange={(days) => {
                    setWeek(days);
                  }}
                  value={week}
                >
                  {[
                    { label: "Sunday", value: "0" },
                    { label: "Monday", value: "1" },
                    { label: "Tuesday", value: "2" },
                    { label: "Wednesday", value: "3" },
                    { label: "Thursday", value: "4" },
                    { label: "Friday", value: "5" },
                    { label: "Saturday", value: "6" },
                  ].map((day) => (
                    <Checkbox key={day.value} value={day.value}>
                      {day.label}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Col>
            )}

            <Col span={24} style={{ marginTop: description ? "1.5vw" : "" }}>
              <Space size={8}>
                <Typography.Text
                  className={ingestionCss.cronDescription}
                  style={{
                    color: isCronExpressionValid ? "green" : "#FF0000",
                  }}
                >
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
                      Scheduled to run:
                    </>
                  )}
                </Typography.Text>
                <span
                  style={{
                    color: isCronExpressionValid ? "" : "#FF0000",
                  }}
                >
                  {description}
                </span>
              </Space>
            </Col>

            <Col span={24} style={{ marginTop: "1.5vw" }}>
              <>
                <span style={{ fontWeight: "600" }}>
                  <span style={{ color: "red" }}>*</span> Time zone (Choose a
                  time zone for the schedule)
                </span>
                <p></p>
                <Select
                  name={"timeZone"}
                  className={ingestionCss.inputSelect}
                  style={{ width: "100%" }}
                  showSearch
                  onChange={(value) => {
                    setTimeZoneValue(value);
                  }}
                  placeholder={"select Time zone"}
                  options={timeZone}
                  value={timeZoneValue}
                />
              </>
            </Col>

            <Col span={24} style={{ marginTop: "1.5vw" }}>
              <>
                <span style={{ fontWeight: "600" }}>
                  <span style={{ color: "red" }}>*</span> Runtime Environment
                </span>
                <p></p>
                <Select
                  name={"environment"}
                  className={ingestionCss.inputSelect}
                  style={{ width: "100%" }}
                  showSearch
                  onChange={(value) => {
                    setEnvironment(value);
                  }}
                  value={environment}
                  placeholder={"select Runtime Environment"}
                  options={environmentList?.map((val) => {
                    return {
                      label: val?.runtime_env_name,
                      value: val?.runtime_env_id,
                    };
                  })}
                />
              </>
            </Col>

            <Col span={18} style={{ marginTop: "1.5vw" }}>
              <span style={{ fontWeight: "600" }}>
                <span style={{ color: "red" }}>*</span> Runtime Parameters
              </span>
              <p></p>
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
                          let newObj = {};
                          if (Object.keys(params).length) {
                            Object.keys(params).map((keyValue, j) => {
                              if (i == j) {
                                newObj[key.target.value] = params[keyValue];
                              } else {
                                newObj[keyValue] = params[keyValue];
                              }
                            });
                          }
                          setParams(newObj);
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
            </Col>
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
        </Col>

        <Col span={24} className={ingestionCss.generalLastDiv}>
          <Space>
            <Button className={ingestionCss.defineSave}>Save & exit</Button>
            <Button
              className={ingestionCss.defineSaveAndBuild}
              onClick={submitCronData}
            >
              Save & Deploy
            </Button>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default configure;
