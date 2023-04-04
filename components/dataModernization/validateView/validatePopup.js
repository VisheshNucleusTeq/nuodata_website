import React from "react";
import { Row, Col, Table, Select, Space, Input, Tree, Modal } from "antd";
import {
  FileAddOutlined,
  EyeOutlined,
  SyncOutlined,
  LoadingOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { fetch_retry_get } from "../../../network/api-manager";
import {
  JSONSTRUCTURE,
  DESIGN,
  DOWNLOADZIP,
} from "../../../network/apiConstants";

const ValidatePopup = ({ fileId }) => {
  const [treeData, setTreeData] = useState([]);
  const [childData, setChildData] = useState([]);
  const [treeDataDefault, setTreeDataDefault] = useState(treeData);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <>
      <Modal
        // cancelText={"Close"}
        okText={"Add comment"}
        title="Comments"
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>

        <Input.TextArea
          style={{ width: "100%" }}
          rows={4}
          placeholder={"Comments"}
        />
      </Modal>

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
                    onSelect={(e, i) => {
                      if (i?.node?.children) {
                        setChildData([]);
                      } else {
                        const element = document.querySelector(
                          `[data-row-key="${e[0]}"]`
                        );
                        console.log(element);
                        if (element) {
                          element.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                            inline: "center",
                          });
                          element.animate(
                            { backgroundColor: "rgb(12, 50, 70, .9)" },
                            5000
                          );
                          element.animate({ backgroundColor: "#FFF" }, 5000);
                        }
                      }
                      if (
                        i?.node?.children &&
                        i?.node?.children.length &&
                        !i?.node?.children[0].children
                      ) {
                        setChildData(i?.node?.children);
                      }
                    }}
                    treeData={treeData}
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
                    onSelect={(e, i) => {
                      if (i?.node?.children) {
                        setChildData([]);
                      }
                      if (
                        i?.node?.children &&
                        i?.node?.children.length &&
                        !i?.node?.children[0].children
                      ) {
                        setChildData(i?.node?.children);
                      }
                    }}
                    treeData={treeData}
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

        <Col span={18} style={{ height: "85vh", padding: "1vw" }}>
          <Table
            // onRow={(record, rowIndex) => ({
            //   id: rowIndex.key,
            // })}
            showHeader={false}
            pagination={false}
            columns={[
              {
                title: "File",
                dataIndex: "file",
                key: "file",
                render: (_, record) => {
                  return (
                    <b
                      onClick={() => {
                        console.log(record);
                      }}
                      style={{ cursor: "pointer", color: "#e74860" }}
                    >
                      {record.title}
                    </b>
                  );
                },
              },
              {
                title: "Select",
                dataIndex: "select",
                key: "select",
                render: (value, row, index) => {
                  return (
                    <Select
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
                      style={{ width: "100%" }}
                    />
                  );
                },
              },
              // {
              //   title: "Input",
              //   dataIndex: "input",
              //   key: "input",
              //   render: (value, row, index) => {
              //     return (
              //       <Input.TextArea
              //         style={{ width: "100%" }}
              //         rows={1}
              //         placeholder={"Comments"}
              //       />
              //     );
              //   },
              // },
              {
                title: "Action",
                dataIndex: "action",
                key: "action",
                render: (value, row, index) => {
                  return (
                    <Space id={row.key + "_id"}>
                      <a
                        onClick={() => {
                          setIsModalOpen(true);
                        }}
                      >
                        <CommentOutlined style={{ fontSize: "2.5vh" }} />
                      </a>
                      <a>
                        <FileAddOutlined style={{ fontSize: "2.5vh" }} />
                      </a>
                      <a>
                        <EyeOutlined style={{ fontSize: "2.5vh" }} />
                      </a>
                      <a>
                        <SyncOutlined style={{ fontSize: "2.5vh" }} />
                      </a>
                    </Space>
                  );
                },
              },
            ]}
            dataSource={childData}
            style={{ height: "83vh", overflow: "scroll" }}
          />
        </Col>
      </Row>
    </>
  );
};

export default ValidatePopup;
