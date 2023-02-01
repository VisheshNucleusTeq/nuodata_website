import { Button, Col, Row } from "antd";
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
        <h1>
          <span>Data Modernization Architecture</span>
        </h1>
        {/* <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </p> */}
      </Col>
      <Col offset={1} span={22} className={HomeCss.infoRowSystemView}>
        <div className={HomeCss.infoRowSystemTextView} />
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
