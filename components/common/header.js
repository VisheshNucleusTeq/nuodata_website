import { Col, Row, Menu, Image, Tag } from "antd";
import { MenuOutlined, PhoneFilled } from "@ant-design/icons";
import HeaderCss from '../../styles/Header.module.css';

export default function Header() {
  return (
    <div className={HeaderCss.menuDiv}>
      <Row className={HeaderCss.infoRow}>
        <Col offset={2} span={4}>
          <div className={HeaderCss.infoColImage}>
            <Image src={"./logo.png"} />
          </div>
        </Col>

        <Col offset={2} className={HeaderCss.infoColManu} span={14}>
          <Menu
            className={HeaderCss.menu}
            mode="horizontal"
            defaultSelectedKeys={[""]}
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
            <Menu.Item className={HeaderCss.hoverEffect} key="4">
              Get Started
            </Menu.Item>

            <Menu.Item key="5" className={HeaderCss.marginLeft}>
              <Tag className={HeaderCss.tryNowTag} color="#E74860">
                Try Now
              </Tag>
            </Menu.Item>
            <Menu.Item key="6">
              <PhoneFilled
                style={{ fontSize: "1.5em" }}
                className={HeaderCss.phone}
              />
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </div>
  );
}
