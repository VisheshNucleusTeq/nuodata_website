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
            <Link href="/sign-up">
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
                  Router.push("/sign-up");
                  router.push("/sign-up");
                },
              },
              {
                key: "2",
                label: "Data Modernization",
                className: HeaderCss.hoverEffect,
                onClick: () => {
                  Router.push("/demo");
                  router.push("/demo");
                },
              },
              {
                key: "3",
                label: "Data Management",
                className: HeaderCss.hoverEffect,
              },
              {
                key: "4",
                label: (
                  <Tag className={HeaderCss.tryNowTag} color="#E74860">
                    Try Now
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
