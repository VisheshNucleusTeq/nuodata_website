import { useEffect, useState } from "react";
import Link from "next/link";
import { Col, Row, Menu, Image, Tag } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Router, { useRouter } from "next/router";

import HeaderCss from "../../styles/Header.module.css";

export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${HeaderCss.menuDiv} ${
        scrollY > 500 ? HeaderCss.menuDivScrollY : null
      }`}
    >
      <Row className={HeaderCss.infoRow}>
        <Col offset={2} span={4}>
          <div className={HeaderCss.infoColImage}>
            <Link href="/">
              <Image preview={false} src={"/logo.png"} />
            </Link>
          </div>
        </Col>

        <Col offset={2} className={HeaderCss.infoColManu} span={16}>
          <Menu
            className={HeaderCss.menu}
            mode="horizontal"
            overflowedIndicator={
              <MenuOutlined style={{ fontSize: "200%", color: "#e74860" }} />
            }
            items={[
              {
                key: "1",
                label: "Why NuoData?",
                className: HeaderCss.hoverEffect,
                onClick: () => {
                  Router.push("/how-it-works");
                  router.push("/how-it-works");
                },
              },
              {
                key: "2",
                label: "Data Modernization",
                className: HeaderCss.hoverEffect,
                onClick: () => {
                  Router.push("/how-it-works");
                  router.push("/how-it-works");
                },
              },
              {
                key: "3",
                // label: "Data Management",
                className: HeaderCss.hoverEffect,
                label: (
                  <a className={HeaderCss.hoverEffect} href="/#dataManagement">
                    Data Management
                  </a>
                ),
                style : {
                  visibility :  "hidden"
                }
              },
              {
                key: "4",
                label: (
                  <Tag
                    onClick={() => Router.push("/sign-in")}
                    className={HeaderCss.tryNowTag}
                    color="#E74860"
                  >
                    Sign In
                  </Tag>
                ),
                className: HeaderCss.marginLeft,
              },
              {
                key: "5",
                label: (
                  <Tag className={HeaderCss.tryNowTag} color="#E74860">
                    Contact Us
                  </Tag>
                ),
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
}
