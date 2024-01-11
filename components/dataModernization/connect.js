import { useState } from "react";
import { Button, Row, Col, Form, message, Upload } from "antd";
const { Dragger } = Upload;
import { FileAddOutlined, LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";

import { fetch_retry_post } from "../../network/api-manager";
import { UPLOADFILE, ANALYZE, TRANSFORM } from "../../network/apiConstants";
import { SetTabTypeAction } from "../../Redux/action";

const Connect = ({ dataModernizationCss }) => {
  const queryClient = useQueryClient();
  const { query } = useRouter();
  const dispatch = useDispatch();
  const router = useRouter();
  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );

  const [isLoading, setLoading] = useState(false);
  const authData = JSON.parse(localStorage.getItem("authData"));

  const [drawerViewProp] = useState({
    className: "antdUpload",
    style: { width: "40vw", border: "none", border: "1px dashed #0c3246" },
    height: "15vw",
    name: "file",
    multiple: true,
    beforeUpload : (file) => {
      console.log(file)
    },
    action: `${process.env.BASE_URL}${UPLOADFILE}/project/${
      query.id ? query.id : projectDetails.projectId
    }/user/${authData.userId}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    async onChange(info, i) {
      setLoading(true);
      if (
        info.fileList.length ===
        info.fileList.filter((e) => e.status != "uploading").length
      ) {
        await Promise.all(
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
        queryClient.refetchQueries({ queryKey: ["PROJECT_DATA"] });
        setLoading(false);
      }
    },
    onDrop(e) {},
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




// import { useState } from "react";
// import { Button, Row, Col, Form, message, Upload } from "antd";
// const { Dragger } = Upload;
// import { FileAddOutlined, LoadingOutlined } from "@ant-design/icons";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/router";
// import { useQueryClient } from "react-query";

// import { fetch_retry_post, fetch_retry_post_with_file } from "../../network/api-manager";
// import { UPLOADFILE, ANALYZE, TRANSFORM } from "../../network/apiConstants";
// import { SetTabTypeAction } from "../../Redux/action";
// import JSZip from "jszip";

// const Connect = ({ dataModernizationCss }) => {
//   const queryClient = useQueryClient();
//   const { query } = useRouter();
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const projectDetails = useSelector(
//     (state) => state.projectDetails.projectDetails
//   );

//   const [isLoading, setLoading] = useState(false);
//   const authData = JSON.parse(localStorage.getItem("authData"));

//   const [drawerViewProp] = useState({
//     className: "antdUpload",
//     style: { width: "40vw", border: "none", border: "1px dashed #0c3246" },
//     height: "15vw",
//     name: "file",
//     multiple: true,
//     beforeUpload: (file) => {
//       console.log(file)
//     },
//     customRequest: ({ file, onSuccess, onError }) => handleCustomRequest(file, onSuccess, onError),
//     /* action: `${process.env.BASE_URL}${UPLOADFILE}/project/${query.id ? query.id : projectDetails.projectId
//       }/user/${authData.userId}`,
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//     }, */
//     /*  async onChange(info, i) {
//        setLoading(true);
//        console.log(info)
//        if (
//          info.fileList.length ===
//          info.fileList.filter((e) => e.status != "uploading").length
//        ) {
//          await Promise.all(
//            info.fileList.map(async (e) => {
//              return new Promise(async (resolve, reject) => {
//                const result1 = await fetch_retry_post(
//                  `${ANALYZE}/${e?.response?.fileId}`,
//                  {}
//                );
//                const result2 = await fetch_retry_post(
//                  `${TRANSFORM}${e?.response?.fileId}`
//                );
//                resolve({ result1, result2 });
//              });
//            })
//          );
//          queryClient.refetchQueries({ queryKey: ["PROJECT_DATA"] });
//          setLoading(false);
//        }
//      }, */
//     onDrop(e) { },
//   });
//   const handleCustomRequest = async (file, onSuccess, onError) => {
//     if (
//       file.type === "application/x-zip-compressed" ||
//       file.type === "application/zip"
//     ) {
//       const zip = new JSZip();
//       const zippedFiles = await zip.loadAsync(file);
//       const extractedFiles = await Promise.all(
//         Object.values(zippedFiles.files).map(async (zippedFile, index) => {
//           const unzippedBlob = await zippedFile.async("blob");
//           console.log(zippedFile)
//           return {
//             uid: `${file.uid}-${index}`,
//             originFileObj: unzippedBlob,
//             name: zippedFile.name,
//           };
//         })
//       );
//       for (const extractedFile of extractedFiles) {
//         let formData = new FormData();
//         formData.append("file", extractedFile.originFileObj, extractedFile.name);
//         const uploadURL = `${process.env.BASE_URL}${UPLOADFILE}/project/${query.id ? query.id : projectDetails.projectId
//           }/user/${authData.userId}`
//         try {
//           const response = await fetch_retry_post_with_file(uploadURL, formData);
//           await fetch_retry_post(`${ANALYZE}/${response?.data?.fileId}`, {});
//           await fetch_retry_post(`${TRANSFORM}${response?.data?.fileId}`);
//         } catch (error) {
//           onError("error")
//         }
//       }
//     }

//     else {
//       let formData = new FormData();
//       formData.append("file", file);
//       const uploadURL = `${process.env.BASE_URL}${UPLOADFILE}/project/${query.id ? query.id : projectDetails.projectId
//         }/user/${authData.userId}`;

//       try {
//         const response = await fetch_retry_post_with_file(uploadURL, formData);
//         await fetch_retry_post(`${ANALYZE}/${response?.data?.fileId}`, {});
//         await fetch_retry_post(`${TRANSFORM}${response?.data?.fileId}`);
//       } catch (error) {
//         onError("error")
//       }
//     }
//     queryClient.refetchQueries({ queryKey: ["PROJECT_DATA"] });
//     setLoading(false);
//     onSuccess("ok")
//   }


//   return (
//     <Row className={dataModernizationCss.defineForm}>
//       <Col span={24} className={dataModernizationCss.connectFileInput}>
//         <Dragger {...drawerViewProp}>
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
//       <Col span={24} style={{ marginTop: "2vw" }}>
//         <div className={dataModernizationCss.nextExitBtn}>
//           <Button
//             type="primary"
//             danger
//             className={dataModernizationCss.nextBtn}
//             htmlType="submit"
//             disabled={isLoading}
//             onClick={() => {
//               dispatch(SetTabTypeAction("Analyze"));
//             }}
//           >
//             Analyze File
//           </Button>

//           <Button
//             type="primary"
//             danger
//             className={dataModernizationCss.exitBtn}
//             onClick={() => {
//               router.push(`/dashboard`);
//             }}
//             disabled={isLoading}
//           >
//             Exit
//           </Button>
//         </div>
//       </Col>
//     </Row>
//   );
// };

// export default Connect;