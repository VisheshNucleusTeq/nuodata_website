import {
  Table,
  Space,
  Modal,
  Button,
  Input,
  Collapse,
  Card,
  Row,
  Col,
  message,
  Select,
} from "antd";
const { Panel } = Collapse;
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { useEffect, useState } from "react";
import {
  TARGET,
  ANALYZESUMMARY,
  GETANALYZEDATA,
  DESIGN,
} from "../../network/apiConstants";
import { fetch_retry_get } from "../../network/api-manager";
import {
  SetTabTypeAction,
  SetProjectTransformDetailsAction,
} from "../../Redux/action";
import AnalyzeDetailPopup from "./analyzeDetailPopup";

export default function Design({ dataModernizationCss }) {
  const { query } = useRouter();
  const router = useRouter();
  const dispatch = useDispatch();

  const [fileName, setFileName] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [outputFileId, setOutputFileId] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collapseData, setCollapseData] = useState({});
  const [modalData, setModalData] = useState();
  const [open, setOpen] = useState(false);

  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );

  const getDesignData = async () => {
    const data = await fetch_retry_get(
      `${ANALYZESUMMARY}${query.id ? query.id : projectDetails.projectId}`
    );
    setLoading(false);
    if (data.success) {
      setFileData(data?.data?.fileDetails);
    } else {
      message.error([data?.error]);
    }
  };

  useEffect(() => {
    getDesignData();
  }, []);

  const getFileDetails = async (fileId) => {
    const data = await fetch_retry_get(`${TARGET}${fileId}`);
    const collapseData = {};
    data.data.forEach((e) => {
      if (!collapseData[e.tableName]) {
        collapseData[e.tableName] = [e];
      } else {
        collapseData[e.tableName].push(e);
      }
    });
    setFileId(fileId);
    setCollapseData(collapseData);

    const analyzeDetails = await fetch_retry_get(`${GETANALYZEDATA}${fileId}`);
    console.log(analyzeDetails?.data?.outputFiles);
    const outputFileId = analyzeDetails?.data?.outputFiles.find((e) => {
      return e.fileType === "graph_src";
    });
    setOutputFileId(outputFileId?.outputFileId);
  };

  const getModelData = async (fileId) => {
    const modelDataObj = await fetch_retry_get(`${DESIGN}${fileId}`);
    setModalData(modelDataObj?.data);
    setTimeout(() => {
      setOpen(true);
    }, 10);
  };

  return (
    <>
      <Modal
        destroyOnClose
        centered
        open={open}
        onOk={() => {
          dispatch(
            SetProjectTransformDetailsAction({
              analyzeDetailsId: fileId,
            })
          );
          dispatch(SetTabTypeAction("Transform"));
        }}
        onCancel={() => setOpen(false)}
        width={"100vw"}
      >
        {/* {JSON.stringify(modalData)} */}
        <AnalyzeDetailPopup outputFileId={outputFileId} data={modalData} />
      </Modal>

      <div className={dataModernizationCss.designMain}>
        <Table
          pagination={false}
          className="demo"
          columns={[
            {
              title: "File",
              dataIndex: "fileName",
              key: "fileName",
            },
            {
              title: "Workflows",
              dataIndex: "workflows",
              key: "workflows",
            },
            {
              title: "Mappings",
              dataIndex: "mappings",
              key: "mappings",
            },
            {
              title: "Transformations",
              dataIndex: "transformations",
              key: "transformations",
            },

            {
              title: "Action",
              key: "action",
              render: (_, record) => (
                <Space size="middle">
                  <a
                    onClick={() => {
                      // setAnalyzeDetailsId(record.fileId);
                      // setAnalyze(false);
                      getFileDetails(record.fileId);
                      setFileName(record.fileName);
                    }}
                  >
                    Details
                  </a>
                </Space>
              ),
            },
          ]}
          dataSource={fileData}
        />
      </div>
      {Object.keys(collapseData).length > 0 && (
        <div className={dataModernizationCss.designMain}>
          <Card bordered={false} className={dataModernizationCss.designCard}>
            <Collapse defaultActiveKey={["1"]} ghost>
              {Object.keys(collapseData).map((e, i) => {
                return (
                  <Panel header={fileName} key={i}>
                    <Row style={{ marginTop: "1vh", marginBottom: "5vh" }}>
                      <Col
                        className={dataModernizationCss.tableNameView}
                        span={24}
                      >
                        {" "}
                        Target Table Plan{" "}
                      </Col>
                      <Col xs={22} sm={22} md={10} lg={10} xl={10} xxl={10}>
                        <Input
                          // className={"input"}
                          value={e}
                          // style={{ border: "none" }}
                          style={{ borderRadius: "10px", height: "5vh" }}
                          onChange={(ee) => {
                            const collapseDataArr = {};
                            collapseDataArr[ee.target.value] = collapseData[e];
                            delete collapseData[e];
                            console.log(collapseData);
                            setCollapseData(collapseDataArr);
                          }}
                        />
                      </Col>
                    </Row>

                    <Table
                      pagination={false}
                      scroll={{ x: true }}
                      columns={[
                        {
                          title: "Transformation Area",
                          dataIndex: "tableName",
                          key: "tableName",
                        },
                        {
                          title: "Attribute/Column",
                          dataIndex: "columnName",
                          key: "columnName",
                        },
                        {
                          title: "Type",
                          dataIndex: "columnType",
                          // key: "columnType",
                          render: (text, record, index) => (
                            <Select
                              key={(Math.random() + 1)
                                .toString(36)
                                .substring(7)}
                              // showSearch
                              placeholder="Select Type"
                              optionFilterProp="children"
                              defaultValue={record.columnType}
                              filterOption={(input, option) =>
                                (option?.label ?? "").includes(input)
                              }
                              filterSort={(optionA, optionB) =>
                                (optionA?.label ?? "")
                                  .toLowerCase()
                                  .localeCompare(
                                    (optionB?.label ?? "").toLowerCase()
                                  )
                              }
                              options={[
                                {
                                  value: "timestamp",
                                  label: "Timestamp",
                                },
                                {
                                  value: "BigInt",
                                  label: "BigInt",
                                },
                                {
                                  value: "String",
                                  label: "String",
                                },
                              ]}
                            />
                          ),
                        },
                        {
                          title: "Data Source",
                          dataIndex: "sourceTableName",
                          key: "sourceTableName",
                          render: (_, record) => {
                            return <p>{record.sourceTableName ? record.sourceTableName : "NA"}</p>;
                          },
                        },
                        {
                          title: "Target Attribute Name",
                          key: "columnName",
                          render: (text, record, index) => (
                            <Input
                              value={record.columnName}
                              onChange={(columnName) => {
                                const newData = { ...collapseData };
                                collapseData[e][index]["columnName"] =
                                  columnName.target.value;
                                setCollapseData(newData);
                              }}
                            />
                          ),
                        },
                        {
                          title: "Target Type",
                          key: "columnType",
                          // render: (text, record, index) => (
                          //   <Input
                          //     value={record.columnType}
                          //     onChange={(columnType) => {
                          //       const newData = { ...collapseData };
                          //       collapseData[e][index]["columnType"] =
                          //         columnType.target.value;
                          //       setCollapseData(newData);
                          //     }}
                          //   />
                          // ),
                          render: (text, record, index) => (
                            <Select
                              placeholder="Select Type"
                              optionFilterProp="children"
                              defaultValue={record.columnType}
                              filterOption={(input, option) =>
                                (option?.label ?? "").includes(input)
                              }
                              filterSort={(optionA, optionB) =>
                                (optionA?.label ?? "")
                                  .toLowerCase()
                                  .localeCompare(
                                    (optionB?.label ?? "").toLowerCase()
                                  )
                              }
                              options={[
                                {
                                  value: "timestamp",
                                  label: "Timestamp",
                                },
                                {
                                  value: "BigInt",
                                  label: "BigInt",
                                },
                                {
                                  value: "String",
                                  label: "String",
                                },
                              ]}
                            />
                          ),
                        },
                        {
                          title: "Dependency & Lineage",
                          dataIndex: "dependencyAndLineage",
                          key: "dependencyAndLineage",
                          render: (_, record) => {
                            return <p>NA</p>;
                          },
                        },
                      ]}
                      dataSource={collapseData[e]}
                    />

                    <div
                      className={dataModernizationCss.nextExitBtn}
                      style={{ marginTop: "5vh" }}
                    >
                      <Button
                        type="primary"
                        danger
                        className={dataModernizationCss.nextBtn}
                        htmlType="submit"
                        onClick={() => {
                          getModelData(outputFileId);
                          // dispatch(
                          //   SetProjectTransformDetailsAction({
                          //     analyzeDetailsId: fileId,
                          //   })
                          // );
                          // dispatch(SetTabTypeAction("Transform"));
                        }}
                      >
                        Transform File
                      </Button>
                    </div>
                  </Panel>
                );
              })}
            </Collapse>
          </Card>
        </div>
      )}

      <div className={dataModernizationCss.nextExitBtn}>
        <Button
          type="primary"
          danger
          className={dataModernizationCss.nextBtn}
          htmlType="submit"
          onClick={() => {
            dispatch(SetProjectTransformDetailsAction({}));
            dispatch(SetTabTypeAction("Transform"));
          }}
        >
          Transform
        </Button>
        <Button
          type="primary"
          danger
          className={dataModernizationCss.exitBtn}
          onClick={() => {
            router.push(`/dashboard`);
          }}
        >
          Save & Exit
        </Button>
      </div>
    </>
  );
}

