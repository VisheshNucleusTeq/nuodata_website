import { Col, Row, Image } from "antd";
import Header from "../common/header";

export default function Info({ DataGovernanceCss }) {
  return (
    <div className={DataGovernanceCss.mainDiv}>
      <Header />
      <Row
        className={DataGovernanceCss.infoRow}
        justify={"center"}
        align={"middle"}
      >
        <Col xs={20} span={22}>
          <h1>
            Privacy <span>Perfected</span>
          </h1>
          <p>With SSO Integration and Multi-Tenancy</p>
        </Col>
      </Row>
    </div>
  );
}
