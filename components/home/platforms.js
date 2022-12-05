import { Col, Row } from "antd";

export default function Platforms({ HomeCss }) {
  return (
    <div className={HomeCss.platForm}>
      <h1>
        <span>Platforms</span>
      </h1>
      <p style={{ color: "#FFF", textAlign: "center", padding: "0% 4% 0% 4%" }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </p>
      <Row style={{ height: "100vh" }}>
        <Col className={HomeCss.platFormColBg} offset={0} span={24}></Col>
      </Row>
    </div>
  );
}
