import { Button, Col, Row, Image } from "antd";
import Link from "next/link";
import { RiseOutlined } from "@ant-design/icons";

export default function DataModernizationArchitecture({ HomeCss }) {
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
      <Col offset={1} span={22} className={HomeCss.infoRowSystemView}>
      <iframe
            src="all-graph/three/demo/data.html"
            style={{ width: "100%", height: "100vh", border : "none" }}
          />
        {/* <Image
          preview={false}
          width={"100%"}
          src={"/home/dma_system.gif"}
          className={HomeCss.infoRowSystemViewSystem}
        />
        <Image
          preview={false}
          height={"100%"}
          src={"/home/dma_mobile.gif"}
          className={HomeCss.infoRowSystemViewmobile}
        /> */}
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
