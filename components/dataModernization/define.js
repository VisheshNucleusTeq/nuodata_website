import { Button, Row, Col, Form, Input, Select, message } from "antd";
import { useState } from "react";
import { fetch_retry_post } from "../../network/api-manager";
import { BUSINESSUNITLIST } from "../../network/default-data";
import { DEFINE } from "../../network/apiConstants";

const Define = ({ dataModernizationCss, changeStep, setProject }) => {
  const [isLoading, setLoading] = useState(false);

  const onFinishDefine = async (payload) => {
    setLoading(true);
    const authData = JSON.parse(localStorage.getItem("authData"));
    console.log("herere");
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
      setProject(data);
      changeStep("Connect");
      message.success("Successfully Created.");
    } else {
      message.error([data?.error]);
    }
  };

  return (
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
            <Select
              className="inputSelect"
              showSearch
              placeholder="Select a Business unit"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[...BUSINESSUNITLIST]}
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
              name={"name"}
              type={"text"}
              disabled={isLoading}
              placeholder={"Project Name"}
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
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "databricks",
                  label: "Data Bricks",
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
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "informatica",
                  label: "Informatica",
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
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "xml",
                  label: "XML",
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
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "Location",
                  label: "Location",
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
  );
};

export default Define;
