import { Button, Row, Col, Form, Input, Select, message, Upload } from "antd";
import { useState } from "react";
import {
  fetch_retry_post,
  fetch_retry_post_with_file,
} from "../../network/api-manager";

import { UPLOADFILE, ANALYZE } from "../../network/apiConstants";

const Connect = ({ dataModernizationCss, changeStep, project }) => {
  const [isLoading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileData, setFileData] = useState({});
  console.log("project", project);
  const avatarUpload = async (file) => {
    setFileName(file.name);
    setLoading(true);
    const payload = new FormData();
    payload.append("file", file);
    const authData = JSON.parse(localStorage.getItem("authData"));
    const data = await fetch_retry_post_with_file(
      `${UPLOADFILE}/${project?.data?.projectId}/${authData.userId}`,
      // `${UPLOADFILE}/38/${authData.userId}`,
      payload
    );

    if (data.success) {
      setFileData(data.data);
      message.success("Successfully Uploaded.");
    } else {
      message.error([data?.error]);
    }
  };

  const analyzeCall = async () => {
    setLoading(true);
    const authData = JSON.parse(localStorage.getItem("authData"));
    const data = await fetch_retry_post(`${ANALYZE}/${fileData.fileId}`, {});
    setLoading(false);
    if (data.success) {
      changeStep("Connect");
      message.success("Analyze Successfully.");
    } else {
      message.error([data?.error]);
    }
  };

  return (
    <Row className={dataModernizationCss.defineForm}>
      <Col offset={3} span={18}>
        <Form
          layout="horizontal"
          autoComplete="off"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 18 }}
          onFinish={analyzeCall}
        >
          <Form.Item
            label={"Upload Source File(s)"}
            labelAlign={"left"}
            name={"file"}
            rules={[
              {
                required: true,
                message: "Source file is required.",
              },
            ]}
          >
            <Upload
              name="file"
              maxCount="1"
              previewFile={false}
              style={{ border: "1px solid green !important" }}
              action={avatarUpload}
              beforeUpload={(file) => {
                setFileName(file.name);
              }}
            >
              <p style={{ width: "100vh" }}></p>
              <Input
                key={"input-file"}
                className={"input"}
                placeholder={""}
                name={"file"}
                type={"text"}
                disabled={isLoading}
                defaultValue={fileName}
              />
            </Upload>
          </Form.Item>

          <div className={dataModernizationCss.nextExitBtn}>
            <Button
              type="primary"
              danger
              className={dataModernizationCss.nextBtn}
              htmlType="submit"
            >
              Next
            </Button>

            <Button
              type="primary"
              danger
              className={dataModernizationCss.exitBtn}
            >
              Exit
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default Connect;
