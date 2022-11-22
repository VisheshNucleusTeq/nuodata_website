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
            <Col span={24} className={HowItWorkCss.infoRowSystem}>
              <h1>How it Works ?</h1>
              <h2>
                NuoData brings intelligence and automation to the modernization
                process for data warehouses, ETL, and analytics systems,
                improving speed and accuracy while lowering risks and costs
              </h2>
              <div
                className={HowItWorkCss.servicesBtnView}
              >
                <Button size={"large"} className={HowItWorkCss.servicesBtn}>
                  Launch your free trial <RiseOutlined />
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
