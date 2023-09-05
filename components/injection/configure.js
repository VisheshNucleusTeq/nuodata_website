import { Card, Form, Input, Button, Select, Switch, Row, Col } from "antd";
import React from "react";
const options = [];

const Configure = () => {
  const [form] = Form.useForm();

  return (
    <div style={{ marginTop: "2vw" }}>
      <Card className="demoCard">
        <Form
          form={form}
          layout="vertical"
          initialValues={{}}
          //   requiredMark={requiredMark}
        >
          <Form.Item
            label="Application Name"
            required
            tooltip="This is a required field"
          >
            <Input placeholder="input placeholder" />
          </Form.Item>

          <Form.Item
            label="Desscription"
            tooltip={{ title: "Tooltip with customize icon" }}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>

          <Form.Item
            label="Tags"
            tooltip={{ title: "Tooltip with customize icon" }}
          >
            {/* <Input placeholder="input placeholder" /> */}
            <Select
              mode="tags"
              size={"middle"}
              placeholder="Please select"
              defaultValue={[]}
              onChange={() => {}}
              style={{ width: "100%" }}
            //   options={options}
            />
          </Form.Item>
          <h2>Configure an ingestion Schema</h2>

          <Form.Item
            label="Run on a schedule (Recommended)"
            tooltip={{ title: "Tooltip with customize icon" }}
          >
            <Switch defaultChecked onChange={() => {}} />{" "}
          </Form.Item>

          <Form.Item
            label="Schedule"
            required
            tooltip="This is a required field"
          >
            <Row>
              <Col span={4}>
                <Select
                  defaultValue="lucy"
                  style={{ width: "100%" }}
                  onChange={() => {}}
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "yiminghe" },
                    { value: "disabled", label: "Disabled", disabled: true },
                  ]}
                />
              </Col>
              <Col span={1} />
              <Col span={4}>
                <Select
                  defaultValue="lucy"
                  style={{ width: "100%" }}
                  onChange={() => {}}
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "yiminghe" },
                    { value: "disabled", label: "Disabled", disabled: true },
                  ]}
                />
              </Col>
              <Col span={1} />

              <Col span={4}>
                <Select
                  defaultValue="lucy"
                  style={{ width: "100%" }}
                  onChange={() => {}}
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "yiminghe" },
                    { value: "disabled", label: "Disabled", disabled: true },
                  ]}
                />
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            label="Time Zone (Choose a time Zone for the schedule)"
            tooltip={{ title: "Tooltip with customize icon" }}
          >
            {/* <Input placeholder="input placeholder" /> */}
            <Select
              placeholder="Please select"
              onChange={() => {}}
              style={{ width: "100%" }}
              options={options}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Configure;
