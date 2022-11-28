import React, { useState } from "react";
import { Tabs, Button, Form, Row, Col } from "antd";
const { TabPane } = Tabs;
import Input from "../../components/common/Input";

import dataModernizationCss from "../../styles/dataModernization.module.css";

import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const Define = () => {
  const [defineData, setDefineData] = useState(null);
  const [pathOrFile, setPathOrFile] = useState([
    { kay: (Math.random() + 1).toString(36).substring(7), value: "" },
  ]);
  const onFinish = (values) => {
    console.log("Success:", values);
    setDefineData(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Button
        type="primary"
        danger
        className={dataModernizationCss.newProjectBtn}
      >
        New Project +
      </Button>
      <Tabs className="defineTabs">
        <TabPane tab="Define" key="define">
          <div className={dataModernizationCss.formCenter}>
            <Form
              style={{ width: "75%" }}
              layout="horizontal"
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              className="defineForm"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Input
                lable="Select Business Unit"
                placeholder="Select Business Unit"
                name="business_unit"
                rules={[
                  { required: true, message: "Please input Business Unit." },
                ]}
              />
              <Input
                lable="Project Name"
                placeholder="Project Name"
                name="project_name"
                rules={[
                  { required: true, message: "Please input Project Name." },
                ]}
              />
              <Input
                lable="Select Source File(s)"
                placeholder="Select Source File(s)"
                name="file"
                rules={[{ required: true, message: "Please input file." }]}
              />
              <Input
                lable="Select Target Platform"
                placeholder="Select Target Platform"
                name="target_platform"
                rules={[
                  { required: true, message: "Please input Target Platform." },
                ]}
              />
              <Input
                lable="Select Target Language"
                placeholder="Select Target Language"
                name="target_language"
                rules={[
                  { required: true, message: "Please input Target Language." },
                ]}
              />
              <Input
                lable="Select Target File Location"
                placeholder="Select Target File Location"
                name="target_file_location"
                rules={[
                  {
                    required: true,
                    message: "Please input Target File Location.",
                  },
                ]}
              />

              <p>{defineData ? JSON.stringify(defineData) : ""}</p>

              <Button
                type="primary"
                danger
                className={dataModernizationCss.nextBtn}
                htmlType="submit"
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
            </Form>
          </div>
        </TabPane>
        <TabPane tab="Connect" key="connect">
          Connect
          <div className={dataModernizationCss.formCenter}>
            <Form
              style={{ width: "75%" }}
              layout="horizontal"
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              className="defineForm"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              {pathOrFile.map((data, index) => {
                return (
                  <Row>
                    <Col span={22} className={dataModernizationCss.inputCenter}>
                      <Input
                        lable="Upload Source File(s)"
                        placeholder="Select a path or local file"
                        name={"path_or_file[" + index + "]"}
                        rules={[
                          {
                            required: true,
                            message: "Please select a path or local file.",
                          },
                        ]}
                      />
                    </Col>
                    <Col
                      span={2}
                      className={dataModernizationCss.inputCenterPlusBtn}
                    >
                      <PlusOutlined
                        onClick={() => {
                          setPathOrFile([
                            ...pathOrFile,
                            { kay: (Math.random() + 1).toString(36).substring(7), value: "" },
                          ]);
                        }}
                      />
                      &nbsp; &nbsp;
                      {pathOrFile.length != 1 && (
                        <MinusOutlined
                          onClick={() => {
                            const array = JSON.parse(
                              JSON.stringify(pathOrFile)
                            );
                            const index = array.indexOf(data);
                            if (index > -1) {
                              array.splice(index, 1); // 2nd parameter means remove one item only
                            }
                            setPathOrFile(array);
                          }}
                        />
                      )}
                    </Col>
                  </Row>
                );
              })}
              <p>{defineData ? JSON.stringify(defineData) : ""}</p>

              <Button
                type="primary"
                danger
                className={dataModernizationCss.nextBtn}
                htmlType="submit"
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
            </Form>
          </div>
        </TabPane>
        <TabPane tab="Analyze" key="analyze">
          Analyze
        </TabPane>
        <TabPane tab="Design" key="design">
          Design
        </TabPane>
        <TabPane tab="Transform" key="transform">
          Transform
        </TabPane>
        <TabPane tab="Validate" key="validate">
          Validate
        </TabPane>
        <TabPane tab="Rollout" key="rollout">
          Rollout
        </TabPane>
      </Tabs>
    </>
  );
};

export default Define;
