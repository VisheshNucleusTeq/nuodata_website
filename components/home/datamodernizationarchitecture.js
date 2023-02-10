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
        <h1>
        </h1>
        {/* <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </p> */}
      </Col>
      <Col offset={1} span={22} className={HomeCss.infoRowSystemView}>
        <Image width={"100%"} src={'/home/archi-gif.gif'} className={HomeCss.infoRowSystemViewSystem}/>
        <Image height={"100%"} src={'/home/3-1-GIF.gif'} className={HomeCss.infoRowSystemViewmobile}/>
        {/* <div className={HomeCss.infoRowSystemTextView} /> */}
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
