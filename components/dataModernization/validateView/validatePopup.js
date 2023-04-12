import React from "react";
import {
  Row,
  Col,
  Table,
  Select,
  Space,
  Input,
  Tree,
  Divider,
  List,
  Button,
  Upload,
} from "antd";
import {
  FileAddOutlined,
  EyeOutlined,
  LoadingOutlined,
  ReloadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import {
  fetch_retry_get,
  fetch_retry_post,
  fetch_retry_delete,
  fetch_retry_post_with_file,
} from "../../../network/api-manager";
import {
  JSONSTRUCTURE,
  VALIDATEFILE,
  VALIDATEFILEDETAILS,
  ADDATTACHMENT,
  DELETEATTACHMENT,
} from "../../../network/apiConstants";
import { useRef } from "react";

const ValidatePopup = ({ fileId, dataModernizationCss }) => {
  const inputRef = useRef();

  const [treeData, setTreeData] = useState([]);
  const [treeDataDefault, setTreeDataDefault] = useState(treeData);
  const [search, setSearch] = useState("");
  const [fileTitle, setFileTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [selectedTree, setSelectedTree] = useState();
  const [objId, setObjId] = useState(null);
  const [fileUploading, setFileUploading] = useState(false);
  const [comment, setComment] = useState("");
  const [addComment, setAddCommnet] = useState(false);

  const getTreeData = async (fileId) => {
    const data = await fetch_retry_get(`${JSONSTRUCTURE}${fileId}`);
    var treeDataObj = {
      ...JSON.parse(JSON.stringify(data?.data)),
      key: "defaultExpandedKey",
    };

    const treeDataObjDefault = {
      ...JSON.parse(JSON.stringify(data?.data)),
      key: "defaultExpandedKey",
    };
    setTreeDataDefault([treeDataObjDefault]);
    setTreeData([treeDataObj]);
  };

  useState(() => {
    getTreeData(fileId);
  }, [fileId]);

  const filter = (array, text) => {
    const getNodes = (result, object) => {
      if (object.title.toLowerCase().includes(text.toLowerCase())) {
        result.push({ ...object, className: text ? "demo123" : "" });
        return result;
      }
      if (Array.isArray(object.children)) {
        const children = object.children.reduce(getNodes, []);
        if (children.length) result.push({ ...object, children });
      }
      return result;
    };
    return array.reduce(getNodes, []);
  };

  const getData = async (id,title) => {
    if (id + "") {
      if (id + "" == selectedTree + "") {
        return true;
      }
      setSelectedTree(id);
    } else {
      id = selectedTree;
      return true;
    }
    setFileTitle(title);
    setLoading(true);
    setModalData({});
    const dataId = (id + "").split("_")[2];
    const data = await fetch_retry_get(
      `${VALIDATEFILEDETAILS}${fileId}/entity/${dataId}`
    );
    if (data.success) {
      setModalData(data.data);
    }
    setLoading(false);
  };

  const changeFileStatus = async (status) => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const dataId = (selectedTree + "").split("_")[2];

    await fetch_retry_post(`${VALIDATEFILE}${fileId}/user/${authData.userId}`, {
      objId: modalData?.objId ? modalData.objId : null,
      entityId: dataId,
      status: status,
      comment: null,
    });
    const data = await fetch_retry_get(
      `${VALIDATEFILEDETAILS}${fileId}/entity/${dataId}`
    );
    if (data.success) {
      setModalData(data.data);
    }
  };

  const createLogs = (record) => {
    return (
      <b>
        <span>
          <span style={{ color: "#e74860" }}>{record?.userName}</span>
          <span style={{ color: "#0c3246" }}>
            {record?.type === "status" && " change status to "}
          </span>
          <span>
            {record?.type === "status" &&
              (record?.changed === "notStarted"
                ? <span style={{color : "orange"}}>not started</span>
                : record?.changed === "failed" ? <span style={{color : "red"}}>{record?.changed}</span> : <span style={{color : "green"}}>{record?.changed}</span>)}
          </span>
          <span style={{ color: "#0c3246" }}>
            {record?.type === "Added" && " add attachments "}
          </span>
          <span style={{ color: "blue" }}>
            {record?.type === "Added" && record?.changed}
          </span>
          <span style={{ color: "#0c3246" }}>
            {record?.type === "comment" && " add comment "}
          </span>
          <span style={{ color: "#e74860" }}>
            {record?.type === "comment" &&
              record?.changed
                .split("", 50)
                .reduce(
                  (o, c) => (o.length === 49 ? `${o}${c}...` : `${o}${c}`),
                  ""
                )}
          </span>
          <span style={{ color: "#0c3246" }}>
            {record?.type === "deleted" && " deleted attachments "}
          </span>
        </span>
      </b>
    );
  };

  const changeDateFormat = (date) => {
    const dt = new Date(date);
    const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
    return `${padL(dt.getMonth() + 1)}/${padL(
      dt.getDate()
    )}/${dt.getFullYear()} ${padL(dt.getHours())}:${padL(
      dt.getMinutes()
    )}:${padL(dt.getSeconds())}`;
  };

  const addCommentAction = async () => {
    setAddCommnet(true);
    const authData = JSON.parse(localStorage.getItem("authData"));
    const dataId = (selectedTree + "").split("_")[2];
    await fetch_retry_post(`${VALIDATEFILE}${fileId}/user/${authData.userId}`, {
      objId: modalData?.objId ? modalData.objId : null,
      entityId: dataId,
      status: null,
      comment: comment,
    });
    setComment("");
    const data = await fetch_retry_get(
      `${VALIDATEFILEDETAILS}${fileId}/entity/${dataId}`
    );
    if (data.success) {
      setModalData(data.data);
    }
    setAddCommnet(false);
  };

  const deleteFile = async (fileDetails) => {
    const dataId = (selectedTree + "").split("_")[2];
    const authData = JSON.parse(localStorage.getItem("authData"));

    await fetch_retry_delete(`${DELETEATTACHMENT}`, {data : {
      objId: modalData?.objId ? modalData.objId : null,
      userId: authData?.userId,
      attachmentId: fileDetails?.attachmentId,
    }});

    const data = await fetch_retry_get(
      `${VALIDATEFILEDETAILS}${fileId}/entity/${dataId}`
    );
    if (data.success) {
      setModalData(data.data);
    }
  };

  return (
    <>
      <Row>
        <Col span={6} style={{ backgroundColor: "#0c3246", height: "85vh" }}>
          <Input
            placeholder="Search"
            onKeyUp={(e) => {
              setSearch(e.target.value);
              const filterData = filter(treeDataDefault, e.target.value);
              setTreeData(filterData.length ? filterData : []);
            }}
            style={{ height: "5vh", border: "1px solid #0c3246" }}
          />
          {treeData.length > 0 || search.length > 0 ? (
            <>
              {search == "" ? (
                <>
                  <Tree
                    className="treeCss"
                    defaultExpandedKeys={["defaultExpandedKey"]}
                    style={{
                      color: "#FFF",
                      paddingTop: "2vh",
                      backgroundColor: "#0c3246",
                      height: "80vh",
                      overflowY: "scroll",
                    }}
                    showLine
                    treeData={treeData}
                    onSelect={async (e, i) => {
                      if (i?.node?.title && (e + "").split("_")[2] > 0) {
                        await getData(e,i?.node?.title);
                      }
                    }}
                  />
                </>
              ) : (
                <>
                  <span></span>
                  <Tree
                    className="treeCss"
                    defaultExpandAll={true}
                    defaultExpandParent={true}
                    style={{
                      color: "#FFF",
                      paddingTop: "2vh",
                      backgroundColor: "#0c3246",
                      height: "80vh",
                      overflowY: "scroll",
                    }}
                    showLine
                    treeData={treeData}
                    onSelect={async (e, i) => {
                      if (i?.node?.title && (e + "").split("_")[2] > 0) {
                        await getData(e,i?.node?.title);
                      }
                    }}
                  />
                </>
              )}
            </>
          ) : (
            <center>
              <LoadingOutlined
                style={{ color: "#e74860", fontSize: "4vh", marginTop: "4vh" }}
              />
            </center>
          )}
        </Col>
        <Col
          span={18}
          style={{ height: "85vh", padding: "1vw", overflow: "scroll" }}
        >
          {/* {JSON.stringify(modalData.status)} */}
          {fileTitle ? (
            <Row style={{ padding: "0% 4% 0% 4%" }}>
              <Col span={24}>
                <Row>
                  <Col span={20} style={{ fontSize: "1.4vw" }}>
                    <b style={{ color: "#e74860" }}>{fileTitle}</b>
                  </Col>
                  <Col span={4} style={{ textAlign: "center" }}>
                    <Row style={{ justifyContent: "center" }}>
                      <Col span={24}>
                        <Select
                          onChange={(e) => {
                            changeFileStatus(e);
                          }}
                          placeholder="Status"
                          options={[
                            {
                              value: "notStarted",
                              label: "Not Started",
                            },
                            {
                              value: "passed",
                              label: "Passed",
                            },
                            {
                              value: "failed",
                              label: "Failed",
                            },
                          ]}
                          value={
                            modalData?.status ? modalData?.status : "notStarted"
                          }
                          style={{ width: "100%", textAlign: "left" }}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Divider style={{ marginTop: "2vh", marginBottom: "2vh" }} />
              <Col span={24}>
                <Row>
                  <Col span={12} style={{ fontSize: "large" }}>
                    <b style={{ color: "#0c3246" }}>Attachments</b>
                  </Col>
                  <Col span={12} style={{ textAlign: "end" }}>
                    <a>
                      <Upload
                        {...{
                          showUploadList: false,
                          customRequest: async (options) => {
                            setFileUploading(true);
                            const authData = JSON.parse(
                              localStorage.getItem("authData")
                            );
                            const dataId = (selectedTree + "").split("_")[2];
                            const data = new FormData();
                            data.append("file", options.file);
                            data.append("inputFileId", fileId);
                            data.append("userId", authData.userId);
                            data.append("entityId", dataId);
                            await fetch_retry_post_with_file(
                              `${process.env.BASE_URL}${ADDATTACHMENT}`,
                              data
                            );
                            const result = await fetch_retry_get(
                              `${VALIDATEFILEDETAILS}${fileId}/entity/${dataId}`
                            );
                            if (result.success) {
                              setModalData(result.data);
                            }
                            setFileUploading(false);
                          },
                        }}
                      >
                        <Button className={dataModernizationCss.addAttachment}>
                          <FileAddOutlined /> Add Attachment
                        </Button>
                      </Upload>
                    </a>
                  </Col>
                  <Col span={24} style={{ marginTop: "2%" }}>
                    <Table
                      scroll={{ y: "40vh" }}
                      loading={fileUploading}
                      className={`${"validatePopupTable"}`}
                      pagination={false}
                      dataSource={modalData?.entityAttachments?.sort(
                        (a, b) => b.attachmentId - a.attachmentId
                      )}
                      columns={[
                        {
                          title: "Attached File Name",
                          dataIndex: "fileName",
                          key: "fileName",
                          width: "40vw",
                        },
                        {
                          title: "Date",
                          dataIndex: "createdDateTime",
                          key: "createdDateTime",
                          render: (_, record) => {
                            return (
                              <span>
                                {changeDateFormat(record.createdDateTime)}
                              </span>
                            );
                          },
                        },
                        {
                          title: "Action",
                          dataIndex: "age",
                          key: "age",
                          fixed: "right",

                          render: (_, record) => {
                            return (
                              <>
                                <Space>
                                  <a>
                                    <EyeOutlined /> View
                                  </a>
                                  &nbsp;
                                  <a
                                    onClick={() => {
                                      deleteFile(record);
                                    }}
                                  >
                                    <DeleteOutlined /> Delete
                                  </a>
                                </Space>
                              </>
                            );
                          },
                        },
                      ]}
                    />
                  </Col>
                </Row>
              </Col>
              <Col span={24} style={{ marginTop: "2vh" }}>
                <Row>
                  <Col span={24} style={{ fontSize: "large" }}>
                    <b style={{ color: "#0c3246" }}>Logs</b>
                  </Col>
                  <Col span={24} style={{ marginTop: "2%" }}>
                    <Table
                      scroll={{ y: "40vh" }}
                      className={`${"validatePopupTable"}`}
                      pagination={false}
                      dataSource={modalData?.logs?.reverse()}
                      columns={[
                        {
                          title: "Info",
                          dataIndex: "userName",
                          key: "userName",
                          render: (_, record) => {
                            return createLogs(record);
                          },
                          width: "50vw",
                        },
                        {
                          title: "Date",
                          dataIndex: "createdDateTime",
                          key: "createdDateTime",
                          render: (_, record) => {
                            return (
                              <span>
                                {changeDateFormat(record.createdDateTime)}
                              </span>
                            );
                          },
                        },
                      ]}
                    />
                  </Col>
                </Row>
              </Col>

              <Col span={24} style={{ marginTop: "2%" }}>
                <Row>
                  <Col span={24} style={{ fontSize: "large" }}>
                    <b style={{ color: "#0c3246" }}>Comments</b>
                  </Col>
                  <Col span={24} style={{ marginTop: "2%" }}>
                    <Table
                      scroll={{ y: "40vh" }}
                      className={`${"validatePopupTable"}`}
                      pagination={false}
                      dataSource={modalData?.comments?.reverse()}
                      columns={[
                        {
                          title: "By",
                          dataIndex: "userName",
                          key: "userName",
                          render: (_, record) => {
                            return createLogs(record);
                          },
                        },
                        {
                          title: "comment",
                          dataIndex: "comment",
                          key: "comment",
                        },
                        {
                          title: "Date",
                          dataIndex: "createdDateTime",
                          key: "createdDateTime",
                          render: (_, record) => {
                            return (
                              <span>
                                {changeDateFormat(record.createdDateTime)}
                              </span>
                            );
                          },
                        },
                      ]}
                    />
                    {!addComment && (
                      <Input.TextArea
                        ref={inputRef}
                        style={{ width: "100%", marginTop: "2%" }}
                        rows={4}
                        placeholder={"Comments"}
                        defaultValue={comment}
                        onKeyUp={(e) => {
                          setComment(e.target.value);
                        }}
                      />
                    )}
                    {addComment && (
                      <Input.TextArea
                        ref={inputRef}
                        style={{ width: "100%", marginTop: "2%" }}
                        rows={4}
                        placeholder={"Comments"}
                        defaultValue={comment}
                        onKeyUp={(e) => {
                          setComment(e.target.value);
                        }}
                      />
                    )}
                  </Col>
                  <Col span={24} style={{ marginTop: "2vh" }}>
                    <Button
                      disabled={comment == "" || addComment ? true : false}
                      onClick={async () => {
                        await addCommentAction();
                        setComment("");
                      }}
                      style={{ float: "right" }}
                      type="primary"
                    >
                      Add Comment
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          ) : (
            <div
              style={{
                height: "80vh",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <center>No Record Found</center>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ValidatePopup;
