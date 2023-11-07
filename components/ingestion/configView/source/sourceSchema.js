import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Space,
  Image,
  Select,
  Form,
  Input,
  Radio,
  Button,
} from "antd";

import { fetch_retry_get } from "../../../../network/api-manager";
import { GETCONNECTIONDETAIL } from "../../../../network/apiConstants";

const SourceSchema = ({
  connectionId,
  connection,
  workspace,
  ingestionCss,
  setActiveKey,
  setTableData
}) => {
  const [form] = Form.useForm();
  const [schemas, setSchemas] = useState([]);

  const getSchema = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const schemaData = await fetch_retry_get(
      `${GETCONNECTIONDETAIL}${connectionId}/schemas?org_id=${authData?.orgId}&workspace_id=${workspace}&type=${connection?.type}`
    );
    setSchemas(schemaData?.data?.schemas);
  };

  const getTableData = async (data) =>{
    const authData = JSON.parse(localStorage.getItem("authData"));
    const tableData = await fetch_retry_get(
      `${GETCONNECTIONDETAIL}schema/${data?.table}?org_id=${authData?.orgId}&workspace_id=${workspace}&connection_id=${connectionId}&type=${connection?.type}&rows=${data?.rows}`
    );
    setActiveKey('fields_tab')
    setTableData(tableData?.data)
  }

  useEffect(() => {
    getSchema();
  }, []);

  return (
    <Row>
      <Col span={24} className={ingestionCss.addSourceImage}>
        <Space size={20}>
          <Image src={connection.logo_url} />
          <span>{connection.title}</span>
        </Space>
      </Col>

      <Col span={24} style={{ marginTop: "5vh" }}>
        <Form
          form={form}
          layout="vertical" //horizontal , vertical
          autoComplete="on"
          onFinish={(e) => {
            getTableData(e)
          }}
        >
          <Row>
            <Col span={12}>
              <Form.Item
                label={"Select Source Schema"}
                labelAlign={"left"}
                name={"table"}
                rules={[
                  {
                    required: true,
                    message: "Desciption is required.",
                  },
                ]}
              >
                <Select
                  showSearch
                  name="table"
                  className="inputSelect"
                  placeholder="Select a table"
                  optionFilterProp="children"
                  options={[
                    ...schemas.map((e) => {
                      return {
                        value: e,
                        label: e,
                      };
                    }),
                  ]}
                  style={{ width: "100%" }}
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={10}>
              <Form.Item
                label={"Select Source Schema"}
                labelAlign={"left"}
                name={"rows"}
                rules={[
                  {
                    required: true,
                    message: "Desciption is required.",
                  },
                ]}
              >
                <Radio.Group name={"rows"}>
                  <Radio value={10}>10</Radio>
                  <Radio value={20}>20</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col span={24} >
              <Button
                shape="round"
                htmlType="submit"
                style={{ backgroundColor: "#e74860", color: "#FFF", float : "right" }}
                onClick={() => {
                }}
              >
                Save Source Selection
              </Button>
            </Col>
          </Row>
        </Form>
        {/* <Row>
          <Col span={12}>
            <Select
              className="inputSelect"
              showSearch
              placeholder="Select a table"
              optionFilterProp="children"
              options={[
                ...schemas.map((e) => {
                  return {
                    value: e,
                    label: e,
                  };
                }),
              ]}
              style={{ width: "100%" }}
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
            />
          </Col>
          <Col span={12}>
          <Radio.Group onChange={onChange} value={value}>
      <Radio value={1}>10</Radio>
      <Radio value={2}>B</Radio>
      
    </Radio.Group>
          </Col>
        </Row> */}
      </Col>
    </Row>
  );
};

export default SourceSchema;
