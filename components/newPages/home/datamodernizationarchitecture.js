import { Button, Col, Row, Image } from "antd";
import Link from "next/link";
import { RiseOutlined } from "@ant-design/icons";

export default function DataModernizationArchitectureNew({ HomeCss }) {
  return (
    <Row className={HomeCss.dataModernizationArchitecture}>
      <Col
        offset={1}
        span={22}
        className={HomeCss.dataModernizationArchitectureTtile}
      >
        <h2 className={`${HomeCss.ECTitle} ${HomeCss.ECTitle1}`}>
          <span>Data Modernization Architecture</span>
        </h2>
        <h1></h1>
      </Col>
      <Col offset={1} span={22} className={`${HomeCss.infoRowSystemView} ${HomeCss.infoRowSystemViewSystem}`}>
        <iframe
          src="/all-graph/home/three/demo/three.html"
          style={{ width: "100%", height: "100vh", border: "none" }}
        />
      </Col>

      <Col offset={0} span={24} className={`${HomeCss.infoRowSystemView} ${HomeCss.infoRowSystemViewmobile}`}>
        <iframe
          src="/all-graph/home/mobile_view/three/three.html"
          style={{ width: "100%", height: "60vh", border: "none" }}
        />
      </Col>

      <Col span={24} className={HomeCss.howNuoDataworksBtn}>
        <Link prefetch href="/how-it-works">
          <Button>
            “Explore How NuoData works” <RiseOutlined />
          </Button>
        </Link>
      </Col>
    </Row>
  );
}