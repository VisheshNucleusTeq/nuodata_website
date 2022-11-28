import React from "react";
import { Col, Row, List, Image, Divider } from "antd";
import FooterCss from '../../styles/Footer.module.css'
// xs sm md lg xl
const Footer = () => {
  return (
    <Row style={{ backgroundColor: "#072A3D" }}>
      {/* <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ padding: "2%" }}>
        <Image width={"25%"} src={"./logo.png"} style={{ maxWidth: "200px" }} />
      </Col> */}
      <Col span={20} offset={3}>
        <Row style={{ backgroundColor: "#072A3D" }}>
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={6}
            className={FooterCss.footerCol}
          >
            <div className={FooterCss.footerColChild}>
              <h1>Why NuoData?</h1>
              <List>
                <p style={{ color: "#FFF" }}>Speed</p>
                <p style={{ color: "#FFF" }}>Cost</p>
                <p style={{ color: "#FFF" }}>Accuracy</p>
                <p style={{ color: "#FFF" }}>Transparency</p>
                <p style={{ color: "#FFF" }}>Longevity</p>
              </List>
            </div>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={6}
            className={FooterCss.footerCol}
          >
            <div className={FooterCss.footerColChild}>
              <h1>How it works</h1>
              <List>
                <p style={{ color: "#FFF" }}>4 step system</p>
                <p style={{ color: "#FFF" }}>Automation</p>
                <p style={{ color: "#FFF" }}>Prescriptive analysis</p>
                <p style={{ color: "#FFF" }}>End-to-end approach</p>
              </List>
            </div>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={6}
            className={FooterCss.footerCol}
          >
            <div className={FooterCss.footerColChild}>
              <h1>Resources</h1>
              <List>
                <p style={{ color: "#FFF" }}>Webinars</p>
                <p style={{ color: "#FFF" }}>E-books</p>
                <p style={{ color: "#FFF" }}>Case Studies</p>
                <p style={{ color: "#FFF" }}>Solution Briefs</p>
                <p style={{ color: "#FFF" }}>Videos</p>
                <p style={{ color: "#FFF" }}>Blogs</p>
              </List>
            </div>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={6}
            className={FooterCss.footerCol}
          >
            <div className={FooterCss.footerColChild}>
              <h1>Connect</h1>
              <List>
                <p style={{ color: "#FFF" }}>Events</p>
                <p style={{ color: "#FFF" }}>Offices</p>
              </List>
            </div>
          </Col>
        </Row>
      </Col>
      <Col span={20} offset={3}>
        <Row style={{ backgroundColor: "#072A3D" }}>
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={6}
            className={FooterCss.footerCol}
          >
            <div className={FooterCss.footerColChild}>
              <h1>Source Target Support</h1>
              <List>
                <p style={{ color: "#FFF" }}>Overview</p>
                <p style={{ color: "#FFF" }}>Doop Dives</p>
                <p style={{ color: "#FFF" }}>Feature list</p>
              </List>
            </div>
          </Col>

          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={6}
            className={FooterCss.footerCol}
          >
            <div className={FooterCss.footerColChild}>
              <h1>Get Started</h1>
              <List>
                <p style={{ color: "#FFF" }}>Free trial</p>
                <p style={{ color: "#FFF" }}>Book a demo</p>
                <p style={{ color: "#FFF" }}>FAQs</p>
              </List>
            </div>
          </Col>

          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={6}
            className={FooterCss.footerCol}
          >
            <div className={FooterCss.footerColChild}>
              <h1>Partners</h1>
              <List>
                <p style={{ color: "#FFF" }}>AWS</p>
                <p style={{ color: "#FFF" }}>Databricks</p>
                <p style={{ color: "#FFF" }}>GCP</p>
                <p style={{ color: "#FFF" }}>Azure</p>
                <p style={{ color: "#FFF" }}>Snowflake</p>
              </List>
            </div>
          </Col>
        </Row>
      </Col>
      <Col span={20} offset={2} style={{ borderTop: "2px solid #FFF" }}>
        <Divider style={{ color: "red" }} />
      </Col>
    </Row>
  );
};

export default Footer;
