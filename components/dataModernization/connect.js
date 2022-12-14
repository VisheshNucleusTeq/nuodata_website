import { useEffect, useState } from "react";
import { Button, Row, Col, Form, message, Upload } from "antd";
import { FileAddOutlined, LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import {
  fetch_retry_post,
  fetch_retry_post_with_file,
} from "../../network/api-manager";
import { UPLOADFILE, ANALYZE, TRANSFORM } from "../../network/apiConstants";
import { SetConnectDetailsAction, SetTabTypeAction } from "../../Redux/action";

const Connect = ({ dataModernizationCss }) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [fileData, setFileData] = useState({});

  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );

  const connectDetails = useSelector(
    (state) => state.connectDetail.connectDetails
  );

  useEffect(() => {
    setFileData(connectDetails);
  });

  const avatarUpload = async (file) => {
    setLoading(true);
    const payload = new FormData();
    payload.append("file", file);
    const authData = JSON.parse(localStorage.getItem("authData"));
    const data = await fetch_retry_post_with_file(
      `${UPLOADFILE}/${projectDetails.projectId}/${authData.userId}`,
      payload
    );

    if (data.success) {
      dispatch(SetConnectDetailsAction(data.data));
      setFileData(data.data);

      await analyzeCall(data.data);
      await getTransform(data.data);
      setLoading(false);
    } else {
      message.error([data?.error]);
    }
  };

  const analyzeCall = async (fileDetails) => {
    setLoading(true);
    const data = await fetch_retry_post(`${ANALYZE}/${fileDetails.fileId}`, {});
    setLoading(false);
    if (data.success) {
      // dispatch(SetTabTypeAction("Analyze"));
    } else {
      message.error([data?.error]);
    }
  };

  const getTransform = async (fileDetails) => {
    const data = await fetch_retry_post(`${TRANSFORM}${fileDetails.fileId}`);
    setLoading(false);
    if (data.success) {
      // setData(data?.data);
    } else {
      message.error([data?.error]);
    }
  };

  return (
    <Row className={dataModernizationCss.defineForm}>
      <Col xs={1} sm={2} md={4} lg={5} xl={6} xxl={6} />
      <Col
        xs={22}
        sm={20}
        md={16}
        lg={14}
        xl={12}
        xxl={12}
        className={dataModernizationCss.connectFileInput}
      >
        <Form
          layout="horizontal"
          autoComplete="off"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 18 }}
          // onFinish={analyzeCall}
          onFinish={() => {
            dispatch(SetTabTypeAction("Analyze"));
          }}
        >
          <Form.Item
            labelAlign={"left"}
            name={"file"}
            rules={
              !fileData.fileName
                ? [
                    {
                      required: true,
                      message: "Source file is required.",
                    },
                  ]
                : []
            }
          >
            <Upload
              // className="avatar-uploader"
              action={avatarUpload}
              listType="picture-card"
              fileList={[]}
              onChange={() => {}}
              onPreview={() => {}}
              style={{ width: "100vw" }}
              accept=".xml"
            >
              <Row>
                {isLoading ? (
                  <Col span={24}>
                    <LoadingOutlined style={{ fontSize: "40px" }} />
                  </Col>
                ) : (
                  <Col span={24}>
                    <FileAddOutlined style={{ fontSize: "50px" }} />
                  </Col>
                )}

                <Col span={24} style={{ marginTop: "4%" }}>
                  Drag and drop or &nbsp;
                  <span style={{ color: "#e74860", fontWeight: "bold" }}>
                    browse
                  </span>
                  &nbsp; your files
                  <br />
                  <br />
                  {fileData.fileName && (
                    <p style={{ color: "#e74860" }}>{fileData.fileName}</p>
                  )}
                </Col>
              </Row>
            </Upload>
          </Form.Item>

          <div className={dataModernizationCss.nextExitBtn}>
            <Button
              type="primary"
              danger
              className={dataModernizationCss.nextBtn}
              htmlType="submit"
              disabled={fileData.fileName ? false : true}
            >
              Analyze File
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
      <Col xs={1} sm={2} md={4} lg={5} xl={6} xxl={6} />
    </Row>
  );
};

export default Connect;
