import { Col, Row, Menu, Image, Tag, Button } from "antd";
import { MenuOutlined, PhoneFilled } from "@ant-design/icons";
import Header from "../common/header";

export default function Info({ HowItWorkCss }) {
  return (
    <div className={HowItWorkCss.mainDiv}>
      <div className={HowItWorkCss.mainDivOP}>
        <Header />
        <div className={HowItWorkCss.detailsDiv}>
          <Row className={HowItWorkCss.infoRow}>
            <Col offset={2} span={8} className={HowItWorkCss.infoRowSystem}>
              <h1>How it Works ?</h1>
              <h2>NuoData brings intelligence and automation to the modernization process for data warehouses, ETL, and analytics systems, improving speed and accuracy while lowering risks and costs</h2>
              {/* <Button size={"large"} className={HowItWorkCss.contactUsBtn}>
                Contact Us
              </Button>
              <Button size={"large"} className={HowItWorkCss.servicesBtn}>
                Services
              </Button> */}
            </Col>

            <Col span={24} className={HowItWorkCss.infoRowMobile}>
              <h1>
                One platform for all enterprise Data Modernization and
                Management needs
              </h1>
              <Button size={"large"} className={HowItWorkCss.contactUsBtn}>
                Contact Us
              </Button>
              <Button size={"large"} className={HowItWorkCss.servicesBtn}>
                Services
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
