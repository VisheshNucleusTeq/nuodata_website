import React, { useState } from "react";
import {
  Col,
  Row,
  Space,
  Steps,
  Input,
  Button,
  Card,
  Tooltip,
  Image,
  Modal,
  Radio,
  Divider,
  Select,
  Table,
} from "antd";
import {
  CheckCircleOutlined,
  CheckCircleFilled,
  SearchOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  SqlEditor,
  READ_VALIDATORS,
  copyToClipboard,
  formatSql,
} from "react-sql-editor";
import AddSource from "./model/addSource";
import injectionSourceCss from "../../styles/injectionSource.module.css";

const InjectionPipeline = () => {
  const [displaySql, setDisplaySql] = useState("");
  const [copyTips, setCopyTips] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [accountList, setAccountList] = useState([
    {
      name: "Databricks-Lakehouse",
      image: "/account_and_settings/databricks.svg",
      url: "#",
      isDisable: false,
    },
    {
      name: "Google Cloud Platform",
      image: "/account_and_settings/googlecloud.svg",
      url: "#",
      isDisable: false,
    },
    {
      name: "AWS",
      image: "/account_and_settings/aws.svg",
      url: "#",
      isDisable: false,
    },
    {
      name: "Azure",
      image: "/account_and_settings/azure.svg",
      url: "#",
      isDisable: false,
    },
    {
      name: "Snowflake",
      image: "/account_and_settings/snowflake.svg",
      url: "#",
      isDisable: false,
    },
    {
      name: "IBM Watsonx.data",
      image: "/account_and_settings/ibm.svg",
      url: "#",
      isDisable: false,
    },
  ]);

  return (
    <>
      <Modal
        title={"Add a Source"}
        style={{ zIndex: 999999 }}
        width={"70vw"}
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        destroyOnClose={true}
        footer={null}
      >
        <AddSource injectionSourceCss={injectionSourceCss} />
      </Modal>
      <div className={injectionSourceCss.main}>
        <h1>New Pipeline- Editable Field</h1>
        <Row className={injectionSourceCss.dashedLines}>
          <Col span={24}>
            <Row align={"space-between"}>
              {[
                "Select Source",
                "Transform",
                "Select Target",
                "Configure",
                "Deploy",
              ].map((data, i) => {
                return (
                  <>
                    <Col
                      span={4}
                      style={{
                        border: "1px solid lightGray",
                        height: "6vh",
                        borderRadius: "10px",
                      }}
                    >
                      <Space
                        style={{
                          fontSize: "1.2vw",
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",
                          height: "100%",
                          fontWeight: "bold",
                        }}
                      >
                        <CheckCircleFilled
                          style={{
                            fontSize: "1.5vw",
                            color: i <= 1 ? "green" : "gray",
                          }}
                          twoToneColor="#fff"
                        />
                        {data}
                      </Space>
                    </Col>
                    {[0, 1, 2, 3].includes(i) ? (
                      <Col
                        span={1}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <div
                          style={{ border: "1px dashed gray", width: "100%" }}
                        ></div>
                      </Col>
                    ) : null}
                  </>
                );
              })}
            </Row>
          </Col>
        </Row>

        <Row style={{ marginTop: "4vh", height: "100%" }}>
          <Col span={24}>
            <Card className="demoCard">
              <Row align={"center"}>
                <Col span={24} style={{ height: "3vw" }}>
                  <Space>
                    <Image
                      preview={false}
                      src={"https://placehold.co/150?text=P"}
                      className={injectionSourceCss.iconImage}
                    />
                    <span>Postgres</span>
                  </Space>
                </Col>
                <Divider />
                <Col
                  span={24}
                  style={{
                    height: "3vw",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Radio.Group
                    onChange={(e) => {
                      alert(e);
                    }}
                    value={1}
                  >
                    {/* <Radio value={1}>Both</Radio> */}
                    <Radio value={1}>Source Schema</Radio>
                    <Radio value={2}>
                      Source Schema by query {"(PySpark)"}
                    </Radio>
                  </Radio.Group>
                </Col>

                <Col span={24} style={{ height: "3vw", marginTop: "2vh" }}>
                  <Row>
                    <Col span={11}>
                      <Select
                        className="inputSelectMultiple"
                        mode="multiple"
                        allowClear
                        style={{ width: "100%" }}
                        placeholder="Source Schema"
                        defaultValue={[]}
                        onChange={() => {}}
                        options={[
                          {
                            label: "lable1",
                            value: "value1",
                          },
                          {
                            label: "lable2",
                            value: "value2",
                          },
                          {
                            label: "lable3",
                            value: "value3",
                          },
                        ]}
                      />
                    </Col>
                    <Col span={1} />
                    <Col span={11}>
                      <Select
                        className="inputSelectMultiple"
                        mode="multiple"
                        allowClear
                        style={{ width: "100%" }}
                        placeholder="Source Schema by query (PySpark)"
                        defaultValue={[]}
                        onChange={() => {}}
                        options={[
                          {
                            label: "lable1",
                            value: "value1",
                          },
                          {
                            label: "lable2",
                            value: "value2",
                          },
                          {
                            label: "lable3",
                            value: "value3",
                          },
                        ]}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col span={24} style={{ height: "100%", marginTop: "2vh" }}>
                  <Row>
                    <Col span={24}>
                      <Table
                        className="demo"
                        dataSource={[
                          {
                            key: "1",
                            name: "Mike",
                            age: "String",
                            address: "10 Downing Street",
                          },
                          {
                            key: "2",
                            name: "John",
                            age: "String",
                            address: "10 Downing Street",
                          },
                        ]}
                        columns={[
                          {
                            title: "Column Name",
                            dataIndex: "name",
                            key: "name",
                          },
                          {
                            title: "Data Type",
                            dataIndex: "age",
                            key: "age",
                          },
                          {
                            title: "",
                            dataIndex: "address",
                            key: "address",
                            render: (tags) => (
                              <>
                                <SettingOutlined
                                  style={{ cursor: "pointer" }}
                                />
                              </>
                            ),
                          },
                        ]}
                        pagination={false}
                      />
                    </Col>
                    {/* <Col span={1} /> */}
                    <Col span={24} style={{marginTop : "2vw"}}>
                      <b>Display Row </b> &nbsp;
                      <Radio.Group
                        onChange={(e) => {
                          //   alert(e);
                        }}
                        value={1}
                        style={{ height: "10%" }}
                      >
                        <Radio value={1}>10</Radio>
                        <Radio value={2}>20</Radio>
                      </Radio.Group>
                      <p></p>
                      {/* <Input.TextArea
                        rows={4}
                        placeholder=""
                        // maxLength={6}
                        style={{
                          height: "80%",
                          borderRadius: "10px",
                          backgroundColor: "#0c3246",
                          color: "#FFF",
                        }}
                        value={"SELECT * FROM table WHERE condition"}
                      /> */}
                      <SqlEditor
                        defaultValue={displaySql}
                        title="Sql Editor"
                        width="auto"
                        height="50vh"
                        onChange={(data) => {
                          console.log("onChange", data);
                          setDisplaySql(data.value);
                        }}
                        onClickFormat={() => {
                          formatSql({
                            value: displaySql,
                            callback: (formatData) => {
                              setDisplaySql(formatData.value);
                            },
                          });
                        }}
                        onClickDelete={() => {
                          setDisplaySql("");
                        }}
                        onClickCopy={() => {
                          copyToClipboard({
                            value: displaySql,
                            callback: setCopyTips,
                          });
                        }}
                        validatorConfig={{
                          maxSqlNum: 1000,
                          // validators: READ_VALIDATORS,
                        }}
                        isShowHeader={true}

                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default InjectionPipeline;