// import { useState, useEffect } from "react";
// import {
//   Table,
//   Space,
//   Modal,
//   Button,
//   Input,
//   Collapse,
//   Card,
//   Row,
//   Col,
// } from "antd";
// const { Panel } = Collapse;
// import { ArrowRightOutlined } from "@ant-design/icons";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { useRouter } from "next/router";

// import { SetTabTypeAction } from "../../Redux/action";
// import { fetch_retry_get } from "../../network/api-manager";
// import { TARGET, DESIGN } from "../../network/apiConstants";
// import AnalyzeDetailPopup from "./analyzeDetailPopup";

// export default function Design({ dataModernizationCss }) {
//   const { query } = useRouter();
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);
//   const [collapseData, setCollapseData] = useState({});
//   const [modelData, setModelData] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [open, setOpen] = useState(false);
//   const [outputFileId, setOutputFileId] = useState();
//   const [modalData, setModalData] = useState();

//   const projectDetails = useSelector(
//     (state) => state.projectDetails.projectDetails
//   );

//   const getDesignData = async () => {
//     setLoading(true);
//     const collapseData = {}; // DELETE

//     const data = await fetch_retry_get(
//       `${TARGET}${query.id ? query.id : projectDetails.projectId}`
//     );

//     // DELETE
//     data.data.forEach((e) => {
//       if (!collapseData[e.tableName]) {
//         collapseData[e.tableName] = [e];
//       } else {
//         collapseData[e.tableName].push(e);
//       }
//     });
//     setCollapseData(collapseData);
//     // DELETE

