import { useEffect, useState } from "react";
import Link from "next/link";
import { Col, Row, Menu, Image, Tag } from "antd";
import { MenuOutlined, PhoneFilled } from "@ant-design/icons";
import HeaderCss from "../../styles/Header.module.css";

export default function Header() {
  const [scrollY, setScrollY] = useState(0);

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
              <MenuOutlined style={{ fontSize: "200%", color: "#f05829" }} />
            }
          >
            <Menu.Item className={HeaderCss.hoverEffect} key="1">
              Why NuoData?
            </Menu.Item>
            <Menu.Item className={HeaderCss.hoverEffect} key="2">
              Data Modernization
            </Menu.Item>
            <Menu.Item className={HeaderCss.hoverEffect} key="3">
              Data Management
            </Menu.Item>

            <Menu.Item key="5" className={HeaderCss.marginLeft}>
              <Tag className={HeaderCss.tryNowTag} color="#E74860">
                Try Now
              </Tag>
            </Menu.Item>
            <Menu.Item key="6">
              {/* <PhoneFilled
                style={{ fontSize: "1.5em" }}
                className={HeaderCss.phone}
              /> */}
              <Tag className={HeaderCss.tryNowTag} color="#E74860">
                Contact Us
              </Tag>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </div>
  );
}
