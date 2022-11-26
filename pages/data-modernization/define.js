import React, { useState } from "react";
import { Tabs, Button, Form } from "antd";
const { TabPane } = Tabs;
import Input from "../../components/common/Input";

import dataModernizationCss from "../../styles/dataModernization.module.css";
const Define = () => {

const [defineData, setDefineData] = useState(null)

  const onFinish = (values) => {
    console.log("Success:", values);
    setDefineData(values)
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
        <TabPane tab="Test A" key="define">
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
                rules={[{ required: true, message: "Please input Target Platform." }]}
              />
              <Input
                lable="Select Target Language"
                placeholder="Select Target Language"
                name="target_language"
                rules={[{ required: true, message: "Please input Target Language." }]}
              />
              <Input
                lable="Select Target File Location"
                placeholder="Select Target File Location"
                name="target_file_location"
                rules={[{ required: true, message: "Please input Target File Location." }]}
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
        <TabPane tab="Test B" key="connect">
          b
        </TabPane>
        <TabPane tab="Test A" key="analyze">
          a
        </TabPane>
        <TabPane tab="Test B" key="design">
          b
        </TabPane>
        <TabPane tab="Test A" key="transform">
          a
        </TabPane>
        <TabPane tab="Test B" key="validate">
          b
        </TabPane>
        <TabPane tab="Test A" key="rollout">
          a
        </TabPane>
      </Tabs>
    </>
  );
};

export default Define;
