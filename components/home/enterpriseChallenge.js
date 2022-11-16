import { Col, Row, Button } from "antd";
import { RiseOutlined } from "@ant-design/icons";

import EnterpriseChallengeDesktopChart from "./EnterpriseChallengeDesktopChart";
import EnterpriseChallengeMobileChart from "./EnterpriseChallengeMobileChart";

export default function EnterpriseChallenge({ HomeCss }) {
  return (
    <Row className={HomeCss.enterpriseChallengeRow}>
      <Col span={24} className={HomeCss.enterpriseChallengeColTitle}>
        <h1>Enterprise Challenge</h1>
      </Col>
      <Col span={24} className={HomeCss.enterpriseChallengeColDesktopChart}>
        <EnterpriseChallengeDesktopChart HomeCss={HomeCss} />
      </Col>
      <Col span={24} className={HomeCss.enterpriseChallengeColMobileChart}>
        <EnterpriseChallengeMobileChart HomeCss={HomeCss} />
      </Col>
      <Col span={24} className={HomeCss.enterpriseChallengeCol}>
        <Button className={HomeCss.nuoDataWorkBtn} type="" ghost>
          Explore How NuoData work? <RiseOutlined />
        </Button>
      </Col>
    </Row>
  );
}
