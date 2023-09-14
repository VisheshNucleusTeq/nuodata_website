import { Card, Col, Row, Button, Progress, Slider } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  LinkOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  FilterOutlined,
  CustomerServiceOutlined,
  ReloadOutlined,
  FullscreenExitOutlined,
  CheckOutlined,
  ShrinkOutlined,
  ImportOutlined,
} from "@ant-design/icons";

const TestPipeline = ({ injectionPipelineCss }) => {
  const [, setSelectedTab] = useState();

  const [type, setType] = useState(true);
  const [slideValue, setSlideValue] = useState(0);

  const [cardsData] = useState([
    {
      name: "Source defination",
      type: "exit",
      url: "/logo.png",
      selected: true,
    },
    {
      name: "Source Qualifier/ Selection",
      type: "check",
      url: "/logo.png",
      selected: true,
    },
    {
      name: "Tranform Filter",
      type: "filter",
      url: "/logo.png",
      selected: true,
    },
    {
      name: "Tranform aggregate",
      type: "aggregate",
      url: "/logo.png",
      selected: false,
    },
    {
      name: "Tranform sort",
      type: "arrows",
      url: "/logo.png",
      selected: false,
    },
    {
      name: "Tranform expression",
      type: "import",
      url: "/logo.png",
      selected: false,
    },
    {
      name: "Tranform Custome",
      type: "tranform",
      url: "/logo.png",
      selected: false,
    },
  ]);
  const [listData, setListData] = useState([
    {
      key: "1",
      name: "John Doe",
      link: "https://example.com/johndoe",
      status: true,
      proggress: 0,
    },
    {
      key: "2",
      name: "Jane Smith",
      link: "https://example.com/janesmith",
      status: false,
      proggress: 0,
    },
    {
      key: "1",
      name: "John Doe",
      link: "https://example.com/johndoe",
      status: true,
      proggress: 0,
    },
  ]);

  useEffect(() => {
    // setInterval(() => {
    //   let temp = listData;
    //   temp?.forEach((elem, index) => {
    //     console.log(elem)
    //   })
    //   temp[0].proggress = temp[0].proggress != 100 ? temp[0].proggress + 20 : 0;
    //   setListData(temp)
    // }, 1000)
  }, [listData]);

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
  };

  const data = [
    {
      key: "1",
      name: "John Doe",
      link: "https://example.com/johndoe",
      status: true,
    },
    {
      key: "2",
      name: "Jane Smith",
      link: "https://example.com/janesmith",
      status: true,
    },
    {
      key: "1",
      name: "John Doe",
      link: "https://example.com/johndoe",
      status: true,
    },
  ];

  const data_two = [
    {
      key: "1",
      name: "John Doe",
      link: "https://example.com/johndoe",
      status: true,
      proggress: 0,
    },
    {
      key: "2",
      name: "Jane Smith",
      link: "https://example.com/janesmith",
      status: false,
      proggress: 0,
    },
    {
      key: "1",
      name: "John Doe",
      link: "https://example.com/johndoe",
      status: true,
      proggress: 0,
    },
  ];

  const callIcon = (name, type) => {
    if (name == "aggregate")
      return (
        <ReloadOutlined
          style={{ fontSize: "30px", color: type ? "red" : "" }}
        />
      );
    else if (name == "exit") {
      return (
        <FullscreenExitOutlined
          style={{ fontSize: "30px", color: type ? "red" : "" }}
        />
      );
    } else if (name == "check") {
      return (
        <CheckOutlined style={{ fontSize: "30px", color: type ? "red" : "" }} />
      );
    } else if (name == "arrows") {
      return (
        <ShrinkOutlined
          style={{ fontSize: "30px", color: type ? "red" : "" }}
        />
      );
    } else if (name == "import") {
      return (
        <ImportOutlined
          style={{ fontSize: "30px", color: type ? "red" : "" }}
        />
      );
    } else if (name == "filter") {
      return (
        <FilterOutlined
          style={{ fontSize: "30px", color: type ? "red" : "" }}
        />
      );
    } else if (name == "tranform") {
      return (
        <CustomerServiceOutlined
          style={{ fontSize: "30px", color: type ? "red" : "" }}
        />
      );
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      // type, setType
      type ? setSlideValue(slideValue + 1) : setSlideValue(slideValue - 1);
      if (slideValue <= 0) {
        setType(true);
      } else if (slideValue >= 100) {
        setType(false);
      }
    }, 10);
    return () => {
      clearTimeout(timer);
    };
  }, [slideValue]);

  return (
    <div style={{ marginTop: "2vw" }}>
      <Card className="demoCard">
        <Row justify="space-between" align="middle">
          <Col span={12}>
            <h3 style={{ fontWeight: 600 }}>Postgres (Source Schema)</h3>
          </Col>
          <Col span={12}>
            <h3 style={{ fontWeight: 600, textAlign: "right" }}>
              S3 (Target Schema)
            </h3>
          </Col>
        </Row>

        <Row justify="space-between" align="middle">
          <Col span={2} className={injectionPipelineCss.circleContainer}>
            <div className={`${injectionPipelineCss.circle} ${injectionPipelineCss.right}`}>
              <img
                className={injectionPipelineCss.imageFit}
                src={
                  "https://www.brighttalk.com/wp-content/uploads/2019/07/Databricks-logo-1-300x300.png"
                }
                alt="Left Image"
              />
            </div>
          </Col>
          <Col span={20} className={injectionPipelineCss.connectorContainer}>
            <div style={{ border: "1px dashed gray", width: "98%" }}></div>
          </Col>
          <Col span={2} className={injectionPipelineCss.circleContainer}>
            <div className={`${injectionPipelineCss.circle} ${injectionPipelineCss.right}`}>
              <img
                className={injectionPipelineCss.imageFit}
                src={
                  "https://www.brighttalk.com/wp-content/uploads/2019/07/Databricks-logo-1-300x300.png"
                }
                alt="Right Image"
              />
            </div>
          </Col>
        </Row>

        <Row
          align={"space-between"}
          style={{ marginTop: "20px", padding: "30px" }}
        >
          {cardsData.map((data, i) => {
            return (
              <>
                <Col
                  span={2}
                  style={{
                    height: "18vh",
                    cursor: "pointer",
                    justifyContent: "center",
                    display: "flex",
                    zIndex: "999",
                  }}
                  onClick={() => {
                    setSelectedTab(i);
                  }}
                >
                  <Card
                    style={cardStyle}
                    className={
                      data.selected ? injectionPipelineCss.customCard : injectionPipelineCss.customCardSelected
                    }
                  >
                    {callIcon(data.type, data.selected)}
                    {/* <FilterOutlined style={{ color : 'red'}} /> */}
                    <div>
                      <p>{data.name}</p>
                    </div>
                  </Card>
                </Col>
                {[0, 1, 2, 3, 4, 5].includes(i) ? (
                  <Col
                    span={1}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      style={{ border: "1px dashed gray", width: "100%" }}
                    ></div>
                  </Col>
                ) : null}
              </>
            );
          })}
        </Row>

        <Row style={{ marginTop: "20px" }}>
          <Button
            style={{
              background: "#e74860",
              color: "#fff",
              borderRadius: "15px",
            }}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Test Pipeline
          </Button>
        </Row>

        <Row justify="space-between" align="middle" style={{ padding: "15px" }}>
          <Col span={4}>
            <h4 style={{ fontWeight: "600" }}>Logs of source definition</h4>
          </Col>
          <Col
            span={4}
            style={{
              textAlign: "right",
              textDecoration: "underline",
              color: "red",
            }}
          >
            <h4
              style={{
                fontWeight: "600",
                color: "red",
                textDecoration: "underline",
              }}
            >
              Details Logs
            </h4>
          </Col>
        </Row>
        {data.map((item) => (
          <Row
            justify="space-between"
            align="middle"
            style={{ padding: "15px" }}
          >
            <Col span={4}>{item.name}</Col>
            <Col span={16}>
              {" "}
              <Progress percent={100} showInfo={false} />{" "}
            </Col>
            <Col span={4}>
              <div style={{ textAlign: "right" }}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <LinkOutlined
                    style={{ color: item.status ? "green" : "red" }}
                  />
                </a>
              </div>{" "}
            </Col>
          </Row>
        ))}
        <Row justify="space-between" align="middle" style={{ padding: "15px" }}>
          <Col span={5}>
            <h4 style={{ fontWeight: "600" }}>Logs of source Qualifier</h4>
          </Col>
          <Col
            span={4}
            style={{
              textAlign: "right",
              textDecoration: "underline",
              color: "red",
            }}
          >
            <h4
              style={{
                fontWeight: "600",
                color: "red",
                textDecoration: "underline",
              }}
            >
              Details Logs
            </h4>
          </Col>
        </Row>
        {listData?.map((item) => (
          <Row
            justify="space-between"
            align="middle"
            style={{ padding: "15px" }}
          >
            <Col span={4}>{item.name}</Col>
            <Col span={16}>
              {/* <Progress percent={item.proggress} showInfo={false} status={item.status ? 'green' : "exception"} /> */}
              <Slider
                className={"sliderHandle"}
                value={slideValue}
                disabled={false}
                trackStyle={{ background: "gray" }}
              />
            </Col>
            <Col span={4}>
              <div style={{ textAlign: "right" }}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <LinkOutlined
                    style={{ color: item.status ? "green" : "red" }}
                  />
                </a>
              </div>{" "}
            </Col>
          </Row>
        ))}
      </Card>
    </div>
  );
};

export default TestPipeline;
