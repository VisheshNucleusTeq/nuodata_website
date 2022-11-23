import Link from "next/link";
import { Layout, Row, Col, Image } from "antd";
const { Sider } = Layout;

const SiderView = ({ layoutCss, height, componentName }) => {
  console.log("affdf", componentName);
  return (
    <Sider className={layoutCss.mainLayoutSider}>
      <div style={{ height: height + "px" }} className={layoutCss.logoImage}>
        <Link href="/">
          <Image src="../assets/images/logo.png" preview={false} />
        </Link>
      </div>

      <Row style={{ marginTop: "10%" }}>
        <Col
          span={24}
          className={`${layoutCss.mainMenuCol} ${
            componentName == "Dashboard" ? layoutCss.activeMenu : null
          }`}
        >
          <Link href="/dashboard">
            <Col
              offset={2}
              span={20}
              style={{ height: height / 1.5 + "px" }}
              className={layoutCss.mainMenu}
            >
              Dashboard
            </Col>
          </Link>
        </Col>
        <Col span={24} className={layoutCss.mainMenuCol}>
          <Col
            offset={2}
            span={20}
            style={{ height: height / 1.5 + "px" }}
            className={layoutCss.mainMenu}
          >
            Data Modernization +
          </Col>
        </Col>
        <Col
          span={24}
          className={`${layoutCss.mainMenuCol} ${
            componentName == "Define" ? layoutCss.activeMenu : null
          }`}
        >
          <Link href="/data-modernization/define">
            <Col
              offset={4}
              span={20}
              style={{ height: height / 2 + "px" }}
              className={layoutCss.subMainMenu}
            >
              Define
            </Col>
          </Link>
        </Col>
        <Col span={24} className={layoutCss.mainMenuCol}>
          <Col
            offset={4}
            span={20}
            style={{ height: height / 2 + "px" }}
            className={layoutCss.subMainMenu}
          >
            Connect
          </Col>
        </Col>
        <Col span={24} className={layoutCss.mainMenuCol}>
          <Col
            offset={4}
            span={20}
            style={{ height: height / 2 + "px" }}
            className={layoutCss.subMainMenu}
          >
            Analyze
          </Col>
        </Col>
        <Col span={24} className={layoutCss.mainMenuCol}>
          <Col
            offset={4}
            span={20}
            style={{ height: height / 2 + "px" }}
            className={layoutCss.subMainMenu}
          >
            Design
          </Col>
        </Col>
        <Col span={24} className={layoutCss.mainMenuCol}>
          <Col
            offset={4}
            span={20}
            style={{ height: height / 2 + "px" }}
            className={layoutCss.subMainMenu}
          >
            Transform
          </Col>
        </Col>
        <Col span={24} className={layoutCss.mainMenuCol}>
          <Col
            offset={4}
            span={20}
            style={{ height: height / 2 + "px" }}
            className={layoutCss.subMainMenu}
          >
            Validate
          </Col>
        </Col>
        <Col span={24} className={layoutCss.mainMenuCol}>
          <Col
            offset={4}
            span={20}
            style={{ height: height / 2 + "px" }}
            className={layoutCss.subMainMenu}
          >
            Rollout
          </Col>
        </Col>
        <Col span={24} className={layoutCss.mainMenuCol}>
          <Col
            offset={2}
            span={20}
            style={{ height: height / 1.5 + "px" }}
            className={layoutCss.mainMenu}
          >
            Data Management
          </Col>
        </Col>
        <Col span={24} className={layoutCss.mainMenuCol}>
          <Col
            offset={2}
            span={20}
            style={{ height: height / 1.5 + "px" }}
            className={layoutCss.mainMenu}
          >
            Account & Settings
          </Col>
        </Col>
      </Row>
    </Sider>
  );
};

export default SiderView;
