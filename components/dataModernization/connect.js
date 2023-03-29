import {
  InboxOutlined,
  FileAddOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { message, Upload, Row, Col } from "antd";
import { useState } from "react";
const { Dragger } = Upload;
import { useDispatch, useSelector } from "react-redux";
import { UPLOADFILE, ANALYZE, TRANSFORM } from "../../network/apiConstants";

const Connect = ({ dataModernizationCss }) => {
  const [isLoading, setLoading] = useState(false);

  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );
  const authData = JSON.parse(localStorage.getItem("authData"));
  const props = {
    name: "file",
    multiple: true,
    action: `${process.env.BASE_URL}${UPLOADFILE}/project/${projectDetails.projectId}/user/${authData.userId}`,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        setLoading(true);
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        setLoading(false);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  console.log("process.env", process.env);
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
        <Dragger {...props} style={{ width: "40vw" }} height={"40vh"}>
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
      <Col xs={1} sm={2} md={4} lg={5} xl={6} xxl={6} />
    </Row>
  );
};
export default Connect;

// import { useEffect, useState } from "react";
// import { Button, Row, Col, Form, message, Upload } from "antd";
// import { FileAddOutlined, LoadingOutlined } from "@ant-design/icons";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/router";

// import {
//   fetch_retry_post,
//   fetch_retry_post_with_file,
// } from "../../network/api-manager";
// import { UPLOADFILE, ANALYZE, TRANSFORM } from "../../network/apiConstants";
// import { SetConnectDetailsAction, SetTabTypeAction } from "../../Redux/action";

// const Connect = ({ dataModernizationCss }) => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const [isLoading, setLoading] = useState(false);
//   const [fileData, setFileData] = useState({});

//   const projectDetails = useSelector(
//     (state) => state.projectDetails.projectDetails
//   );

//   const connectDetails = useSelector(
//     (state) => state.connectDetail.connectDetails
//   );

//   useEffect(() => {
//     setFileData(connectDetails);
//   });

//   const avatarUpload = async (file) => {
//     setLoading(true);
//     const payload = new FormData();
//     payload.append("file", file);
//     const authData = JSON.parse(localStorage.getItem("authData"));
//     const data = await fetch_retry_post_with_file(
//       `${UPLOADFILE}/project/${projectDetails.projectId}/user/${authData.userId}`,
//       payload
//     );

//     if (data.success) {
//       dispatch(SetConnectDetailsAction(data.data));
//       setFileData(data.data);
//       await analyzeCall(data.data);
//     } else {
//       setLoading(false);
//       message.error([data?.error]);
//     }
//   };

//   const analyzeCall = async (fileDetails) => {
//     const data = await fetch_retry_post(`${ANALYZE}/${fileDetails.fileId}`, {});
//     if (!data.success && data?.error) {
//       setLoading(false);
//       message.error([data?.error]);
//     }else{
//       await getTransform(fileDetails);
//       setLoading(false);
//     }
//   };

//   const getTransform = async (fileDetails) => {
//     const data = await fetch_retry_post(`${TRANSFORM}${fileDetails.fileId}`);
//     if (!data.success && data?.error) {
//       message.error([data?.error]);
//     }
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
//         <Form
//           layout="horizontal"
//           autoComplete="off"
//           labelCol={{ span: 7 }}
//           wrapperCol={{ span: 18 }}
//           onFinish={() => {
//             dispatch(SetTabTypeAction("Analyze"));
//           }}
//         >
//           <Form.Item
//             labelAlign={"left"}
//             name={"file"}
//             rules={
//               !fileData.fileName
//                 ? [
//                     {
//                       required: true,
//                       message: "Source file is required.",
//                     },
//                   ]
//                 : []
//             }
//           >
//             <Upload
//               action={avatarUpload}
//               listType="picture-card"
//               fileList={[]}
//               onChange={() => {}}
//               onPreview={() => {}}
//               style={{ width: "100vw" }}
//               accept=".xml"
//             >
//               <Row>
//                 {isLoading ? (
//                   <Col span={24}>
//                     <LoadingOutlined style={{ fontSize: "40px" }} />
//                   </Col>
//                 ) : (
//                   <Col span={24}>
//                     <FileAddOutlined style={{ fontSize: "50px" }} />
//                   </Col>
//                 )}

//                 <Col span={24} style={{ marginTop: "4%" }}>
//                   Drag and drop or &nbsp;
//                   <span style={{ color: "#e74860", fontWeight: "bold" }}>
//                     browse
//                   </span>
//                   &nbsp; your files
//                   <br />
//                   <br />
//                   {fileData.fileName && (
//                     <p style={{ color: "#e74860" }}>{fileData.fileName}</p>
//                   )}
//                 </Col>
//               </Row>
//             </Upload>
//           </Form.Item>

//           <div className={dataModernizationCss.nextExitBtn}>
//             <Button
//               type="primary"
//               danger
//               className={dataModernizationCss.nextBtn}
//               htmlType="submit"
//               // disabled={fileData.fileName ? false : true}
//               disabled={isLoading}
//             >
//               Analyze File
//             </Button>

//             <Button
//               type="primary"
//               danger
//               className={dataModernizationCss.exitBtn}
//               onClick={() => {
//                 router.push(`/dashboard`);
//               }}
//               disabled={isLoading}
//             >
//               Exit
//             </Button>
//           </div>
//         </Form>
//       </Col>
//       <Col xs={1} sm={2} md={4} lg={5} xl={6} xxl={6} />
//     </Row>
//   );
// };

// export default Connect;
