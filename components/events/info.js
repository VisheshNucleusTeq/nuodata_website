import { useState } from "react";
import { Col, Row, Button, Collapse, Space } from "antd";
import Header from "../common/header";
import {
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { BellOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

export default function Info({ EventsCss }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [icon, setIcon] = useState(
    <BellOutlined style={{ fontSize: "1.5rem" }} />
  );

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    setIcon(
      isExpanded ? (
        <BellOutlined style={{ fontSize: "1.5rem" }} />
      ) : (
        <CloseOutlined style={{ fontSize: "1.2rem" }} />
      )
    );
  };
  return (
    <div className={EventsCss.mainDiv}>
      <Header />
      <div className={EventsCss.detailsDiv}>
        <Row align="stretch" justify={"center"} style={{ minWidth: "100%" }}>
          <Col xs={24} sm={24} md={24} lg={18} xl={18} xxl={18}>
            <Row style={{ justifyContent: "right" }}>
              <Space direction="horizontal" className={EventsCss.collapseDiv}>
                <div
                  className={
                    isExpanded ? EventsCss.collapseDiv1 : EventsCss.collapseDiv2
                  }
                >
                  <Space direction="horizontal">
                    <h3 style={{ borderRight: "1px solid #FFFFFF" }}>
                      <MailOutlined /> Ops@Nucleusteq.com
                    </h3>
                    <h3>
                      <PhoneOutlined /> +91 98765-43210
                    </h3>
                  </Space>
                </div>
                <Button
                  className={EventsCss.collapsetBtn}
                  onClick={handleToggle}
                >
                  {icon}
                </Button>
              </Space>
              {/* <Space direction="horizontal" className={EventsCss.collapseDiv}>
                <h3 style={{ borderRight: "1px solid #FFFFFF" }}>
                  <MailOutlined /> Ops@Nucleusteq.com
                </h3>
                <h3>
                  <PhoneOutlined /> +91 98765-43210
                </h3>
                <Button className={EventsCss.collapsetBtn}>
                  <PiCallBell style={{ fontSize: "1.5rem" }} />
                </Button>
              </Space> */}
            </Row>
            <h1>Data + AI Summit</h1>
            <h2>
              Watch all the keynotes, 250+ breakouts and more from the global
              event for the data and AI community — available until July 14.
            </h2>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={20}
            xl={20}
            xxl={20}
            align={"center"}
            className={EventsCss.contactBarCol}
          >
            <Space direction="horizontal" className={EventsCss.contactBar}>
              <h3
                style={{ marginBottom: "0em !important", alignItems: "center" }}
              >
                <Button className={EventsCss.reachAtBtn}>React Us At</Button>
              </h3>
              <h3 style={{ borderRight: "1px solid #FFFFFF" }}>
                <MailOutlined /> Ops@Nucleusteq.com
              </h3>
              <h3 style={{ borderRight: "1px solid #FFFFFF" }}>
                <PhoneOutlined /> +91 98765-43210
              </h3>
              <h3>
                <GlobalOutlined /> nucleusteq.com
              </h3>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
}
