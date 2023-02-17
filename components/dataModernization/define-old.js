import dataModernizationCss from "../../styles/dataModernization.module.css";
import { Button, Row, Col, Form, Input, Select, message, Upload } from "antd";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

import { fetch_retry_post } from "../../network/api-manager";
import { DEFINE, UPLOADFILE } from "../../network/apiConstants";

const Define = () => {
  const [step, setStep] = useState("Define");
  const [isLoading, setLoading] = useState(false);

  const onFinishDefine = async (payload) => {
    setLoading(true);
    const authData = JSON.parse(localStorage.getItem("authData"));

    const data = await fetch_retry_post(DEFINE, {
      orgId: authData.orgId,
      name: payload.name,
      businessUnit: payload.businessUnit,
      sourcePlatform: payload.sourcePlatform,
      sourceLang: "py",
      targetPlatform: payload.targetPlatform,
      targetLang: payload.targetLang,
      createdBy: authData.userId,
    });

    setLoading(false);
    if (data.success) {
      message.success("Successfully Created.");
    } else {
      message.error([data?.error]);
    }
  };

  const onFinishConnect = async (payload) => {
    setLoading(true);
    const data = await fetch_retry_post(UPLOADFILE, payload);
    setLoading(false);
    if (data.success) {
      message.success("Successfully Added.");
    } else {
      message.error([data?.error]);
    }
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

      <div className={dataModernizationCss.defineSteps}>
        <Row align="middle" className={dataModernizationCss.defineStepsRow}>
          {[
            "Define",
            "Connect",
            "Analyze",
            "Design",
            "Transform",
            "Validate",
            "Rollout",
          ].map((data, i) => {
            return (
              <Col
                onClick={() => {
                  setStep(data);
                }}
                xs={12}
                sm={7}
                md={7}
                lg={3}
                xl={3}
                xxl={3}
                className={`${dataModernizationCss.defineStep} ${
                  step == data && dataModernizationCss.defineStepSelect
                }`}
                key={(Math.random() + 1).toString(36).substring(7)}
              >
                {data}
              </Col>
            );
          })}
        </Row>
      </div>

      {step === "Define" && (
        <Row className={dataModernizationCss.defineForm}>
          <Col offset={3} span={18}>
            <Form
              layout="horizontal"
              autoComplete="off"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 18 }}
              onFinish={onFinishDefine}
            >
              <Form.Item
                label={"Select Business Unit"}
                labelAlign={"left"}
                name={"businessUnit"}
                rules={[
                  {
                    required: true,
                    message: "Source File is required.",
                  },
                ]}
              >
                <Select
                  className="inputSelect"
                  showSearch
                  placeholder="Select a source File"
                  optionFilterProp="children"
                  onChange={(e) => {
                    console.log(e);
                  }}
                  onSearch={(e) => {
                    console.log(e);
                  }}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: "Customer Analytics",
                      label: "Customer Analytics",
                    },
                    {
                      value: "Campaign Management",
                      label: "Campaign Management",
                    },
                    { value: "Loyalty", label: "Loyalty" },
                    {
                      value: "Customer Engagement",
                      label: "Customer Engagement",
                    },
                    { value: "Content and Media", label: "Content and Media" },
                    {
                      value: "Customer Data Management",
                      label: "Customer Data Management",
                    },
                    { value: "POS/In-Store", label: "POS/In-Store" },
                    { value: "Ecommerce", label: "Ecommerce" },
                    { value: "Customer Service", label: "Customer Service" },
                    { value: "Reservations", label: "Reservations" },
                    { value: "Payments", label: "Payments" },
                    {
                      value: "Performance Management",
                      label: "Performance Management",
                    },
                    {
                      value: "Product Management",
                      label: "Product Management",
                    },
                    { value: "Pricing", label: "Pricing" },
                    { value: "Promotions", label: "Promotions" },
                    {
                      value: "Planning and Replinishment",
                      label: "Planning and Replinishment",
                    },
                    {
                      value: "Category Management",
                      label: "Category Management",
                    },
                    { value: "Sourcing", label: "Sourcing" },
                    {
                      value: "Warehouse Management",
                      label: "Warehouse Management",
                    },
                    {
                      value: "Transportation Management",
                      label: "Transportation Management",
                    },
                    { value: "Vendor Management", label: "Vendor Management" },
                    {
                      value: "International Trade Management",
                      label: "International Trade Management",
                    },
                    { value: "Store Operations", label: "Store Operations" },
                    {
                      value: "Services Operations",
                      label: "Services Operations",
                    },
                    {
                      value: "Corporate Services",
                      label: "Corporate Services",
                    },
                    { value: "HR", label: "HR" },
                    { value: "Finance", label: "Finance" },
                    { value: "Legal", label: "Legal" },
                    {
                      value: "Real Estate and Facilities",
                      label: "Real Estate and Facilities",
                    },
                    {
                      value: "Business Intelligence",
                      label: "Business Intelligence",
                    },
                    {
                      value: "Business Resilience",
                      label: "Business Resilience",
                    },
                    {
                      value: "Information Management",
                      label: "Information Management",
                    },
                    {
                      value: "Information Management",
                      label: "Information Management",
                    },
                    {
                      value: "Information Manegement",
                      label: "Information Manegement",
                    },
                    {
                      value: "IT Business Administration",
                      label: "IT Business Administration",
                    },
                    {
                      value: "IT Business Strategy",
                      label: "IT Business Strategy",
                    },
                    {
                      value: "IT Customer Relationship",
                      label: "IT Customer Relationship",
                    },
                    { value: "IT Strategy", label: "IT Strategy" },
                    { value: "Pos Execution", label: "Pos Execution" },
                    {
                      value: "Service and Solution Deployment",
                      label: "Service and Solution Deployment",
                    },
                    {
                      value: "Service and Solution Development",
                      label: "Service and Solution Development",
                    },
                    {
                      value: "Service Delivery and Deployment",
                      label: "Service Delivery and Deployment",
                    },
                    {
                      value: "Service Delivery and Support",
                      label: "Service Delivery and Support",
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label={"Project Name"}
                labelAlign={"left"}
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Project name is required.",
                  },
                ]}
              >
                <Input
                  key={"input-project-name"}
                  className={"input"}
                  placeholder={""}
                  name={"name"}
                  type={"text"}
                  disabled={isLoading}
                />
              </Form.Item>

              <Form.Item
                label={"Select Source File(s)"}
                labelAlign={"left"}
                name={"sourcePlatform"}
                rules={[
                  {
                    required: true,
                    message: "Source File is required.",
                  },
                ]}
              >
                <Select
                  className="inputSelect"
                  showSearch
                  placeholder="Select a source File"
                  optionFilterProp="children"
                  onChange={(e) => {
                    console.log(e);
                  }}
                  onSearch={(e) => {
                    console.log(e);
                  }}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: "1",
                      label: "Option 1",
                    },
                    {
                      value: "2",
                      label: "Option 2",
                    },
                    {
                      value: "3",
                      label: "Option 3",
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label={"Select Target Platform"}
                labelAlign={"left"}
                name={"targetPlatform"}
                rules={[
                  {
                    required: true,
                    message: "Target platform is required.",
                  },
                ]}
              >
                <Select
                  className="inputSelect"
                  showSearch
                  placeholder="Select a target platform "
                  optionFilterProp="children"
                  onChange={(e) => {
                    console.log(e);
                  }}
                  onSearch={(e) => {
                    console.log(e);
                  }}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: "1",
                      label: "Option 1",
                    },
                    {
                      value: "2",
                      label: "Option 2",
                    },
                    {
                      value: "3",
                      label: "Option 3",
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label={"Select Target Language"}
                labelAlign={"left"}
                name={"targetLang"}
                rules={[
                  {
                    required: true,
                    message: "Target language is required.",
                  },
                ]}
              >
                <Select
                  className="inputSelect"
                  showSearch
                  placeholder="Select a target language "
                  optionFilterProp="children"
                  onChange={(e) => {
                    console.log(e);
                  }}
                  onSearch={(e) => {
                    console.log(e);
                  }}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: "1",
                      label: "Option 1",
                    },
                    {
                      value: "2",
                      label: "Option 2",
                    },
                    {
                      value: "3",
                      label: "Option 3",
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label={"Select Target File Location"}
                labelAlign={"left"}
                name={"target_file_location"}
                rules={[
                  {
                    required: true,
                    message: "Target file location is required.",
                  },
                ]}
              >
                <Select
                  className="inputSelect"
                  showSearch
                  placeholder="Select target file location "
                  optionFilterProp="children"
                  onChange={(e) => {
                    console.log(e);
                  }}
                  onSearch={(e) => {
                    console.log(e);
                  }}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: "1",
                      label: "Option 1",
                    },
                    {
                      value: "2",
                      label: "Option 2",
                    },
                    {
                      value: "3",
                      label: "Option 3",
                    },
                  ]}
                />
              </Form.Item>

              <div className={dataModernizationCss.nextExitBtn}>
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
              </div>
            </Form>
          </Col>
        </Row>
      )}

      {step === "Connect" && (
        <Row className={dataModernizationCss.defineForm}>
          <Col offset={3} span={18}>
            <Form
              layout="horizontal"
              autoComplete="off"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 18 }}
              onFinish={onFinishDefine}
            >
              <Form.Item
                label={"Upload Source File(s)"}
                labelAlign={"left"}
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Source file is required.",
                  },
                ]}
              >
                <Input
                key={"input-project-name"}
                className={"input"}
                placeholder={""}
                name={"name"}
                type={"file"}
                disabled={isLoading}
              />
              </Form.Item>

              <div className={dataModernizationCss.nextExitBtn}>
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
              </div>
            </Form>
          </Col>
        </Row>
      )}

      {step === "Analyze" && <p>CODE HERE</p>}
    </>
  );
};

export default Define;
