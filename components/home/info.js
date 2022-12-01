import { Col, Row, Button } from "antd";
import Header from "../common/header";
export default function Info({ HomeCss }) {
  return (
    <div className={HomeCss.mainDiv}>
      <Header />
      <div className={HomeCss.detailsDiv}>
        <Row className={HomeCss.infoRow}>
          <Col offset={2} span={12} className={HomeCss.infoRowSystem}>
            <h1>
              One platform for all enterprise Data Modernization and Management
              needs
            </h1>
          </Col>
          <Col span={24} className={HomeCss.infoRowMobile}>
            <h1>
              One platform for all enterprise Data Modernization and Management
              needs
            </h1>
          </Col>
        </Row>
      </div>
    </div>
  );
}
