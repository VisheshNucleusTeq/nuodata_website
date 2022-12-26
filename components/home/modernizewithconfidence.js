import { Col, Row } from "antd";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { CaretDownOutlined } from '@ant-design/icons';

export default function ModernizeWithConfidence({ HomeCss }) {
  return (
    <div className={HomeCss.bgImage}>
      <h1>
        <span>Modernize with Confidence</span>
      </h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s
      </p>

      <Row className={HomeCss.modernizeWithConfidenceMain}>
        
        <Col span={24}>
          <Row>
            <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={4}></Col>
            <Col
              xs={22}
              sm={14}
              md={12}
              lg={11}
              xl={11}
              xxl={9}
              className={`${HomeCss.ModernData} ${HomeCss.chat} ${HomeCss.right}`}
            >
              6-10x faster & 100% accurate conversion
            </Col>
            <Col xs={1} sm={9} md={11} lg={11} xl={11} xxl={11}></Col>
          </Row>
        </Col>

        <Col span={12} className={HomeCss.ModernDataDev} ></Col>

        <Col span={24}>
          <Row>
            <Col xs={1} sm={9} md={11} lg={11} xl={11} xxl={11}></Col>
            <Col
              xs={22}
              sm={14}
              md={12}
              lg={11}
              xl={11}
              xxl={9}
              className={`${HomeCss.ModernData} ${HomeCss.chat} ${HomeCss.left}`}
            >
              Data driven enterprise enabled through modern data lake
            </Col>
            <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={4}></Col>
          </Row>
        </Col>

        <Col span={12} className={HomeCss.ModernDataDev} />

        <Col span={24}>
          <Row>
            <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={4}></Col>
            <Col
              xs={22}
              sm={14}
              md={12}
              lg={11}
              xl={11}
              xxl={9}
              className={`${HomeCss.ModernData} ${HomeCss.chat} ${HomeCss.right}`}
            >
              Certified data for enterprise consumption
            </Col>
            <Col xs={1} sm={9} md={11} lg={11} xl={11} xxl={11}></Col>
          </Row>
        </Col>

        <Col span={12} className={HomeCss.ModernDataDev} />

        <Col span={24}>
          <Row>
            <Col xs={1} sm={9} md={11} lg={11} xl={11} xxl={11}></Col>
            <Col
              xs={22}
              sm={14}
              md={12}
              lg={11}
              xl={11}
              xxl={9}
              className={`${HomeCss.ModernData} ${HomeCss.chat} ${HomeCss.left}`}
            >
              No redundancies
            </Col>
            <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={4}></Col>
          </Row>
        </Col>

        <Col span={12} className={HomeCss.ModernDataDev} />

        <Col span={24}>
          <Row>
            <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={4}></Col>
            <Col
              xs={22}
              sm={14}
              md={12}
              lg={11}
              xl={11}
              xxl={9}
              className={`${HomeCss.ModernData} ${HomeCss.chat} ${HomeCss.right}`}
            >
             Single version of truth
            </Col>
            <Col xs={1} sm={9} md={11} lg={11} xl={11} xxl={11}></Col>
          </Row>
        </Col>

        <Col span={12} className={HomeCss.ModernDataDev} />

        <Col span={24}>
          <Row>
            <Col xs={1} sm={9} md={11} lg={11} xl={11} xxl={11}></Col>
            <Col
              xs={22}
              sm={14}
              md={12}
              lg={11}
              xl={11}
              xxl={9}
              className={`${HomeCss.ModernData} ${HomeCss.chat} ${HomeCss.left}`}
            >
              Enabling federation of data through self services
            </Col>
            <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={4}></Col>
          </Row>
        </Col>

        <Col span={12} className={HomeCss.ModernDataDev} />

        <Col span={24}>
          <Row>
            <Col xs={1} sm={1} md={1} lg={2} xl={2} xxl={4}></Col>
            <Col
              xs={22}
              sm={14}
              md={12}
              lg={11}
              xl={11}
              xxl={9}
              className={`${HomeCss.ModernData} ${HomeCss.chat} ${HomeCss.right}`}
            >
              Single version of truth
            </Col>
            <Col xs={1} sm={9} md={11} lg={11} xl={11} xxl={11}></Col>
          </Row>
        </Col>

      </Row>
    </div>
  );
}
