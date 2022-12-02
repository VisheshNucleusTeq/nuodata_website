import { Image, Row, Col } from "antd";

export default function FlowGif({ HomeCss }) {
  return (
    <Row style={{backgroundColor : "gray"}}>
      <Col offset={3} span={18}>
      <canvas class="canvas"></canvas>
        {/* <Image preview={false} src="./home/second.gif" /> */}
      </Col>
    </Row>
  );
}
