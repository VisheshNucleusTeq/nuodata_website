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
    style: { width: "40vw", border: "none", border : "1px dashed #0c3246" },
    height: "15vw",
    name: "file",
    multiple: true,
    action: `${process.env.BASE_URL}${UPLOADFILE}/project/${
      query.id ? query.id : projectDetails.projectId
    }/user/${authData.userId}`,
    // showUploadList :false,
    onChange(info) {
      console.log(info)
      setLoading(true);
      const { status } = info.file;
      if (status === "done") {
        analyzeCall(info?.file?.response);
      } else if (status === "error") {
        setLoading(false);
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  });

  const analyzeCall = async (fileDetails) => {
    const data = await fetch_retry_post(`${ANALYZE}/${fileDetails.fileId}`, {});
    if (!data.success && data?.error) {
      setLoading(false);
      message.error([data?.error]);
    } else {
      await getTransform(fileDetails);
      setLoading(false);
    }
  };

  const getTransform = async (fileDetails) => {
    const data = await fetch_retry_post(`${TRANSFORM}${fileDetails.fileId}`);
    if (!data.success && data?.error) {
      message.error([data?.error]);
    }
  };

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

// import { FileAddOutlined, LoadingOutlined } from "@ant-design/icons";
// import { message, Upload, Row, Col } from "antd";
// import { useState } from "react";
// const { Dragger } = Upload;
// import { useDispatch, useSelector } from "react-redux";
// import { UPLOADFILE, ANALYZE, TRANSFORM } from "../../network/apiConstants";

// const Connect = ({ dataModernizationCss }) => {
//   const [isLoading, setLoading] = useState(false);

//   const projectDetails = useSelector(
//     (state) => state.projectDetails.projectDetails
//   );
//   const authData = JSON.parse(localStorage.getItem("authData"));
//   const props = {
//     name: "file",
//     multiple: true,
//     action: `${process.env.BASE_URL}${UPLOADFILE}/project/${projectDetails.projectId}/user/${authData.userId}`,
//     onChange(info) {
//       setLoading(true);
//       const { status } = info.file;
//       if (status !== "uploading") {
//         console.log("uploading", info.file, info.fileList);
//       }
//       if (status === "done") {
//         message.success(`${info.file.name} file uploaded successfully.`);
//       } else if (status === "error") {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
//     onDrop(e) {
//       console.log("Dropped files", e.dataTransfer.files);
//     },
//   };

//   return (
//     <Row className={dataModernizationCss.defineForm}>
//       <Col xs={1} sm={2} md={4} lg={5} xl={6} xxl={6} />
//       <Col
//         xs={22}
//         sm={20}
//         md={16}
//         lg={14}
//         xl={12}
//         xxl={12}
//         className={dataModernizationCss.connectFileInput}
//       >
//         <Dragger
//           {...props}
//           style={{ width: "40vw", border: "none" }}
//           height={"15vw"}
//         >
//           <Row>
//             {isLoading ? (
//               <Col span={24}>
//                 <LoadingOutlined style={{ fontSize: "40px" }} />
//               </Col>
//             ) : (
//               <Col span={24}>
//                 <FileAddOutlined style={{ fontSize: "50px" }} />
//               </Col>
//             )}
//             <Col span={24} style={{ marginTop: "4%" }}>
//               Drag and drop or &nbsp;
//               <span style={{ color: "#e74860", fontWeight: "bold" }}>
//                 browse
//               </span>
//               &nbsp; your files
//             </Col>
//           </Row>
//         </Dragger>
//       </Col>
//       <Col xs={1} sm={2} md={4} lg={5} xl={6} xxl={6} />
//     </Row>
//   );
// };
// export default Connect;
