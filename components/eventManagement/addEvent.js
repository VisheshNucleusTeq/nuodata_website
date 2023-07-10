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
} from "antd";
const { Dragger } = Upload;
import ImgCrop from "antd-img-crop";

import React, { use, useState } from "react";

const AddEvent = ({ eventManagementCss }) => {
  const [drawerViewProp] = useState({
    className: eventManagementCss.demo,
    name: "file",
    multiple: false,
    name: "image",
    showUploadList: false,
  });

  const [image, setImage] = useState(
    "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
  );

  return (
    <div style={{ marginTop: "4vh" }}>
      <Form
        layout="vertical"
        onFinish={(e) => {
          console.log(e);
        }}
        autoComplete="off"
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
                  name={"startData"}
                  rules={[
                    { required: true, message: "Start date is required." },
                  ]}
                >
                  <DatePicker
                    name="startData"
                    className={eventManagementCss.textInput}
                    disabledDate={(d) => !d || d.isSameOrBefore(Date())}
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
                  name={"endData"}
                  rules={[{ required: true, message: "End date is required." }]}
                >
                  <DatePicker
                    name="endData"
                    className={eventManagementCss.textInput}
                    disabledDate={(d) => !d || d.isSameOrBefore(Date())}
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
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col style={{ margin: "1vh" }} span={24} />
          <Col span={14}>
            <Row>
              <Col span={24} className={eventManagementCss.textHeading}>
                {"Add contect (max 300 characters)"}
              </Col>
              <Col span={24}>
                <Form.Item
                  name={"contect"}
                  rules={[{ required: true, message: "Contect is required." }]}
                >
                  <Input.TextArea
                    name="contect"
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
                  name={"image"}
                  rules={[{ required: true, message: "Contect is required." }]}
                >
                  <ImgCrop
                    showReset
                    rotationSlider
                    showGrid
                    quality={0.5}
                    aspect={16/9}
                    modalTitle={"Crop Image"}
                    modalOk={"Crop"}
                    modalWidth={"70vw"}
                    onModalOk={(e) => {
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
                    name={"image"}
                  >
                    <Dragger {...drawerViewProp}>
                      <Row>
                        <Col span={24} style={{ marginTop: "4%" }}>
                          <Image src={image} width={120} preview={false} />
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
          style={{ marginTop: "2vh" }}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default AddEvent;
