import React from "react";
import testCss from "../styles/test.module.css";
import {
  Col,
  Row,
  Radio,
  Tag,
  Space,
  Button,
  Collapse,
  Divider,
  Input,
  Select,
  Checkbox,
  InputNumber,
  List,
  Badge,
} from "antd";
const Panel = Collapse.Panel;
import {
  DownloadOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import { useState } from "react";
{
  /* <PlusCircleOutlined /> <DeleteOutlined /> */
}
const Test = () => {
  
  const [options, setOptions] = useState([
    {
      option: "",
      value: "",
      selectValue: "",
    },
  ]);

  return (
    <>
      <Row style={{ backgroundColor: "gray" }}>
        <Space direction={"vertical"} style={{ width: "100%" }}>
          <Col span={24}>
            <Row className={testCss.headerView}>
              <Col span={14} className={testCss.headerViewText}>
                Pillar Business_RA_Non Rental
              </Col>
              <Col span={6}>
                <Radio.Group name="radiogroup" defaultValue={1}>
                  <Radio value={1}>Rental</Radio>
                  <Radio value={2}>Non Rental</Radio>
                </Radio.Group>
              </Col>
              <Col span={4}>
                <Space>
                  Total Weightage
                  <Tag color="gray" className={testCss.headerViewTag}>
                    #f50
                  </Tag>
                </Space>
              </Col>
            </Row>
          </Col>

          <Col span={24} style={{ backgroundColor: "#FFF" }}>
            <Row>
              <Col
                span={6}
                style={{
                  border: "1px solid gray",
                  height: "90vh",
                  overflow: "scroll",
                }}
              >
                <Row align={"center"}>
                  <Col span={24} className={testCss.addNewObj}>
                    <Space>
                      ADD NEW OBJECTIVE
                      <Tag color="blue" style={{ borderRadius: "1vw" }}>
                        <PlusCircleOutlined
                          style={{ height: "1vw", width: "1vw" }}
                        />
                      </Tag>
                    </Space>
                  </Col>

                  <Col style={{ borderTop: "2px solid lightGray" }} span={20} />
                  {/* <Divider style={{backgroundColor : "red", width : "10px !important", height : "1px !important"}}/> */}

                  <Col span={24}>
                    <Collapse onChange={() => {}} ghost={true}>
                      {Array(3)
                        .fill(undefined)
                        .map(() => {
                          return (
                            <Panel
                              header="This is panel header 1"
                              key="1"
                              showArrow={false}
                              extra={
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                >
                                  <Space>
                                    <Tag
                                      color="blue"
                                      style={{ borderRadius: "1vw" }}
                                    >
                                      <PlusCircleOutlined
                                        style={{ height: "1vw", width: "1vw" }}
                                      />
                                    </Tag>
                                    <Tag
                                      color="red"
                                      style={{ borderRadius: "1vw" }}
                                    >
                                      <DeleteOutlined
                                        style={{ height: "1vw", width: "1vw" }}
                                      />
                                    </Tag>
                                  </Space>
                                </div>
                              }
                            >
                              <Collapse onChange={() => {}}>
                                {Array(3)
                                  .fill(undefined)
                                  .map(() => {
                                    return (
                                      <Panel
                                        header="This is panel header 1"
                                        key="1"
                                        showArrow={false}
                                        extra={
                                          <div
                                            onClick={(e) => {
                                              e.stopPropagation();
                                            }}
                                          >
                                            <Space>
                                              <Tag
                                                color="blue"
                                                style={{ borderRadius: "1vw" }}
                                              >
                                                <PlusCircleOutlined
                                                  style={{
                                                    height: "1vw",
                                                    width: "1vw",
                                                  }}
                                                />
                                              </Tag>
                                              <Tag
                                                color="red"
                                                style={{ borderRadius: "1vw" }}
                                              >
                                                <DeleteOutlined
                                                  style={{
                                                    height: "1vw",
                                                    width: "1vw",
                                                  }}
                                                />
                                              </Tag>
                                            </Space>
                                          </div>
                                        }
                                      >
                                        <List
                                          className="demo-loadmore-list"
                                          itemLayout="horizontal"
                                          dataSource={[
                                            { name: "demo" },
                                            { name: "demo1" },
                                          ]}
                                          renderItem={(item, i) => (
                                            <List.Item
                                              actions={[
                                                <Tag
                                                  color="red"
                                                  style={{
                                                    borderRadius: "1vw",
                                                  }}
                                                >
                                                  <DeleteOutlined
                                                    style={{
                                                      height: "1vw",
                                                      width: "1vw",
                                                    }}
                                                  />
                                                </Tag>,
                                              ]}
                                            >
                                              <div>
                                                <Badge
                                                  count={i + 1}
                                                  color={"gray"}
                                                />
                                                &nbsp;
                                                <b>{item.name}</b>
                                              </div>
                                            </List.Item>
                                          )}
                                        />
                                        {/* <p>{"text"}</p> */}
                                      </Panel>
                                    );
                                  })}
                              </Collapse>
                            </Panel>
                          );
                        })}
                    </Collapse>
                  </Col>
                </Row>
              </Col>
              <Col
                span={18}
                style={{
                  border: "1px solid gray",
                  height: "90vh",
                  overflow: "scroll",
                }}
              >
                <Row align={"center"}>
                  <Col span={24}>
                    <Row style={{ height: "8vh" }}>
                      <Col
                        span={10}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Space>
                          <b>FINANCIAL MANAGEMENT</b>
                          <Tag color="gray" className={testCss.headerViewTag}>
                            #f50
                          </Tag>
                        </Space>
                      </Col>
                      <Col
                        span={4}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Divider
                          type={"vertical"}
                          style={{
                            backgroundColor: "red",
                            height: "5vh",
                            width: ".1vw",
                          }}
                        />
                      </Col>
                      <Col
                        span={10}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Space>
                          <b>Total Weightage</b>
                          <Tag color="gray" className={testCss.headerViewTag}>
                            #f50
                          </Tag>
                        </Space>
                      </Col>
                    </Row>
                  </Col>
                  <Col style={{ borderTop: "2px solid lightGray" }} span={22} />

                  <Col span={23}>
                    {/* <Space direction="vertical" style={{ width : "100%"}}> */}
                    {Array(2)
                      .fill(undefined)
                      .map(() => {
                        return (
                          <Collapse
                            onChange={() => {}}
                            style={{ marginTop: "1vw" }}
                            expandIcon={({ isActive }) => (
                              <CaretRightOutlined rotate={isActive ? 90 : 0} />
                            )}
                          >
                            <Panel
                              header="This is panel header 1"
                              key="1"
                              // showArrow={false}
                              extra={
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                >
                                  <Space>
                                    <Tag
                                      color="blue"
                                      style={{ borderRadius: "1vw" }}
                                    >
                                      <PlusCircleOutlined
                                        style={{
                                          height: "1vw",
                                          width: "1vw",
                                        }}
                                      />
                                    </Tag>
                                    <Tag
                                      color="red"
                                      style={{ borderRadius: "1vw" }}
                                    >
                                      <DeleteOutlined
                                        style={{
                                          height: "1vw",
                                          width: "1vw",
                                        }}
                                      />
                                    </Tag>
                                  </Space>
                                </div>
                              }
                            >
                              <Row>
                                <Space
                                  direction={"vertical"}
                                  style={{ width: "100%" }}
                                  size={20}
                                >
                                  <Col span={24}>
                                    <Input placeholder="Title" />
                                  </Col>
                                  <Col span={24}>
                                    <Input.TextArea placeholder="Description" />
                                  </Col>
                                  <Col span={24}>
                                    <Row>
                                      <Col span={12}>
                                        <Row
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Col span={4}>
                                            <b>Type</b>
                                          </Col>
                                          <Col span={20}>
                                            <Select
                                              showSearch
                                              style={{
                                                width: "100%",
                                              }}
                                              placeholder="Search to Select"
                                              optionFilterProp="children"
                                              filterOption={(input, option) =>
                                                (option?.label ?? "").includes(
                                                  input
                                                )
                                              }
                                              filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? "")
                                                  .toLowerCase()
                                                  .localeCompare(
                                                    (
                                                      optionB?.label ?? ""
                                                    ).toLowerCase()
                                                  )
                                              }
                                              options={[
                                                {
                                                  value: "1",
                                                  label: "Not Identified",
                                                },
                                                {
                                                  value: "2",
                                                  label: "Closed",
                                                },
                                                {
                                                  value: "3",
                                                  label: "Communicated",
                                                },
                                                {
                                                  value: "4",
                                                  label: "Identified",
                                                },
                                                {
                                                  value: "5",
                                                  label: "Resolved",
                                                },
                                                {
                                                  value: "6",
                                                  label: "Cancelled",
                                                },
                                              ]}
                                            />
                                          </Col>
                                        </Row>
                                      </Col>
                                      <Col
                                        span={12}
                                        style={{
                                          alignItems: "center",
                                          justifyContent: "end",
                                          display: "flex",
                                        }}
                                      >
                                        <Checkbox onChange={() => {}}>
                                          <b>Required/ Mandatory</b>
                                        </Checkbox>
                                      </Col>
                                    </Row>
                                  </Col>

                                  {options.map(() => {
                                    return (
                                      <Col span={24}>
                                        <Row>
                                          <Col span={8}>
                                            <Input placeholder="Option" />
                                          </Col>
                                          <Col
                                            span={4}
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                          >
                                            <InputNumber placeholder="Value" />
                                          </Col>
                                          <Col
                                            span={8}
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                          >
                                            <Select
                                              showSearch
                                              style={{
                                                width: "100%",
                                              }}
                                              placeholder="Search to Select"
                                              optionFilterProp="children"
                                              filterOption={(input, option) =>
                                                (option?.label ?? "").includes(
                                                  input
                                                )
                                              }
                                              filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? "")
                                                  .toLowerCase()
                                                  .localeCompare(
                                                    (
                                                      optionB?.label ?? ""
                                                    ).toLowerCase()
                                                  )
                                              }
                                              options={[
                                                {
                                                  value: "1",
                                                  label: "Not Identified",
                                                },
                                                {
                                                  value: "2",
                                                  label: "Closed",
                                                },
                                                {
                                                  value: "3",
                                                  label: "Communicated",
                                                },
                                                {
                                                  value: "4",
                                                  label: "Identified",
                                                },
                                                {
                                                  value: "5",
                                                  label: "Resolved",
                                                },
                                                {
                                                  value: "6",
                                                  label: "Cancelled",
                                                },
                                              ]}
                                            />
                                          </Col>
                                          <Col
                                            span={4}
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                          >
                                            {options.length > 1 && (
                                              <DeleteOutlined
                                                style={{ fontSize: "1.2vw" }}
                                              />
                                            )}
                                          </Col>
                                        </Row>
                                      </Col>
                                    );
                                  })}

                                  <Col span={24}>
                                    <Button
                                      type="primary"
                                      icon={<PlusCircleOutlined />}
                                      onClick={() => {
                                        setOptions([
                                          ...options,
                                          {
                                            option: "",
                                            value: "",
                                            selectValue: "",
                                          },
                                        ]);
                                      }}
                                      // options, setOptions
                                    >
                                      Add Choice
                                    </Button>
                                  </Col>

                                  <Col span={24}>
                                    <b>Map Indicator</b>
                                  </Col>
                                  <Col span={24}>
                                    <Row>
                                      <Col span={18}>
                                        <Input placeholder="External audit requirements" />
                                      </Col>
                                      <Col span={6}>
                                        <Input placeholder="3.5" />
                                      </Col>
                                    </Row>
                                  </Col>

                                  <Col span={24}>
                                    <Checkbox onChange={() => {}}>
                                      <b>Conditional</b>
                                    </Checkbox>
                                    <br />
                                    Show only if :
                                  </Col>

                                  <Col span={24}>
                                    <Row>
                                      <Col span={14} style={{ padding: "2vh" }}>
                                        <Select
                                          showSearch
                                          style={{
                                            width: "100%",
                                          }}
                                          placeholder="Search to Select"
                                          optionFilterProp="children"
                                          filterOption={(input, option) =>
                                            (option?.label ?? "").includes(
                                              input
                                            )
                                          }
                                          filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? "")
                                              .toLowerCase()
                                              .localeCompare(
                                                (
                                                  optionB?.label ?? ""
                                                ).toLowerCase()
                                              )
                                          }
                                          options={[
                                            {
                                              value: "1",
                                              label: "Not Identified",
                                            },
                                            {
                                              value: "2",
                                              label: "Closed",
                                            },
                                            {
                                              value: "3",
                                              label: "Communicated",
                                            },
                                            {
                                              value: "4",
                                              label: "Identified",
                                            },
                                            {
                                              value: "5",
                                              label: "Resolved",
                                            },
                                            {
                                              value: "6",
                                              label: "Cancelled",
                                            },
                                          ]}
                                        />
                                      </Col>
                                      <Col span={4} style={{ padding: "2vh" }}>
                                        <Select
                                          showSearch
                                          style={{
                                            width: "100%",
                                          }}
                                          placeholder="Search to Select"
                                          optionFilterProp="children"
                                          filterOption={(input, option) =>
                                            (option?.label ?? "").includes(
                                              input
                                            )
                                          }
                                          filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? "")
                                              .toLowerCase()
                                              .localeCompare(
                                                (
                                                  optionB?.label ?? ""
                                                ).toLowerCase()
                                              )
                                          }
                                          options={[
                                            {
                                              value: "1",
                                              label: "Not Identified",
                                            },
                                            {
                                              value: "2",
                                              label: "Closed",
                                            },
                                            {
                                              value: "3",
                                              label: "Communicated",
                                            },
                                            {
                                              value: "4",
                                              label: "Identified",
                                            },
                                            {
                                              value: "5",
                                              label: "Resolved",
                                            },
                                            {
                                              value: "6",
                                              label: "Cancelled",
                                            },
                                          ]}
                                        />
                                      </Col>
                                      <Col span={6} style={{ padding: "2vh" }}>
                                        <Select
                                          showSearch
                                          style={{
                                            width: "100%",
                                          }}
                                          placeholder="Search to Select"
                                          optionFilterProp="children"
                                          filterOption={(input, option) =>
                                            (option?.label ?? "").includes(
                                              input
                                            )
                                          }
                                          filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? "")
                                              .toLowerCase()
                                              .localeCompare(
                                                (
                                                  optionB?.label ?? ""
                                                ).toLowerCase()
                                              )
                                          }
                                          options={[
                                            {
                                              value: "1",
                                              label: "Not Identified",
                                            },
                                            {
                                              value: "2",
                                              label: "Closed",
                                            },
                                            {
                                              value: "3",
                                              label: "Communicated",
                                            },
                                            {
                                              value: "4",
                                              label: "Identified",
                                            },
                                            {
                                              value: "5",
                                              label: "Resolved",
                                            },
                                            {
                                              value: "6",
                                              label: "Cancelled",
                                            },
                                          ]}
                                        />
                                      </Col>
                                    </Row>
                                  </Col>
                                </Space>
                              </Row>
                            </Panel>
                          </Collapse>
                        );
                      })}
                    {/* </Space> */}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Space>
      </Row>
    </>
  );
};

export default Test;
