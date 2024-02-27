import { Carousel as CarouselComponent, Col, Row, Button, Space, Image } from "antd";

export default function DataInnovation({ HomeCss }) {
  return (
    <div className={HomeCss.innovationMainDiv}>
      <div className={HomeCss.innovationRobotDiv}>
        <Image
          className={HomeCss.innovationRobotImg}
          src="/data_innovation/3d-hand.png"
          alt="banner"
          preview={false}
        />
      </div>
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
                <h1>10X</h1>
                <h2>Performance Boost</h2>
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
                <h1>8X</h1>
                <h2>Faster Migrations</h2>
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
                <h1>50%</h1>
                <h2>Cost Saving</h2>
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
                <h1>90%</h1>
                <h2>Energy Cost Saving</h2>
              </Space>
            </Col>
            <Col xs={22} sm={12} md={12} lg={4}>
              <Space direction="vertical" className={HomeCss.innovationSpace}>
                <h1>90%</h1>
                <h2>Energy Cost Saving</h2>
              </Space>
            </Col>
          </Row>
        </div>
      </Space>
    </div>
  );
}
