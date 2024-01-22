import {
  DownOutlined,
  FrownFilled,
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
  FunctionOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Tree } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { fetch_retry_get } from "../../../../network/api-manager";
import { EXPRESSIONFUNTYPES, SPARKFUN } from "../../../../network/apiConstants";

function ConfigureFieldExpression({ ingestionCss, tableData }) {
  const [expression, setExpression] = useState("");
  const [selectedFunction, setSelectedFunction] = useState("");
  const [selectedFields, setSelectedFields] = useState([]);
  const [inputArea, setInputArea] = useState("");
  const [expressionOptions, setExpressionOptions] = useState([]);

  const functionsOptions = [
    {
      value: "sum",
      label: "SUM",
      parameters: ["val1", "val2"],
    },
    {
      value: "avg",
      label: "AVG",
      parameters: ["val1", "val2"],
    },
  ].map((e) => ({
    value: e.value || e,
    label: e.label || e,
    parameters: e.parameters || [],
  }));
  const fieldsOptions = ["Field1", "Field2", "Field3"].map((e) => {
    return {
      value: e,
      label: e,
    };
  });
  const customCols = {
    labelCol: {
      xs: { span: 6 },
      sm: { span: 6 },
      md: { span: 6 },
      lg: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 18 },
      sm: { span: 18 },
      md: { span: 18 },
      lg: { span: 18 },
    },
  };

  const handleBlur = () => {
    const { selectionStart, selectionEnd, value } =
      textAreaRef.current.resizableTextArea.textArea;
  };

  const textAreaRef = useRef(null);
  const handleAddFunction = (functionLabel) => {
    if (textAreaRef.current) {
      const { selectionStart, selectionEnd, value } =
        textAreaRef.current.resizableTextArea.textArea;
      console.log(selectionStart, selectionEnd, value);
      const beforeCursor = value.substring(0, selectionStart);
      const afterCursor = value.substring(selectionEnd);
      const selectedText = value.substring(selectionStart, selectionEnd);
      const newExpression = `${beforeCursor}${functionLabel}${afterCursor}`;
      setInputArea(newExpression);
    }
  };
  const handleCancel = () => {
    // Implement cancel functionality
  };

  const handleSubmit = () => {
    // Implement submit functionality
  };

  const getTypes = async () => {
    const types = await fetch_retry_get(`${EXPRESSIONFUNTYPES}`);
    if (types?.data && types?.data?.elements && types?.data?.elements?.length) {
      const expData = types?.data?.elements.map((e) => {
        return {
          value: e?.key,
          label: e?.key,
        };
      });
      setExpressionOptions(expData);
    }
  };

  useEffect(() => {
    getTypes();
  }, []);

  const getExpressionOptions = async () => {
    if (expression) {
      const types = await fetch_retry_get(`${SPARKFUN}${expression}`);
      if (types?.data && types?.data && types?.data?.length) {
        setSelectedFunction(types?.data);
      }
    }
  };

  useEffect(() => {
    getExpressionOptions();
  }, [expression]);

  return (
    <>
      {/* {JSON.stringify()} */}
      {/* <Tree
          showIcon
          defaultExpandAll
          defaultSelectedKeys={["0-0-0"]}
          switcherIcon={<DownOutlined />}
          treeData={[
            {
              title: "Expression:",
              key: "0-0",
              children: [
                {
                  title: "leaf",
                  key: "0-0-0",
                  icon: <FunctionOutlined />
                }
              ],
            },
          ]}
        /> */}
      <Form layout="horizontal" onFinish={handleSubmit}>
        <Row gutter={[6, 0]} justify="space-evenly">
          <Col span={8}>
            <Form.Item
              label="Expression"
              labelAlign="left"
              {...customCols}
              className={ingestionCss.antFormItem}
            >
              <Select
                style={{ borderRadius: "5px" }}
                value={expression}
                onChange={(value) => setExpression(value)}
                className={ingestionCss.inputSelect}
                placeholder="Not parameterized"
                options={expressionOptions}
              />
            </Form.Item>
            <Form.Item
              label="Function"
              labelAlign="left"
              {...customCols}
              className={ingestionCss.antFormItem}
            >
              <Select
                value={[]}
                onChange={(e) => handleAddFunction(e)}
                mode="multiple"
                style={{ borderRadius: "5px" }}
                placeholder={"Select Functions"}
              >
                {selectedFunction &&
                  selectedFunction.length &&
                  selectedFunction.map((e) => {
                    return (
                      <Select.Option value={e.syntax}>
                        {e?.signature}
                      </Select.Option>
                    );
                  })}{" "}
              </Select>
            </Form.Item>
            <Form.Item
              label="Fields"
              labelAlign="left"
              {...customCols}
              className={ingestionCss.antFormItem}
            >
              <Select
                value={[]}
                onChange={(e) => handleAddFunction(e)}
                mode="multiple"
                style={{ borderRadius: "5px" }}
                placeholder={"Select fields"}
              >
                {tableData?.fields &&
                  tableData?.fields.length &&
                  tableData?.fields.map((e) => {
                    return (
                      <Select.Option value={e.name}>{e?.name}</Select.Option>
                    );
                  })}{" "}
              </Select>

            </Form.Item>
          </Col>
          <Col span={15}>
            <Form.Item
              style={{
                borderRadius: "5px 0px 0px 5px",
              }}
            >
              <div
                style={{
                  background: "rgba(231, 235, 237, 0.30)",
                  display: "flex",
                  alignItems: "center",
                  height: "48px",
                }}
              >
                <h4
                  style={{
                    flex: 1,
                    marginLeft: "2%",
                    color: "#313131",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                    fontSize: "12px",
                  }}
                >
                  Expression:
                </h4>
                <Button
                  type="primary"
                  className={ingestionCss.validateBtn}
                  onClick={() => {}}
                  style={{
                    borderRadius: "100px",
                    background: "var(--Secondary, #0C3246)",
                  }}
                >
                  Validate
                </Button>
              </div>
              <Input.TextArea
                ref={textAreaRef}
                key={"input-description"}
                className={ingestionCss.textArea}
                rows={10}
                value={inputArea}
                onChange={(e) => setInputArea(e.target.value)}
                placeholder={""}
                name={"descr"}
                type={"text"}
                onBlur={handleBlur}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row align={"end"}>
          <Col className={ingestionCss.expBtnGrp}>
            <Button
              type="primary"
              className={`${ingestionCss.expCancelBtn} ${ingestionCss.draftBtn} `}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              className={`${ingestionCss.expSubmitBtn} ${ingestionCss.saveBtn} `}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
export default ConfigureFieldExpression;
