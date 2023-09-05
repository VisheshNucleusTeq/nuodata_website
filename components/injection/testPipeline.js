import { Card, Image, Col, Row, Divider } from "antd";
import React from "react";
import { useState } from "react";

const TestPipeline = () => {
  const [cardList, setCardList] = useState([
    {
      name: "Source defination",
      icon: "",
    },
    {
      name: "Source Qualifier/Selection",
      url: "#",
    },
    {
      name: "Tranform Filter",
      url: "#",
    },
    {
      name: "Tranform aggregate",
      url: "#",
    },
    {
      name: "Tranform sort",
      url: "#",
    },
    {
      name: "Tranform expression",
      url: "#",
    },
    {
      name: "Tranform Custome",
      url: "#",
    },
  ]);
  return (
    <div style={{ marginTop: "2vw" }}>
      <Card className="demoCard">
        <Row>
          <Col>
            <h3>Postgres (Source Schema)</h3>
          </Col>
          <hr />
          <Col>
            <h3>S3 (Target Schema)</h3>
          </Col>
        </Row>
        <Row style={{ justifyContent: "space-between" }}>
          <Col span={1}>
            <Image
              preview={false}
              height={"2rem"}
              width={"4rem"}
              style={{ borderRadius: "20" }}
              src={"/logo.png"}
            />
          </Col>
          <Col span={10}>
            <div style={{ border: "1px dashed gray", width: "100%" }}></div>
          </Col>
          <Col span={1}>
            <Image
              preview={false}
              height={"2rem"}
              width={"4rem"}
              style={{ borderRadius: "20" }}
              src={"/logo.png"}
            />
          </Col>
        </Row>
        <Row style={{ justifyContent: "space-between" }}>
          <Col span={2}>
            <Card> small card</Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default TestPipeline;
