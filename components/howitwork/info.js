import { Col, Row, Menu, Image, Tag, Button } from "antd";
import { RiseOutlined } from "@ant-design/icons";
import Header from "../common/header";

export default function Info({ HowItWorkCss }) {
  return (
    <div className={HowItWorkCss.mainDiv}>
      <div className={HowItWorkCss.mainDivOP}>
        <Header />
        <div className={HowItWorkCss.detailsDiv}>
          <Row className={HowItWorkCss.infoRow}>
            <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10} className={HowItWorkCss.infoRowSystem} >
              <h1>How it <span>Works ?</span></h1>
              <p>NuoData brings intelligence and automation to the modernization process for data warehouses, ETL, and analytics systems, improving speed and accuracy while lowering risks and costs</p>
            </Col>
            <Col xs={24} sm={24} md={24} lg={14} xl={14} xxl={14} >
              <Image preview={false} src="/home/platform-gif2.gif" />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
