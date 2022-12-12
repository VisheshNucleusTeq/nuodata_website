import { useState } from "react";
import { Button, Row, Col, Form, Input, Select, message, Upload } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetch_retry_post,
  fetch_retry_post_with_file,
} from "../../network/api-manager";
import { UPLOADFILE, ANALYZE } from "../../network/apiConstants";
import { SetConnectDetailsAction } from "../../Redux/action";

const Connect = ({ dataModernizationCss, changeStep }) => {

  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileData, setFileData] = useState({});

  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );

  const avatarUpload = async (file) => {
    setFileName(file.name);
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
      changeStep("Analyze");
    } else {
      message.error([data?.error]);
    }
  };

  return (
    <Row className={dataModernizationCss.defineForm}>
      <Col xs={1} sm={2} md={4} lg={5} xl={6} xxl={6} />
      <Col xs={22} sm={20} md={16} lg={14} xl={12} xxl={12}>
        <Form
          layout="horizontal"
          autoComplete="off"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 18 }}
          onFinish={analyzeCall}
        >
          <Form.Item
            // label={"Upload Source File(s)"}
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
              className="avatar-uploader"
              action={avatarUpload}
              listType="picture-card"
              fileList={[]}
              onChange={() => {}}
              onPreview={() => {}}
              style={{ width: "100vw" }}
            >
              <Row>
                <Col span={24}>
                  <FileAddOutlined style={{ fontSize: "50px" }} />
                </Col>
                <Col span={24} style={{ marginTop: "4%" }}>
                  Drag and drop or &nbsp;
                  <span style={{ color: "#e74860", fontWeight: "bold" }}>
                    browse
                  </span>
                  &nbsp; your files
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
              disabled={!fileData.fileId ? true : false}
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
      <Col xs={1} sm={2} md={4} lg={5} xl={6} xxl={6} />
    </Row>
  );
};

export default Connect;



// import { Button, Row, Col, Form, Input, Select, message, Upload } from "antd";
// import { useState } from "react";
// import { FileAddOutlined } from "@ant-design/icons";

// import {
//   fetch_retry_post,
//   fetch_retry_post_with_file,
// } from "../../network/api-manager";

// import { UPLOADFILE, ANALYZE } from "../../network/apiConstants";

// const Connect = ({ dataModernizationCss, changeStep, project }) => {
//   const [isLoading, setLoading] = useState(false);
//   const [fileName, setFileName] = useState("");
//   const [fileData, setFileData] = useState({});

//   const avatarUpload = async (file) => {
//     setFileName(file.name);
//     setLoading(true);
//     const payload = new FormData();
//     payload.append("file", file);
//     const authData = JSON.parse(localStorage.getItem("authData"));
//     const data = await fetch_retry_post_with_file(
//       //   `${UPLOADFILE}/${project.projectId}/${authData.userId}`,
//       `${UPLOADFILE}/38/${authData.userId}`,
//       payload
//     );

//     if (data.success) {
//       setFileData(data.data);
//       // message.success("Successfully Uploaded.");
//     } else {
//       message.error([data?.error]);
//     }
//   };

//   const analyzeCall = async () => {
//     setLoading(true);
//     const authData = JSON.parse(localStorage.getItem("authData"));
//     const data = await fetch_retry_post(`${ANALYZE}/${fileData.fileId}`, {});
//     setLoading(false);
//     if (data.success) {
//       changeStep("Connect");
//       // message.success("Analyze Successfully.");
//     } else {
//       message.error([data?.error]);
//     }
//   };

//   return (
//     <Row className={dataModernizationCss.defineForm}>
//       <Col xs={1} sm={2} md={4} lg={5} xl={7} xxl={7} />
//       <Col xs={22} sm={20} md={16} lg={14} xl={10} xxl={10}>
//         <Upload
//           className="avatar-uploader"
//           action={avatarUpload}
//           // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//           listType="picture-card"
//           fileList={[]}
//           onChange={() => {}}
//           onPreview={() => {}}
//           style={{ width: "100vw" }}
//         >
//           <Row>
//             <Col span={24}>
//               <FileAddOutlined  style={{fontSize : "50px"}}/>
//             </Col>
//             <Col span={24} style={{marginTop : "4%"}}>
//               Drag and drop or &nbsp;
//               <span style={{ color: "#e74860", fontWeight: "bold" }}>
//                 browse
//               </span>
//               &nbsp; your files
//             </Col>
//           </Row>

//           {/* <div style={{width : "100%"}}><FileAddOutlined /></div>
//           <div style={{width : "100%"}}><FileAddOutlined /></div>
//           Drag and drop or &nbsp;
//           <span style={{ color: "#e74860", fontWeight: "bold" }}>browse</span>
//           &nbsp; your files */}
//         </Upload>
//       </Col>
//       <Col xs={1} sm={2} md={4} lg={5} xl={7} xxl={7} />

//       <div className={dataModernizationCss.nextExitBtn}>
//             <Button
//               type="primary"
//               danger
//               className={dataModernizationCss.nextBtn}
//               htmlType="submit"
//             >
//               Next
//             </Button>

//             <Button
//               type="primary"
//               danger
//               className={dataModernizationCss.exitBtn}
//             >
//               Exit
//             </Button>
//           </div>
//     </Row>
//   );
// };

// export default Connect;