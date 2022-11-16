import { Col, Row, Button } from "antd";
import Header from "../common/header";
export default function Info({ HomeCss }) {
  return (
    <div className={HomeCss.mainDiv}>
      <Header />
      <div className={HomeCss.detailsDiv}>
        <Row className={HomeCss.infoRow}>
          <Col offset={2} span={8} className={HomeCss.infoRowSystem}>
            <h1>
              One platform for all enterprise Data Modernization and Management
              needs
            </h1>
            <Button
              size={"large"}
              className={HomeCss.contactUsBtn}
            >
              Contact Us
            </Button>
            <Button
              size={"large"}
              className={HomeCss.servicesBtn}
            >
              Services
            </Button>
          </Col>

          <Col span={24} className={HomeCss.infoRowMobile}>
            <h1>
              One platform for all enterprise Data Modernization and Management
              needs
            </h1>
            <Button
              size={"large"}
              className={HomeCss.contactUsBtn}
            >
              Contact Us
            </Button>
            <Button
              size={"large"}
              className={HomeCss.servicesBtn}
            >
              Services
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}
