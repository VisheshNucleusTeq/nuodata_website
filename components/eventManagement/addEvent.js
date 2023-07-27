import {
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  TimePicker,
  Button,
  Upload,
  Image,
  Tag,
  message,
} from "antd";
const { Dragger } = Upload;
import ImgCrop from "antd-img-crop";
import React, { use, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";

import { ADDEVENT, UPDATEEVENT } from "../../network/apiConstants";
import {
  fetch_retry_post_with_file,
  fetch_retry_put_with_file,
} from "../../network/api-manager";
import { loderShowHideAction } from "../../Redux/action";
import { useEffect } from "react";
import { useQueryClient } from "react-query";

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
    postData.contactNumber = data?.contactNumber;
    postData.content = data?.content;
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
    console.log(data);
    dispatch(loderShowHideAction(true));
    let postData = {};
    postData.eventHeading = data?.heading;
    postData.contactEmail = data?.email;
    postData.contactNumber = data?.contactNumber;
    postData.content = data?.content;
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
      setImage(updateData?.imagePublicURL);
      form.setFieldsValue({
        heading: updateData?.eventHeading,
        email: updateData?.contactEmail,
        contactNumber: updateData?.contactNumber,
        content: updateData?.content,
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
        // initialValues={{
        //   heading: "demo",
        //   email: "demo@gmail.com",
        //   contactNumber: "+918982077519",
        //   startDate: moment(new Date(), dateFormat),
        //   startTime: moment(new Date(), timeFormat),
        //   endDate: moment(new Date(), dateFormat),
        //   endTime: moment(new Date(), timeFormat),
        //   contect: "sdfdsfsd",
        // }}
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
                  rules={[{ required: true, message: "Heading is required." }]}
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
                  name={"contactNumber"}
                  rules={[
                    { required: true, message: "Contact Number is required." },
                  ]}
                >
                  <Input
                    name="contactNumber"
                    className={eventManagementCss.textInput}
                    placeholder="Contact Number"
                  />
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
                    quality={0.1}
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
                          console.log(reader.result);
                          setImage(reader.result);
                        };
                        reader.onerror = function (error) {
                          console.log("Error: ", error);
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
        </Row>

        <Button
          size={"large"}
          type="primary"
          block
          htmlType="submit"
          style={{ marginTop: "2vh", width: "10vw" }}
        >
          {updateData?.eventId ? "Update" : "Add"} Event
        </Button>
      </Form>
    </div>
  );
};

export default AddEvent;
