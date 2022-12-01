import HomeCss from "../../styles/Home.module.css";
import Info from "./info";
import Footer from "../common/footer";
import { Row, Col } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

export default function Home() {
  return (
    <>
      <Info HomeCss={HomeCss} />

      {/* <Row style={{ backgroundColor: "#062231", height: "100%" }}>
        <Col offset={2} span={20}>
          <Row>
            {Array(6)
              .fill(undefined)
              .map((data, i) => {
                return (
                  <Col
                    xs={24}
                    sm={12}
                    md={12}
                    lg={8}
                    xl={8}
                    xxl={8}
                    className={HomeCss.div}
                  >
                    <Row className={HomeCss.row}>
                      <Col offset={2} span={20} className={HomeCss.text}>
                        There is no merit in simply dumping the data to cloud
                      </Col>
                      <Col offset={2} span={16} className={HomeCss.number}>
                        {i}
                      </Col>
                      <Col offset={2} span={4} className={HomeCss.icon}>
                        <ArrowRightOutlined />
                      </Col>
                    </Row>
                  </Col>
                );
              })}
          </Row>
        </Col>
      </Row> */}

      <Footer HomeCss={HomeCss} />
    </>
  );
}
