import React from "react";
import { Col, Row, List, Image, Button } from "antd";
import FooterCss from "../../styles/newStyles/homeNew.module.css";
import Router from "next/router";
import Link from "next/link";
import { RiseOutlined } from "@ant-design/icons";
import { RightCircleOutlined } from "@ant-design/icons";

const Footer = () => {
  const footerData = [
    {
      title: "Why NuoData?",
      onClick: () => Router.push("/how-it-works"),
      items: [
        "6-10X Faster",
        "60-70% reduced cost",
        "100% accuracy",
        "Single version of truth",
        "Self service validation",
      ],
    },
    {
      title: "How it works",
      onClick: () => Router.push("/how-it-works"),
      items: [
        "Enterprise grade platform",
        "Well defined process",
        "Prescriptive analysis",
        "Delivering Single version of truth",
        "No-Code transformation",
        "Multi Tenancy & RBAC",
        "Intuitive UI",
      ],
    },
    {
      title: "Partners",
      items: [
        { name: "AWS", logo: "/auth/footer-logos/AWS.png" },
        { name: "Google Cloud", logo: "/auth/footer-logos/Google Cloud.png" },
        { name: "Azure", logo: "/auth/footer-logos/Azure.png" },
        { name: "Databricks", logo: "/auth/footer-logos/Databricks.png" },
        { name: "IBM", logo: "/auth/footer-logos/aws.png" },
        { name: "Snowflake", logo: "/auth/footer-logos/Snowflake.png" },
      ],
    },
    {
      title: "Connect",
      onClick: () => Router.push("/contact-us"),
      items: [
        {
          name: "Book a Demo",
          className: "bookDemo",
          icon: <RightCircleOutlined />,
          itemIndex: "book-demo",
        },

        "Contact Us",
      ],
    },
  ];

  return (
    <div>
      <Row>
        <Col span={24} className={FooterCss.howNuoDataworksBtn}>
          <Link prefetch href="/how-it-works">
            <Button>
              Explore How NuoData works <RiseOutlined />
            </Button>
          </Link>
        </Col>
      </Row>
      <Row style={{ backgroundColor: "#1A1A1A" }}>
        <Col span={24} style={{ backgroundColor: "#1A1A1A", padding: "6vh 0" }}>
          <Row justify={"center"}>
            {footerData.map((column, index) => (
              <Col
                key={index}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                xl={6}
                className={FooterCss.footerCol}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div className={FooterCss.footerColChild}>
                  <h1
                    onClick={column.onClick}
                    style={{
                      cursor: column.onClick ? "pointer" : "default",
                    }}
                  >
                    {column.title}
                  </h1>
                  <List>
                    {column.items.map((item, itemIndex) =>
                      typeof item === "string" ? (
                        <p key={itemIndex} style={{ color: "#FFF" }}>
                          {item}
                        </p>
                      ) : (
                        <Button
                          key={itemIndex}
                          className={item.className}
                          icon={
                            item.logo ? (
                              <Image
                                src={item.logo}
                                preview={false}
                                style={{ paddingRight: "1em" }}
                              />
                            ) : (
                              ""
                            )
                          }
                        >
                          {item.name}
                          {item.icon}
                        </Button>
                      )
                    )}
                  </List>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={24} style={{ background: "#1A1A1A" }} />
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "12px",
            background: "#141414",
          }}
        >
          <p style={{ color: "#FFFFFF" }}>
            © {new Date().getFullYear()} NuoData Inc. All Rights Reserved. 2023
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
