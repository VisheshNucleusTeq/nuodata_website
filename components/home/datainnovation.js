import { Carousel as CarouselComponent, Col, Row, Button, Space } from "antd";

export default function DataInnovation({ HomeCss }) {
  return (
    <div className={HomeCss.innovationMainDiv}>
      <Space
        direction="vertical"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>
          It’s where data innovation
          <br />
          meets digital transformation.
        </h1>
        <div className={HomeCss.innovationSubDiv}>
          <Row
            gutter={[24, 24]}
            className={HomeCss.innovationMainRow}
            style={{ marginLeft: 0, marginRight: 0 }}
          >
            <Col
              xs={22}
              sm={12}
              md={12}
              lg={5}
              className={HomeCss.innovationCol}
            >
              <Space direction="vertical" className={HomeCss.innovationSpace}>
                <h1>$300M+</h1>
                <h2>in enterprise savings</h2>
              </Space>
            </Col>
            <Col
              xs={22}
              sm={12}
              md={12}
              lg={5}
              className={HomeCss.innovationCol}
            >
              <Space direction="vertical" className={HomeCss.innovationSpace}>
                <h1>10X</h1>
                <h2>faster migrations</h2>
              </Space>
            </Col>
            <Col
              xs={22}
              sm={12}
              md={12}
              lg={5}
              className={HomeCss.innovationCol}
            >
              <Space direction="vertical" className={HomeCss.innovationSpace}>
                <h1>10X</h1>
                <h2>faster migrations</h2>
              </Space>
            </Col>
            <Col
              xs={22}
              sm={12}
              md={12}
              lg={5}
              className={HomeCss.innovationCol}
            >
              <Space direction="vertical" className={HomeCss.innovationSpace}>
                <h1>40%</h1>
                <h2>compute efficiency</h2>
              </Space>
            </Col>
            <Col xs={22} sm={12} md={12} lg={4}>
              <Space direction="vertical" className={HomeCss.innovationSpace}>
                <h1>50%</h1>
                <h2>reduction in data</h2>
              </Space>
            </Col>
          </Row>
        </div>
      </Space>
    </div>
  );
}
