import React from "react";
import { Col, Row, List, Image, Divider } from "antd";
import FooterCss from '../../styles/Footer.module.css'
import Router, { useRouter } from "next/router";
const Footer = () => {
  const router = useRouter();

  return (
    <Row style={{ backgroundColor: "#000" }}>
      {/* <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ padding: "2%", display:"flex", justifyContent : "center" }}>
        <Image preview={false} width={"25%"} src={"./logo.png"} style={{ maxWidth: "100%" }} />
      </Col>
      <Col span={20} offset={2} style={{ borderTop: "2px solid #FFF" }}>
        <Divider style={{ color: "red" }} />
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ paddingBottom: "2%",display:"flex", justifyContent : "center" }}>
        <p style={{color : "#e74860"}}>Copyright © NuoData. {(new Date().getFullYear())} | All rights reserved.</p>
      </Col> */}
      <Col span={20} offset={3}>
        <Row style={{ backgroundColor: "#000" }}>
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={6}
            className={FooterCss.footerCol}
          >
            <div className={FooterCss.footerColChild}>
              <h1
                onClick={() => {
                  Router.push("/how-it-works");
                  router.push("/how-it-works");
                }}
                style={{
                  cursor: "pointer",
                }}
              >
                Why NuoData?
              </h1>
              <List>
                <p style={{ color: "#FFF" }}>6-10X Faster</p>
                <p style={{ color: "#FFF" }}>60-70% reduced cost</p>
                <p style={{ color: "#FFF" }}>100% accuracy</p>
                <p style={{ color: "#FFF" }}>Single version of truth</p>
                <p style={{ color: "#FFF" }}>Self service validation</p>
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
              <h1
                onClick={() => {
                  Router.push("/how-it-works");
                  router.push("/how-it-works");
                }}
                style={{
                  cursor: "pointer",
                }}
              >
                How it works
              </h1>
              <List>
                <p style={{ color: "#FFF" }}>Enterprise grade platform</p>
                <p style={{ color: "#FFF" }}>Well defined process</p>
                <p style={{ color: "#FFF" }}>Prescriptive analysis</p>
                <p style={{ color: "#FFF" }}>
                  Delivering Single version of truth
                </p>
                <p style={{ color: "#FFF" }}>No-Code transformation</p>
                <p style={{ color: "#FFF" }}>Multi Tenancy & RBAC</p>
                <p style={{ color: "#FFF" }}>Intuitive UI</p>
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
              <h1> Our Partners</h1>
              <List>
                <p style={{ color: "#FFF" }}>AWS</p>
                <p style={{ color: "#FFF" }}>Google Cloud</p>
                <p style={{ color: "#FFF" }}>Azure</p>
                <p style={{ color: "#FFF" }}>Databricks</p>
                <p style={{ color: "#FFF" }}>Snowflake</p>
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
              <h1
                style={{ cursor: "pointer" }}
                onClick={() => Router.push("/contact-us")}
              >
                Connect
              </h1>
              <List>
                <p style={{ color: "#FFF" }}>Book a Demo</p>
                <p style={{ color: "#FFF" }}>Contact Us</p>
              </List>
            </div>
          </Col>
        </Row>
      </Col>
      {/* <Col span={20} offset={3}>
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
      </Col> */}
      <Col span={20} offset={2} style={{ borderTop: "2px solid #FFF" }}>
        <Divider style={{ color: "red" }} />
      </Col>
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={24}
        xl={24}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <p style={{ color: "#e74860" }}>
          Copyright © NuoData. {new Date().getFullYear()} | All rights reserved.
        </p>
      </Col>
    </Row>
  );
};

export default Footer;
