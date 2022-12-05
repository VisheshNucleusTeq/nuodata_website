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
    const data = await fetch_retry_post(DEFINE, payload);
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
                    message: "Business unit is required.",
                  },
                ]}
              >
                <Input
                  key={"input-business-unit"}
                  className={"input"}
                  placeholder={""}
                  name={"businessUnit"}
                  type={"text"}
                  disabled={isLoading}
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
              onFinish={onFinishConnect}
            >
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                maxCount={3}
                multiple
              >
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>

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
    </>
  );
};

export default Define;

// import React, { useState } from "react";
// import { Tabs, Button, Form, Row, Col } from "antd";
// const { TabPane } = Tabs;
// import Input from "../../components/common/Input";

// import dataModernizationCss from "../../styles/dataModernization.module.css";

// import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

// const Define = () => {
//   const [defineData, setDefineData] = useState(null);
//   const [pathOrFile, setPathOrFile] = useState([
//     { kay: (Math.random() + 1).toString(36).substring(7), value: "" },
//   ]);
//   const onFinish = (values) => {
//     console.log("Success:", values);
//     setDefineData(values);
//   };
//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   return (
//     <>
//       <Button
//         type="primary"
//         danger
//         className={dataModernizationCss.newProjectBtn}
//       >
//         New Project +
//       </Button>
//       <Tabs className="defineTabs">
//         <TabPane tab="Define" key="define">
//           <div className={dataModernizationCss.formCenter}>
//             <Form
//               style={{ width: "75%" }}
//               layout="horizontal"
//               name="basic"
//               labelCol={{ span: 6 }}
//               wrapperCol={{ span: 16 }}
//               initialValues={{ remember: true }}
//               className="defineForm"
//               onFinish={onFinish}
//               onFinishFailed={onFinishFailed}
//               autoComplete="off"
//             >
//               <Input
//                 lable="Select Business Unit"
//                 placeholder="Select Business Unit"
//                 name="business_unit"
//                 rules={[
//                   { required: true, message: "Please input Business Unit." },
//                 ]}
//               />
//               <Input
//                 lable="Project Name"
//                 placeholder="Project Name"
//                 name="project_name"
//                 rules={[
//                   { required: true, message: "Please input Project Name." },
//                 ]}
//               />
//               <Input
//                 lable="Select Source File(s)"
//                 placeholder="Select Source File(s)"
//                 name="file"
//                 rules={[{ required: true, message: "Please input file." }]}
//               />
//               <Input
//                 lable="Select Target Platform"
//                 placeholder="Select Target Platform"
//                 name="target_platform"
//                 rules={[
//                   { required: true, message: "Please input Target Platform." },
//                 ]}
//               />
//               <Input
//                 lable="Select Target Language"
//                 placeholder="Select Target Language"
//                 name="target_language"
//                 rules={[
//                   { required: true, message: "Please input Target Language." },
//                 ]}
//               />
//               <Input
//                 lable="Select Target File Location"
//                 placeholder="Select Target File Location"
//                 name="target_file_location"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input Target File Location.",
//                   },
//                 ]}
//               />

//               <p>{defineData ? JSON.stringify(defineData) : ""}</p>

//               <Button
//                 type="primary"
//                 danger
//                 className={dataModernizationCss.nextBtn}
//                 htmlType="submit"
//               >
//                 Next
//               </Button>

//               <Button
//                 type="primary"
//                 danger
//                 className={dataModernizationCss.exitBtn}
//               >
//                 Exit
//               </Button>
//             </Form>
//           </div>
//         </TabPane>
//         <TabPane tab="Connect" key="connect">
//           Connect
//           <div className={dataModernizationCss.formCenter}>
//             <Form
//               style={{ width: "75%" }}
//               layout="horizontal"
//               name="basic"
//               labelCol={{ span: 6 }}
//               wrapperCol={{ span: 16 }}
//               initialValues={{ remember: true }}
//               className="defineForm"
//               onFinish={onFinish}
//               onFinishFailed={onFinishFailed}
//               autoComplete="off"
//             >
//               {pathOrFile.map((data, index) => {
//                 return (
//                   <Row>
//                     <Col span={22} className={dataModernizationCss.inputCenter}>
//                       <Input
//                         lable="Upload Source File(s)"
//                         placeholder="Select a path or local file"
//                         name={"path_or_file[" + index + "]"}
//                         rules={[
//                           {
//                             required: true,
//                             message: "Please select a path or local file.",
//                           },
//                         ]}
//                       />
//                     </Col>
//                     <Col
//                       span={2}
//                       className={dataModernizationCss.inputCenterPlusBtn}
//                     >
//                       <PlusOutlined
//                         onClick={() => {
//                           setPathOrFile([
//                             ...pathOrFile,
//                             { kay: (Math.random() + 1).toString(36).substring(7), value: "" },
//                           ]);
//                         }}
//                       />
//                       &nbsp; &nbsp;
//                       {pathOrFile.length != 1 && (
//                         <MinusOutlined
//                           onClick={() => {
//                             const array = JSON.parse(
//                               JSON.stringify(pathOrFile)
//                             );
//                             const index = array.indexOf(data);
//                             if (index > -1) {
//                               array.splice(index, 1); // 2nd parameter means remove one item only
//                             }
//                             setPathOrFile(array);
//                           }}
//                         />
//                       )}
//                     </Col>
//                   </Row>
//                 );
//               })}
//               <p>{defineData ? JSON.stringify(defineData) : ""}</p>

//               <Button
//                 type="primary"
//                 danger
//                 className={dataModernizationCss.nextBtn}
//                 htmlType="submit"
//               >
//                 Next
//               </Button>

//               <Button
//                 type="primary"
//                 danger
//                 className={dataModernizationCss.exitBtn}
//               >
//                 Exit
//               </Button>
//             </Form>
//           </div>
//         </TabPane>
//         <TabPane tab="Analyze" key="analyze">
//           Analyze
//         </TabPane>
//         <TabPane tab="Design" key="design">
//           Design
//         </TabPane>
//         <TabPane tab="Transform" key="transform">
//           Transform
//         </TabPane>
//         <TabPane tab="Validate" key="validate">
//           Validate
//         </TabPane>
//         <TabPane tab="Rollout" key="rollout">
//           Rollout
//         </TabPane>
//       </Tabs>
//     </>
//   );
// };

// export default Define;
