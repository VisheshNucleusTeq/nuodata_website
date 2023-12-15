import {
  Button,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Row,
  Select,
  Tag,
  TimePicker,
  Upload,
  message,
} from "antd";
import ImgCrop from "antd-img-crop";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
const { Dragger } = Upload;

import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { loderShowHideAction } from "../../Redux/action";
import {
  fetch_retry_post_with_file,
  fetch_retry_put_with_file,
} from "../../network/api-manager";
import { ADDEVENT, UPDATEEVENT } from "../../network/apiConstants";
import country from "../helper/country";

const AddEvent = ({
  eventManagementCss,
  setTabType,
  updateData,
  setUpdateData,
}) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [drawerViewProp] = useState({
    className: eventManagementCss.demo,
    multiple: false,
    name: "file",
    showUploadList: false,
  });

  const [image, setImage] = useState("/events/placeholder.jpg");

  const [dateFormat] = useState("YYYY-MM-DD");
  const [timeFormat] = useState("HH:mm:ss");

  const addEventFun = async (data) => {
    dispatch(loderShowHideAction(true));
    let postData = {};
    postData.eventHeading = data?.heading;
    postData.contactEmail = data?.email;
    postData.ctryCode = data?.ctryCode;
    postData.contactNumber = data?.contact;
    postData.content = data?.content;
    postData.buttonText = data?.buttonText;
    postData.file = data?.file ? data?.file : "";
    postData.startDateTime = moment(
      data?.startDate.format(dateFormat) +
        " " +
        data?.startTime.format(timeFormat)
    ).format("yyyy-MM-DDTHH:mm:ss.SSSZ");

    postData.endDateTime = moment(
      data?.endDate.format(dateFormat) + " " + data?.endTime.format(timeFormat)
    ).format("yyyy-MM-DDTHH:mm:ss.SSSZ");

    const resData = await fetch_retry_post_with_file(
      `${process.env.BASE_URL}${ADDEVENT}`,
      postData
    );

    setUpdateData({});
    form.resetFields();
    setImage("/events/placeholder.jpg");

    await queryClient.refetchQueries({
      queryKey: ["EVENT_DATA", "false"],
    });
    setTabType("Manage Events");
    message.success(resData?.data?.message);
    dispatch(loderShowHideAction(false));

    // dispatch(loderShowHideAction(false));
    // message.success(resData?.data?.message);
  };

  const updateEvnetFun = async (data) => {
    dispatch(loderShowHideAction(true));
    let postData = {};
    postData.eventHeading = data?.heading;
    postData.contactEmail = data?.email;
    postData.ctryCode = data?.ctryCode;
    postData.contactNumber = data?.contact;
    postData.content = data?.content;
    postData.buttonText = data?.buttonText;
    postData.file = data.file ? data?.file : undefined;
    postData.startDateTime = moment(
      data?.startDate.format(dateFormat) +
        " " +
        data?.startTime.format(timeFormat)
    ).format("yyyy-MM-DDTHH:mm:ss.SSSZ");

    postData.endDateTime = moment(
      data?.endDate.format(dateFormat) + " " + data?.endTime.format(timeFormat)
    ).format("yyyy-MM-DDTHH:mm:ss.SSSZ");
    const resData = await fetch_retry_put_with_file(
      `${UPDATEEVENT}${updateData?.eventId}`,
      postData
    );

    setUpdateData({});
    form.resetFields();
    setImage("/events/placeholder.jpg");

    await queryClient.refetchQueries({
      queryKey: ["EVENT_DATA", "false"],
    });
    setTabType("Manage Events");
    message.success(resData?.data?.message);
    dispatch(loderShowHideAction(false));
  };

  useEffect(() => {
    if (updateData?.eventId) {
      let ctryCode;
      let contactNumber;
      const contactData = updateData?.contactNumber?.split(" ");
      if (contactData[0].length > 4) {
        ctryCode = "91";
        contactNumber = contactData[0];
      } else {
        ctryCode = contactData[0];
        contactNumber = contactData[1];
      }
      setImage(updateData?.imagePublicURL);
      form.setFieldsValue({
        heading: updateData?.eventHeading,
        email: updateData?.contactEmail,
        ctryCode: ctryCode,
        contact: contactNumber,
        content: updateData?.content,
        buttonText: updateData?.buttonText,
        startDate: moment(updateData?.startDateTime, dateFormat),
        startTime: moment(updateData?.startDateTime, timeFormat),
        endDate: moment(updateData?.endDateTime, dateFormat),
        endTime: moment(updateData?.endDateTime, timeFormat),
      });
    }
  }, [updateData]);

  return (
    <div style={{ marginTop: "4vh" }}>
      {/* {JSON.stringify(updateData?.eventId)} */}
      <Form
        form={form}
        layout="vertical"
        onFinish={(e) => {
          updateData?.eventId ? updateEvnetFun(e) : addEventFun(e);
        }}
        autoComplete="off"
        initialValues={
          {
            // heading: "demo",
            // email: "demo@gmail.com",
            // contactNumber: "+918982077519",
            // startDate: moment(new Date(), dateFormat),
            // startTime: moment(new Date(), timeFormat),
            // endDate: moment(new Date(), dateFormat),
            // endTime: moment(new Date(), timeFormat),
            // contect: "sdfdsfsd",
            // buttonText : "Register Now"
          }
        }
      >
        <Row gutter={[16, 16]}>
          <Col span={7} className={eventManagementCss.topEventView}>
            <Row>
              <Col span={24} className={eventManagementCss.textHeading}>
                Heading
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"heading"}
                  rules={[
                    { required: true, message: "Heading is required." },
                    {
                      max: 100,
                      message:
                        "Event Heading cannot be more than 100 characters.",
                    },
                  ]}
                >
                  <Input.TextArea
                    name="heading"
                    className={eventManagementCss.textArea}
                    placeholder="Heading"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={7} className={eventManagementCss.topEventView}>
            <Row>
              <Col span={24} className={eventManagementCss.textHeading}>
                Add Contact Details
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"email"}
                  rules={[
                    { required: true, message: "Email is required." },
                    {
                      type: "email",
                      message: "Please enter a valid email address.",
                    },
                    {
                      max: 80,
                      message: "Email cannot be more than 80 characters.",
                    },
                  ]}
                >
                  <Input
                    name="email"
                    className={eventManagementCss.textInput}
                    placeholder="Email"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  style={{
                    height: "2.8vw",
                    marginBottom: "4vw",
                  }}
                  // label={"Contact Number"}
                  labelAlign={"left"}
                  name={"contact"}
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                  ]}
                >
                  <Input.Group>
                    <Row>
                      <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item
                          name={"ctryCode"}
                          rules={[
                            {
                              required: true,
                              message: "Please select country",
                            },
                          ]}
                        >
                          <Select
                            name={"ctryCode"}
                            className="inputSelectGroup"
                            placeholder="Country Code"
                            optionFilterProp="children"
                            initialvalues={""}
                            options={country}
                            showSearch
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                        <Form.Item
                          name={"contact"}
                          rules={[
                            {
                              required: true,
                              message: "Please input your phone number",
                            },
                            {
                              max: 15,
                              message:
                                "Contact number must be between 8-15 digit",
                            },
                            {
                              min: 8,
                              message:
                                "Contact number must be between 8-15 digit",
                            },
                          ]}
                        >
                          <Input
                            key={"input-phone-number"}
                            className={"inputGroup inputGroupNumber"}
                            placeholder={"Phone Number"}
                            name={"contact"}
                            type={"number"}
                            onKeyDown={(e) => {
                              e.target.value = e.target.value.replace(
                                /\D/g,
                                ""
                              );
                            }}
                            onKeyUp={(e) => {
                              e.target.value = e.target.value.replace(
                                /\D/g,
                                ""
                              );
                            }}
                            onChange={(e) => {
                              e.target.value = e.target.value.replace(
                                /\D/g,
                                ""
                              );
                            }}
                            onBlur={(e) => {
                              e.target.value = e.target.value.replace(
                                /\D/g,
                                ""
                              );
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Input.Group>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={5} className={eventManagementCss.topEventView}>
            <Row>
              <Col span={24} className={eventManagementCss.textHeading}>
                Start Date & Time
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"startDate"}
                  rules={[
                    { required: true, message: "Start date is required." },
                  ]}
                >
                  <DatePicker
                    name="startDate"
                    className={eventManagementCss.textInput}
                    disabledDate={(d) => !d || d.isSameOrBefore(Date())}
                    format={dateFormat}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"startTime"}
                  rules={[
                    { required: true, message: "Start time is required." },
                  ]}
                >
                  <TimePicker
                    name="startTime"
                    className={eventManagementCss.textInput}
                    minuteStep={5}
                    format={timeFormat}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={5} className={eventManagementCss.topEventView}>
            <Row>
              <Col span={24} className={eventManagementCss.textHeading}>
                End Date & Time
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"endDate"}
                  rules={[{ required: true, message: "End date is required." }]}
                >
                  <DatePicker
                    name="endDate"
                    className={eventManagementCss.textInput}
                    disabledDate={(d) => !d || d.isSameOrBefore(Date())}
                    format={dateFormat}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"endTime"}
                  rules={[{ required: true, message: "End time is required." }]}
                >
                  <TimePicker
                    name="endTime"
                    className={eventManagementCss.textInput}
                    format={timeFormat}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col style={{ margin: "1vh" }} span={24} />
          <Col span={14}>
            <Row>
              <Col span={24} className={eventManagementCss.textHeading}>
                {"Add content (max 300 characters)"}
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"content"}
                  rules={[{ required: true, message: "Content is required." }]}
                >
                  <Input.TextArea
                    name="content"
                    className={`${eventManagementCss.textArea} ${eventManagementCss.textAreaHeight}`}
                    placeholder="Heading"
                    maxLength={300}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={10}>
            <Row>
              <Col span={24} className={eventManagementCss.textHeading}>
                {"Add Image (upto 3 Mbs)"}
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"file"}
                  rules={[
                    updateData?.eventId
                      ? null
                      : { required: true, message: "Image is required." },
                  ]}
                >
                  <ImgCrop
                    showReset
                    rotationSlider
                    showGrid
                    quality={1}
                    aspect={16 / 9}
                    modalTitle={"Crop Image"}
                    modalOk={"Crop"}
                    modalWidth={"70vw"}
                    onModalOk={(e) => {
                      form.setFieldsValue({ file: e });
                      function getBase64(file) {
                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function () {
                          setImage(reader.result);
                        };
                      }
                      getBase64(e);
                    }}
                    name={"file"}
                  >
                    <Dragger {...drawerViewProp}>
                      <Row>
                        <Col span={24} style={{ marginTop: "4%" }}>
                          <Image src={image} width={130} preview={false} />
                        </Col>
                        <Col span={24} style={{ marginTop: "4%" }}>
                          <Tag style={{ color: "#0c3246" }}>
                            {"Add File (.jpg, .png)"}
                          </Tag>
                        </Col>
                      </Row>
                    </Dragger>
                  </ImgCrop>
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col span={12} className={eventManagementCss.topEventViewText}>
            <Row>
              <Col span={24} className={eventManagementCss.textHeading}>
                Button text
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"buttonText"}
                  rules={[
                    { required: true, message: "Button text is required." },
                  ]}
                >
                  <Input
                    name="buttonText"
                    placeholder="Button text"
                    // defaultValue={"Register Now"}
                    // value={"Register Now"}
                    className={eventManagementCss.textInput}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={24} style={{ height: "2vh" }}>
                {""}
              </Col>
              <Col span={24} style={{alignItems : "end"}}>
                <Button
                  size={"large"}
                  type="primary"
                  block
                  htmlType="submit"
                  style={{ marginTop: "2vh", width: "10vw", float : "right", height : "6vh" }}
                  disabled={
                    updateData?.status && updateData?.status != "active"
                  }
                >
                  {updateData?.eventId ? "Update" : "Add"} Event
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddEvent;
