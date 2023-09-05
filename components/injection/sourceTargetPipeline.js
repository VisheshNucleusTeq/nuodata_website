import { Col, Row, Card, Image, Input, Table, Button } from "antd";
import React from "react";

const SourceTargetPipeline = ({ injectionPipelineCss }) => {
  return (
    <>
      <div style={{ marginTop: "2vw" }}>
        <Card className="demoCard">
          <Row>
            <Col
              span={12}
              style={{ justifyContent: "center", display: "flex" }}
            >
              <h2>
                <b>Postgres</b>
              </h2>
            </Col>
            <Col
              span={12}
              style={{ justifyContent: "center", display: "flex" }}
            >
              <h2>
                <b>
                  PostgresS3 (Target Schema)
                  <span>
                    <Input value={"Destination table/folder"} />
                  </span>
                </b>
              </h2>
            </Col>
            <Col
              span={12}
              style={{ justifyContent: "center", display: "flex" }}
            >
              <Image
                alt={"/account_and_settings/databricks.svg"}
                src={"/account_and_settings/databricks.svg"}
                preview={false}
                width={"15vw"}
              />
            </Col>
            <Col
              span={12}
              style={{ justifyContent: "center", display: "flex" }}
            >
              <Image
                alt={"/account_and_settings/databricks.svg"}
                src={"/account_and_settings/databricks.svg"}
                preview={false}
                width={"15vw"}
              />
            </Col>
            <Col span={12} style={{padding : "2vw"}}>
              <Table
                className="demo"
                dataSource={[
                  {
                    key: "1",
                    name: "Mike",
                    age: "String",
                    address: "10 Downing Street",
                  },
                  {
                    key: "2",
                    name: "John",
                    age: "String",
                    address: "10 Downing Street",
                  },
                ]}
                columns={[
                  {
                    title: "Column Name",
                    dataIndex: "name",
                    key: "name",
                  },
                  {
                    title: "Data Type",
                    dataIndex: "age",
                    key: "age",
                  },
                ]}
                pagination={false}
              />
            </Col>
            <Col span={12} style={{padding : "2vw"}}>
              <Table
                className="demo"
                dataSource={[
                  {
                    key: "1",
                    name: "Mike",
                    age: "String",
                    address: "10 Downing Street",
                  },
                  {
                    key: "2",
                    name: "John",
                    age: "String",
                    address: "10 Downing Street",
                  },
                ]}
                columns={[
                  {
                    title: "Column Name",
                    dataIndex: "name",
                    key: "name",
                  },
                  {
                    title: "Data Type",
                    dataIndex: "age",
                    key: "age",
                  },
                ]}
                pagination={false}
              />
            </Col>
            <Button
                style={{
                  background: "#e74860",
                  color: "#fff",
                  borderRadius: "15px",
                  marginLeft : "2vw"
                }}
                
              >
                Test Pipeline & destination table
              </Button>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default SourceTargetPipeline;
