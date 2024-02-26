import { EditOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/Icon";
import { Col, Image, Row, Typography } from "antd";
import React from "react";
const { Title, Paragraph } = Typography;

function SnapShotLeftImage({ HomeCss,title,description,iconSrc,imageSrc }) {
  return (
    <Row align="middle" className={HomeCss.SnapshotContainer}>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        className={HomeCss.SnapshotImageLeft}
      >
        <Image
          src={imageSrc}
          preview={false}
          style={{ objectFit: "cover" }}
        />
      </Col>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        className={HomeCss.SnapshotTextRightCont}
      >
        <Typography >
          <Title className={HomeCss.snapShotTitle}>
            <Image src={iconSrc}  preview={false} /> {title}
          </Title>
          <Paragraph className={HomeCss.snapShotParagraph}>
            {description}
          </Paragraph>
        </Typography>
      </Col>
    </Row>
  );
}

export default SnapShotLeftImage;
