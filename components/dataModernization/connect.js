import { useEffect, useState } from "react";
import { Button, Row, Col, Form, message, Upload } from "antd";
const { Dragger } = Upload;
import { FileAddOutlined, LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import {
  fetch_retry_post,
  fetch_retry_post_with_file,
} from "../../network/api-manager";
import { UPLOADFILE, ANALYZE, TRANSFORM } from "../../network/apiConstants";
import { SetConnectDetailsAction, SetTabTypeAction } from "../../Redux/action";

const Connect = ({ dataModernizationCss }) => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const router = useRouter();
  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );
  const connectDetails = useSelector(
    (state) => state.connectDetail.connectDetails
  );
  const [isLoading, setLoading] = useState(false);
  const authData = JSON.parse(localStorage.getItem("authData"));

  const [drawerViewProp] = useState({
    className : "antdUpload",
    style: { width: "40vw", border: "none", border: "1px dashed #0c3246" },
    height: "15vw",
    name: "file",
    multiple: true,
    action: `${process.env.BASE_URL}${UPLOADFILE}/project/${
      query.id ? query.id : projectDetails.projectId
    }/user/${authData.userId}`,
    async onChange(info, i) {
      setLoading(true);
      if (
        info.fileList.length ===
        info.fileList.filter((e) => e.status != "uploading").length
      ) {
        const resultData = await Promise.all(
          info.fileList.map(async (e) => {
            return new Promise(async (resolve, reject) => {
              const result1 = await fetch_retry_post(
                `${ANALYZE}/${e?.response?.fileId}`,
                {}
              );
              const result2 = await fetch_retry_post(
                `${TRANSFORM}${e?.response?.fileId}`
              );
              resolve({ result1, result2 });
            });
          })
        );
        setLoading(false);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  });

  return (
    <Row className={dataModernizationCss.defineForm}>
      <Col span={24} className={dataModernizationCss.connectFileInput}>
        <Dragger {...drawerViewProp}>
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
            </Col>
          </Row>
        </Dragger>
      </Col>
      {/* <Col span={24}>
      {fileList.map(file => (
          <div>
            {file.name}{" "}
            <a onClick={() => this.handleRemove(file.uid)}>click to remove</a>
          </div>
        ))}
      </Col> */}
      <Col span={24} style={{ marginTop: "2vw" }}>
        <div className={dataModernizationCss.nextExitBtn}>
          <Button
            type="primary"
            danger
            className={dataModernizationCss.nextBtn}
            htmlType="submit"
            disabled={isLoading}
            onClick={() => {
              dispatch(SetTabTypeAction("Analyze"));
            }}
          >
            Analyze File
          </Button>

          <Button
            type="primary"
            danger
            className={dataModernizationCss.exitBtn}
            onClick={() => {
              router.push(`/dashboard`);
            }}
            disabled={isLoading}
          >
            Exit
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default Connect;
