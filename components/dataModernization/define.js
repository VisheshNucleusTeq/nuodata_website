import { Button, Row, Col, Form, Input, Select, message } from "antd";
import { useState } from "react";
import { fetch_retry_post } from "../../network/api-manager";
import { BUSINESSUNITLIST } from "../../network/default-data";
import { DEFINE } from "../../network/apiConstants";

import { useDispatch, useSelector } from "react-redux";
import { SetProjectDetailsAction } from "../../Redux/action";


const Define = ({ dataModernizationCss, changeStep }) => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);

  const onFinishDefine = async (payload) => {
    setLoading(true);
    const authData = JSON.parse(localStorage.getItem("authData"));
    const data = await fetch_retry_post(DEFINE, {
      orgId: authData.orgId,
      createdBy: authData.userId,

      name: payload.name,
      businessUnit: payload.businessUnit,

      sourcePlatform: payload.sourcePlatform,
      sourceLang:payload.sourceLang,
      targetPlatform: payload.targetPlatform,
      targetLang: payload.targetLang,
    });

    setLoading(false);
    if (data.success) {
      dispatch(SetProjectDetailsAction(data.data));
      changeStep("Connect");
    } else {
      message.error([data?.error]);
    }
  };
  
  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );

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
              defaultValue={(projectDetails && projectDetails.businessUnit) ? projectDetails.businessUnit : ""}
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
              defaultValue={(projectDetails && projectDetails.name) ? projectDetails.name : ""}
            />
          </Form.Item>

          <Form.Item
            label={"Source Platform"}
            labelAlign={"left"}
            name={"sourcePlatform"}
            rules={[
              {
                required: true,
                message: "Source platform is required.",
              },
            ]}
          >
            <Select
              className="inputSelect"
              showSearch
              placeholder="Select source platform"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              defaultValue={(projectDetails && projectDetails.sourcePlatform) ? projectDetails.sourcePlatform : ""}
              options={[
                {
                  value: "databricks",
                  label: "Data Bricks",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label={"Source Language"}
            labelAlign={"left"}
            name={"sourceLang"}
            rules={[
              {
                required: true,
                message: "Source language is required.",
              },
            ]}
          >
            <Select
              className="inputSelect"
              showSearch
              placeholder="Select source language"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              defaultValue={(projectDetails && projectDetails.sourceLang) ? projectDetails.sourceLang : ""}
              options={[
                {
                  value: "databricks",
                  label: "Data Bricks",
                },
              ]}
            />
          </Form.Item>


          <Form.Item
            label={"Target Platform"}
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
              placeholder="Select target platform"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              defaultValue={(projectDetails && projectDetails.targetPlatform) ? projectDetails.targetPlatform : ""}
              options={[
                {
                  value: "databricks",
                  label: "Data Bricks",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label={"Target Language"}
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
              placeholder="Select target language"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              defaultValue={(projectDetails && projectDetails.targetLang) ? projectDetails.targetLang : ""}
              options={[
                {
                  value: "databricks",
                  label: "Data Bricks",
                },
              ]}
            />
          </Form.Item>

          {/* <Form.Item
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
          </Form.Item> */}

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