//     setLoading(false);
//     if (data.success) {
//       setData(data?.data);
//     } else {
//       message.error(data?.error ? [data?.error] : "Something went wrong.");
//     }
//   };

//   useEffect(() => {
//     getDesignData();
//   }, [query.id]);

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleOk = () => {
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   const getProjectData = async (fileId) => {
//     const data = await fetch_retry_get(`${DESIGN}${fileId}`);
//     if (data.success) return data.data;
//   };

//   const getDataCall = async (id) => {
//     let datar = await getProjectData(id);
//     setModalData(datar);
//     setTimeout(() => {
//       setOpen(true);
//     }, 0);
//   };

//   return (
//     <>
//       <Modal
//         // title="Modal 1000px width"
//         destroyOnClose
//         centered
//         open={open}
//         onOk={() => setOpen(false)}
//         onCancel={() => setOpen(false)}
//         width={"100vw"}
//       >
//         {/* <p>{ Date.now() }</p> */}
//         <AnalyzeDetailPopup outputFileId={outputFileId} data={modalData} />
//       </Modal>

//       <div className={dataModernizationCss.designMain}>
//         <Table
//           pagination={false}
//           className="demo"
//           columns={[
//             {
//               title: "File",
//               dataIndex: "file",
//               key: "file",
//             },
//             {
//               title: "Workflows",
//               dataIndex: "workflows",
//               key: "workflows",
//             },
//             {
//               title: "Mappings",
//               dataIndex: "mappings",
//               key: "mappings",
//             },
//             {
//               title: "Transformations",
//               dataIndex: "transformations",
//               key: "transformations",
//             },
//             {
//               title: "Action",
//               key: "action",
//               render: (_, record) => <a>Detail</a>,
//             },
//           ]}
//           dataSource={[
//             {
//               file: "Informatica1.xml",
//               workflows: "2",
//               mappings: "8",
//               transformations: "24",
//             },
//           ]}
//           scroll={{ x: true }}
//         />
//       </div>
//       <div className={dataModernizationCss.designMain}>
//         <Card bordered={false} className={dataModernizationCss.designCard}>
//           <Collapse defaultActiveKey={["1"]} ghost>
//             {Object.keys(collapseData).map((e, i) => {
//               return (
//                 <Panel
//                   header={
//                     <Row>
//                       <Col xs={22} sm={22} md={10} lg={10} xl={10} xxl={10}>
//                         <Input
//                           className="ant-collapse-header-text"
//                           value={e}
//                           style={{ border: "none" }}
//                           onChange={(ee) => {
//                             const collapseDataArr = {};
//                             collapseDataArr[ee.target.value] = collapseData[e];
//                             delete collapseData[e];
//                             console.log(collapseData);
//                             setCollapseData(collapseDataArr);
//                           }}
//                         />
//                       </Col>
//                     </Row>
//                   }
//                   key={i}
//                 >
//                   <Table
//                     pagination={false}
//                     // className="demo"
//                     scroll={{ x: true }}
//                     columns={[
//                       {
//                         title: "Transformation Area",
//                         dataIndex: "tableName",
//                         key: "tableName",
//                       },
//                       {
//                         title: "Attribute/Column",
//                         dataIndex: "columnName",
//                         key: "columnName",
//                       },
//                       {
//                         title: "Type",
//                         dataIndex: "columnType",
//                         key: "columnType",
//                       },
//                       {
//                         title: "Data Source",
//                         dataIndex: "sourceTableName",
//                         key: "sourceTableName",
//                       },
//                       // {
//                       //   title: "Target Table Plan",
//                       //   key: "tableName",
//                       //   render: (text, record, index) => (
//                       //     <Input
//                       //       value={record.tableName}
//                       //       onChange={(e) => {
//                       //         const newData = [...data];
//                       //         newData[index]["tableName"] = e.target.value;
//                       //         setData(newData);
//                       //       }}
//                       //     />
//                       //   ),
//                       // },
//                       {
//                         title: "Target Attribute Name",
//                         key: "columnName",
//                         render: (text, record, index) => (
//                           <Input
//                             value={record.columnName}
//                             onChange={(e) => {
//                               const newData = [...data];
//                               newData[index]["columnName"] = e.target.value;
//                               setData(newData);
//                             }}
//                           />
//                         ),
//                       },
//                       {
//                         title: "Target Type",
//                         key: "columnType",
//                         render: (text, record, index) => (
//                           <Input
//                             value={record.columnType}
//                             onChange={(e) => {
//                               const newData = [...data];
//                               newData[index]["columnType"] = e.target.value;
//                               setData(newData);
//                             }}
//                           />
//                         ),
//                       },
//                       {
//                         title: "Dependency & Lineage",
//                         dataIndex: "dependencyAndLineage",
//                         key: "dependencyAndLineage",
//                         render: (_, record) => {
//                           return <p>NA</p>;
//                         },
//                       },
//                     ]}
//                     dataSource={data}
//                   />

//                   <div
//                     className={dataModernizationCss.nextExitBtn}
//                     style={{ marginTop: "5vh" }}
//                   >
//                     <Button
//                       type="primary"
//                       danger
//                       className={dataModernizationCss.nextBtn}
//                       htmlType="submit"
//                       onClick={() => {
//                         // setOpen(true)
//                         getDataCall(14)
//                         // dispatch(SetTabTypeAction("Transform"));
//                       }}
//                     >
//                       Transform <ArrowRightOutlined />
//                     </Button>
//                   </div>
//                 </Panel>
//               );
//             })}
//           </Collapse>
//         </Card>
//       </div>

//       <div className={dataModernizationCss.nextExitBtn}>
//         <Button
//           type="primary"
//           danger
//           className={dataModernizationCss.nextBtn}
//           htmlType="submit"
//           onClick={() => {
//             dispatch(SetTabTypeAction("Transform"));
//           }}
//         >
//           Transform <ArrowRightOutlined />
//         </Button>
//         <Button
//           type="primary"
//           danger
//           className={dataModernizationCss.exitBtn}
//           onClick={() => {
//             router.push(`/dashboard`);
//           }}
//         >
//           Save & Exit
//         </Button>
//       </div>
//     </>
//   );
// }
