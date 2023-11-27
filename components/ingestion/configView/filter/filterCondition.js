import { Row, Col, Space, Select, Input, Button } from "antd";
import React from "react";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";

const FilterCondition = ({ nodeId }) => {

  

  return (
    <div>
      <Row justify={"center"}>
        <Col span={22}>
          <Space style={{ display: "flex", alignItems: "center" }}>
            <span>
              <b>Filter Type</b>
            </span>
            <Select
              name={"filterType"}
              className="inputSelect"
              placeholder="Filter Type"
              optionFilterProp="children"
              initialvalues={"SIMPLE"}
              options={[
                {
                  value: "SIMPLE",
                  label: "Simple",
                },
                {
                  value: "ADVANCE",
                  label: "Advance",
                },
              ]}
            />
          </Space>
        </Col>
        <br />
        <br />

        <Col span={22}>
          <Row>
            <Col span={12}>
              <b>Filter Conditions</b>
            </Col>
            <Col span={12}>
              <Button
                style={{ float: "right" }}
                type="primary"
                icon={<PlusCircleOutlined />}
              />
            </Col>
          </Row>
        </Col>

        <br />
        <br />

        <Col span={22}>
          <Row>
            <Col span={7}>
              <Select
                style={{ width: "100%" }}
                name={"filterType"}
                className="inputSelect"
                placeholder="Filter Type"
                optionFilterProp="children"
                initialvalues={"SIMPLE"}
                options={[
                  {
                    value: "SIMPLE",
                    label: "Simple",
                  },
                  {
                    value: "ADVANCE",
                    label: "Advance",
                  },
                ]}
              />
            </Col>
            <Col span={7}>
              <Select
                style={{ width: "100%" }}
                name={"filterType"}
                className="inputSelect"
                placeholder="Filter Type"
                optionFilterProp="children"
                initialvalues={"SIMPLE"}
                options={[
                  {
                    value: "SIMPLE",
                    label: "Simple",
                  },
                  {
                    value: "ADVANCE",
                    label: "Advance",
                  },
                ]}
              />
            </Col>
            <Col span={7}>
              <Input style={{ width: "100%" }} className="input" />
            </Col>
            <Col span={3}>
            <Button
                style={{ float: "right" }}
                type="primary"
                icon={<DeleteOutlined />}
                danger
              />
              {/* <DeleteOutlined /> */}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default FilterCondition;
